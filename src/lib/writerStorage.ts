import fs from "fs";
import path from "path";
import type { WriterItem } from "@/types/writer";
import seed from "@/data/writer-content.json";

const DATA_FILE = path.join(process.cwd(), "src", "data", "writer-content.json");

/** Thrown when the host cannot persist changes (read-only filesystem, e.g. most serverless platforms). */
export class StorageUnavailableError extends Error {
  constructor() {
    super("Penyimpanan tidak dapat ditulis di server ini.");
    this.name = "StorageUnavailableError";
  }
}

export class SlugConflictError extends Error {
  constructor(slug: string) {
    super(`Slug "${slug}" sudah dipakai karya lain.`);
    this.name = "SlugConflictError";
  }
}

function looksLikeItem(value: unknown): value is WriterItem {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.slug === "string" &&
    typeof v.title === "string" &&
    (v.category === "puisi" || v.category === "cerpen" || v.category === "novel")
  );
}

function parse(raw: string): WriterItem[] | null {
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(looksLikeItem) : null;
  } catch {
    return null;
  }
}

/** Falls back to the bundled seed if the file is missing or corrupt, so reads never throw. */
export function getWriterItems(): WriterItem[] {
  try {
    const items = parse(fs.readFileSync(DATA_FILE, "utf-8"));
    if (items) return items;
    console.error("[writerStorage] content file is corrupt; serving bundled seed");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") console.error("[writerStorage] read failed:", error);
  }
  return seed as WriterItem[];
}

// One write at a time, so two quick saves cannot read the same snapshot and overwrite each other.
let queue: Promise<unknown> = Promise.resolve();

function serialized<T>(task: () => T): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

function persist(items: WriterItem[]): void {
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(tmp, JSON.stringify(items, null, 2) + "\n", "utf-8");
    fs.renameSync(tmp, DATA_FILE); // atomic: readers see the old file or the new one, never half of it
  } catch (error) {
    try {
      fs.rmSync(tmp, { force: true });
    } catch {}
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EROFS" || code === "EACCES" || code === "EPERM" || code === "ENOENT") throw new StorageUnavailableError();
    throw error;
  }
}

export function saveWriterItem(item: WriterItem): Promise<WriterItem[]> {
  return serialized(() => {
    const items = getWriterItems();
    if (items.some((other) => other.slug === item.slug && other.id !== item.id)) {
      throw new SlugConflictError(item.slug);
    }
    const index = items.findIndex((other) => other.id === item.id);
    const next = index >= 0 ? items.map((other, i) => (i === index ? item : other)) : [item, ...items];
    persist(next);
    return next;
  });
}

export function deleteWriterItem(id: string): Promise<WriterItem[] | null> {
  return serialized(() => {
    const items = getWriterItems();
    if (!items.some((item) => item.id === id)) return null;
    const next = items.filter((item) => item.id !== id);
    persist(next);
    return next;
  });
}
