/* ----------------------------------------------------------------------------
   MascotIsland — the living "Recep layer", persisted across page navigations.
   - reacts to [data-mascot="key"] elements on hover/click (scripted lines)
   - comments on each page change (reads <body data-page>), never repeats a page
   - draggable + throwable with momentum; thrown fast -> dizzy -> recovers
   - max ONE first reaction per element; respects reduced-motion; mute persists
   No LLM here — the fast, free, never-wrong layer.
---------------------------------------------------------------------------- */
import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import type { Lang } from "../../i18n/content";
import { CONTENT } from "../../i18n/content";
import MascotVisual from "./MascotVisual";
import MascotChat from "./MascotChat";
import { getLineBook, pick, type Line, type Pose } from "./mascotLines";

const MUTE_KEY = "recep-mascot-muted";
const BUBBLE_MS = 3600;
const HOVER_DWELL_MS = 130;
const THROW_VELOCITY = 900;
const FAST_DRAG_VELOCITY = 1300;

export default function MascotIsland({ lang: initialLang }: { lang: Lang }) {
  const reduce = useReducedMotion();

  const [pose, setPose] = useState<Pose>("idle");
  const [bubble, setBubble] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [uiLang, setUiLang] = useState<Lang>(initialLang);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // cursor lean: -1 (left) .. 1 (right) -> gentle shift + tilt toward pointer
  const leanRaw = useMotionValue(0);
  const lean = useSpring(leanRaw, { stiffness: 120, damping: 18 });
  const leanX = useTransform(lean, [-1, 1], [-10, 10]);
  const leanRot = useTransform(lean, [-1, 1], [-4, 4]);

  const lastActivity = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleTimer = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);
  const dwellTimer = useRef<number | null>(null);
  const seen = useRef<Set<string>>(new Set());
  const lastHoverKey = useRef<string | null>(null);
  const lastPage = useRef<string | null>(null);
  const mode = useRef<"idle" | "drag" | "thrown">("idle");
  const fastSaidAt = useRef(0);
  const mutedRef = useRef(false);
  const langRef = useRef<Lang>(initialLang);
  const seed = useRef(7);

  const nextSeed = () => (seed.current = (seed.current * 1103515245 + 12345) & 0x7fffffff);
  const book = () => getLineBook(langRef.current);

  // ---- core: say a line -----------------------------------------------------
  const say = useCallback((line: Line | null, opts?: { sticky?: boolean }) => {
    if (bubbleTimer.current) window.clearTimeout(bubbleTimer.current);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    if (!line) {
      setBubble(null);
      if (mode.current === "idle") setPose("idle");
      return;
    }
    if (mutedRef.current) {
      if (line.pose) setPose(line.pose);
      return;
    }
    setBubble(line.text);
    if (line.pose) setPose(line.pose);
    lastActivity.current = performance.now();
    if (!opts?.sticky) {
      bubbleTimer.current = window.setTimeout(() => {
        setBubble(null);
        if (mode.current === "idle") setPose("idle");
      }, BUBBLE_MS);
    }
  }, []);

  // ---- page-change comment --------------------------------------------------
  const commentOnPage = useCallback(() => {
    const domLang = (document.documentElement.lang as Lang) || initialLang;
    langRef.current = domLang === "tr" ? "tr" : "en";
    setUiLang(langRef.current);
    const key = document.body.dataset.page || "home";
    if (key === lastPage.current) return;
    lastPage.current = key;
    if (mode.current !== "idle") return;
    const b = book();
    const line = b.page[key] ?? (key.startsWith("project:") ? b.page["work"] : null);
    if (line) say(line);
  }, [initialLang, say]);

  // ---- init -----------------------------------------------------------------
  useEffect(() => {
    setMounted(true);
    let m = false;
    try {
      m = localStorage.getItem(MUTE_KEY) === "1";
    } catch {}
    mutedRef.current = m;
    setMuted(m);

    const t = window.setTimeout(commentOnPage, 900);
    document.addEventListener("astro:page-load", commentOnPage);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("astro:page-load", commentOnPage);
    };
  }, [commentOnPage]);

  // ---- hide corner mascot while a composed hero scene is on screen ----------
  useEffect(() => {
    const evalHidden = () => {
      const page = document.body.dataset.page;
      const hasPersistentPortrait = page === "about" || page === "chat";
      setHidden(hasPersistentPortrait);
    };
    evalHidden();
    window.addEventListener("scroll", evalHidden, { passive: true });
    document.addEventListener("astro:page-load", evalHidden);
    return () => {
      window.removeEventListener("scroll", evalHidden);
      document.removeEventListener("astro:page-load", evalHidden);
    };
  }, []);

  // ---- listen to the page (delegated; survives navigation) ------------------
  useEffect(() => {
    function resolve(target: EventTarget | null) {
      if (!(target instanceof Element)) return null;
      const el = target.closest("[data-mascot]");
      if (!el) return null;
      const key = el.getAttribute("data-mascot") || "";
      return key ? key : null;
    }

    function onOver(e: PointerEvent) {
      if (mode.current !== "idle") return;
      const key = resolve(e.target);
      if (dwellTimer.current) window.clearTimeout(dwellTimer.current);
      if (!key) {
        lastHoverKey.current = null;
        return;
      }
      if (key === lastHoverKey.current) return;
      lastHoverKey.current = key;
      dwellTimer.current = window.setTimeout(() => {
        if (mode.current !== "idle") return;
        const sk = `hover:${key}`;
        const line = book().hover[key];
        if (!line) return;
        if (seen.current.has(sk)) {
          if (nextSeed() % 4 === 0) say(pick(book().repeat, nextSeed()));
          return;
        }
        seen.current.add(sk);
        say(line);
      }, HOVER_DWELL_MS);
    }

    function onClick(e: MouseEvent) {
      if (mode.current !== "idle") return;
      const key = resolve(e.target);
      if (!key) return;
      const line = book().click[key];
      if (line) say(line);
    }

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("click", onClick, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick);
    };
  }, [say]);

  // ---- scroll section cues (from scroll.ts) --------------------------------
  useEffect(() => {
    let lastKey = "";
    let lastAt = 0;
    const onSection = (e: Event) => {
      const key = (e as CustomEvent).detail as string;
      if (mode.current !== "idle" || mutedRef.current) return;
      const now = performance.now();
      if (key === lastKey || now - lastAt < 5000) return;
      lastKey = key;
      lastAt = now;
      const b = book();
      const line = b.hover[key] ?? b.page[key];
      if (line) say(line);
    };
    window.addEventListener("recep:section", onSection);
    return () => window.removeEventListener("recep:section", onSection);
  }, [say]);

  // ---- react when the home-page color field takes over ---------------------
  useEffect(() => {
    const onPaintBurst = () => {
      if (mode.current !== "idle") return;
      const line = book().hover.paint;
      if (line) say(line);
    };
    window.addEventListener("recep:paint-burst", onPaintBurst);
    return () => window.removeEventListener("recep:paint-burst", onPaintBurst);
  }, [say]);

  // ---- pinned academic timeline comments ----------------------------------
  useEffect(() => {
    const onAcademicStep = (event: Event) => {
      if (mode.current !== "idle") return;
      const detail = (event as CustomEvent<{
        text?: string;
        pose?: Pose;
      }>).detail;
      if (!detail?.text) return;
      say({ text: detail.text, pose: detail.pose ?? "talk" });
    };
    window.addEventListener("recep:academic-step", onAcademicStep);
    return () => window.removeEventListener("recep:academic-step", onAcademicStep);
  }, [say]);

  // ---- cursor lean: tilt toward the pointer (idle only) ---------------------
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (mode.current !== "idle") {
        leanRaw.set(0);
        return;
      }
      const n = (e.clientX / window.innerWidth) * 2 - 1;
      leanRaw.set(Math.max(-1, Math.min(1, n)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, leanRaw]);

  // ---- self-talk after a stretch of inactivity ------------------------------
  useEffect(() => {
    lastActivity.current = performance.now();
    const id = window.setInterval(() => {
      if (mode.current !== "idle" || mutedRef.current || bubble) return;
      if (performance.now() - lastActivity.current < 35000) return;
      say(pick(book().idle, nextSeed()));
    }, 8000);
    return () => window.clearInterval(id);
  }, [say, bubble]);

  // ---- fast scroll -> "easy there" ------------------------------------------
  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    let saidAt = 0;
    const onScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const v = dy / Math.max(now - lastT, 1); // px per ms
      lastY = window.scrollY;
      lastT = now;
      lastActivity.current = now;
      if (mode.current !== "idle" || mutedRef.current) return;
      if (v > 2.8 && now - saidAt > 6000) {
        saidAt = now;
        say(pick(book().scrollFast, nextSeed()));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [say]);

  // ---- return to tab -> time-of-day greeting --------------------------------
  useEffect(() => {
    let leftAt = 0;
    const onVis = () => {
      if (document.hidden) {
        leftAt = performance.now();
        return;
      }
      if (mode.current !== "idle" || mutedRef.current) return;
      if (performance.now() - leftAt < 20000) return; // only after a real break
      const h = new Date().getHours();
      const bucket =
        h < 6 ? "night" : h < 12 ? "morning" : h < 18 ? "afternoon" : h < 22 ? "evening" : "night";
      say(book().timeGreet[bucket]);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [say]);

  // ---- poke the mascot ------------------------------------------------------
  const onPoke = () => {
    if (mode.current !== "idle") return;
    lastActivity.current = performance.now();
    say(pick(book().poke, nextSeed()));
  };

  // ---- drag / throw ---------------------------------------------------------
  const onDragStart = () => {
    mode.current = "drag";
    lastHoverKey.current = null;
    say(pick(book().drag.start, nextSeed()), { sticky: true });
  };
  const onDrag = (_: unknown, info: PanInfo) => {
    const v = Math.hypot(info.velocity.x, info.velocity.y);
    const now = performance.now();
    if (v > FAST_DRAG_VELOCITY && now - fastSaidAt.current > 1200) {
      fastSaidAt.current = now;
      say(pick(book().drag.fast, nextSeed()), { sticky: true });
    }
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const v = Math.hypot(info.velocity.x, info.velocity.y);
    if (v > THROW_VELOCITY && !reduce) {
      mode.current = "thrown";
      say(pick(book().thrown, nextSeed()), { sticky: true });
      window.setTimeout(() => {
        mode.current = "idle";
        say(pick(book().recover, nextSeed()));
      }, 1900);
    } else {
      mode.current = "idle";
      window.setTimeout(() => {
        if (mode.current === "idle") setPose("idle");
      }, 600);
    }
  };

  // ---- mute -----------------------------------------------------------------
  const toggleMute = () => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    try {
      localStorage.setItem(MUTE_KEY, next ? "1" : "0");
    } catch {}
    if (next) say(null);
  };

  if (!mounted) return null;

  const breathing = !reduce && mode.current === "idle" ? { y: [0, -5, 0] } : undefined;
  const small =
    typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[60] pointer-events-none">
      <motion.div
        drag={!reduce}
        dragConstraints={containerRef}
        dragElastic={0.12}
        dragMomentum={!reduce}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ x, y, pointerEvents: hidden ? "none" : "auto" }}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ cursor: "grabbing", scale: 0.97 }}
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 select-none"
      >
        <AnimatePresence>
          {bubble && (
            <motion.div
              key={bubble}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[112%] right-0 w-max max-w-[15rem] rounded-2xl rounded-br-md bg-night px-3.5 py-2.5 text-[0.82rem] font-medium leading-snug text-white shadow-[0_12px_30px_-8px_rgba(17,17,20,0.45)]"
              role="status"
              aria-live="polite"
            >
              {bubble}
              <span className="absolute -bottom-[5px] right-5 h-3 w-3 rotate-45 bg-night" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={breathing}
          transition={breathing ? { duration: 4.2, repeat: Infinity, ease: "easeInOut" } : undefined}
          onTap={onPoke}
          className="cursor-grab active:cursor-grabbing"
          style={{
            x: leanX,
            rotate: leanRot,
            transformOrigin: "50% 100%",
            filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.45))",
          }}
        >
          <MascotVisual pose={pose} size={small ? 170 : 240} />
        </motion.div>

        <button
          type="button"
          onClick={() => setChatOpen(true)}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={CONTENT[uiLang].chat.launcher}
          title={CONTENT[uiLang].chat.launcher}
          className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-surface text-[11px] shadow-sm transition hover:border-amber/60"
        >
          💬
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-pressed={muted}
          aria-label={muted ? "Sesi aç" : "Sustur"}
          title={muted ? "Unmute" : "Mute"}
          className="absolute -top-1 -left-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-surface text-[11px] text-fg-2 shadow-sm transition hover:text-amber hover:border-amber/60"
        >
          {muted ? "🔈" : "🔊"}
        </button>
      </motion.div>

      <MascotChat
        variant="panel"
        lang={uiLang}
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
}
