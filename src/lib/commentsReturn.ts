const KEY = "dd_return_to_comments";
const WINDOW_MS = 15 * 60 * 1000;

/** Signing in leaves the page; remember which work to come back to, so the reader lands on its comments. */
export function rememberCommentReturn() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), path: window.location.pathname }));
  } catch {
    // Private mode: the reader simply lands at the top.
  }
}

export function hasCommentReturn(): boolean {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as { at: number; path: string } | null;
    return Boolean(saved && Date.now() - saved.at < WINDOW_MS && saved.path === window.location.pathname);
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
