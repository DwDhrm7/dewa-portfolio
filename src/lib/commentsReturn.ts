const KEY = "dd_return_to_comments";
const WINDOW_MS = 15 * 60 * 1000;

export type ReturnTarget = "komentar" | "penilaian";

/** Signing in leaves the page; remember which work and which block to come back to. */
export function rememberCommentReturn(target: ReturnTarget = "komentar") {
  try {
    localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), path: window.location.pathname, target }));
  } catch {
    // Private mode: the reader simply lands at the top.
  }
}

/** Whether a sign-in is waiting to return to this page (and, if given, to this block). */
export function hasCommentReturn(target?: ReturnTarget): boolean {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as { at: number; path: string; target?: ReturnTarget } | null;
    if (!saved || Date.now() - saved.at >= WINDOW_MS || saved.path !== window.location.pathname) return false;
    return !target || (saved.target ?? "komentar") === target;
  } catch {
    return false;
  }
}

export function clearCommentReturn() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}
