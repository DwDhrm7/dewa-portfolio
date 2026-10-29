import type { Metadata } from "next";
import { WriterItemsProvider } from "@/components/writer/useWriterItems";
import { publishedItems, summarize } from "@/lib/writerContent";

const description = "Blog of Dewa Dharma Putra: poetry, short stories, and novels, written in Indonesian.";

export const metadata: Metadata = {
  title: { absolute: "Blog · Dewa Dharma", template: "%s · Blog Dewa Dharma" },
  description,
  openGraph: { title: "Blog · Dewa Dharma", description, type: "website", url: "/writer" },
};

export default function WriterLayout({ children }: { children: React.ReactNode }) {
  const items = publishedItems().map(summarize);
  // overflow-x-clip (not hidden) so tilted sheets never cause sideways scroll and sticky still works.
  return (
    <div className="writer-realm min-h-screen overflow-x-clip bg-paper text-ink">
      <WriterItemsProvider items={items}>{children}</WriterItemsProvider>
    </div>
  );
}
