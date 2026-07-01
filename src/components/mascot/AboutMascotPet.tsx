/* ----------------------------------------------------------------------------
   AboutMascotPet — the /about portrait figure, freed from its box.
   - Lives docked inside the blue portrait card (tracks [data-about-person]).
   - Grab + drag it out: on release it DOESN'T snap back — it pins to the
     viewport where you dropped it, so it travels with you as you scroll.
   - Light gravity + throw momentum; lands on top of the curated cards marked
     [data-mascot-floor] (one-way platforms) and rides them as they scroll past.
   - Does NOT follow the cursor. A little "↩ eve dön" button re-docks it.
   - prefers-reduced-motion: stays docked and static, no physics, no drag.

   No motion/react here — a hand-rolled rAF loop, because we need continuous
   collision resolution against scrolling platforms, which declarative springs
   don't give us. Poses reuse the existing /public/mascot/<pose>.webp art.
---------------------------------------------------------------------------- */
import { useEffect, useRef, useState } from "react";
import type { Pose } from "./mascotLines";

const ASPECT = 0.75; // mascot art is 3:4 (w:h) -> width = height * 0.75
const PET_H = 176; // roaming height in px; docked height comes from the card
const MARGIN = 12;
const BIN_PAD = 8; // rest this far inside a container's bottom border

// physics tuned for a 60fps baseline (values are px per frame @ 60fps)
const GRAVITY = 2.1; // snappy fall — no floaty lag
const H_FRICTION = 0.92; // horizontal air drag per frame
const WALL_BOUNCE = 0.5;
const FAST_SPEED = 16; // -> "surprised" while whipping around
const THROW_SPEED = 24; // release faster than this -> dizzy
const HARD_LAND = 40; // land faster than this -> dizzy
const DIZZY_MS = 1400;

type Mode = "docked" | "dragging" | "free";

export default function AboutMascotPet({ lang = "tr" }: { lang?: "tr" | "en" }) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [pose, setPose] = useState<Pose>("wave");
  const [isFree, setIsFree] = useState(false);
  const [showHint, setShowHint] = useState(!reduce);

  const nodeRef = useRef<HTMLDivElement>(null);

  // ---- mutable physics state (no re-render per frame) ----------------------
  const pos = useRef({ x: 0, y: 0 }); // viewport coords of top-left
  const vel = useRef({ x: 0, y: 0 });
  const curH = useRef(PET_H);
  const mode = useRef<Mode>("docked");
  const grounded = useRef<{ el: Element; kind: "floor" | "bin" } | null>(null);
  const initialized = useRef(false);
  const dizzyUntil = useRef(0);
  const poseRef = useRef<Pose>("wave");

  const personEl = useRef<Element | null>(null);
  const platforms = useRef<Element[]>([]); // sit ON TOP of these
  const bins = useRef<Element[]>([]); // drop INSIDE, rest on the bottom border

  // drag bookkeeping
  const grab = useRef({
    dx: 0,
    dy: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    moved: false,
    wasDocked: true,
  });

  const setPoseSafe = (p: Pose) => {
    if (poseRef.current === p) return;
    poseRef.current = p;
    setPose(p);
  };

  useEffect(() => {
    personEl.current = document.querySelector("[data-about-person]");
    platforms.current = Array.from(document.querySelectorAll("[data-mascot-floor]"));
    bins.current = Array.from(document.querySelectorAll("[data-mascot-bin]"));

    const homeRect = () => personEl.current?.getBoundingClientRect() ?? null;

    // ---- seed position from the card (once it's laid out) -------------------
    const seed = () => {
      const h = homeRect();
      if (!h || h.width === 0) return false;
      pos.current.x = h.left;
      pos.current.y = h.top;
      curH.current = h.height;
      initialized.current = true;
      return true;
    };

    // ---- pointer drag / throw ----------------------------------------------
    const clampV = (v: number) => Math.max(-60, Math.min(60, v));

    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      e.preventDefault();
      grab.current.wasDocked = mode.current === "docked";
      mode.current = "dragging";
      grounded.current = null;
      const W = curH.current * ASPECT;
      grab.current.dx = e.clientX - pos.current.x;
      grab.current.dy = e.clientY - pos.current.y;
      // keep the grab handle sane if we shrink from docked size mid-drag
      if (grab.current.dx > W) grab.current.dx = W / 2;
      grab.current.lastX = e.clientX;
      grab.current.lastY = e.clientY;
      grab.current.lastT = performance.now();
      grab.current.moved = false;
      vel.current.x = 0;
      vel.current.y = 0;
      setPoseSafe("surprised");
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max((now - grab.current.lastT) / 16.667, 0.5);
      const nx = e.clientX - grab.current.dx;
      const ny = e.clientY - grab.current.dy;
      if (Math.hypot(e.clientX - grab.current.lastX, e.clientY - grab.current.lastY) > 6)
        grab.current.moved = true;
      vel.current.x = clampV((e.clientX - grab.current.lastX) / dt);
      vel.current.y = clampV((e.clientY - grab.current.lastY) / dt);
      pos.current.x = nx;
      pos.current.y = ny;
      grab.current.lastX = e.clientX;
      grab.current.lastY = e.clientY;
      grab.current.lastT = now;
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (grab.current.wasDocked && !grab.current.moved) {
        // a tap while docked = a poke, not an escape
        mode.current = "docked";
        setPoseSafe("wave");
        return;
      }
      mode.current = "free";
      setIsFree(true);
      setShowHint(false);
      const speed = Math.hypot(vel.current.x, vel.current.y);
      if (speed > THROW_SPEED) dizzyUntil.current = performance.now() + DIZZY_MS;
    };

    const node = nodeRef.current;
    node?.addEventListener("pointerdown", onDown);

    // ---- the loop -----------------------------------------------------------
    let raf = 0;
    let last = performance.now();

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(Math.max((t - last) / 16.667, 0.5), 2);
      last = t;

      if (!initialized.current && !seed()) return; // wait for card layout

      const H = curH.current;
      const W = H * ASPECT;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (mode.current === "docked") {
        const h = homeRect();
        if (h && h.width) {
          const near = Math.hypot(h.left - pos.current.x, h.top - pos.current.y) < 40;
          const k = near ? 1 : 0.25; // snap when settled, ease while returning
          pos.current.x += (h.left - pos.current.x) * k;
          pos.current.y += (h.top - pos.current.y) * k;
          curH.current += (h.height - curH.current) * (near ? 1 : 0.25);
        }
      } else if (mode.current === "dragging") {
        curH.current += (PET_H - curH.current) * 0.2; // shrink to pet size
      } else {
        // ---- free physics ----
        curH.current += (PET_H - curH.current) * 0.2;

        // a landing surface's y = where the mascot's FEET rest:
        //   floor card -> its top edge (perch on top)
        //   bin box    -> its inner bottom border (sit inside)
        const surfTop = (r: DOMRect, kind: "floor" | "bin") =>
          kind === "bin" ? r.bottom - BIN_PAD : r.top;

        const g = grounded.current;
        const gr = g ? g.el.getBoundingClientRect() : null;
        const cx = pos.current.x + W / 2;
        const gTop = gr && g ? surfTop(gr, g.kind) : 0;
        const onRide =
          !!gr &&
          !!g &&
          gr.width > 0 &&
          cx > gr.left + 8 &&
          cx < gr.right - 8 &&
          gTop < vh &&
          gTop > -H;

        if (onRide && gr && g) {
          // glued to the surface: ride it, slide sideways with friction
          pos.current.y = gTop - H;
          vel.current.y = 0;
          vel.current.x *= Math.pow(H_FRICTION, dt);
          pos.current.x += vel.current.x * dt;
          if (g.kind === "bin") {
            // keep it inside the box walls
            if (pos.current.x < gr.left + BIN_PAD) {
              pos.current.x = gr.left + BIN_PAD;
              vel.current.x = Math.abs(vel.current.x) * WALL_BOUNCE;
            } else if (pos.current.x > gr.right - W - BIN_PAD) {
              pos.current.x = gr.right - W - BIN_PAD;
              vel.current.x = -Math.abs(vel.current.x) * WALL_BOUNCE;
            }
          }
        } else {
          grounded.current = null;
          vel.current.y += GRAVITY * dt;
          vel.current.x *= Math.pow(H_FRICTION, dt);
          pos.current.x += vel.current.x * dt;
          pos.current.y += vel.current.y * dt;

          // highest surface we're crossing from above wins
          const stick = Math.max(28, vel.current.y * dt + 12);
          const ncx = pos.current.x + W / 2;
          const bottom = pos.current.y + H;
          let bestTop = vh - MARGIN; // virtual floor
          let bestEl: Element | null = null;
          let bestKind: "floor" | "bin" = "floor";

          const consider = (top: number, el: Element, kind: "floor" | "bin") => {
            if (top > vh || top < -H) return;
            if (bottom >= top && bottom <= top + stick && top < bestTop) {
              bestTop = top;
              bestEl = el;
              bestKind = kind;
            }
          };

          for (const p of platforms.current) {
            const r = p.getBoundingClientRect();
            if (r.width === 0 || ncx < r.left + 8 || ncx > r.right - 8) continue;
            consider(r.top, p, "floor");
          }
          for (const p of bins.current) {
            const r = p.getBoundingClientRect();
            if (r.width === 0 || ncx < r.left + 8 || ncx > r.right - 8) continue;
            consider(r.bottom - BIN_PAD, p, "bin");
          }

          if (vel.current.y >= 0 && bottom >= bestTop && bottom <= bestTop + stick) {
            pos.current.y = bestTop - H;
            if (vel.current.y > HARD_LAND) dizzyUntil.current = t + DIZZY_MS;
            vel.current.y = 0;
            grounded.current = bestEl ? { el: bestEl, kind: bestKind } : null;
          }
        }

        // viewport side walls
        if (pos.current.x < MARGIN) {
          pos.current.x = MARGIN;
          vel.current.x = Math.abs(vel.current.x) * WALL_BOUNCE;
        } else if (pos.current.x > vw - W - MARGIN) {
          pos.current.x = vw - W - MARGIN;
          vel.current.x = -Math.abs(vel.current.x) * WALL_BOUNCE;
        }
        // hard floor backstop
        if (pos.current.y > vh - H - MARGIN) {
          pos.current.y = vh - H - MARGIN;
          if (vel.current.y > HARD_LAND) dizzyUntil.current = t + DIZZY_MS;
          vel.current.y = 0;
        }
      }

      // ---- pose selection ----
      if (mode.current === "dragging") setPoseSafe("surprised");
      else if (t < dizzyUntil.current) setPoseSafe("dizzy");
      else if (mode.current === "free" && Math.hypot(vel.current.x, vel.current.y) > FAST_SPEED)
        setPoseSafe("surprised");
      else setPoseSafe(Math.floor(t / 3200) % 2 === 0 ? "wave" : "idle");

      // ---- commit to DOM ----
      if (node) {
        node.style.width = `${W}px`;
        node.style.height = `${H}px`;
        node.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      node?.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [reduce]);

  const dock = () => {
    mode.current = "docked";
    grounded.current = null;
    vel.current.x = 0;
    vel.current.y = 0;
    setIsFree(false);
    setPoseSafe("wave");
  };

  const hint = lang === "tr" ? "beni sürükle →" : "drag me →";
  const back = lang === "tr" ? "eve dön" : "go home";

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]" aria-hidden="true">
      <div
        ref={nodeRef}
        className="pointer-events-auto absolute left-0 top-0 touch-none select-none"
        style={{
          width: PET_H * ASPECT,
          height: PET_H,
          cursor: reduce ? "default" : "grab",
          filter: "drop-shadow(0 20px 24px rgba(0,0,0,0.24))",
          willChange: "transform",
        }}
      >
        {showHint && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-night px-2.5 py-1 text-[0.68rem] font-bold text-white shadow-md">
            {hint}
          </span>
        )}

        {isFree && (
          <button
            type="button"
            onClick={dock}
            onPointerDown={(e) => e.stopPropagation()}
            className="pointer-events-auto absolute -right-2 -top-2 z-10 grid h-6 w-6 place-items-center rounded-full border border-border bg-surface text-[11px] text-fg-2 shadow-sm transition hover:border-amber/60 hover:text-amber"
            aria-label={back}
            title={back}
          >
            ↩
          </button>
        )}

        <img
          src={`/mascot/${pose}.webp`}
          alt=""
          draggable={false}
          className="pointer-events-none h-full w-full select-none object-contain"
        />
      </div>
    </div>
  );
}
