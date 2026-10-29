"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { useLanguage } from "@/contexts/LanguageContext";
import { clearCommentReturn, hasCommentReturn, rememberCommentReturn } from "@/lib/commentsReturn";
import { getSupabase } from "@/lib/supabase";
import { useWriterCopy } from "./copy";

interface Profile {
  id: string;
  display_name: string;
  is_author: boolean;
}

interface Comment {
  id: string;
  parent_id: string | null;
  user_id: string;
  body: string;
  status: "visible" | "hidden";
  created_at: string;
  edited_at: string | null;
  blog_profiles: Profile | null;
}

type Outcome = { error: { message: string; code?: string } | null };

const COLUMNS = "id, parent_id, user_id, body, status, created_at, edited_at, blog_profiles(id, display_name, is_author)";
const MAX_LENGTH = 2000;
const DUPLICATE = "23505";
const action = "rounded-sm px-2 py-1 text-[0.8em] opacity-70 transition hover:bg-black/5 hover:opacity-100 disabled:opacity-40";

type Errors = ReturnType<typeof useWriterCopy>["comments"]["errors"];

/** The database speaks Indonesian; turn what it says into the reader's language. */
function explain(message: string, errors: Errors): string {
  if (message.includes("Terlalu cepat")) return errors.tooFast;
  if (message.includes("Batas komentar harian")) return errors.dailyLimit;
  if (message.includes("tidak bisa berkomentar")) return errors.banned;
  if (message.includes("check constraint")) return errors.length;
  if (message.includes("dicadangkan")) return errors.name;
  return errors.generic;
}

function Composer({
  initial = "",
  placeholder,
  submitLabel,
  onSubmit,
  onCancel,
  border,
  autoFocus,
}: {
  initial?: string;
  placeholder: string;
  submitLabel: string;
  onSubmit: (text: string) => Promise<string | null>;
  onCancel?: () => void;
  border: string;
  autoFocus?: boolean;
}) {
  const c = useWriterCopy().comments;
  const [text, setText] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy || text.trim().length === 0) return;
    setBusy(true);
    setProblem(null);
    const failure = await onSubmit(text);
    setBusy(false);
    if (failure) setProblem(failure);
    else if (!onCancel) setText("");
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={MAX_LENGTH}
        rows={3}
        placeholder={placeholder}
        aria-label={placeholder}
        autoFocus={autoFocus}
        className={`w-full resize-y rounded-sm border ${border} bg-transparent p-3 text-[0.95em] leading-relaxed outline-none focus:border-current`}
      />
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.75em] tabular-nums opacity-50">
          {text.length}/{MAX_LENGTH}
        </span>
        <span className="flex items-center gap-2">
          {onCancel && (
            <button type="button" onClick={onCancel} className={action}>
              {c.cancel}
            </button>
          )}
          <button
            type="submit"
            disabled={busy || text.trim().length === 0}
            className={`rounded-sm border ${border} px-4 py-1.5 text-[0.85em] font-medium transition hover:bg-black/5 disabled:opacity-40`}
          >
            {busy ? c.sending : submitLabel}
          </button>
        </span>
      </div>
      {problem && (
        <p role="alert" className="text-[0.85em] text-red-600">
          {problem}
        </p>
      )}
    </form>
  );
}

function SignIn({ sb, border }: { sb: SupabaseClient; border: string }) {
  const c = useWriterCopy().comments;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const here = () => window.location.href.split("#")[0];

  async function withGoogle() {
    rememberCommentReturn();
    await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: here() } });
  }

  async function withEmail(event: React.FormEvent) {
    event.preventDefault();
    if (state === "sending" || !email.includes("@")) return;
    setState("sending");
    rememberCommentReturn();
    const { error } = await sb.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: here() } });
    setState(error ? "error" : "sent");
  }

  return (
    <div className={`space-y-4 border ${border} p-4`}>
      <p className="text-[0.9em]">{c.signInPrompt}</p>
      <button
        type="button"
        onClick={withGoogle}
        className={`w-full rounded-sm border ${border} px-4 py-2 text-[0.9em] font-medium transition hover:bg-black/5`}
      >
        {c.google}
      </button>
      <form onSubmit={withEmail} className="space-y-2">
        <p className="text-[0.75em] uppercase tracking-wide opacity-60">{c.orEmail}</p>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={c.emailPlaceholder}
            aria-label={c.emailPlaceholder}
            autoComplete="email"
            className={`min-w-0 flex-1 rounded-sm border ${border} bg-transparent px-3 py-2 text-[0.9em] outline-none focus:border-current`}
          />
          <button
            type="submit"
            disabled={state === "sending" || !email.includes("@")}
            className={`shrink-0 rounded-sm border ${border} px-3 py-2 text-[0.85em] font-medium transition hover:bg-black/5 disabled:opacity-40`}
          >
            {c.emailSend}
          </button>
        </div>
      </form>
      {state === "sent" && (
        <p role="status" className="text-[0.85em]">
          {c.emailSent}
        </p>
      )}
      {state === "error" && (
        <p role="alert" className="text-[0.85em] text-red-600">
          {c.errors.sendLink}
        </p>
      )}
    </div>
  );
}

export default function Comments({ workSlug, chapter, border }: { workSlug: string; chapter: number | null; border: string }) {
  const c = useWriterCopy().comments;
  const { language } = useLanguage();
  const [sb, setSb] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [me, setMe] = useState<Profile | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [reportCounts, setReportCounts] = useState<Record<string, number>>({});
  const [reportedIds, setReportedIds] = useState<string[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [wantsToWrite, setWantsToWrite] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const userId = session?.user.id ?? null;
  const isAuthor = me?.is_author === true;
  const dateFormat = useMemo(
    () => new Intl.DateTimeFormat(language === "en" ? "en-GB" : "id-ID", { dateStyle: "medium", timeStyle: "short" }),
    [language]
  );

  useEffect(() => {
    setSb(getSupabase());
  }, []);

  useEffect(() => {
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, [sb]);

  // Coming back from signing in: land on the comments instead of the top of the page.
  useEffect(() => {
    if (!session || !hasCommentReturn()) return;
    clearCommentReturn();
    // No cleanup on purpose: the session can change object right after mounting, and the scroll must still happen.
    setTimeout(() => sectionRef.current?.scrollIntoView({ block: "start", behavior: "instant" }), 60);
  }, [session]);

  // Every login has a profile; older logins that predate the table get one here.
  useEffect(() => {
    if (!sb || !session) {
      setMe(null);
      return;
    }
    let cancelled = false;
    const uid = session.user.id;
    (async () => {
      const read = () => sb.from("blog_profiles").select("id, display_name, is_author").eq("id", uid).maybeSingle();
      let { data } = await read();
      if (!data) {
        const meta = session.user.user_metadata ?? {};
        const given = String(meta.full_name ?? meta.name ?? "").trim().slice(0, 40);
        await sb.from("blog_profiles").insert({ id: uid, display_name: given.length >= 2 ? given : `Pembaca ${uid.slice(0, 4)}` });
        ({ data } = await read());
      }
      if (!cancelled) setMe((data as Profile | null) ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [sb, session]);

  const load = useCallback(async () => {
    if (!sb) return;
    let query = sb.from("blog_comments").select(COLUMNS).eq("work_slug", workSlug).order("created_at", { ascending: true }).limit(300);
    query = chapter === null ? query.is("chapter", null) : query.eq("chapter", chapter);
    const { data, error } = await query;
    if (error) {
      setLoadFailed(true);
      setComments([]);
    } else {
      setLoadFailed(false);
      setComments((data ?? []) as unknown as Comment[]);
    }
  }, [sb, workSlug, chapter]);

  useEffect(() => {
    load();
  }, [load, userId]);

  // The author also sees how many readers reported each comment.
  useEffect(() => {
    if (!sb || !isAuthor || !comments || comments.length === 0) {
      setReportCounts({});
      return;
    }
    sb.from("blog_reports")
      .select("comment_id")
      .in("comment_id", comments.map((item) => item.id))
      .then(({ data }) => {
        const counts: Record<string, number> = {};
        for (const row of (data ?? []) as { comment_id: string }[]) counts[row.comment_id] = (counts[row.comment_id] ?? 0) + 1;
        setReportCounts(counts);
      });
  }, [sb, isAuthor, comments]);

  const { tops, replies } = useMemo(() => {
    const all = comments ?? [];
    const grouped: Record<string, Comment[]> = {};
    for (const item of all) {
      if (item.parent_id) (grouped[item.parent_id] ??= []).push(item);
    }
    return { tops: all.filter((item) => item.parent_id === null), replies: grouped };
  }, [comments]);

  async function run(operation: PromiseLike<Outcome>, acceptDuplicate = false): Promise<string | null> {
    const { error } = await operation;
    if (error && !(acceptDuplicate && error.code === DUPLICATE)) return explain(error.message, c.errors);
    await load();
    return null;
  }

  async function post(body: string, parentId: string | null) {
    if (!sb || !userId) return c.errors.generic;
    return run(sb.from("blog_comments").insert({ work_slug: workSlug, chapter, parent_id: parentId, user_id: userId, body }));
  }

  async function edit(id: string, body: string) {
    if (!sb) return c.errors.generic;
    return run(sb.from("blog_comments").update({ body }).eq("id", id));
  }

  async function remove(id: string) {
    if (!sb || !window.confirm(c.confirmDelete)) return;
    setNotice(await run(sb.from("blog_comments").delete().eq("id", id)));
  }

  async function report(id: string) {
    if (!sb || !userId) return;
    const failure = await run(sb.from("blog_reports").insert({ comment_id: id, user_id: userId }), true);
    if (failure) setNotice(failure);
    else setReportedIds((ids) => [...ids, id]);
  }

  async function setStatus(id: string, status: "visible" | "hidden") {
    if (!sb) return;
    setNotice(await run(sb.from("blog_comments").update({ status }).eq("id", id)));
  }

  async function block(targetId: string) {
    if (!sb || !window.confirm(c.confirmBlock)) return;
    const failure = await run(sb.from("blog_bans").insert({ user_id: targetId }), true);
    setNotice(failure ?? c.blocked);
  }

  async function rename(name: string) {
    if (!sb || !userId) return;
    const clean = name.trim();
    if (clean.length < 2 || clean.length > 40) {
      setNotice(c.errors.name);
      return;
    }
    const failure = await run(sb.from("blog_profiles").update({ display_name: clean }).eq("id", userId));
    if (failure) setNotice(failure);
    else {
      setMe((prev) => (prev ? { ...prev, display_name: clean } : prev));
      setRenaming(false);
      setNotice(null);
    }
  }

  const visibleCount = (comments ?? []).filter((item) => item.status === "visible").length;

  function renderComment(item: Comment, isReply: boolean) {
    const mine = userId === item.user_id;
    const hidden = item.status === "hidden";
    const writer = item.blog_profiles;
    const reports = reportCounts[item.id] ?? 0;
    const children = replies[item.id] ?? [];

    return (
      <li key={item.id} className={isReply ? `border-l ${border} pl-4` : `border-b ${border} py-5`}>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[0.8em]">
          <span className="font-semibold">{writer?.display_name ?? "?"}</span>
          {writer?.is_author && (
            <span className={`rounded-sm border ${border} px-1.5 py-px text-[0.85em] uppercase tracking-wide`}>{c.author}</span>
          )}
          <time dateTime={item.created_at} className="opacity-60">
            {dateFormat.format(new Date(item.created_at))}
          </time>
          {item.edited_at && <span className="opacity-50">({c.edited})</span>}
          {hidden && <span className="opacity-70">· {c.hidden}</span>}
          {isAuthor && reports > 0 && <span className="text-red-600">· {c.reports(reports)}</span>}
        </div>

        {editing === item.id ? (
          <div className="mt-2">
            <Composer
              initial={item.body}
              placeholder={c.placeholder}
              submitLabel={c.save}
              border={border}
              autoFocus
              onCancel={() => setEditing(null)}
              onSubmit={async (text) => {
                const failure = await edit(item.id, text);
                if (!failure) setEditing(null);
                return failure;
              }}
            />
          </div>
        ) : (
          <p className={`mt-2 whitespace-pre-wrap break-words text-[0.95em] leading-relaxed ${hidden ? "opacity-50" : ""}`}>{item.body}</p>
        )}

        <div className="-ml-2 mt-2 flex flex-wrap gap-0.5">
          {session && !isReply && !hidden && (
            <button type="button" className={action} onClick={() => setReplyTo(replyTo === item.id ? null : item.id)}>
              {c.reply}
            </button>
          )}
          {mine && !hidden && editing !== item.id && (
            <button type="button" className={action} onClick={() => setEditing(item.id)}>
              {c.edit}
            </button>
          )}
          {(mine || isAuthor) && (
            <button type="button" className={action} onClick={() => remove(item.id)}>
              {c.remove}
            </button>
          )}
          {session && !mine && !hidden && (
            <button type="button" className={action} disabled={reportedIds.includes(item.id)} onClick={() => report(item.id)}>
              {reportedIds.includes(item.id) ? c.reported : c.report}
            </button>
          )}
          {isAuthor && (
            <button type="button" className={action} onClick={() => setStatus(item.id, hidden ? "visible" : "hidden")}>
              {hidden ? c.show : c.hide}
            </button>
          )}
          {isAuthor && !mine && (
            <button type="button" className={action} onClick={() => block(item.user_id)}>
              {c.block}
            </button>
          )}
        </div>

        {replyTo === item.id && (
          <div className="mt-3">
            <Composer
              placeholder={c.replyPlaceholder}
              submitLabel={c.send}
              border={border}
              autoFocus
              onCancel={() => setReplyTo(null)}
              onSubmit={async (text) => {
                const failure = await post(text, item.id);
                if (!failure) setReplyTo(null);
                return failure;
              }}
            />
          </div>
        )}

        {!isReply && children.length > 0 && <ul className="mt-3 space-y-4">{children.map((child) => renderComment(child, true))}</ul>}
      </li>
    );
  }

  return (
    <section ref={sectionRef} id="komentar" aria-labelledby="comments-title" className={`mt-20 scroll-mt-40 border-t ${border} pt-10 font-ui`}>
      <h2 id="comments-title" className="text-[1.15em] font-semibold">
        {comments ? c.count(visibleCount) : c.title}
      </h2>
      <p className="mt-1 text-[0.8em] opacity-60">{c.rules}</p>

      <div className="mt-6">
        {sb && !session && !wantsToWrite && (
          <button
            type="button"
            onClick={() => setWantsToWrite(true)}
            className={`rounded-sm border ${border} px-4 py-2 text-[0.9em] font-medium transition hover:bg-black/5`}
          >
            {c.write}
          </button>
        )}
        {sb && !session && wantsToWrite && <SignIn sb={sb} border={border} />}
        {sb && session && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[0.85em]">
              {renaming && me ? (
                <form
                  className="flex items-center gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const field = new FormData(event.currentTarget).get("name");
                    rename(typeof field === "string" ? field : "");
                  }}
                >
                  <input
                    name="name"
                    defaultValue={me.display_name}
                    maxLength={40}
                    aria-label={c.rename}
                    className={`w-40 rounded-sm border ${border} bg-transparent px-2 py-1 outline-none focus:border-current`}
                  />
                  <button type="submit" className={action}>
                    {c.save}
                  </button>
                  <button type="button" className={action} onClick={() => setRenaming(false)}>
                    {c.cancel}
                  </button>
                </form>
              ) : (
                <span className="opacity-80">{c.signedInAs(me?.display_name ?? "...")}</span>
              )}
              <span className="flex gap-1">
                {!renaming && me && (
                  <button type="button" className={action} onClick={() => setRenaming(true)}>
                    {c.rename}
                  </button>
                )}
                <button type="button" className={action} onClick={() => sb.auth.signOut()}>
                  {c.signOut}
                </button>
              </span>
            </div>
            <Composer placeholder={c.placeholder} submitLabel={c.send} border={border} onSubmit={(text) => post(text, null)} />
          </div>
        )}
      </div>

      {notice && (
        <p role="status" className="mt-4 text-[0.85em]">
          {notice}
        </p>
      )}

      <div className="mt-8">
        {loadFailed ? (
          <p className="text-[0.9em] opacity-70">{c.loadError}</p>
        ) : comments === null ? (
          <p className="text-[0.9em] opacity-70">{c.loading}</p>
        ) : tops.length === 0 ? (
          <p className="text-[0.9em] opacity-70">{c.empty}</p>
        ) : (
          <ul>{tops.map((item) => renderComment(item, false))}</ul>
        )}
      </div>
    </section>
  );
}
