/* ----------------------------------------------------------------------------
   HeroMascot — the mascot AS part of the hero composition (not a corner sticker).
   A larger, friendly Recep waving inside the hero scene, with a greeting bubble.
   Purely presentational; the roaming interactive one lives in MascotIsland.
---------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Lang } from "../../i18n/content";
import MascotVisual from "./MascotVisual";
import { getLineBook } from "./mascotLines";

export default function HeroMascot({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const [pose, setPose] = useState<"wave" | "idle">("wave");
  const greet = getLineBook(lang).greet.text;

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => {
      setPose((p) => (p === "wave" ? "idle" : "wave"));
    }, 3200);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <div className="relative inline-block">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -7, 0] }}
          transition={reduce ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 18px 30px rgba(17,17,20,0.18))" }}
        >
          <MascotVisual pose={pose} size={158} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        className="absolute -top-6 left-[42%] w-max max-w-[9rem] rounded-2xl rounded-bl-md bg-night px-3 py-2 text-[0.72rem] font-medium leading-snug text-white shadow-[0_12px_30px_-8px_rgba(17,17,20,0.4)]"
      >
        {greet}
        <span className="absolute -bottom-[5px] left-4 h-3 w-3 rotate-45 bg-night" />
      </motion.div>
    </div>
  );
}
