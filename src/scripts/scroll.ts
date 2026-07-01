/* ----------------------------------------------------------------------------
   Scroll choreography: Lenis smooth scroll + GSAP ScrollTrigger.
   Pinned circle-wipe, scrubbed reveals, header shrink, mascot scroll cues.
   Fully torn down on View Transitions navigation; disabled for reduced-motion.
---------------------------------------------------------------------------- */
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function raf(time: number) {
  lenis?.raf(time * 1000);
}

function teardown() {
  if (ctx) {
    ctx.revert();
    ctx = null;
  }
  document.querySelectorAll<HTMLElement>("[data-academic-story]").forEach((story) => {
    story.classList.remove("is-enhanced");
    const dots = Array.from(story.querySelectorAll<HTMLElement>("[data-story-dot]"));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === 0));
  });
  document.querySelectorAll<HTMLElement>("[data-shots]").forEach((shots) => {
    shots.classList.remove("is-shots-enhanced");
    shots
      .querySelectorAll<HTMLElement>("[data-shots-dot]")
      .forEach((dot, i) => dot.classList.toggle("is-on", i === 0));
  });
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.ticker.remove(raf);
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

function emitSection(key: string) {
  window.dispatchEvent(new CustomEvent("recep:section", { detail: key }));
}

function build() {
  // ---- about: portrait layers separate gently as the hero leaves ------------
  const aboutHero = document.querySelector<HTMLElement>("[data-about-hero]");
  const aboutPortrait = aboutHero?.querySelector<HTMLElement>("[data-about-portrait]");
  const aboutPerson = aboutHero?.querySelector<HTMLElement>("[data-about-person]");
  const aboutNote = aboutHero?.querySelector<HTMLElement>("[data-about-note]");

  if (aboutHero && aboutPortrait && aboutPerson && aboutNote) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: aboutHero,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
        },
      })
      .to(aboutPortrait, { rotateY: -5, rotateX: 2, ease: "none" }, 0)
      .to(aboutPerson, { y: 28, scale: 1.035, ease: "none" }, 0)
      .to(aboutNote, { y: -18, ease: "none" }, 0);
  }

  // ---- work detail: pinned browser-shot deck (cross-fade through shots) ----
  const shots = document.querySelector<HTMLElement>("[data-shots]");
  const shotsPin = shots?.querySelector<HTMLElement>("[data-shots-pin]");
  const shotFrames = shots
    ? Array.from(shots.querySelectorAll<HTMLElement>("[data-shots-frame]"))
    : [];
  const shotDots = shots
    ? Array.from(shots.querySelectorAll<HTMLElement>("[data-shots-dot]"))
    : [];
  const shotProgress = shots?.querySelector<HTMLElement>("[data-shots-progress]");

  // pin only on wider screens; phones keep the tidy stacked feature list
  if (shots && shotsPin && shotProgress && shotFrames.length > 1 && window.innerWidth >= 768) {
    shots.classList.add("is-shots-enhanced");
    gsap.set(shotFrames, { autoAlpha: 0 });
    gsap.set(shotFrames[0], { autoAlpha: 1 });
    gsap.set(shotProgress, { scaleX: 0, transformOrigin: "left center" });
    shotDots.forEach((dot, i) => dot.classList.toggle("is-on", i === 0));

    const lastShot = shotFrames.length - 1;
    const shotsTl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: shots,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 0.72 * lastShot, 1600)}`,
        pin: shotsPin,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const active = Math.round(self.progress * lastShot);
          shotDots.forEach((dot, i) => dot.classList.toggle("is-on", i <= active));
        },
      },
    });

    for (let i = 0; i < lastShot; i += 1) {
      shotsTl
        .to(shotFrames[i], { autoAlpha: 0, duration: 0.5 }, i + 0.5)
        .fromTo(
          shotFrames[i + 1],
          { autoAlpha: 0, scale: 1.03 },
          { autoAlpha: 1, scale: 1, duration: 0.55 },
          i + 0.5,
        )
        .to(shotProgress, { scaleX: (i + 1) / lastShot, duration: 0.9, ease: "none" }, i + 0.1);
    }
  }

  // ---- capabilities: scroll-driven orbit + evidence-backed depth meters ----
  const skillsHero = document.querySelector<HTMLElement>("[data-skills-hero]");
  const skillsOrbit = skillsHero?.querySelector<HTMLElement>("[data-skills-orbit-ring]");
  const orbitChips = skillsHero
    ? Array.from(skillsHero.querySelectorAll<HTMLElement>("[data-orbit-chip]"))
    : [];

  if (skillsHero && skillsOrbit) {
    gsap.to(skillsOrbit, {
      rotate: 28,
      ease: "none",
      scrollTrigger: {
        trigger: skillsHero,
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    });

    orbitChips.forEach((chip, index) => {
      gsap.to(chip, {
        rotate: -28,
        y: index % 2 === 0 ? -12 : 12,
        ease: "none",
        scrollTrigger: {
          trigger: skillsHero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    });
  }

  const skillsDepth = document.querySelector<HTMLElement>("[data-skills-depth]");
  const skillsProgress = skillsDepth?.querySelector<HTMLElement>("[data-skills-progress]");
  const skillRows = skillsDepth
    ? Array.from(skillsDepth.querySelectorAll<HTMLElement>("[data-skill-row]"))
    : [];

  if (skillsDepth && skillsProgress) {
    gsap.fromTo(
      skillsProgress,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: skillsDepth,
          start: "top 65%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      },
    );
  }

  skillRows.forEach((row) => {
    const fills = row.querySelectorAll<HTMLElement>("[data-skill-fill]");
    const proof = row.querySelector<HTMLElement>("[data-skill-proof]");
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: "top 88%",
        end: "top 52%",
        scrub: 0.55,
      },
    });

    timeline
      .fromTo(
        row,
        { autoAlpha: 0.35, y: 36 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out" },
        0,
      )
      .fromTo(
        fills,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, stagger: 0.09, ease: "power2.out" },
        0.08,
      );

    if (proof) {
      timeline.fromTo(
        proof,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
        0.42,
      );
    }
  });

  // ---- paint-blob: pinned circle wipe -------------------------------------
  const zone = document.querySelector<HTMLElement>("[data-paint]");
  if (zone) {
    const blob = zone.querySelector<HTMLElement>(".paint-blob");
    const stick = zone.querySelector<HTMLElement>(".paint-stick");
    const content = zone.querySelector<HTMLElement>(".paint-content");
    const arrow = zone.querySelector<HTMLElement>("[data-paint-arrow]");
    const copy = zone.querySelectorAll<HTMLElement>("[data-paint-copy]");
    const steps = zone.querySelectorAll<HTMLElement>("[data-paint-step]");
    const exit = zone.querySelector<HTMLElement>(".paint-exit");
    const exitParts = zone.querySelectorAll<HTMLElement>("[data-paint-exit-part]");

    if (blob && stick && content && arrow && exit) {
      gsap.set(blob, { xPercent: -50, yPercent: -50, scale: 1 });
      gsap.set(content, { opacity: 0 });
      gsap.set(copy, { opacity: 0, y: 32 });
      gsap.set(steps, { opacity: 0, y: 30 });
      gsap.set(exit, { opacity: 0 });
      gsap.set(exitParts, { opacity: 0, y: 28 });

      const coverScale = () =>
        (Math.hypot(window.innerWidth, window.innerHeight) /
          Math.max(blob.getBoundingClientRect().width, 1)) *
        1.08;
      let paintBurstPlayed = false;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: zone,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 3.2, 2200)}`,
          pin: stick,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > 0.16 && !paintBurstPlayed) {
              paintBurstPlayed = true;
              window.dispatchEvent(new CustomEvent("recep:paint-burst"));
            } else if (self.progress < 0.04) {
              paintBurstPlayed = false;
            }
          },
        },
      });

      tl
        .to(arrow, { autoAlpha: 0, y: 10, duration: 0.12, ease: "power2.in" }, 0)
        .to(
          blob,
          {
            top: "50%",
            scale: coverScale,
            duration: 0.82,
            ease: "power2.inOut",
          },
          0,
        )
        .set(content, { opacity: 1 }, 0.46)
        .to(
          copy,
          {
            opacity: 1,
            y: 0,
            duration: 0.34,
            stagger: 0.075,
            ease: "power3.out",
          },
          0.5,
        )
        .to(
          steps,
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.09,
            ease: "power3.out",
          },
          0.84,
        )
        .to(content, { opacity: 1, duration: 0.5 }, 1.32)
        .to(
          content,
          { opacity: 0, y: -24, duration: 0.3, ease: "power2.in" },
          1.78,
        )
        .to(
          blob,
          {
            top: "18%",
            scale: 1.05,
            duration: 0.78,
            ease: "power2.inOut",
          },
          1.82,
        )
        .set(exit, { opacity: 1 }, 2.12)
        .to(
          exitParts,
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.08,
            ease: "power3.out",
          },
          2.18,
        )
        .to(exit, { opacity: 1, duration: 0.5 }, 2.55);
    }
  }

  // ---- pinned academic-life scrollytelling --------------------------------
  const story = document.querySelector<HTMLElement>("[data-academic-story]");
  const storyPin = story?.querySelector<HTMLElement>("[data-story-pin]");
  const storyShape = story?.querySelector<HTMLElement>("[data-story-shape]");
  const storyProgress = story?.querySelector<HTMLElement>("[data-story-progress]");
  const storyFrames = story
    ? Array.from(story.querySelectorAll<HTMLElement>("[data-story-frame]"))
    : [];
  const storyDots = story
    ? Array.from(story.querySelectorAll<HTMLElement>("[data-story-dot]"))
    : [];

  if (
    story &&
    storyPin &&
    storyShape &&
    storyProgress &&
    storyFrames.length > 1
  ) {
    story.classList.add("is-enhanced");

    gsap.set(storyFrames, { autoAlpha: 0 });
    gsap.set(storyFrames[0], { autoAlpha: 1 });
    gsap.set(storyShape, {
      xPercent: -50,
      yPercent: -50,
      scale: Number(storyFrames[0].dataset.storyScale || 1),
    });
    gsap.set(storyProgress, { scaleX: 0, transformOrigin: "left center" });

    let activeStep = -1;
    const announceStep = (index: number) => {
      if (index === activeStep) return;
      activeStep = index;
      storyDots.forEach((dot, i) => dot.classList.toggle("is-active", i <= index));
      const frame = storyFrames[index];
      window.dispatchEvent(
        new CustomEvent("recep:academic-step", {
          detail: {
            index,
            text: frame.dataset.storyMascot || "",
            pose: frame.dataset.storyPose || "talk",
          },
        }),
      );
    };

    const storyTl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: storyPin,
        start: "top top",
        end: () =>
          `+=${Math.max(window.innerHeight * 0.86 * (storyFrames.length - 1), 3600)}`,
        pin: storyPin,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.75,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!self.isActive && self.progress === 0) return;
          announceStep(
            Math.min(
              storyFrames.length - 1,
              Math.floor(self.progress * (storyFrames.length - 1) + 0.24),
            ),
          );
        },
        onLeaveBack: () => {
          activeStep = -1;
          storyDots.forEach((dot, i) => dot.classList.toggle("is-active", i === 0));
        },
      },
    });

    for (let i = 0; i < storyFrames.length - 1; i += 1) {
      const outgoing = storyFrames[i];
      const incoming = storyFrames[i + 1];
      const outYear = outgoing.querySelector<HTMLElement>("[data-story-year]");
      const inYear = incoming.querySelector<HTMLElement>("[data-story-year]");
      const outCard = outgoing.querySelector<HTMLElement>(".story-card");
      const inCard = incoming.querySelector<HTMLElement>(".story-card");
      const outParts = outgoing.querySelectorAll<HTMLElement>("[data-story-part]");
      const inParts = incoming.querySelectorAll<HTMLElement>("[data-story-part]");
      const at = i;

      if (!outYear || !inYear || !outCard || !inCard) continue;

      storyTl
        .to(
          outYear,
          { autoAlpha: 0, y: -34, duration: 0.18, ease: "power2.in" },
          at + 0.58,
        )
        .to(
          outParts,
          {
            autoAlpha: 0,
            y: -16,
            duration: 0.17,
            stagger: 0.025,
            ease: "power2.in",
          },
          at + 0.58,
        )
        .to(
          outCard,
          { autoAlpha: 0, y: -24, duration: 0.18, ease: "power2.in" },
          at + 0.6,
        )
        .set(incoming, { autoAlpha: 1 }, at + 0.67)
        .set(outgoing, { autoAlpha: 0 }, at + 0.78)
        .fromTo(
          inYear,
          { autoAlpha: 0, y: 38 },
          { autoAlpha: 1, y: 0, duration: 0.25, ease: "power3.out" },
          at + 0.68,
        )
        .fromTo(
          inCard,
          {
            autoAlpha: 0,
            y: 46,
            clipPath: "inset(12% 0% 0% 0% round 48px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0% round 48px)",
            duration: 0.3,
            ease: "power3.out",
          },
          at + 0.66,
        )
        .fromTo(
          inParts,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
            stagger: 0.05,
            ease: "power3.out",
          },
          at + 0.72,
        )
        .to(
          storyShape,
          {
            left: `${incoming.dataset.storyX || "65"}%`,
            top: `${incoming.dataset.storyY || "25"}%`,
            scale: Number(incoming.dataset.storyScale || 1),
            backgroundColor: incoming.dataset.storyColor || "#e9d5ff",
            duration: 0.4,
            ease: "power2.inOut",
          },
          at + 0.56,
        )
        .to(
          storyProgress,
          {
            scaleX: (i + 1) / (storyFrames.length - 1),
            duration: 0.72,
            ease: "none",
          },
          at + 0.12,
        );
    }
  }

  // ---- contact CTA grows into view ----------------------------------------
  const cta = document.querySelector<HTMLElement>(".contact-cta");
  if (cta) {
    gsap.fromTo(
      cta,
      { scale: 0.92 },
      {
        scale: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: cta, start: "top 92%", end: "top 52%", scrub: 0.5 },
      },
    );
  }

  // ---- project preview phones drift on scroll -----------------------------
  gsap.utils.toArray<HTMLElement>(".proj-scene").forEach((scene) => {
    gsap.fromTo(
      scene,
      { y: 36 },
      {
        y: -36,
        scale: 1.015,
        ease: "none",
        scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  // ---- hero leaves with a subtle depth split -------------------------------
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const heroCopy = hero?.querySelector<HTMLElement>("[data-hero-copy]");
  const heroScene = hero?.querySelector<HTMLElement>("[data-hero-scene]");
  if (hero && heroCopy && heroScene) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      })
      .to(heroCopy, { y: -42, opacity: 0.72, ease: "none" }, 0)
      .to(heroScene, { y: 52, scale: 0.97, ease: "none" }, 0);
  }

  // ---- mascot scroll cues --------------------------------------------------
  const cues: [string, string][] = [
    ["#work", "work"],
    ["#skills", "skills"],
    [".contact-cta", "contact"],
  ];
  cues.forEach(([sel, key]) => {
    const el = document.querySelector(sel);
    if (el) ScrollTrigger.create({ trigger: el, start: "top 55%", onEnter: () => emitSection(key) });
  });
}

function setup() {
  teardown();
  if (reduced()) return; // simple native scroll + IO reveals only

  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  ctx = gsap.context(build);
  ScrollTrigger.refresh();
}

document.addEventListener("astro:page-load", setup);
document.addEventListener("astro:before-swap", teardown);
