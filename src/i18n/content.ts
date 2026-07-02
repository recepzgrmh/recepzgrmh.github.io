/* ----------------------------------------------------------------------------
   Single source of content, bilingual. Real products, real metrics from the CV.
   Drives the home teaser, /work, /work/[slug] case studies, /about, /contact.
---------------------------------------------------------------------------- */

export type Lang = "en" | "tr";
export const LANGS: Lang[] = ["en", "tr"];
export const DEFAULT_LANG: Lang = "en";

export interface Metric {
  value: string;
  label: string;
}
export interface StoreLink {
  label: string;
  href: string;
}
export interface Preview {
  variant: "phone" | "browser";
  /** image basenames expected in src/assets/work/ (auto-detected; placeholder until present) */
  images: string[];
  placeholder: string;
  /** optional per-shot copy; when present (and one per image) a browser project
      renders as a pinned deck with side-text that changes as you scroll */
  captions?: { title: string; desc: string }[];
}
export interface Project {
  slug: string;
  mascot: string; // data-mascot key
  name: string;
  tagline: string;
  role: string;
  year: string;
  stack: string[];
  metrics: Metric[];
  blurb: string;
  tags: string[];
  summary: string;
  features: { title: string; desc: string }[];
  preview: Preview;
  problem: string;
  build: string[];
  architecture: string[];
  learnings: string;
  stores: StoreLink[];
}

export interface Capability {
  k: string;
  title: string;
  items: string[];
  tone: StatTone;
}

export interface SkillDepth {
  name: string;
  category: string;
  level: number;
  levelLabel: string;
  proof: string;
  tone: StatTone;
}

export type StatTone = "amber" | "coral" | "blue" | "lime" | "purple" | "white" | "soft";

export const LINKS = {
  github: "https://github.com/recepzgrmh",
  linkedin: "https://www.linkedin.com/in/recepozgurmih",
  email: "recep.ozgur.mih@gmail.com",
  sano: "https://chat.sanoapp.ai",
  sanoLanding: "https://sanoapp.ai/",
  sanoAppStore: "https://apps.apple.com/us/app/sano-ai-health-assistant/id6751110925",
  sanoPlayStore: "https://play.google.com/store/apps/details?id=com.mavipiksel.sanoai",
  revnaLanding: "https://revna.org/",
  revnaAppStore: "https://apps.apple.com/app/id6769646368",
  revnaPlayStore: "https://play.google.com/store/apps/details?id=com.mavipiksel.revna",
  cv: "/Recep_Ozgur_Mih_CV.pdf",
};

interface Content {
  meta: { title: string; description: string };
  marquee: string[];
  paint: {
    kicker: string;
    title: string;
    sub: string;
    steps: { k: string; title: string; desc: string }[];
  };
  nav: { work: string; skills: string; about: string; academic: string; contact: string; chat: string; labs: string };
  hero: {
    pill: string;
    status: string;
    name: string;
    headline: string;
    sub: string;
    ctaWork: string;
    ctaContact: string;
    ctaCV: string;
    location: string;
  };
  stats: {
    kicker: string;
    title: string;
    items: { value: string; label: string; tone: StatTone }[];
  };
  featured: { kicker: string; title: string; note: string; all: string };
  capsTeaser: { kicker: string; title: string; groups: Capability[]; more: string };
  homeContact: { kicker: string; title: string; cta: string };
  workIndex: { kicker: string; title: string; note: string };
  skillsPage: {
    kicker: string;
    title: string;
    note: string;
    depthKicker: string;
    depthTitle: string;
    depthNote: string;
    scale: [string, string, string, string, string];
    skills: SkillDepth[];
    proofKicker: string;
    proofTitle: string;
    cta: string;
  };
  projectUI: {
    back: string;
    detail: string;
    visit: string;
    overview: string;
    features: string;
    problem: string;
    build: string;
    architecture: string;
    stack: string;
    metrics: string;
    learnings: string;
    stores: string;
    next: string;
    role: string;
    appPreview: string;
    webPreview: string;
    soon: string;
  };
  about: {
    kicker: string;
    title: string;
    lead: string;
    portraitNote: string;
    availability: string;
    facts: { value: string; label: string; tone: StatTone }[];
    storyKicker: string;
    storyTitle: string;
    story: { title: string; body: string }[];
    notesKicker: string;
    notesTitle: string;
    notes: string[];
    communityKicker: string;
    communityTitle: string;
    community: { org: string; role: string; period: string; line: string }[];
    education: { degree: string; school: string; period: string };
    skillsCta: { kicker: string; title: string; note: string; cta: string };
    contactCta: { kicker: string; title: string; cta: string };
  };
  contact: {
    kicker: string;
    title: string;
    lead: string;
    email: string;
    ctaEmail: string;
    ctaGithub: string;
    ctaLinkedin: string;
    ctaCV: string;
  };
  chat: {
    kicker: string;
    title: string;
    lead: string;
    placeholder: string;
    send: string;
    stop: string;
    clear: string;
    empty: string;
    starters: string[];
    disclaimer: string;
    demoNote: string;
    error: string;
    launcher: string;
    name: string;
    tag: string;
    status: { ready: string; thinking: string; typing: string };
  };
  capabilities: Capability[];
  projects: Project[];
  footer: {
    built: string;
    nav: { work: string; about: string; academic: string; contact: string; labs: string };
    spotify: { now: string; recent: string; offline: string };
  };
  labsPage: {
    kicker: string;
    title: string;
    note: string;
    groups: {
      name: string;
      tone: StatTone;
      items: { name: string; href: string; desc: string }[];
    }[];
  };
}

/* ============================ ENGLISH ===================================== */
const en: Content = {
  meta: {
    title: "Recep Özgür Mıh — Mobile & AI product engineer",
    description:
      "Cross-platform mobile engineer shipping production iOS, Android and web AI products. Flutter, GCP, Firebase, Supabase. Built Sano AI and Revna.",
  },
  marquee: [
    "Flutter", "Dart", "Firebase", "GCP", "Pub/Sub", "Cloud Functions",
    "Supabase", "Edge Functions", "PostgreSQL", "React", "Vite", "RTDN",
    "CI/CD", "Crashlytics", "Webhooks", "App Store", "Play Console",
  ],
  paint: {
    kicker: "From idea to the store",
    title: "When the code is done, the product journey is only beginning.",
    sub: "The product flow, backend, billing, store review and monitoring are not separate chores. I own them as parts of the same product.",
    steps: [
      { k: "01", title: "Shape the product", desc: "User value, flows and the mobile experience" },
      { k: "02", title: "Connect the system", desc: "Backend, AI, billing and real-time state" },
      { k: "03", title: "Ship it", desc: "CI/CD, App Store and Google Play" },
      { k: "04", title: "Keep it healthy", desc: "Crash-free rates, monitoring and polish" },
    ],
  },
  nav: {
    work: "Work",
    skills: "Capabilities",
    about: "About",
    academic: "Academic",
    contact: "Contact",
    chat: "Chat",
    labs: "Labs",
  },
  hero: {
    pill: "Mobile-first AI products",
    status: "Open to full-time roles",
    name: "Recep Özgür Mıh",
    headline: "I take mobile-first AI products from idea to the store.",
    sub: "Flutter, backend, billing infrastructure and the AI layer — held together in one product mind.",
    ctaWork: "See projects",
    ctaContact: "Get in touch",
    ctaCV: "Open CV",
    location: "İzmir, Turkey",
  },
  stats: {
    kicker: "Proof, not promises",
    title: "Real apps, real numbers.",
    items: [
      { value: "5,000+", label: "downloads", tone: "amber" },
      { value: "4.7 / 5", label: "store rating", tone: "white" },
      { value: "99.9%", label: "crash-free users", tone: "blue" },
      { value: "150K+", label: "store impressions", tone: "soft" },
      { value: "2", label: "apps shipped to both stores", tone: "coral" },
      { value: "60+", label: "community events run", tone: "lime" },
    ],
  },
  featured: {
    kicker: "Selected work",
    title: "Things I actually shipped.",
    note: "Live on the App Store and Google Play — real users behind the numbers. Open one up.",
    all: "All work",
  },
  capsTeaser: {
    kicker: "One product mind",
    title: "Mobile, backend, billing and release — held together.",
    more: "Explore the depth",
    groups: [], // filled from `capabilities` at render
  },
  homeContact: {
    kicker: "Contact",
    title: "Building something? Let's talk.",
    cta: "Start a conversation",
  },
  workIndex: {
    kicker: "Work",
    title: "Everything I've shipped.",
    note: "Production apps and the backends behind them. Click through for the full story.",
  },
  skillsPage: {
    kicker: "Capabilities",
    title: "Mobile, backend, billing, AI. One product mind.",
    note: "I work across the whole path from an empty repo to a production release, keeping the product experience and the infrastructure behind it in the same frame.",
    depthKicker: "Production depth",
    depthTitle: "Not a list of tools. How far I can take each one.",
    depthNote: "Five levels reflect ownership in real products — not a made-up percentage or a claim that learning ever ends.",
    scale: ["Exploring", "Familiar", "Hands-on", "Advanced", "Production"],
    skills: [
      {
        name: "Flutter / Dart",
        category: "Mobile",
        level: 5,
        levelLabel: "Production",
        proof: "Two cross-platform apps shipped to both stores",
        tone: "amber",
      },
      {
        name: "Subscriptions & entitlements",
        category: "Fintech & AI",
        level: 5,
        levelLabel: "Production",
        proof: "Google Play Billing, RTDN and App Store server events",
        tone: "coral",
      },
      {
        name: "GCP / Firebase",
        category: "Backend & infrastructure",
        level: 4,
        levelLabel: "Advanced",
        proof: "Pub/Sub, Cloud Functions, auth, data and monitoring",
        tone: "blue",
      },
      {
        name: "CI/CD & store release",
        category: "Product shipping",
        level: 5,
        levelLabel: "Production",
        proof: "Pipelines, secrets, store review and live releases",
        tone: "lime",
      },
      {
        name: "Supabase / PostgreSQL",
        category: "Backend & infrastructure",
        level: 4,
        levelLabel: "Advanced",
        proof: "Edge Functions, SQL, policies and database triggers",
        tone: "purple",
      },
      {
        name: "React / Vite",
        category: "Product shipping",
        level: 4,
        levelLabel: "Advanced",
        proof: "chat.sanoapp.ai built from an empty repo",
        tone: "amber",
      },
      {
        name: "AI integration / local LLMs",
        category: "Fintech & AI",
        level: 3,
        levelLabel: "Hands-on",
        proof: "Product integration plus Mistral and Qwen research",
        tone: "coral",
      },
    ],
    proofKicker: "Built, not listed",
    proofTitle: "These capabilities meet in products people can actually use.",
    cta: "See the work",
  },
  projectUI: {
    back: "All work",
    detail: "View case",
    visit: "Visit",
    overview: "Overview",
    features: "What it does",
    problem: "The problem I owned",
    build: "What I built",
    architecture: "Architecture",
    stack: "Stack",
    metrics: "Numbers",
    learnings: "What I took from it",
    stores: "Live on",
    next: "Next project",
    role: "Role",
    appPreview: "App preview",
    webPreview: "Web preview",
    soon: "Screenshot coming",
  },
  about: {
    kicker: "Hi, I'm Recep.",
    title: "I'm not very good at leaving an idea in my head.",
    lead: "I'm a mobile product engineer in İzmir. What pulls me in isn't just making something work; it's taking it through the awkward middle until real people can use it.",
    portraitNote: "I like the overlap: product instinct, engineering depth and the stubbornness to ship.",
    availability: "Open to full-time roles",
    facts: [
      { value: "İzmir", label: "home base", tone: "purple" },
      { value: "2020 → 26", label: "Computer Science at DEU", tone: "lime" },
      { value: "2", label: "apps shipped to both stores", tone: "amber" },
      { value: "60+", label: "tech events brought to life", tone: "blue" },
    ],
    storyKicker: "Three instincts",
    storyTitle: "A little of my character shows up in the work.",
    story: [
      {
        title: "I see the whole product.",
        body: "I'm most comfortable where mobile, backend and a bit of AI overlap. On Sano AI I didn't stop at the app — I owned billing events, entitlements and the web client too.",
      },
      {
        title: "I care about the unglamorous parts.",
        body: "Crash-free rates, CI/CD, secrets and store review are not chores around the product. They're what turns a convincing demo into something 5,000+ people can trust.",
      },
      {
        title: "I build the room as well.",
        body: "Co-founding BBT İzmir and running a student community taught me that shipping is a people skill too. Most hard things get easier when the right people feel safe enough to work together.",
      },
    ],
    notesKicker: "Small notes",
    notesTitle: "The part that doesn't fit on a CV.",
    notes: [
      "An empty repo feels like an invitation, not a threat.",
      "A store release excites me more than a polished demo.",
      "I'm deliberately leaning toward fintech.",
      "I believe good products come from good teams — and good teams need trust.",
    ],
    communityKicker: "Beyond code",
    communityTitle: "I built communities, not just products.",
    community: [
      {
        org: "BBT İzmir",
        role: "Co-founder",
        period: "2023 — 2025",
        line: "Co-organized 60+ tech events for 2,500+ participants — blockchain, entrepreneurship and engineering.",
      },
      {
        org: "DEU Computer Science & AI Community",
        role: "Founding member · President / Corporate Relations",
        period: "2023 — 2024",
        line: "Helped found the community, then led partner relations, sponsorships and career events.",
      },
    ],
    education: {
      degree: "B.Sc. Computer Science · one-year English prep",
      school: "Dokuz Eylül University, İzmir",
      period: "2020 — 2026",
    },
    skillsCta: {
      kicker: "The technical side",
      title: "Want the tools, depth and production proof?",
      note: "The capabilities page shows what I use and how far I've taken each one.",
      cta: "See capabilities",
    },
    contactCta: {
      kicker: "Say hello",
      title: "Could we build something good together?",
      cta: "Let's talk",
    },
  },
  contact: {
    kicker: "Contact",
    title: "Building something? Let's talk.",
    lead: "I'm most useful where mobile, backend and a bit of AI meet — especially fintech. Fastest way to reach me is email.",
    email: LINKS.email,
    ctaEmail: "Send a mail",
    ctaGithub: "GitHub",
    ctaLinkedin: "LinkedIn",
    ctaCV: "Open CV",
  },
  chat: {
    kicker: "Talk to me",
    title: "Chat with Recep",
    lead: "An AI mascot fine-tuned on my own messages — so it answers in my voice. Ask about my work, how I build, or just say hi.",
    placeholder: "Ask me anything…",
    send: "Send",
    stop: "Stop",
    clear: "Clear",
    empty: "No messages yet — start with one of these:",
    starters: ["Introduce yourself", "What's your favourite project?", "How do you build products?"],
    disclaimer: "This is an AI trained on Recep's data — not the real Recep.",
    demoNote: "Demo mode — the fine-tuned model isn't connected yet.",
    error: "Something went wrong. Try again in a sec.",
    launcher: "Chat with Recep",
    name: "Recep",
    tag: "AI · trained on my data",
    status: { ready: "Ready when you are", thinking: "Thinking…", typing: "Typing…" },
  },
  capabilities: [
    {
      k: "01",
      title: "Mobile",
      tone: "amber",
      items: [
        "Flutter / Dart, production releases",
        "Bloc · Provider · MobX",
        "FCM, push, localization",
        "Crashlytics, monitoring",
      ],
    },
    {
      k: "02",
      title: "Backend & infrastructure",
      tone: "blue",
      items: [
        "GCP — Pub/Sub, Cloud Functions",
        "Supabase, Edge Functions",
        "PostgreSQL / SQL, DB triggers",
        "REST APIs, webhooks",
      ],
    },
    {
      k: "03",
      title: "Fintech & AI",
      tone: "coral",
      items: [
        "Subscription & entitlement flows",
        "Google Play Billing, RTDN",
        "App Store Server Notifications",
        "Local LLM R&D — Mistral, Qwen",
      ],
    },
    {
      k: "04",
      title: "Product shipping",
      tone: "lime",
      items: [
        "CI/CD, secrets management",
        "App Store / Play review & release",
        "0 → production from an empty repo",
        "Crash-free rates, monitoring, polish",
      ],
    },
  ],
  projects: [
    {
      slug: "sano-ai",
      mascot: "sano",
      name: "Sano AI",
      tagline: "AI health assistant for iOS & Android",
      role: "Mobile + backend, end to end",
      year: "2025",
      stack: ["Flutter", "Firebase", "GCP", "Pub/Sub", "Cloud Functions", "RTDN"],
      metrics: [
        { value: "5,000+", label: "downloads" },
        { value: "4.7 / 5", label: "rating" },
        { value: "99.9%", label: "crash-free" },
        { value: "150K+", label: "store impressions" },
      ],
      blurb:
        "Built and released the app, then engineered the subscription and entitlement backend across both stores.",
      tags: ["Live app", "Store ready", "Backend connected"],
      summary:
        "Sano turns complex medical data into clear, actionable guidance. Describe symptoms in plain language or upload a blood test or radiology report, and Sano explains it in human terms — in 14+ languages, 24/7, no appointment. It's informational guidance for everyday people, never a replacement for professional care.",
      features: [
        { title: "Instant symptom check", desc: "Describe symptoms naturally; the AI weighs them against medical databases to surface potential causes in seconds." },
        { title: "Lab result decoder", desc: "Upload a photo of a blood test or radiology report — Sano simplifies the jargon into plain language." },
        { title: "Radiology explainer", desc: "MRI, X-ray and scan reports turned into plain, actionable language." },
        { title: "24/7 multilingual guidance", desc: "Personalized next steps anytime, in 14+ languages from English to Turkish." },
        { title: "Organized history", desc: "AI-organized chat records and past results, always to hand." },
      ],
      preview: { variant: "phone", images: ["sano-1", "sano-2", "sano-3"], placeholder: "App preview" },
      problem:
        "People want trustworthy, always-available health guidance, but a chat app is the easy part — the hard part is a billing and entitlement system that never gets a paying user's access wrong, across two stores with totally different rules.",
      build: [
        "Designed and shipped the Flutter app for iOS and Android.",
        "Engineered subscription & entitlement workflows across Google Play Billing and App Store Server Notifications.",
        "Wired Google Play RTDN + Pub/Sub + Cloud Functions + webhooks so entitlement state stays correct in real time.",
        "Built chat.sanoapp.ai, the web client, from an empty repo with its own CI/CD.",
      ],
      architecture: [
        "Flutter client → Firebase auth/data",
        "Store events → RTDN / App Store Server Notifications",
        "→ Pub/Sub → Cloud Functions → entitlement store",
        "Webhooks reconcile edge cases; monitoring on top",
      ],
      learnings:
        "Payments are where trust is won or lost. Getting entitlement right in real time — refunds, grace periods, cross-platform — taught me more about production rigor than any feature ever did.",
      stores: [
        { label: "Product website", href: LINKS.sanoLanding },
        { label: "Web app", href: LINKS.sano },
        { label: "App Store", href: LINKS.sanoAppStore },
        { label: "Google Play", href: LINKS.sanoPlayStore },
      ],
    },
    {
      slug: "revna",
      mascot: "revna",
      name: "Revna",
      tagline: "AI skin routine coach",
      role: "Mobile developer",
      year: "2025",
      stack: ["Flutter", "Supabase", "Edge Functions", "PostgreSQL"],
      metrics: [
        { value: "iOS + Android", label: "published" },
        { value: "AI-guided", label: "routines" },
        { value: "Privacy-first", label: "by design" },
      ],
      blurb:
        "An AI-powered skincare coach on both stores — guided flows, reminders, localization and privacy-first controls.",
      tags: ["Live app", "Privacy-first", "Both stores"],
      summary:
        "Revna is a visual face-routine coach for adults (18+). It guides users through quality-checked selfie scans, organizes the skincare products they already own into AM/PM routines, and tracks visible cosmetic progress over time. Strictly cosmetic and privacy-first — no diagnosis, no health scoring, no minors.",
      features: [
        { title: "Quality-gated selfies", desc: "Lighting, blur, framing and angle checks stop weak photos before they create overconfident output." },
        { title: "Visual face report", desc: "Zone notes, appearance cards and one practical routine focus in under a minute." },
        { title: "Product cabinet", desc: "Scan or add products you already own and organize AM/PM steps without brand pressure." },
        { title: "Opt-in progress timeline", desc: "Save progress photos only when you choose, then review weekly cosmetic patterns." },
        { title: "Visible privacy controls", desc: "Delete, export, consent and storage choices live in the product, not hidden in settings." },
      ],
      preview: { variant: "phone", images: ["revna-1", "revna-2", "revna-3", "revna-4"], placeholder: "App preview" },
      problem:
        "Skincare advice is noisy and generic. Revna needed to feel like a personal coach — guided, gentle, and respectful of very personal data.",
      build: [
        "Developed API-driven mobile features in Flutter: guided flows, user state, reminders.",
        "Implemented full localization and privacy-first user controls.",
        "Built the production backend on Supabase — Edge Functions, PostgreSQL/SQL and database triggers.",
        "Managed the release across App Store Connect and Play Console.",
      ],
      architecture: [
        "Flutter client → Supabase (auth, data)",
        "Edge Functions for AI-guided logic",
        "Postgres triggers for reminders & state",
        "Privacy controls at the data layer",
      ],
      learnings:
        "Privacy isn't a checkbox — it's a layout, a default, a tone. Building Revna sharpened how I think about user trust on day one.",
      stores: [
        { label: "Product website", href: LINKS.revnaLanding },
        { label: "App Store", href: LINKS.revnaAppStore },
        { label: "Google Play", href: LINKS.revnaPlayStore },
      ],
    },
    {
      slug: "chat-sanoapp-ai",
      mascot: "chat",
      name: "chat.sanoapp.ai",
      tagline: "Sano AI on the web",
      role: "Web — set up from scratch",
      year: "2025",
      stack: ["React", "Vite", "CI/CD", "Secrets mgmt"],
      metrics: [
        { value: "0 → prod", label: "CI/CD pipeline" },
        { value: "React + Vite", label: "front end" },
      ],
      blurb:
        "The web counterpart of Sano AI — front end, CI/CD, env config and secrets, stood up from an empty repo.",
      tags: ["Live web", "0 → prod", "CI/CD"],
      summary:
        "chat.sanoapp.ai is Sano AI on the web — the same symptom and lab-report intelligence in the browser. I stood the whole front end up from an empty repo with a clean deploy pipeline, so it ships as fast as the app.",
      features: [
        { title: "Sano AI in the browser", desc: "The app's symptom check and lab decoder, available with no install." },
        { title: "React + Vite front end", desc: "A fast, modern single-page app built from scratch." },
        { title: "0 → production pipeline", desc: "CI/CD, environment config and secrets set up for repeatable deploys." },
      ],
      preview: {
        variant: "browser",
        images: ["chat-1", "chat-2", "chat-3", "chat-4"],
        placeholder: "Web preview",
        captions: [
          {
            title: "Ask anything about your health",
            desc: "A clean home screen with symptom starters and a clear medical disclaimer — no install, just start typing.",
          },
          {
            title: "Structured symptom analysis",
            desc: "Answers come back organised: an assessment summary, red-flag warnings, and possible causes — safety first.",
          },
          {
            title: "Lab & document decoder",
            desc: "Drop a PDF report, lab result or medical image and get a detailed, readable explanation back.",
          },
          {
            title: "A health timeline",
            desc: "Every analysis, document and log lands on one calendar you can follow over time.",
          },
        ],
      },
      problem:
        "Sano needed a web presence that matched the app — fast to ship, safe to deploy, and maintainable by one person.",
      build: [
        "Built the React + Vite front end from scratch.",
        "Established CI/CD, environment configuration and secrets management.",
        "Set up a repeatable 0-to-production deploy path.",
      ],
      architecture: [
        "React + Vite SPA",
        "CI/CD pipeline → automated deploys",
        "Environment-scoped config & secrets",
      ],
      learnings:
        "Setting up the boring infrastructure well is what lets you move fast later. A clean pipeline pays for itself in a week.",
      stores: [{ label: "chat.sanoapp.ai", href: LINKS.sano }],
    },
  ],
  footer: {
    built: "Designed & built by Recep — no template under here.",
    nav: { work: "Work", about: "About", academic: "Academic", contact: "Contact", labs: "Labs" },
    spotify: { now: "Now playing", recent: "Recently played", offline: "Nothing playing" },
  },
  labsPage: {
    kicker: "Labs",
    title: "Small experiments & things I built while learning.",
    note: "Little throwaway builds from my earlier playground — games, UI clones, course exercises. Not polished, just fun. All still live at their old URLs.",
    groups: [
      {
        name: "JavaScript",
        tone: "amber",
        items: [
          { name: "Pomodoro Timer", href: "/pomodoro/", desc: "Focus & break timer" },
          { name: "Background Color", href: "/Background-color/", desc: "Random gradient generator" },
          { name: "Clock", href: "/clock/", desc: "Live digital clock" },
          { name: "Dicee Game", href: "/dicee/", desc: "Two dice, higher roll wins" },
          { name: "Car Cards", href: "/car/", desc: "Expanding image cards" },
          { name: "Image Slider", href: "/image%20slide/", desc: "Simple image carousel" },
          { name: "Predict Number", href: "/Predict-number/", desc: "Guess-the-number game" },
          { name: "To-Do App", href: "/to-do/", desc: "Simple task list" },
          { name: "Random Number", href: "/Random-number/", desc: "Random number generator" },
          { name: "Tic-Tac-Toe", href: "/tic-tac-toe/", desc: "The classic XOX" },
          { name: "Troll Sounds", href: "/troll/", desc: "Meme soundboard" },
        ],
      },
      {
        name: "HTML & CSS",
        tone: "blue",
        items: [
          { name: "Old Portfolio", href: "/portfolio/", desc: "My very first portfolio" },
          { name: "Old CV", href: "/cv/", desc: "Earlier CV page" },
          { name: "Dilan Polat", href: "/Dilan-polat/", desc: "A meme landing page" },
          { name: "Ferrari", href: "/Ferrari/", desc: "Ferrari showcase page" },
          { name: "Shopping Website", href: "/Shopping-website/", desc: "Storefront concept" },
          { name: "Samsung", href: "/samsung/", desc: "Product showcase page" },
          { name: "Solar System", href: "/solar-system/", desc: "Solar system in CSS" },
        ],
      },
      {
        name: "Copycat",
        tone: "purple",
        items: [
          { name: "Tindog", href: "/tindog/", desc: "Bootstrap landing (course)" },
          { name: "Drum Kit", href: "/drum/", desc: "Playable drum kit" },
          { name: "Expanding Cards", href: "/expanding%20cards/", desc: "Hover-expand gallery" },
          { name: "Progress Steps", href: "/Progress%20Steps/", desc: "Animated step indicator" },
        ],
      },
    ],
  },
};

/* ============================ TÜRKÇE ===================================== */
const tr: Content = {
  meta: {
    title: "Recep Özgür Mıh — Mobil & AI ürün mühendisi",
    description:
      "Yayına çıkan iOS, Android ve web AI ürünleri geliştiren cross-platform mobil mühendis. Flutter, GCP, Firebase, Supabase. Sano AI ve Revna'yı yaptı.",
  },
  marquee: [
    "Flutter", "Dart", "Firebase", "GCP", "Pub/Sub", "Cloud Functions",
    "Supabase", "Edge Functions", "PostgreSQL", "React", "Vite", "RTDN",
    "CI/CD", "Crashlytics", "Webhooks", "App Store", "Play Console",
  ],
  paint: {
    kicker: "Fikirden mağazaya",
    title: "Kod bittiğinde, ürün yolculuğu daha yeni başlıyor.",
    sub: "Ürün akışı, backend, ödeme, mağaza incelemesi ve monitoring ayrı işler gibi görünse de aynı ürünün parçaları. Hepsini birlikte sahipleniyorum.",
    steps: [
      { k: "01", title: "Ürünü şekillendir", desc: "Kullanıcı değeri, akışlar ve mobil deneyim" },
      { k: "02", title: "Sistemi bağla", desc: "Backend, AI, ödeme ve gerçek zamanlı state" },
      { k: "03", title: "Yayına çıkar", desc: "CI/CD, App Store ve Google Play" },
      { k: "04", title: "Canlı tut", desc: "Crash-free oranı, monitoring ve cila" },
    ],
  },
  nav: {
    work: "İşler",
    skills: "Yetenekler",
    about: "Hakkımda",
    academic: "Akademik",
    contact: "İletişim",
    chat: "Sohbet",
    labs: "Labs",
  },
  hero: {
    pill: "Mobil odaklı AI ürünleri",
    status: "Tam zamanlı işlere açık",
    name: "Recep Özgür Mıh",
    headline: "Mobil odaklı AI ürünlerini fikirden yayına taşıyorum.",
    sub: "Flutter, backend, ödeme altyapısı ve AI tarafını tek bir ürün aklında birleştiriyorum.",
    ctaWork: "Projeleri gör",
    ctaContact: "İletişime geç",
    ctaCV: "CV'yi aç",
    location: "İzmir, Türkiye",
  },
  stats: {
    kicker: "Vaat değil, kanıt",
    title: "Gerçek uygulama, gerçek sayı.",
    items: [
      { value: "5.000+", label: "indirme", tone: "amber" },
      { value: "4.7 / 5", label: "mağaza puanı", tone: "white" },
      { value: "%99.9", label: "crash-free kullanıcı", tone: "blue" },
      { value: "150K+", label: "mağaza gösterimi", tone: "soft" },
      { value: "2", label: "her iki mağazada yayında", tone: "coral" },
      { value: "60+", label: "düzenlenen etkinlik", tone: "lime" },
    ],
  },
  featured: {
    kicker: "Seçili işler",
    title: "Gerçekten yayına aldığım şeyler.",
    note: "App Store ve Google Play'de canlı — sayıların arkasında gerçek kullanıcılar var. Birini aç.",
    all: "Tüm işler",
  },
  capsTeaser: {
    kicker: "Tek ürün aklı",
    title: "Mobil, backend, ödeme ve yayını aynı üründe birleştiriyorum.",
    more: "Derinliğini gör",
    groups: [],
  },
  homeContact: {
    kicker: "İletişim",
    title: "Bir şey mi inşa ediyorsun? Konuşalım.",
    cta: "Konuşmaya başla",
  },
  workIndex: {
    kicker: "İşler",
    title: "Yayına aldığım her şey.",
    note: "Production uygulamalar ve arkalarındaki backend'ler. Detay için içine gir.",
  },
  skillsPage: {
    kicker: "Yetenekler",
    title: "Mobil, backend, ödeme, AI. Tek ürün aklı.",
    note: "Boş repodan production yayına kadar bütün yolu üstleniyorum; ürün deneyimiyle arkasındaki altyapıyı aynı çerçevede tutuyorum.",
    depthKicker: "Üretim derinliği",
    depthTitle: "Teknoloji listesi değil. Her birini ne kadar ileri taşıdığım.",
    depthNote: "Beş kademe, uydurma bir yüzdeyi ya da öğrenmenin bittiğini değil, gerçek ürünlerde üstlendiğim sahiplik derinliğini gösteriyor.",
    scale: ["Keşif", "Temel", "Uygulamalı", "İleri", "Yayında"],
    skills: [
      {
        name: "Flutter / Dart",
        category: "Mobil",
        level: 5,
        levelLabel: "Yayında",
        proof: "İki cross-platform uygulama, iki mağazada yayında",
        tone: "amber",
      },
      {
        name: "Abonelik & entitlement",
        category: "Fintech & AI",
        level: 5,
        levelLabel: "Yayında",
        proof: "Google Play Billing, RTDN ve App Store server event'leri",
        tone: "coral",
      },
      {
        name: "GCP / Firebase",
        category: "Backend & altyapı",
        level: 4,
        levelLabel: "İleri",
        proof: "Pub/Sub, Cloud Functions, auth, data ve monitoring",
        tone: "blue",
      },
      {
        name: "CI/CD & store release",
        category: "Ürün çıkarma",
        level: 5,
        levelLabel: "Yayında",
        proof: "Pipeline, secrets, mağaza incelemesi ve canlı yayınlar",
        tone: "lime",
      },
      {
        name: "Supabase / PostgreSQL",
        category: "Backend & altyapı",
        level: 4,
        levelLabel: "İleri",
        proof: "Edge Functions, SQL, policy ve database trigger'ları",
        tone: "purple",
      },
      {
        name: "React / Vite",
        category: "Ürün çıkarma",
        level: 4,
        levelLabel: "İleri",
        proof: "chat.sanoapp.ai boş repodan production'a",
        tone: "amber",
      },
      {
        name: "AI entegrasyonu / local LLM",
        category: "Fintech & AI",
        level: 3,
        levelLabel: "Uygulamalı",
        proof: "Ürün entegrasyonu, Mistral ve Qwen araştırmaları",
        tone: "coral",
      },
    ],
    proofKicker: "Listede değil, üründe",
    proofTitle: "Bu yetenekler insanların gerçekten kullandığı ürünlerde birleşiyor.",
    cta: "İşleri gör",
  },
  projectUI: {
    back: "Tüm işler",
    detail: "Detaya git",
    visit: "Ziyaret et",
    overview: "Genel bakış",
    features: "Neler yapıyor",
    problem: "Üstlendiğim problem",
    build: "Ne yaptım",
    architecture: "Mimari",
    stack: "Stack",
    metrics: "Sayılar",
    learnings: "Bana ne kattı",
    stores: "Yayında",
    next: "Sonraki proje",
    role: "Rol",
    appPreview: "Uygulama önizlemesi",
    webPreview: "Web önizlemesi",
    soon: "Görsel gelecek",
  },
  about: {
    kicker: "Merhaba, ben Recep.",
    title: "Bir fikri kafamda bırakmayı pek beceremiyorum.",
    lead: "İzmir'de yaşayan bir mobil ürün mühendisiyim. Beni çeken şey yalnızca bir şeyi çalıştırmak değil; o fikri dağınık orta yerinden geçirip gerçek insanların kullanabileceği hâle getirmek.",
    portraitNote: "Ürün sezgisinin, mühendislik derinliğinin ve sonuna kadar gitme inadının kesiştiği yeri seviyorum.",
    availability: "Tam zamanlı rollere açık",
    facts: [
      { value: "İzmir", label: "yaşadığım ve ürettiğim şehir", tone: "purple" },
      { value: "2020 → 26", label: "DEÜ Bilgisayar Bilimleri", tone: "lime" },
      { value: "2", label: "iki mağazada yayındaki uygulama", tone: "amber" },
      { value: "60+", label: "hayata geçen teknoloji etkinliği", tone: "blue" },
    ],
    storyKicker: "Beni anlatan üç refleks",
    storyTitle: "Yaptığım işte biraz karakterim de var.",
    story: [
      {
        title: "Ürünün tamamını görürüm.",
        body: "En rahat ettiğim yer mobil, backend ve biraz AI'ın kesiştiği nokta. Sano AI'da uygulamada durmadım; ödeme event'lerini, entitlement sistemini ve web istemcisini de üstlendim.",
      },
      {
        title: "Gösterişsiz kısmı önemserim.",
        body: "Crash-free oranı, CI/CD, secrets ve mağaza incelemesi ürünün etrafındaki angaryalar değil. İyi bir demoyu 5.000+ kişinin güvenle kullandığı şeye dönüştüren kısım tam olarak burası.",
      },
      {
        title: "Odayı da kurarım.",
        body: "BBT İzmir'i kurmak ve bir öğrenci topluluğu yönetmek bana ürün çıkarmanın biraz da insan işi olduğunu öğretti. Doğru insanlar birlikte rahatça çalışabildiğinde zor işler kolaylaşıyor.",
      },
    ],
    notesKicker: "Küçük notlar",
    notesTitle: "CV'ye sığmayan tarafı.",
    notes: [
      "Boş repo beni korkutmuyor; iyi bir başlangıç noktası gibi geliyor.",
      "Mağazaya çıkan ürün, cilalı bir demodan daha çok heyecanlandırıyor.",
      "Fintech tarafına bilinçli biçimde yaklaşıyorum.",
      "İyi ürünlerin iyi ekiplerden, iyi ekiplerin de güvenden çıktığına inanıyorum.",
    ],
    communityKicker: "Kodun ötesi",
    communityTitle: "Yalnızca ürün değil, topluluk da kurdum.",
    community: [
      {
        org: "BBT İzmir",
        role: "Kurucu ortak",
        period: "2023 — 2025",
        line: "2.500+ katılımcı için 60+ teknoloji etkinliği — blockchain, girişimcilik ve mühendislik.",
      },
      {
        org: "DEÜ Bilgisayar Bilimleri ve Yapay Zeka Topluluğu",
        role: "Kurucu üye · Başkan / Kurumsal İlişkiler",
        period: "2023 — 2024",
        line: "Topluluğun kuruluşunda yer aldım; partner ilişkileri, sponsorluklar ve kariyer etkinliklerini yönettim.",
      },
    ],
    education: {
      degree: "Bilgisayar Bilimleri Lisans · 1 yıl İngilizce hazırlık",
      school: "Dokuz Eylül Üniversitesi, İzmir",
      period: "2020 — 2026",
    },
    skillsCta: {
      kicker: "Teknik taraf",
      title: "Kullandığım araçları ve üretim derinliğini mi merak ettin?",
      note: "Yetenekler sayfasında neyi, ne kadar ileri taşıdığımı gerçek ürün kanıtlarıyla gösteriyorum.",
      cta: "Yetenekleri gör",
    },
    contactCta: {
      kicker: "Bir merhaba",
      title: "Birlikte iyi bir şey çıkarabilir miyiz?",
      cta: "Konuşalım",
    },
  },
  contact: {
    kicker: "İletişim",
    title: "Bir şey mi inşa ediyorsun? Konuşalım.",
    lead: "En çok mobil, backend ve biraz AI'ın kesiştiği yerde işe yararım — özellikle fintech. Bana en hızlı ulaşma yolu e-posta.",
    email: LINKS.email,
    ctaEmail: "Mail at",
    ctaGithub: "GitHub",
    ctaLinkedin: "LinkedIn",
    ctaCV: "CV'yi aç",
  },
  chat: {
    kicker: "Benimle konuş",
    title: "Recep ile sohbet et",
    lead: "Kendi mesajlarımla eğitilmiş bir AI mascot — yani benim tarzımda cevap verir. İşlerimi, nasıl kod yazdığımı sor ya da sadece selam ver.",
    placeholder: "Aklına takılanı sor…",
    send: "Gönder",
    stop: "Dur",
    clear: "Temizle",
    empty: "Henüz mesaj yok — şunlardan biriyle başla:",
    starters: ["Kendini tanıt", "En sevdiğin proje ne?", "Nasıl ürün geliştiriyorsun?"],
    disclaimer: "Bu, Recep'in verisiyle eğitilmiş bir AI — gerçek Recep değil.",
    demoNote: "Demo modu — fine-tune model henüz bağlı değil.",
    error: "Bir şeyler ters gitti. Birazdan tekrar dene.",
    launcher: "Recep ile sohbet et",
    name: "Recep",
    tag: "AI · kendi verimle eğitildi",
    status: { ready: "Hazırım, sor bakalım", thinking: "Düşünüyor…", typing: "Yazıyor…" },
  },
  capabilities: [
    {
      k: "01",
      title: "Mobil",
      tone: "amber",
      items: [
        "Flutter / Dart, production yayınlar",
        "Bloc · Provider · MobX",
        "FCM, push, lokalizasyon",
        "Crashlytics, monitoring",
      ],
    },
    {
      k: "02",
      title: "Backend & altyapı",
      tone: "blue",
      items: [
        "GCP — Pub/Sub, Cloud Functions",
        "Supabase, Edge Functions",
        "PostgreSQL / SQL, DB trigger",
        "REST API, webhook",
      ],
    },
    {
      k: "03",
      title: "Fintech & AI",
      tone: "coral",
      items: [
        "Abonelik & entitlement akışları",
        "Google Play Billing, RTDN",
        "App Store Server Notifications",
        "Local LLM Ar-Ge — Mistral, Qwen",
      ],
    },
    {
      k: "04",
      title: "Ürün çıkarma",
      tone: "lime",
      items: [
        "CI/CD, secrets yönetimi",
        "App Store / Play inceleme & yayın",
        "Boş repodan 0 → production",
        "Crash-free oranı, monitoring, cila",
      ],
    },
  ],
  projects: [
    {
      slug: "sano-ai",
      mascot: "sano",
      name: "Sano AI",
      tagline: "iOS & Android için AI sağlık asistanı",
      role: "Mobil + backend, baştan sona",
      year: "2025",
      stack: ["Flutter", "Firebase", "GCP", "Pub/Sub", "Cloud Functions", "RTDN"],
      metrics: [
        { value: "5.000+", label: "indirme" },
        { value: "4.7 / 5", label: "puan" },
        { value: "%99.9", label: "crash-free" },
        { value: "150K+", label: "mağaza gösterimi" },
      ],
      blurb:
        "Uygulamayı yapıp yayına aldım, ardından her iki mağazada abonelik/entitlement backend'ini kurdum.",
      tags: ["Yayında", "Store ready", "Backend bağlı"],
      summary:
        "Sano, karmaşık tıbbi veriyi anlaşılır ve uygulanabilir bir rehbere çeviriyor. Belirtilerini gündelik dille anlat ya da bir kan tahlili veya radyoloji raporu yükle — Sano bunu insan diline çeviriyor; 14+ dilde, 7/24, randevu yok. Herkesin kendi sağlığını anlaması için bilgilendirici bir rehber; profesyonel bakımın yerini tutmaz.",
      features: [
        { title: "Anında belirti kontrolü", desc: "Belirtileri doğal dille anlat; AI bunları tıbbi veritabanlarıyla karşılaştırıp saniyeler içinde olası nedenleri çıkarır." },
        { title: "Tahlil çözücü", desc: "Kan tahlili veya radyoloji raporunun fotoğrafını yükle — Sano tıbbi jargonu sade dile çevirir." },
        { title: "Radyoloji açıklayıcı", desc: "MR, röntgen ve tarama raporları sade, uygulanabilir dile dönüşür." },
        { title: "7/24 çok dilli rehberlik", desc: "İstediğin an kişiselleştirilmiş adımlar; İngilizce'den Türkçe'ye 14+ dilde." },
        { title: "Düzenli geçmiş", desc: "AI ile düzenlenmiş sohbet kayıtları ve geçmiş sonuçlar elinin altında." },
      ],
      preview: { variant: "phone", images: ["sano-1", "sano-2", "sano-3"], placeholder: "Uygulama önizlemesi" },
      problem:
        "İnsanlar güvenilir ve her an ulaşılabilir sağlık rehberliği istiyor; ama sohbet kısmı kolay olan. Asıl zor kısım, iki farklı mağazada, tamamen farklı kurallarla, ödeme yapan bir kullanıcının erişimini asla yanlış vermeyen bir billing/entitlement sistemi.",
      build: [
        "Flutter uygulamasını iOS ve Android için tasarlayıp yayına aldım.",
        "Google Play Billing ve App Store Server Notifications üzerinden abonelik & entitlement akışlarını kurdum.",
        "Google Play RTDN + Pub/Sub + Cloud Functions + webhook'larla entitlement durumunu gerçek zamanlı doğru tuttum.",
        "Web istemcisi chat.sanoapp.ai'ı kendi CI/CD'siyle boş repodan kurdum.",
      ],
      architecture: [
        "Flutter istemci → Firebase auth/data",
        "Mağaza olayları → RTDN / App Store Server Notifications",
        "→ Pub/Sub → Cloud Functions → entitlement store",
        "Uç durumlar webhook ile mutabık; üstünde monitoring",
      ],
      learnings:
        "Ödeme, güvenin kazanıldığı ya da kaybedildiği yer. Entitlement'ı gerçek zamanlı doğru yapmak — iade, grace period, platformlar arası — bana production titizliğini her özellikten daha çok öğretti.",
      stores: [
        { label: "Ürün sitesi", href: LINKS.sanoLanding },
        { label: "Web uygulaması", href: LINKS.sano },
        { label: "App Store", href: LINKS.sanoAppStore },
        { label: "Google Play", href: LINKS.sanoPlayStore },
      ],
    },
    {
      slug: "revna",
      mascot: "revna",
      name: "Revna",
      tagline: "AI cilt rutini koçu",
      role: "Mobil geliştirici",
      year: "2025",
      stack: ["Flutter", "Supabase", "Edge Functions", "PostgreSQL"],
      metrics: [
        { value: "iOS + Android", label: "yayında" },
        { value: "AI destekli", label: "rutinler" },
        { value: "Gizlilik öncelikli", label: "tasarım" },
      ],
      blurb:
        "Her iki mağazada AI destekli cilt bakım koçu — yönlendirmeli akışlar, hatırlatıcılar, lokalizasyon ve gizlilik öncelikli kontroller.",
      tags: ["Yayında", "Gizlilik öncelikli", "İki mağaza"],
      summary:
        "Revna, yetişkinler (18+) için görsel bir yüz rutini koçu. Kalite kontrollü selfie taramalarında yönlendiriyor, kullanıcının zaten sahip olduğu ürünleri AM/PM rutinlerine diziyor ve görünür kozmetik ilerlemeyi zamanla takip ediyor. Tamamen kozmetik ve gizlilik öncelikli — teşhis yok, sağlık skoru yok, reşit olmayan yok.",
      features: [
        { title: "Kalite kapılı selfie", desc: "Işık, bulanıklık, çerçeve ve açı kontrolleri; zayıf fotoğrafları aşırı iddialı sonuç üretmeden durdurur." },
        { title: "Görsel yüz raporu", desc: "Bölge notları, görünüm kartları ve bir dakikadan kısa sürede tek pratik rutin odağı." },
        { title: "Ürün dolabı", desc: "Sahip olduğun ürünleri tara/ekle, marka baskısı olmadan AM/PM adımlarını düzenle." },
        { title: "Opt-in ilerleme zaman çizelgesi", desc: "İlerleme fotoğraflarını yalnızca istediğinde kaydet, haftalık kozmetik değişimleri gözden geçir." },
        { title: "Görünür gizlilik kontrolleri", desc: "Silme, dışa aktarma, onay ve depolama seçenekleri ayarlara gizli değil, ürünün içinde." },
      ],
      preview: { variant: "phone", images: ["revna-1", "revna-2", "revna-3", "revna-4"], placeholder: "Uygulama önizlemesi" },
      problem:
        "Cilt bakımı tavsiyeleri gürültülü ve genel-geçer. Revna'nın kişisel bir koç gibi hissettirmesi gerekiyordu — yönlendiren, nazik ve çok kişisel veriye saygılı.",
      build: [
        "Flutter'da API odaklı mobil özellikler geliştirdim: yönlendirmeli akışlar, kullanıcı state'i, hatırlatıcılar.",
        "Tam lokalizasyon ve gizlilik öncelikli kullanıcı kontrolleri ekledim.",
        "Production backend'i Supabase üzerinde kurdum — Edge Functions, PostgreSQL/SQL ve veritabanı trigger'ları.",
        "Yayını App Store Connect ve Play Console'da yönettim.",
      ],
      architecture: [
        "Flutter istemci → Supabase (auth, data)",
        "AI yönlendirme mantığı için Edge Functions",
        "Hatırlatıcı & state için Postgres trigger'ları",
        "Gizlilik kontrolleri veri katmanında",
      ],
      learnings:
        "Gizlilik bir onay kutusu değil — bir yerleşim, bir varsayılan, bir ton. Revna kullanıcı güvenine ilk günden nasıl baktığımı keskinleştirdi.",
      stores: [
        { label: "Ürün sitesi", href: LINKS.revnaLanding },
        { label: "App Store", href: LINKS.revnaAppStore },
        { label: "Google Play", href: LINKS.revnaPlayStore },
      ],
    },
    {
      slug: "chat-sanoapp-ai",
      mascot: "chat",
      name: "chat.sanoapp.ai",
      tagline: "Sano AI'ın web hâli",
      role: "Web — sıfırdan kuruldu",
      year: "2025",
      stack: ["React", "Vite", "CI/CD", "Secrets yönetimi"],
      metrics: [
        { value: "0 → prod", label: "CI/CD hattı" },
        { value: "React + Vite", label: "ön yüz" },
      ],
      blurb:
        "Sano AI'ın web karşılığı — ön yüz, CI/CD, ortam yapılandırması ve secrets, boş repodan ayağa kaldırıldı.",
      tags: ["Web'de yayında", "0 → prod", "CI/CD"],
      summary:
        "chat.sanoapp.ai, Sano AI'ın web hâli — aynı belirti ve tahlil zekâsı tarayıcıda. Tüm ön yüzü boş repodan, temiz bir deploy hattıyla kurdum; uygulama kadar hızlı yayına çıkıyor.",
      features: [
        { title: "Tarayıcıda Sano AI", desc: "Uygulamanın belirti kontrolü ve tahlil çözücüsü, kurulum gerektirmeden." },
        { title: "React + Vite ön yüz", desc: "Sıfırdan kurulmuş hızlı, modern tek sayfa uygulaması." },
        { title: "0 → production hattı", desc: "Tekrarlanabilir deploy için CI/CD, ortam yapılandırması ve secrets." },
      ],
      preview: {
        variant: "browser",
        images: ["chat-1", "chat-2", "chat-3", "chat-4"],
        placeholder: "Web önizlemesi",
        captions: [
          {
            title: "Sağlığınla ilgili her şeyi sor",
            desc: "Sade bir ana ekran; belirti önerileri ve net bir tıbbi uyarı ile — kurulum yok, yazmaya başla yeter.",
          },
          {
            title: "Yapılandırılmış belirti analizi",
            desc: "Yanıtlar düzenli gelir: değerlendirme özeti, uyarı işaretleri ve olası nedenler — önce güvenlik.",
          },
          {
            title: "Tahlil & belge çözücü",
            desc: "PDF rapor, tahlil sonucu ya da tıbbi görsel bırak; detaylı, okunabilir bir açıklama geri gelsin.",
          },
          {
            title: "Sağlık zaman çizelgesi",
            desc: "Her analiz, belge ve kayıt tek bir takvimde toplanır; zaman içinde takip edebilirsin.",
          },
        ],
      },
      problem:
        "Sano'nun uygulamaya yakışan bir web varlığına ihtiyacı vardı — hızlı çıkan, güvenle deploy edilen ve tek kişiyle sürdürülebilen.",
      build: [
        "React + Vite ön yüzünü sıfırdan kurdum.",
        "CI/CD, ortam yapılandırması ve secrets yönetimini oturttum.",
        "Tekrarlanabilir bir 0-to-production deploy yolu kurdum.",
      ],
      architecture: [
        "React + Vite SPA",
        "CI/CD hattı → otomatik deploy",
        "Ortama göre config & secrets",
      ],
      learnings:
        "Sıkıcı altyapıyı iyi kurmak, sonradan hızlı gitmeni sağlayan şey. Temiz bir pipeline bir haftada kendini amorti ediyor.",
      stores: [{ label: "chat.sanoapp.ai", href: LINKS.sano }],
    },
  ],
  footer: {
    built: "Recep tasarladı & kodladı — altından şablon çıkmaz.",
    nav: { work: "İşler", about: "Hakkımda", academic: "Akademik", contact: "İletişim", labs: "Labs" },
    spotify: { now: "Şu an çalıyor", recent: "Son çalınan", offline: "Şu an bir şey çalmıyor" },
  },
  labsPage: {
    kicker: "Labs",
    title: "Küçük denemeler & öğrenirken yaptıklarım.",
    note: "Eski playground'umdan ufak şeyler — oyunlar, arayüz klonları, kurs alıştırmaları. Cilalı değil, sadece keyif. Hepsi eski adreslerinde hâlâ canlı.",
    groups: [
      {
        name: "JavaScript",
        tone: "amber",
        items: [
          { name: "Pomodoro", href: "/pomodoro/", desc: "Odak & mola sayacı" },
          { name: "Arkaplan Rengi", href: "/Background-color/", desc: "Rastgele gradyan üretici" },
          { name: "Saat", href: "/clock/", desc: "Canlı dijital saat" },
          { name: "Dicee", href: "/dicee/", desc: "İki zar, büyük atan kazanır" },
          { name: "Car Cards", href: "/car/", desc: "Genişleyen görsel kartlar" },
          { name: "Görsel Kaydırıcı", href: "/image%20slide/", desc: "Basit görsel carousel" },
          { name: "Sayı Tahmini", href: "/Predict-number/", desc: "Sayı tahmin oyunu" },
          { name: "Yapılacaklar", href: "/to-do/", desc: "Basit görev listesi" },
          { name: "Rastgele Sayı", href: "/Random-number/", desc: "Rastgele sayı üreteci" },
          { name: "XOX", href: "/tic-tac-toe/", desc: "Klasik tic-tac-toe" },
          { name: "Troll Sesleri", href: "/troll/", desc: "Meme ses tahtası" },
        ],
      },
      {
        name: "HTML & CSS",
        tone: "blue",
        items: [
          { name: "Eski Portföy", href: "/portfolio/", desc: "İlk portföyüm" },
          { name: "Eski CV", href: "/cv/", desc: "Önceki CV sayfası" },
          { name: "Dilan Polat", href: "/Dilan-polat/", desc: "Meme landing sayfası" },
          { name: "Ferrari", href: "/Ferrari/", desc: "Ferrari tanıtım sayfası" },
          { name: "Alışveriş Sitesi", href: "/Shopping-website/", desc: "Vitrin konsepti" },
          { name: "Samsung", href: "/samsung/", desc: "Ürün tanıtım sayfası" },
          { name: "Güneş Sistemi", href: "/solar-system/", desc: "CSS ile güneş sistemi" },
        ],
      },
      {
        name: "Kopya",
        tone: "purple",
        items: [
          { name: "Tindog", href: "/tindog/", desc: "Bootstrap landing (kurs)" },
          { name: "Drum Kit", href: "/drum/", desc: "Çalınabilir davul seti" },
          { name: "Expanding Cards", href: "/expanding%20cards/", desc: "Hover ile açılan galeri" },
          { name: "Progress Steps", href: "/Progress%20Steps/", desc: "Animasyonlu adım göstergesi" },
        ],
      },
    ],
  },
};

export const CONTENT: Record<Lang, Content> = { en, tr };

export function getProject(lang: Lang, slug: string): Project | undefined {
  return CONTENT[lang].projects.find((p) => p.slug === slug);
}
