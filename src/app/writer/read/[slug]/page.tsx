import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isStudioAuthenticated } from "@/lib/studioAuth";
import { describe, findItem } from "@/lib/writerContent";
import Reader from "./Reader";

type Props = { params: Promise<{ slug: string }> };

// Drafts are readable by the signed-in author, so this page depends on the request.
export const dynamic = "force-dynamic";

async function load(slug: string) {
  return findItem(slug) ?? ((await isStudioAuthenticated()) ? findItem(slug, true) : undefined);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await load((await params).slug);
  if (!item) return { title: "Not found", robots: { index: false } };

  const description = describe(item);
  const url = `/writer/read/${item.slug}`;
  return {
    title: item.title,
    description,
    alternates: { canonical: url },
    robots: item.isPublished === false ? { index: false, follow: false } : undefined,
    openGraph: {
      title: item.title,
      description,
      url,
      type: "article",
      publishedTime: item.date,
      authors: ["Dewa Dharma Putra"],
      ...(item.coverImage ? { images: [{ url: item.coverImage, alt: item.title }] } : {}),
    },
    twitter: { card: item.coverImage ? "summary_large_image" : "summary", title: item.title, description },
  };
}

export default async function ReadPage({ params }: Props) {
  const item = await load((await params).slug);
  if (!item) notFound();
  return <Reader item={item} />;
}
