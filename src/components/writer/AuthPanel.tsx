"use client";

import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { rememberCommentReturn, type ReturnTarget } from "@/lib/commentsReturn";
import { useWriterCopy } from "./copy";

/** Sign in with Google or an email link; afterwards the reader lands back on the block they came from. */
export function SignIn({ sb, border, target = "komentar", prompt }: { sb: SupabaseClient; border: string; target?: ReturnTarget; prompt?: string }) {
  const c = useWriterCopy().comments;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const here = () => window.location.href.split("#")[0];

  async function withGoogle() {
    rememberCommentReturn(target);
    await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: here() } });
  }

  async function withEmail(event: React.FormEvent) {
    event.preventDefault();
    if (state === "sending" || !email.includes("@")) return;
    setState("sending");
    rememberCommentReturn(target);
    const { error } = await sb.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: here() } });
    setState(error ? "error" : "sent");
  }

  return (
    <div className={`space-y-4 border ${border} p-4`}>
      <p className="text-[0.9em]">{prompt ?? c.signInPrompt}</p>
      <button
        type="button"
        onClick={withGoogle}
        className={`w-full rounded-sm border ${border} px-4 py-3 text-[0.9em] font-medium transition hover:bg-black/5 sm:py-2`}
      >
        {c.google}
      </button>
      <form onSubmit={withEmail} className="space-y-2">
        <p className="text-[0.75em] uppercase tracking-wide opacity-60">{c.orEmail}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={c.emailPlaceholder}
            aria-label={c.emailPlaceholder}
            autoComplete="email"
            className={`min-w-0 flex-1 rounded-sm border ${border} bg-transparent px-3 py-3 text-[16px] outline-none focus:border-current sm:py-2 sm:text-[0.9em]`}
          />
          <button
            type="submit"
            disabled={state === "sending" || !email.includes("@")}
            className={`w-full rounded-sm border ${border} px-3 py-3 text-[0.85em] font-medium transition hover:bg-black/5 disabled:opacity-40 sm:w-auto sm:shrink-0 sm:py-2`}
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
