"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { hasCommentReturn } from "@/lib/commentsReturn";

const Comments = dynamic(() => import("./Comments"), { ssr: false, loading: () => null });

/**
 * Comments are the last thing on the page, so neither their code nor their data is fetched
 * until the reader is within reach of them.
 */
export default function LazyComments(props: { workSlug: string; chapter: number | null; border: string }) {
  const anchor = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = anchor.current;
    if (!element || near) return;
    // Back from signing in: show the comments at once so the page can scroll to them.
    if (hasCommentReturn()) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [near]);

  return <div ref={anchor}>{near && <Comments {...props} />}</div>;
}
