import fs from "fs";
import path from "path";
import { WriterItem } from "@/types/writer";
import defaultData from "@/data/writer-content.json";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "writer-content.json");

export function getWriterItems(): WriterItem[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData as WriterItem[];
    }
    const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(raw) as WriterItem[];
  } catch (error) {
    console.error("Error reading writer items:", error);
    return defaultData as WriterItem[];
  }
}

export function getWriterItemBySlug(slug: string): WriterItem | undefined {
  const items = getWriterItems();
  return items.find((item) => item.slug === slug || item.id === slug);
}

export function saveWriterItem(item: WriterItem): WriterItem[] {
  const items = getWriterItems();
  const index = items.findIndex((existing) => existing.id === item.id);
  
  if (index >= 0) {
    items[index] = item;
  } else {
    items.unshift(item);
  }

  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(items, null, 2), "utf-8");
  return items;
}

export function deleteWriterItem(id: string): WriterItem[] {
  const items = getWriterItems();
  const filtered = items.filter((item) => item.id !== id);
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return filtered;
}
