import { NextRequest, NextResponse } from "next/server";
import { getWriterItems, saveWriterItem, deleteWriterItem } from "@/lib/writerStorage";
import { WriterItem } from "@/types/writer";
import { isStudioAuthenticated } from "@/lib/studioAuth";

const unauthorized = () =>
  NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

function summarize(item: WriterItem): WriterItem {
  const { content, ...rest } = item;
  return {
    ...rest,
    excerpt: content?.split(/\n{2,}/).slice(0, 2).join("\n\n"),
    chapters: item.chapters?.map(({ content: _body, ...chapter }) => ({ ...chapter, content: "" })),
  };
}

export async function GET(req: NextRequest) {
  try {
    const items = getWriterItems();
    const slug = new URL(req.url).searchParams.get("slug");

    if (slug) {
      const item = items.find((it) => it.slug === slug || it.id === slug);
      if (!item || (item.isPublished === false && !(await isStudioAuthenticated()))) {
        return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: item });
    }

    const visible = (await isStudioAuthenticated())
      ? items
      : items.filter((it) => it.isPublished !== false);
    return NextResponse.json({ success: true, data: visible.map(summarize) });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await isStudioAuthenticated())) return unauthorized();

  try {
    const body = await req.json();
    const item = body as WriterItem;

    if (!item.title || !item.category) {
      return NextResponse.json(
        { success: false, error: "Title and Category are required." },
        { status: 400 }
      );
    }

    // Generate slug if missing
    if (!item.slug) {
      item.slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    // Generate id if missing
    if (!item.id) {
      item.id = `${item.category}-${Date.now()}`;
    }

    const updated = saveWriterItem(item);
    return NextResponse.json({ success: true, data: updated, savedItem: item });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isStudioAuthenticated())) return unauthorized();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Item ID is required for deletion." },
        { status: 400 }
      );
    }

    const updated = deleteWriterItem(id);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
