"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { clearCommentReturn, hasCommentReturn } from "@/lib/commentsReturn";
import { getSupabase } from "@/lib/supabase";
import { SignIn } from "./AuthPanel";
import { useWriterCopy } from "./copy";
import { STAR_PATH, Stars, fetchSummaries, refreshSummaries, useScoreFormat, type Summary } from "./ratings";

type Scores = { plot: number; conflict: number; style: number };
const KEYS = ["plot", "conflict", "style"] as const;
const EMPTY: Scores = { plot: 0, conflict: 0, style: 0 };

type Copy = ReturnType<typeof useWriterCopy>["rating"];

function explain(message: string, c: Copy): string {
  if (message.includes("Penulis tidak menilai")) return c.authorNote;
  if (message.includes("tidak bisa memberi penilaian")) return c.errors.banned;
  return c.errors.generic;
}

function Picker({ label, value, onChange, starLabel }: { label: string; value: number; onChange: (n: number) => void; starLabel: (n: number) => string }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[0.9em]">{label}</span>
      <span role="radiogroup" aria-label={label} className="inline-flex text-[1.7em] leading-none" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={starLabel(n)}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            className="px-0.5 transition hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]" fill={n <= (hover || value) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
              <path d={STAR_PATH} />
            </svg>
          </button>
        ))}
      </span>
    </div>
  );
}

/** Plot, Conflict and Writing style, one to five stars each, folded into an overall score. Rating needs a sign-in. */
export default function Rating({ workSlug, border }: { workSlug: string; border: string }) {
  const c = useWriterCopy().rating;
  const format = useScoreFormat();
  const [sb, setSb] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [mine, setMine] = useState<Scores | null>(null);
  const [draft, setDraft] = useState<Scores>(EMPTY);
  const [wantsToRate, setWantsToRate] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const userId = session?.user.id ?? null;

  useEffect(() => {
    setSb(getSupabase());
  }, []);

  useEffect(() => {
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, [sb]);

  const loadSummary = useCallback(async () => {
    const map = await fetchSummaries([workSlug]);
    setSummary(map[workSlug] ?? { raters: 0, plot: null, conflict: null, style: null, overall: null });
  }, [workSlug]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  // The reader's own rating, if there is one, and whether they are the author (who does not rate).
  useEffect(() => {
    if (!sb || !userId) {
      setIsAuthor(false);
      setMine(null);
      setDraft(EMPTY);
      return;
    }
    let cancelled = false;
    (async () => {
      const [profile, rating] = await Promise.all([
        sb.from("blog_profiles").select("is_author").eq("id", userId).maybeSingle(),
        sb.from("blog_ratings").select("plot, conflict, style").eq("work_slug", workSlug).eq("user_id", userId).maybeSingle(),
      ]);
      if (cancelled) return;
      setIsAuthor(profile.data?.is_author === true);
      if (rating.data) {
        setMine(rating.data as Scores);
        setDraft(rating.data as Scores);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sb, userId, workSlug]);

  // Coming back from signing in: land on the rating block, not the top of the page.
  useEffect(() => {
    if (!session || !hasCommentReturn("penilaian")) return;
    clearCommentReturn();
    // No cleanup on purpose: the session can change object right after mounting, and the scroll must still happen.
    setTimeout(() => sectionRef.current?.scrollIntoView({ block: "start", behavior: "instant" }), 60);
  }, [session]);

  async function submit() {
    if (!sb || !userId) return;
    if (!KEYS.every((key) => draft[key] >= 1)) {
      setNote({ ok: false, text: c.pickAll });
      return;
    }
    setBusy(true);
    setNote(null);
    const { error } = await sb.from("blog_ratings").upsert({ work_slug: workSlug, user_id: userId, ...draft }, { onConflict: "work_slug,user_id" });
    setBusy(false);
    if (error) {
      setNote({ ok: false, text: explain(error.message, c) });
      return;
    }
    setMine(draft);
    refreshSummaries();
    await loadSummary();
    setNote({ ok: true, text: c.thanks });
  }

  const shown = summary && summary.overall !== null;

  return (
    <section ref={sectionRef} id="penilaian" aria-labelledby="rating-title" className={`mt-20 scroll-mt-40 border-t ${border} pt-10 font-ui`}>
      <h2 id="rating-title" className="text-[1.15em] font-semibold">
        {c.title}
      </h2>

      {shown ? (
        <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
          <div>
            <p className="text-[2.8em] font-semibold leading-none tabular-nums">{format(summary.overall!)}</p>
            <Stars value={summary.overall!} label={c.star(Math.round(summary.overall! * 10) / 10)} className="mt-3 text-[1.1em]" />
            <p className="mt-2 text-[0.8em] opacity-60">
              {c.overall} · {c.raters(summary.raters)}
            </p>
          </div>
          <ul className="min-w-[14rem] flex-1 space-y-2.5 text-[0.9em]">
            {KEYS.map((key) => (
              <li key={key} className="flex items-center justify-between gap-4">
                <span>{c.dims[key]}</span>
                <span className="inline-flex items-center gap-2">
                  <Stars value={summary[key]!} label={c.star(Math.round(summary[key]! * 10) / 10)} />
                  <span className="w-8 text-right tabular-nums opacity-70">{format(summary[key]!)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 text-[0.9em] opacity-70">{c.notEnough(summary?.raters ?? 0)}</p>
      )}

      <div className="mt-8">
        {sb && !session && !wantsToRate && (
          <button
            type="button"
            onClick={() => setWantsToRate(true)}
            className={`rounded-sm border ${border} px-4 py-2 text-[0.9em] font-medium transition hover:bg-black/5`}
          >
            {c.rate}
          </button>
        )}
        {sb && !session && wantsToRate && <SignIn sb={sb} border={border} target="penilaian" />}
        {sb && session && isAuthor && <p className="text-[0.9em] opacity-70">{c.authorNote}</p>}
        {sb && session && !isAuthor && (
          <div className={`space-y-4 border ${border} p-4`}>
            <p className="text-[0.85em] font-semibold">{c.yours}</p>
            {KEYS.map((key) => (
              <Picker key={key} label={c.dims[key]} value={draft[key]} onChange={(n) => setDraft((d) => ({ ...d, [key]: n }))} starLabel={c.star} />
            ))}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span role="status" className={`text-[0.85em] ${note && !note.ok ? "text-red-600" : "opacity-70"}`}>
                {note?.text}
              </span>
              <button
                type="button"
                onClick={submit}
                disabled={busy}
                className={`rounded-sm border ${border} px-4 py-1.5 text-[0.85em] font-medium transition hover:bg-black/5 disabled:opacity-40`}
              >
                {busy ? c.saving : mine ? c.update : c.submit}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
