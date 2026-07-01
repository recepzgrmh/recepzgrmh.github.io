/* ----------------------------------------------------------------------------
   Lightweight motion layer (no framework): scroll-reveal, pointer tilt,
   scroll parallax for decorative color shapes.
   Re-binds on every View Transitions navigation. Honors reduced-motion + touch.
---------------------------------------------------------------------------- */

let revealObserver: IntersectionObserver | null = null;
let countObserver: IntersectionObserver | null = null;
let parallaxEls: HTMLElement[] = [];
let progressEl: HTMLElement | null = null;
let headerEl: HTMLElement | null = null;
let scrollBound = false;
let ticking = false;

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = () => window.matchMedia("(pointer: coarse)").matches;

function setupReveal() {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (revealObserver) revealObserver.disconnect();
  if (reduced()) {
    els.forEach((el) => el.classList.add("is-in", "is-settled"));
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          el.addEventListener(
            "transitionend",
            () => el.classList.add("is-settled"),
            { once: true },
          );
          revealObserver!.unobserve(e.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
  );
  els.forEach((el) => {
    el.classList.remove("is-in", "is-settled");
    revealObserver!.observe(el);
  });
}

function setupTilt() {
  if (reduced() || coarse()) return;
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
  const MAX = 7;
  els.forEach((el) => {
    if ((el as any)._tiltBound) return;
    (el as any)._tiltBound = true;
    el.addEventListener("pointermove", (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      el.classList.add("is-tilting");
      el.style.setProperty("--tilt-x", `${-py * MAX}deg`);
      el.style.setProperty("--tilt-y", `${px * MAX}deg`);
    });
    el.addEventListener("pointerleave", () => {
      el.classList.remove("is-tilting");
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function setupSpotlights() {
  if (reduced() || coarse()) return;
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-spotlight]"));
  els.forEach((el) => {
    if ((el as any)._spotlightBound) return;
    (el as any)._spotlightBound = true;
    el.addEventListener("pointermove", (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${ev.clientX - r.left}px`);
      el.style.setProperty("--spot-y", `${ev.clientY - r.top}px`);
      el.classList.add("is-pointing");
    });
    el.addEventListener("pointerleave", () => el.classList.remove("is-pointing"));
  });
}

function setupMagnetic() {
  if (reduced() || coarse()) return;
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
  els.forEach((el) => {
    if ((el as any)._magneticBound) return;
    (el as any)._magneticBound = true;
    el.addEventListener("pointermove", (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - (r.left + r.width / 2)) * 0.12;
      const y = (ev.clientY - (r.top + r.height / 2)) * 0.18;
      el.classList.add("is-magnetic");
      el.style.setProperty("--mag-x", `${x.toFixed(1)}px`);
      el.style.setProperty("--mag-y", `${y.toFixed(1)}px`);
    });
    el.addEventListener("pointerleave", () => {
      el.classList.remove("is-magnetic");
      el.style.setProperty("--mag-x", "0px");
      el.style.setProperty("--mag-y", "0px");
    });
  });
}

function numberParts(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, raw, suffix] = match;
  const separator = raw.includes(",") ? "," : raw.includes(".") ? "." : "";
  const after = separator ? raw.split(separator).at(-1)?.length ?? 0 : 0;
  const isGroup = Boolean(separator && after === 3 && !suffix.trimStart().startsWith("/"));
  const decimals = separator && !isGroup ? after : 0;
  const target = Number(isGroup ? raw.replaceAll(separator, "") : raw.replace(separator, "."));
  if (!Number.isFinite(target)) return null;
  return { prefix, suffix, separator, isGroup, decimals, target };
}

function formatCount(value: number, parts: NonNullable<ReturnType<typeof numberParts>>) {
  if (parts.isGroup) {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, parts.separator);
  }
  const fixed = parts.decimals ? value.toFixed(parts.decimals) : Math.round(value).toString();
  return parts.separator === "," ? fixed.replace(".", ",") : fixed;
}

function animateCount(el: HTMLElement) {
  if (el.dataset.counted === "true") return;
  const original = el.textContent?.trim() ?? "";
  const parts = numberParts(original);
  if (!parts) return;
  el.dataset.counted = "true";
  if (reduced()) return;

  const duration = Math.min(1500, 850 + parts.target * 0.035);
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = `${parts.prefix}${formatCount(parts.target * eased, parts)}${parts.suffix}`;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = original;
  };
  requestAnimationFrame(tick);
}

function setupCounters() {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
  if (countObserver) countObserver.disconnect();
  if (reduced()) {
    els.forEach((el) => (el.dataset.counted = "true"));
    return;
  }
  countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target as HTMLElement);
        countObserver?.unobserve(entry.target);
      });
    },
    { threshold: 0.55 },
  );
  els.forEach((el) => {
    delete el.dataset.counted;
    countObserver?.observe(el);
  });
}

function applyScroll() {
  const vh = window.innerHeight;

  // parallax shapes
  for (const el of parallaxEls) {
    const speed = parseFloat(el.dataset.parallax || "0.15");
    const r = el.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const offset = (center - vh / 2) / vh;
    el.style.transform = `translate3d(0, ${(-offset * speed * 100).toFixed(1)}px, 0)`;
  }

  if (progressEl) {
    const max = Math.max(1, document.documentElement.scrollHeight - vh);
    progressEl.style.transform = `scaleX(${Math.min(1, window.scrollY / max)})`;
  }
  headerEl?.classList.toggle("shrink", window.scrollY > 30);

  ticking = false;
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(applyScroll);
}

function setupScroll() {
  parallaxEls = reduced() ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
  progressEl = document.querySelector<HTMLElement>(".scroll-progress");
  headerEl = document.querySelector<HTMLElement>("header");
  if (!scrollBound) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    scrollBound = true;
  }
  applyScroll();
}

function setup() {
  setupReveal();
  setupTilt();
  setupSpotlights();
  setupMagnetic();
  setupCounters();
  setupScroll();
}

document.addEventListener("astro:page-load", setup);
