/* ----------------------------------------------------------------------------
   Placeholder mascot art — a flat line-art "Recep" whose expression + arms
   change per pose. Intentional-looking while we wait for the real AI assets.

   When the real poses are ready, drop them in /public/mascot/<pose>.webp and
   flip USE_IMAGE_ASSETS to true. No other code changes needed.
---------------------------------------------------------------------------- */
import type { Pose } from "./mascotLines";

export const USE_IMAGE_ASSETS = true;

// light-theme palette: dark ink features, white fill, amber accents
const FG = "#17171b";
const SKIN = "#ffffff";
const HAIR = "#1a1a1f";
const AMBER = "#ff9f1c";
const AMBER_DIM = "#e07d00";

function Eyes({ pose }: { pose: Pose }) {
  if (pose === "dizzy") {
    return (
      <g stroke={FG} strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M40 56 l8 8 M48 56 l-8 8" />
        <path d="M72 56 l8 8 M80 56 l-8 8" />
      </g>
    );
  }
  if (pose === "panic" || pose === "surprised") {
    return (
      <g fill={FG}>
        <circle cx="44" cy="60" r="5" />
        <circle cx="76" cy="60" r="5" />
      </g>
    );
  }
  if (pose === "serious") {
    return (
      <g stroke={FG} strokeWidth="3" strokeLinecap="round">
        <line x1="39" y1="60" x2="49" y2="60" />
        <line x1="71" y1="60" x2="81" y2="60" />
      </g>
    );
  }
  // idle / wave / point / talk / think
  return (
    <g fill={FG}>
      <circle cx="44" cy="60" r="3.4" />
      <circle cx="76" cy="60" r="3.4" />
    </g>
  );
}

function Mouth({ pose }: { pose: Pose }) {
  const s = { stroke: FG, strokeWidth: 2.4, fill: "none", strokeLinecap: "round" as const };
  if (pose === "talk" || pose === "wave")
    return <path d="M52 76 q8 8 16 0" {...s} />;
  if (pose === "surprised" || pose === "panic")
    return <ellipse cx="60" cy="78" rx="6" ry="7" fill={FG} />;
  if (pose === "dizzy") return <path d="M52 78 q4 -5 8 0 q4 5 8 0" {...s} />;
  if (pose === "serious") return <line x1="52" y1="78" x2="68" y2="78" {...s} />;
  if (pose === "think") return <path d="M54 78 h10" {...s} />;
  // idle / point — soft smile
  return <path d="M53 75 q7 6 14 0" {...s} />;
}

function Arms({ pose }: { pose: Pose }) {
  const s = {
    stroke: AMBER_DIM,
    strokeWidth: 7,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (pose === "wave")
    return (
      <g {...s}>
        <path d="M34 112 q-12 -6 -16 -22" />
        <path d="M86 112 q10 -2 14 6" />
      </g>
    );
  if (pose === "point")
    return (
      <g {...s}>
        <path d="M86 110 q18 -2 26 -14" />
        <path d="M34 112 q-8 4 -8 12" />
      </g>
    );
  if (pose === "panic")
    return (
      <g {...s}>
        <path d="M34 108 q-10 -14 -6 -26" />
        <path d="M86 108 q10 -14 6 -26" />
      </g>
    );
  if (pose === "serious")
    return (
      <g {...s}>
        <path d="M34 112 q26 6 52 0" />
      </g>
    );
  if (pose === "think")
    return (
      <g {...s}>
        <path d="M86 110 q8 -10 -8 -22" />
        <path d="M34 112 q-8 4 -8 12" />
      </g>
    );
  // idle / talk — arms relaxed down
  return (
    <g {...s}>
      <path d="M34 110 q-6 8 -4 18" />
      <path d="M86 110 q6 8 4 18" />
    </g>
  );
}

function Extras({ pose }: { pose: Pose }) {
  if (pose === "dizzy")
    return (
      <g fill={AMBER}>
        <path d="M92 36 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" />
        <path d="M22 44 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z" />
      </g>
    );
  if (pose === "panic")
    return <path d="M86 52 q5 5 1 11" stroke="#7cc4ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  if (pose === "think")
    return (
      <g fill={FG}>
        <circle cx="98" cy="44" r="2.2" />
        <circle cx="104" cy="38" r="3" />
        <circle cx="111" cy="30" r="3.8" />
      </g>
    );
  return null;
}

export default function MascotVisual({
  pose,
  size = 132,
}: {
  pose: Pose;
  size?: number;
}) {
  if (USE_IMAGE_ASSETS) {
    return (
      <img
        src={`/mascot/${pose}.webp`}
        alt=""
        width={size}
        height={Math.round(size * 1.333)}
        draggable={false}
        style={{
          display: "block",
          width: size,
          height: "auto",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size * 1.18}
      viewBox="0 0 120 140"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", pointerEvents: "none", userSelect: "none" }}
    >
      {/* body / hoodie */}
      <path
        d="M22 138 q0 -34 38 -34 q38 0 38 34 z"
        fill={SKIN}
        stroke={AMBER_DIM}
        strokeWidth="2"
      />
      <path d="M48 106 q12 10 24 0" stroke={AMBER} strokeWidth="2" fill="none" />
      <Arms pose={pose} />
      {/* head */}
      <circle cx="60" cy="62" r="34" fill={SKIN} stroke={FG} strokeWidth="2.5" />
      {/* hair */}
      <path
        d="M28 56 q2 -30 32 -30 q30 0 32 30 q-10 -12 -32 -12 q-22 0 -32 12z"
        fill={HAIR}
      />
      <Eyes pose={pose} />
      <Mouth pose={pose} />
      <Extras pose={pose} />
    </svg>
  );
}
