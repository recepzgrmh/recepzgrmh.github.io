/* ----------------------------------------------------------------------------
   MascotChat — the "talk to Recep" surface. Shared by two hosts:
   - variant="panel": a slide-up sheet opened from the mascot's 💬 button
   - variant="page":  the full-screen /chat page, where the mascot is BIG

   The mascot is the star here: a large, pose-reactive figure that thinks while
   waiting, talks while replying, waves when idle. Poses map to /mascot/<pose>.webp
   (drop in new art anytime — see POSE below). Streams from chatClient.ts (LIVE/DEMO),
   persists in localStorage, respects reduced-motion, and never fights the mascot's
   drag gestures (this is its own surface, opened by a dedicated button/link).
---------------------------------------------------------------------------- */
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Lang } from "../../i18n/content";
import { CONTENT } from "../../i18n/content";
import { streamReply, isLive, type ChatMsg } from "./chatClient";

interface Props {
  lang: Lang;
  variant?: "panel" | "page";
  open?: boolean;
  onClose?: () => void;
}

type Msg = { role: "user" | "assistant"; content: string };
type ChatState = "idle" | "empty" | "thinking" | "typing" | "error";

const key = (lang: Lang) => `recep-chat-${lang}`;

// chat state -> pose art. Swap/extend freely as new visuals land.
const POSE: Record<ChatState, string> = {
  empty: "wave",
  idle: "idle",
  thinking: "think",
  typing: "talk",
  error: "serious",
};

export default function MascotChat({ lang, variant = "panel", open = false, onClose }: Props) {
  const reduce = useReducedMotion();
  const c = CONTENT[lang].chat;

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<Msg[]>([]);
  const streamingRef = useRef(false);

  messagesRef.current = messages;
  streamingRef.current = streaming;

  // ---- load / persist -------------------------------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key(lang));
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(key(lang), JSON.stringify(messages));
    } catch {}
  }, [messages, lang]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, open]);

  useEffect(() => {
    if (open && variant === "panel") taRef.current?.focus();
  }, [open, variant]);

  // ---- send -----------------------------------------------------------------
  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || streamingRef.current) return;

      const convo: Msg[] = [...messagesRef.current, { role: "user", content }];
      setMessages([...convo, { role: "assistant", content: "" }]);
      setInput("");
      setError(null);
      setStreaming(true);
      if (taRef.current) taRef.current.style.height = "auto";

      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        for await (const delta of streamReply(convo as ChatMsg[], lang, ctrl.signal)) {
          setMessages((prev) => {
            const next = prev.slice();
            const last = next[next.length - 1];
            if (last && last.role === "assistant")
              next[next.length - 1] = { ...last, content: last.content + delta };
            return next;
          });
        }
      } catch {
        if (!ctrl.signal.aborted) setError(c.error);
      } finally {
        setStreaming(false);
        abortRef.current = null;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return last && last.role === "assistant" && last.content === ""
            ? prev.slice(0, -1)
            : prev;
        });
      }
    },
    [lang, c.error],
  );

  const stop = () => abortRef.current?.abort();
  const clear = () => {
    stop();
    setMessages([]);
    setError(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const grow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  };

  // ---- derive mascot state --------------------------------------------------
  const waiting =
    streaming &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "assistant" &&
    messages[messages.length - 1].content === "";

  const state: ChatState = error
    ? "error"
    : waiting
      ? "thinking"
      : streaming
        ? "typing"
        : messages.length === 0
          ? "empty"
          : "idle";

  const statusText =
    state === "thinking" ? c.status.thinking : state === "typing" ? c.status.typing : c.status.ready;

  // ---- shared pieces --------------------------------------------------------
  const clearBtn = messages.length > 0 && (
    <button
      type="button"
      onClick={clear}
      className="grid h-7 w-7 place-items-center rounded-full text-fg-2 transition hover:bg-border/60 hover:text-fg"
      aria-label={c.clear}
      title={c.clear}
    >
      ↺
    </button>
  );

  const messagesEl = (
    <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
      {messages.length === 0 ? (
        <div className="flex h-full flex-col items-start justify-end gap-3">
          <p className="text-sm text-fg-2">{c.empty}</p>
          <div className="flex flex-wrap gap-2">
            {c.starters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-pill border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-fg-2 transition hover:border-amber/60 hover:text-fg"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        messages.map((m, i) =>
          m.role === "user" ? (
            <div
              key={i}
              className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-fg px-3.5 py-2.5 text-sm font-medium leading-snug text-page"
            >
              <span className="whitespace-pre-wrap">{m.content}</span>
            </div>
          ) : (
            <div
              key={i}
              className="mr-auto max-w-[86%] rounded-2xl rounded-bl-md bg-night px-3.5 py-2.5 text-sm leading-snug text-white"
            >
              {waiting && i === messages.length - 1 ? (
                <span className="flex gap-1 py-0.5" aria-label="…">
                  <Dot reduce={!!reduce} d={0} />
                  <Dot reduce={!!reduce} d={0.15} />
                  <Dot reduce={!!reduce} d={0.3} />
                </span>
              ) : (
                <span className="whitespace-pre-wrap">{m.content}</span>
              )}
            </div>
          ),
        )
      )}
      {error && <p className="text-center text-xs font-medium text-coral">{error}</p>}
    </div>
  );

  const inputEl = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send(input);
      }}
      className="border-t border-border p-3"
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={taRef}
          rows={1}
          value={input}
          onChange={grow}
          onKeyDown={onKeyDown}
          placeholder={c.placeholder}
          className="max-h-28 flex-1 resize-none rounded-2xl border border-border bg-page px-3.5 py-2.5 text-sm text-fg outline-none transition placeholder:text-muted focus:border-fg/30"
        />
        {streaming ? (
          <button
            type="button"
            onClick={stop}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-night text-white transition hover:opacity-90"
            aria-label={c.stop}
            title={c.stop}
          >
            ■
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-fg text-page transition hover:bg-amber hover:text-fg disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={c.send}
            title={c.send}
          >
            ↑
          </button>
        )}
      </div>
      <p className="mt-2 text-center text-[0.62rem] leading-tight text-muted">
        {c.disclaimer}
        {!isLive && <> · {c.demoNote}</>}
      </p>
    </form>
  );

  // ---- PAGE: big mascot beside a tall chat column ---------------------------
  if (variant === "page") {
    return (
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-4 lg:flex-row lg:gap-6">
        <aside className="relative flex shrink-0 items-center gap-4 overflow-hidden rounded-3xl border border-border bg-blue/5 p-4 lg:w-[300px] lg:flex-col lg:justify-end lg:p-8">
          <div
            aria-hidden="true"
            className="shape pointer-events-none absolute -right-10 -top-10 h-36 w-36 bg-amber/25"
          />
          <MascotFigure
            pose={POSE[state]}
            reduce={!!reduce}
            className="relative h-24 w-auto shrink-0 lg:h-auto lg:w-full lg:max-w-[240px]"
          />
          <div className="relative min-w-0 lg:mt-5 lg:text-center">
            <p className="text-base font-bold text-fg">{c.name}</p>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted">{c.tag}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-fg-2 lg:justify-center">
              <span className={`h-1.5 w-1.5 rounded-full ${streaming ? "bg-amber" : "bg-lime"}`} />
              {statusText}
            </p>
          </div>
        </aside>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_70px_-40px_rgba(17,17,20,0.4)]">
          {clearBtn && <div className="flex justify-end border-b border-border px-3 py-2">{clearBtn}</div>}
          {messagesEl}
          {inputEl}
        </div>
      </div>
    );
  }

  // ---- PANEL: pose-reactive mascot in the header ----------------------------
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="chat-panel"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto fixed bottom-4 right-4 z-[70] flex h-[min(74vh,580px)] w-[min(92vw,384px)] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_60px_-20px_rgba(17,17,20,0.45)] max-[420px]:inset-x-3 max-[420px]:w-auto"
          role="dialog"
          aria-label={c.title}
        >
          <header className="flex items-center gap-3 border-b border-border bg-soft/60 px-4 py-2.5">
            <MascotFigure pose={POSE[state]} reduce={!!reduce} className="h-[68px] w-auto shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-none text-fg">{c.name}</p>
              <p className="mt-1 flex items-center gap-1.5 truncate font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                <span className={`h-1.5 w-1.5 rounded-full ${streaming ? "bg-amber" : "bg-lime"}`} />
                {streaming ? statusText : c.tag}
              </p>
            </div>
            {clearBtn}
            <button
              type="button"
              onClick={onClose}
              className="grid h-7 w-7 place-items-center rounded-full text-fg-2 transition hover:bg-border/60 hover:text-fg"
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
          </header>
          {messagesEl}
          {inputEl}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* pose-reactive figure with a gentle idle breathe */
function MascotFigure({
  pose,
  reduce,
  className = "",
}: {
  pose: string;
  reduce: boolean;
  className?: string;
}) {
  return (
    <motion.img
      src={`/mascot/${pose}.webp`}
      alt=""
      draggable={false}
      className={`select-none object-contain ${className}`}
      style={{ filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.18))" }}
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Dot({ reduce, d }: { reduce: boolean; d: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-white/70"
      animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={reduce ? undefined : { duration: 0.9, repeat: Infinity, delay: d, ease: "easeInOut" }}
    />
  );
}
