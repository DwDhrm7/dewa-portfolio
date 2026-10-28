import { NextRequest, NextResponse } from "next/server";
import { getWriterItems, saveWriterItem, deleteWriterItem } from "@/lib/writerStorage";
import { WriterItem } from "@/types/writer";

export async function GET() {
  try {
    const items = getWriterItems();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
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
