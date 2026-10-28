"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STORE_KEY = "dd_scroll";
const RESTORE_WINDOW_MS = 4000;

// The first render is the landing page, not a navigation.
let inAppNavigations = -1;

/** True once the visitor has moved between pages of this site, so history.back() stays on it. */
export function canGoBackInApp() {
  return inAppNavigations > 0;
}

const here = () => window.location.pathname + window.location.search;

function readStore(): Record<string, number> {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STORE_KEY) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, number>) {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    // Private mode or full storage: positions just aren't remembered.
  }
}

/**
 * Remembers how far each page was scrolled and returns there on back/forward.
 * Lists load their works after the page mounts, so the restore keeps retrying
 * until the page is tall enough instead of settling for the top.
 */
export default function ScrollMemory() {
  const pathname = usePathname();

  useEffect(() => {
    inAppNavigations += 1;
  }, [pathname]);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const store = readStore();
    let restoring = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let saveQueued = false;

    const save = () => {
      saveQueued = false;
      if (restoring) return;
      store[here()] = Math.round(window.scrollY);
      writeStore(store);
    };

    const onScroll = () => {
      if (saveQueued || restoring) return;
      saveQueued = true;
      setTimeout(save, 100);
    };

    const stopRestoring = () => {
      restoring = false;
      clearTimeout(timer);
    };

    const onPopState = () => {
      clearTimeout(timer);
      const target = store[here()] ?? 0;
      const started = performance.now();
      restoring = true;

      const tick = () => {
        const reachable = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: Math.min(target, Math.max(reachable, 0)), behavior: "instant" });
        const arrived = reachable >= target && Math.abs(window.scrollY - target) < 2;
        // Keep holding the spot for a moment after arriving, since Next may scroll once more on render.
        if (performance.now() - started > RESTORE_WINDOW_MS || (arrived && performance.now() - started > 400)) {
          restoring = false;
          return;
        }
        timer = setTimeout(tick, 16);
      };
      timer = setTimeout(tick, 0);
    };

    // Record the spot the moment a link is followed, before the next page scrolls to the top.
    const onClick = () => !restoring && save();

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    // Any deliberate input hands control back to the reader.
    window.addEventListener("wheel", stopRestoring, { passive: true });
    window.addEventListener("touchstart", stopRestoring, { passive: true });
    window.addEventListener("keydown", stopRestoring);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("wheel", stopRestoring);
      window.removeEventListener("touchstart", stopRestoring);
      window.removeEventListener("keydown", stopRestoring);
    };
  }, []);

  return null;
}
