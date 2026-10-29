import { NextRequest, NextResponse } from "next/server";
import { LIMITS, validateItem } from "@/lib/writerValidation";
import {
  SlugConflictError,
  StorageUnavailableError,
  deleteWriterItem,
  getWriterItems,
  saveWriterItem,
} from "@/lib/writerStorage";
import { isSameOrigin, isStudioAuthenticated } from "@/lib/studioAuth";
import { summarize } from "@/lib/writerContent";
import type { WriterItem } from "@/types/writer";

const noStore = { "Cache-Control": "no-store" };
const cacheFor = (private_: boolean) => ({
  "Cache-Control": private_ ? "no-store" : "public, s-maxage=60, stale-while-revalidate=300",
  Vary: "Cookie", // drafts are visible to the author only, so shared caches must not mix the two
});

function fail(status: number, error: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ success: false, error, ...extra }, { status, headers: noStore });
}

/** Unexpected errors are logged for us and reported generically to the client. */
function serverError(context: string, error: unknown) {
  console.error(`[api/writer] ${context}:`, error);
  return fail(500, "Terjadi kesalahan di server.");
}

export async function GET(req: NextRequest) {
  try {
    const items = getWriterItems();
    const canSeeDrafts = await isStudioAuthenticated();
    const visible = canSeeDrafts ? items : items.filter((item) => item.isPublished !== false);

    const slug = new URL(req.url).searchParams.get("slug");
    if (slug) {
      const item = visible.find((it) => it.slug === slug || it.id === slug);
      return item
        ? NextResponse.json({ success: true, data: item }, { headers: cacheFor(canSeeDrafts) })
        : fail(404, "Karya tidak ditemukan.");
    }

    return NextResponse.json(
      { success: true, data: visible.map(summarize) },
      { headers: cacheFor(canSeeDrafts) }
    );
  } catch (error) {
    return serverError("GET", error);
  }
}

async function guardWrite(req: NextRequest) {
  if (!isSameOrigin(req)) return fail(403, "Permintaan ditolak.");
  if (!(await isStudioAuthenticated())) return fail(401, "Unauthorized");
  return null;
}

export async function POST(req: NextRequest) {
  const denied = await guardWrite(req);
  if (denied) return denied;

  try {
    const text = await req.text();
    if (text.length > LIMITS.body) return fail(413, "Data terlalu besar.");

    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      return fail(400, "Format data tidak valid.");
    }

    const result = validateItem(body);
    if (!result.ok) return fail(400, result.errors[0], { errors: result.errors });

    const items = await saveWriterItem(result.value);
    return NextResponse.json({ success: true, data: items.map(summarize), savedItem: summarize(result.value) }, { headers: noStore });
  } catch (error) {
    if (error instanceof SlugConflictError) return fail(409, error.message);
    if (error instanceof StorageUnavailableError) return fail(503, error.message);
    return serverError("POST", error);
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await guardWrite(req);
  if (denied) return denied;

  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id || !/^[A-Za-z0-9_-]{1,100}$/.test(id)) return fail(400, "ID karya tidak valid.");

    const items = await deleteWriterItem(id);
    if (items === null) return fail(404, "Karya tidak ditemukan.");
    return NextResponse.json({ success: true, data: items.map(summarize) }, { headers: noStore });
  } catch (error) {
    if (error instanceof StorageUnavailableError) return fail(503, error.message);
    return serverError("DELETE", error);
  }
}
