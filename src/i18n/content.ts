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
  blog: "/blog/",
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
  nav: { work: string; profile: string; skills: string; about: string; academic: string; contact: string; chat: string; labs: string };
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
    title: "Recep Özgür Mıh — Product Engineer",
    description:
      "Product engineer working across Flutter, TypeScript, Node.js and React to ship and operate mobile, backend and web products.",
  },
  marquee: [
    "Flutter", "Dart", "Firebase", "GCP", "Pub/Sub", "Cloud Functions",
    "Supabase", "Edge Functions", "PostgreSQL", "React", "Vite", "RTDN",
    "CI/CD", "Crashlytics", "Webhooks", "App Store", "Play Console",
  ],
  paint: {
    kicker: "Delivery scope",
    title: "Implementation, release and production support.",
    sub: "I work across the client, backend services, subscription state, store release and monitoring needed to keep a product running.",
    steps: [
      { k: "01", title: "Shape the product", desc: "User value, flows and the mobile experience" },
      { k: "02", title: "Connect the system", desc: "Backend, AI, billing and real-time state" },
      { k: "03", title: "Ship it", desc: "CI/CD, App Store and Google Play" },
      { k: "04", title: "Keep it healthy", desc: "Crash-free rates, monitoring and polish" },
    ],
  },
  nav: {
    work: "Work",
    profile: "Profile",
    skills: "Capabilities",
    about: "About",
    academic: "Academic",
    contact: "Contact",
    chat: "Chat",
    labs: "Labs",
  },
  hero: {
    pill: "Product engineer · Mobile / Backend / Web",
    status: "Open to full-time roles",
    name: "Recep Özgür Mıh",
    headline: "I build products that make it to production.",
    sub: "I work across Flutter apps, TypeScript and Node.js services, subscription systems, and the release operations behind live products.",
    ctaWork: "View selected work",
    ctaContact: "Contact",
    ctaCV: "View CV",
    location: "İzmir, Turkey",
  },
  stats: {
    kicker: "Production snapshot",
    title: "Results measured after release.",
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
    title: "Selected production projects.",
    note: "A concise look at my role, the systems I worked on and the results after launch.",
    all: "All work",
  },
  capsTeaser: {
    kicker: "Engineering scope",
    title: "Mobile clients, backend services and release operations.",
    more: "View technical experience",
    groups: [], // filled from `capabilities` at render
  },
  homeContact: {
    kicker: "Contact",
    title: "Open to product engineering roles and focused collaborations.",
    cta: "Get in touch",
  },
  workIndex: {
    kicker: "Work",
    title: "Production projects.",
    note: "Mobile applications, backend workflows and web delivery. Each case explains my contribution and the operating context.",
  },
  skillsPage: {
    kicker: "Capabilities",
    title: "Mobile, backend and product operations.",
    note: "My experience covers Flutter clients, TypeScript and Node.js services, subscription infrastructure, data flows, CI/CD and store releases.",
    depthKicker: "Production depth",
    depthTitle: "Tools, responsibility and production evidence.",
    depthNote: "The levels summarize how I have used each area in live products.",
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
    features: "Product scope",
    problem: "The problem I owned",
    build: "What I built",
    architecture: "Architecture",
    stack: "Stack",
    metrics: "Numbers",
    learnings: "Key takeaway",
    stores: "Live on",
    next: "Next project",
    role: "Role",
    appPreview: "App preview",
    webPreview: "Web preview",
    soon: "Screenshot coming",
  },
  about: {
    kicker: "About",
    title: "I work across the product, from implementation to production support.",
    lead: "I'm a product engineer based in İzmir. My recent work spans Flutter applications, TypeScript and Node.js services, subscription workflows, databases, CI/CD and store releases.",
    portraitNote: "I am most effective when the client experience and the systems behind it need to be considered together.",
    availability: "Open to full-time roles",
    facts: [
      { value: "İzmir", label: "home base", tone: "purple" },
      { value: "2021 → 26", label: "Computer Science at DEU", tone: "lime" },
      { value: "2", label: "apps shipped to both stores", tone: "amber" },
      { value: "60+", label: "tech events brought to life", tone: "blue" },
    ],
    storyKicker: "How I work",
    storyTitle: "Three principles I bring to product work.",
    story: [
      {
        title: "Work across boundaries.",
        body: "On Sano AI, my work covered the mobile client, billing events, entitlements and the React web application. That context helps me make better decisions at each layer.",
      },
      {
        title: "Treat operations as engineering work.",
        body: "CI/CD, monitoring, secrets and store review directly affect reliability. I include them in delivery rather than treating them as follow-up tasks.",
      },
      {
        title: "Communicate and coordinate.",
        body: "Co-founding BBT İzmir and leading a student community gave me practical experience coordinating partners, speakers, volunteers and event operations.",
      },
    ],
    notesKicker: "Working preferences",
    notesTitle: "What I value in engineering work.",
    notes: [
      "Clear ownership from implementation through release.",
      "Observable systems and actionable production feedback.",
      "Product decisions grounded in user and operational context.",
      "Direct communication and documented trade-offs.",
    ],
    communityKicker: "Beyond code",
    communityTitle: "Community and leadership experience.",
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
      degree: "B.Sc. Computer Science",
      school: "Dokuz Eylül University, İzmir",
      period: "2021 — 2026",
    },
    skillsCta: {
      kicker: "The technical side",
      title: "Technical experience and production context.",
      note: "The capabilities page maps tools to the work I completed with them.",
      cta: "See capabilities",
    },
    contactCta: {
      kicker: "Contact",
      title: "Open to product engineering opportunities.",
      cta: "Get in touch",
    },
  },
  contact: {
    kicker: "Contact",
    title: "Get in touch.",
    lead: "For product engineering roles or focused collaborations, email is the fastest way to reach me.",
    email: LINKS.email,
    ctaEmail: "Send a mail",
    ctaGithub: "GitHub",
    ctaLinkedin: "LinkedIn",
    ctaCV: "Open CV",
  },
  chat: {
    kicker: "Portfolio assistant",
    title: "Chat with Recep",
    lead: "An experimental assistant that answers questions using information from this portfolio. Ask about my work or technical experience.",
    placeholder: "Ask me anything…",
    send: "Send",
    stop: "Stop",
    clear: "Clear",
    empty: "No messages yet — start with one of these:",
    starters: ["Introduce yourself", "What's your favourite project?", "How do you build products?"],
    disclaimer: "This is an AI assistant using portfolio content, not Recep himself.",
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
      role: "Mobile and backend development",
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
      tags: ["Live", "iOS + Android", "Backend integrations"],
      summary:
        "Sano AI is a health-assistant product available on iOS, Android and the web. My work covered the Flutter client, backend integrations, subscription state, release operations and production support.",
      features: [
        { title: "Cross-platform client", desc: "A shared Flutter codebase delivered to iOS and Android." },
        { title: "Guided user flows", desc: "Responsive, localized flows for symptoms, reports and account state." },
        { title: "Subscription access", desc: "Store purchases are synchronized with backend entitlements." },
        { title: "Notifications and reminders", desc: "Push and reminder flows connected to product state." },
        { title: "Production operations", desc: "Monitoring, incident investigation and post-release fixes." },
      ],
      preview: { variant: "phone", images: ["sano-1", "sano-2", "sano-3"], placeholder: "App preview" },
      problem:
        "The main engineering challenge was keeping subscription and entitlement state consistent across two stores, backend services and multiple clients while supporting reliable releases.",
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
        "Subscription state needs an event-driven source of truth, explicit reconciliation paths and monitoring for edge cases such as refunds and grace periods.",
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
        "Revna is an AI-assisted skincare routine product for iOS and Android. I worked on the Flutter application, API-driven flows, localization, reminders, privacy controls and the Supabase-backed production system.",
      features: [
        { title: "Guided mobile flows", desc: "API-driven onboarding, routine and user-state experiences in Flutter." },
        { title: "Localization", desc: "Product copy and flows prepared for multiple languages." },
        { title: "Reminders", desc: "Scheduled product interactions connected to routine state." },
        { title: "Privacy controls", desc: "User-facing consent, storage and deletion controls." },
        { title: "Store delivery", desc: "Production builds, review requirements and post-release updates." },
      ],
      preview: { variant: "phone", images: ["revna-1", "revna-2", "revna-3", "revna-4"], placeholder: "App preview" },
      problem:
        "The product needed to coordinate guided mobile flows, user state, reminders and privacy-sensitive data across the Flutter client and Supabase services.",
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
        "Privacy requirements are most effective when reflected in product defaults, user controls and the data layer together.",
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
      role: "Frontend and delivery setup",
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
        "The web client needed a maintainable frontend foundation and a repeatable deployment path with environment-specific configuration.",
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
        "A small web product benefits early from repeatable deploys, explicit environment configuration and disciplined secrets management.",
      stores: [{ label: "chat.sanoapp.ai", href: LINKS.sano }],
    },
  ],
  footer: {
    built: "Designed and built by Recep Özgür Mıh.",
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
    title: "Recep Özgür Mıh — Product Engineer",
    description:
      "Flutter, TypeScript, Node.js ve React ile mobile, backend ve web ürünleri geliştiren; release ve production süreçlerinde çalışan Product Engineer.",
  },
  marquee: [
    "Flutter", "Dart", "Firebase", "GCP", "Pub/Sub", "Cloud Functions",
    "Supabase", "Edge Functions", "PostgreSQL", "React", "Vite", "RTDN",
    "CI/CD", "Crashlytics", "Webhooks", "App Store", "Play Console",
  ],
  paint: {
    kicker: "Development → production",
    title: "Development, release ve production desteği.",
    sub: "Mobile client, backend servisleri, subscription state, store release ve monitoring süreçlerinde çalışıyorum.",
    steps: [
      { k: "01", title: "Ürünü şekillendir", desc: "Kullanıcı değeri, akışlar ve mobil deneyim" },
      { k: "02", title: "Sistemi bağla", desc: "Backend, AI, ödeme ve gerçek zamanlı state" },
      { k: "03", title: "Yayına çıkar", desc: "CI/CD, App Store ve Google Play" },
      { k: "04", title: "Production'da tut", desc: "Crash-free rate, monitoring ve post-release iyileştirmeler" },
    ],
  },
  nav: {
    work: "İşler",
    profile: "Profil",
    skills: "Yetenekler",
    about: "Hakkımda",
    academic: "Akademik",
    contact: "İletişim",
    chat: "Sohbet",
    labs: "Labs",
  },
  hero: {
    pill: "Product Engineer · Mobile / Backend / Web",
    status: "Full-time rollere açık",
    name: "Recep Özgür Mıh",
    headline: "Canlıya çıkan ürünler geliştiriyorum.",
    sub: "Flutter app'lerden TypeScript ve Node.js servislerine, subscription sistemlerinden store release'e kadar production ürünlerinde çalışıyorum.",
    ctaWork: "Seçili işleri gör",
    ctaContact: "İletişim",
    ctaCV: "CV'yi görüntüle",
    location: "İzmir · Remote",
  },
  stats: {
    kicker: "Product metrics",
    title: "Production'daki sonuçlar.",
    items: [
      { value: "5.000+", label: "indirme", tone: "amber" },
      { value: "4.7 / 5", label: "store rating", tone: "white" },
      { value: "%99.9", label: "crash-free users", tone: "blue" },
      { value: "150K+", label: "App Store impressions", tone: "soft" },
      { value: "2", label: "her iki mağazada yayında", tone: "coral" },
      { value: "60+", label: "düzenlenen etkinlik", tone: "lime" },
    ],
  },
  featured: {
    kicker: "Seçili işler",
    title: "Yayındaki projeler.",
    note: "Her projede rolümü, çalıştığım sistemleri ve yayın sonrası sonucu özetledim.",
    all: "Tüm işler",
  },
  capsTeaser: {
    kicker: "Engineering scope",
    title: "Mobile client, backend servisleri ve release süreçleri.",
    more: "Teknik deneyimi gör",
    groups: [],
  },
  homeContact: {
    kicker: "İletişim",
    title: "Product Engineer rolleri ve odaklı iş birliklerine açığım.",
    cta: "İletişime geç",
  },
  workIndex: {
    kicker: "İşler",
    title: "Yayındaki projeler.",
    note: "Mobile app'ler, backend flow'ları ve web delivery. Her proje katkımı ve çalışma bağlamını açıklıyor.",
  },
  skillsPage: {
    kicker: "Yetenekler",
    title: "Mobile, backend ve product operations.",
    note: "Deneyimim Flutter client'ları, TypeScript ve Node.js servisleri, subscription infrastructure, data flow'ları, CI/CD ve store release süreçlerini kapsıyor.",
    depthKicker: "Production depth",
    depthTitle: "Tech stack, sorumluluk ve production deneyimi.",
    depthNote: "Seviyeler, her alanı production ürünlerinde hangi kapsamda kullandığımı özetliyor.",
    scale: ["Keşif", "Temel", "Hands-on", "İleri", "Production"],
    skills: [
      {
        name: "Flutter / Dart",
        category: "Mobil",
        level: 5,
        levelLabel: "Production",
        proof: "İki cross-platform app, App Store ve Google Play'de yayında",
        tone: "amber",
      },
      {
        name: "Subscriptions & entitlements",
        category: "Subscriptions & AI",
        level: 5,
        levelLabel: "Production",
        proof: "Google Play Billing, RTDN ve App Store Server Notifications",
        tone: "coral",
      },
      {
        name: "GCP / Firebase",
        category: "Backend & altyapı",
        level: 4,
        levelLabel: "İleri",
        proof: "Pub/Sub, Cloud Functions, auth, data ve production monitoring",
        tone: "blue",
      },
      {
        name: "CI/CD & Store Release",
        category: "Release & Operations",
        level: 5,
        levelLabel: "Production",
        proof: "Pipeline, secrets, store review ve production release'ler",
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
        category: "Release & Operations",
        level: 4,
        levelLabel: "İleri",
        proof: "chat.sanoapp.ai: empty repo → production",
        tone: "amber",
      },
      {
        name: "AI integration / local LLMs",
        category: "Subscriptions & AI",
        level: 3,
        levelLabel: "Hands-on",
        proof: "Product integration, Mistral ve Qwen research",
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
    features: "Ürün kapsamı",
    problem: "Üstlendiğim problem",
    build: "Ne yaptım",
    architecture: "Mimari",
    stack: "Stack",
    metrics: "Sayılar",
    learnings: "Teknik çıkarım",
    stores: "Yayında",
    next: "Sonraki proje",
    role: "Rol",
    appPreview: "Uygulama önizlemesi",
    webPreview: "Web önizlemesi",
    soon: "Görsel gelecek",
  },
  about: {
    kicker: "Hakkımda",
    title: "Development'tan production desteğine kadar sorumluluk alıyorum.",
    lead: "İzmir'de yaşayan bir Product Engineer'ım. Son dönemde Flutter app'ler, TypeScript ve Node.js servisleri, subscription flow'ları, database'ler, CI/CD ve store release süreçleri üzerinde çalışıyorum.",
    portraitNote: "İstemci deneyimiyle arkasındaki sistemlerin birlikte ele alınması gereken işlerde daha etkiliyim.",
    availability: "Tam zamanlı rollere açık",
    facts: [
      { value: "İzmir", label: "yaşadığım ve ürettiğim şehir", tone: "purple" },
      { value: "2021 → 26", label: "DEÜ Bilgisayar Bilimleri", tone: "lime" },
      { value: "2", label: "iki mağazada yayındaki uygulama", tone: "amber" },
      { value: "60+", label: "hayata geçen teknoloji etkinliği", tone: "blue" },
    ],
    storyKicker: "Çalışma biçimim",
    storyTitle: "Ürün geliştirirken izlediğim üç ilke.",
    story: [
      {
        title: "Katmanlar arasında çalışmak.",
        body: "Sano AI'da mobil istemci, ödeme event'leri, entitlement sistemi ve React web uygulaması üzerinde çalıştım. Bu bağlam, her katmanda daha doğru karar vermemi sağlıyor.",
      },
      {
        title: "Operasyonu mühendisliğin parçası görmek.",
        body: "CI/CD, monitoring, secrets ve mağaza incelemesi ürün güvenilirliğini doğrudan etkiliyor. Bunları sonradan yapılacak işler olarak görmüyorum.",
      },
      {
        title: "İletişim ve koordinasyon.",
        body: "BBT İzmir'in kurucu ortaklığı ve öğrenci topluluğu liderliği; partner, konuşmacı, gönüllü ve etkinlik operasyonlarını koordine etme deneyimi kazandırdı.",
      },
    ],
    notesKicker: "Çalışma tercihleri",
    notesTitle: "Mühendislik işinde önem verdiğim noktalar.",
    notes: [
      "Geliştirmeden yayına kadar net sorumluluk alanı.",
      "İzlenebilir sistemler ve aksiyona dönüşen canlı ortam verisi.",
      "Kullanıcı ve operasyon bağlamına dayanan ürün kararları.",
      "Doğrudan iletişim ve belgelenmiş teknik tercihler.",
    ],
    communityKicker: "Kodun ötesi",
    communityTitle: "Topluluk ve liderlik deneyimi.",
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
      degree: "Bilgisayar Bilimleri Lisans",
      school: "Dokuz Eylül Üniversitesi, İzmir",
      period: "2021 — 2026",
    },
    skillsCta: {
      kicker: "Teknik taraf",
      title: "Teknik deneyim ve canlı ürün bağlamı.",
      note: "Yetenekler sayfası kullandığım araçları, onlarla tamamladığım işlerle eşliyor.",
      cta: "Yetenekleri gör",
    },
    contactCta: {
      kicker: "İletişim",
      title: "Product Engineer fırsatlarına açığım.",
      cta: "İletişime geç",
    },
  },
  contact: {
    kicker: "İletişim",
    title: "İletişime geçin.",
    lead: "Product Engineer rolleri veya odaklı iş birlikleri için bana en hızlı e-posta ile ulaşabilirsiniz.",
    email: LINKS.email,
    ctaEmail: "Mail at",
    ctaGithub: "GitHub",
    ctaLinkedin: "LinkedIn",
    ctaCV: "CV'yi aç",
  },
  chat: {
    kicker: "Portfolyo asistanı",
    title: "Recep ile sohbet et",
    lead: "Bu portfolyodaki bilgilere göre yanıt veren deneysel bir asistan. Projelerimi veya teknik deneyimimi sorabilirsiniz.",
    placeholder: "Aklına takılanı sor…",
    send: "Gönder",
    stop: "Dur",
    clear: "Temizle",
    empty: "Henüz mesaj yok — şunlardan biriyle başla:",
    starters: ["Kendini tanıt", "En sevdiğin proje ne?", "Nasıl ürün geliştiriyorsun?"],
    disclaimer: "Bu, portfolyo içeriğini kullanan bir AI asistanıdır; Recep'in kendisi değildir.",
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
      title: "Mobile",
      tone: "amber",
      items: [
        "Flutter / Dart, production iOS ve Android app'ler",
        "Bloc · Provider · MobX",
        "FCM, push notifications, localization",
        "Crashlytics ve production monitoring",
      ],
    },
    {
      k: "02",
      title: "Backend & Infrastructure",
      tone: "blue",
      items: [
        "GCP — Pub/Sub, Cloud Functions",
        "Supabase, Edge Functions",
        "PostgreSQL / SQL, database triggers",
        "REST APIs ve webhooks",
      ],
    },
    {
      k: "03",
      title: "Subscriptions & AI",
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
      title: "Release & Operations",
      tone: "lime",
      items: [
        "CI/CD, environment config, secrets",
        "App Store / Play review & release",
        "Empty repo → production",
        "Monitoring, incident investigation, post-release fixes",
      ],
    },
  ],
  projects: [
    {
      slug: "sano-ai",
      mascot: "sano",
      name: "Sano AI",
      tagline: "iOS & Android için AI sağlık asistanı",
      role: "Mobile & Backend Development",
      year: "2025",
      stack: ["Flutter", "Firebase", "GCP", "Pub/Sub", "Cloud Functions", "RTDN"],
      metrics: [
        { value: "5.000+", label: "indirme" },
        { value: "4.7 / 5", label: "store rating" },
        { value: "%99.9", label: "crash-free users" },
        { value: "150K+", label: "App Store impressions" },
      ],
      blurb:
        "Mobile app'i release ettim; ardından iki store için subscription ve entitlement backend flow'larını geliştirdim.",
      tags: ["Production", "iOS + Android", "Backend integrations"],
      summary:
        "Sano AI; iOS, Android ve web üzerinde çalışan bir sağlık asistanı ürünü. Flutter client, backend integrations, subscription state, release süreçleri ve production support tarafında çalıştım.",
      features: [
        { title: "Cross-platform client", desc: "iOS ve Android'e release edilen ortak Flutter codebase." },
        { title: "Yönlendirmeli akışlar", desc: "Belirti, rapor ve hesap durumu için duyarlı ve lokalize akışlar." },
        { title: "Subscription access", desc: "Store purchases, backend entitlement state ile senkronize ediliyor." },
        { title: "Notifications & reminders", desc: "Product state'e bağlı push ve reminder flow'ları." },
        { title: "Production operations", desc: "Monitoring, incident investigation ve post-release fixes." },
      ],
      preview: { variant: "phone", images: ["sano-1", "sano-2", "sano-3"], placeholder: "Uygulama önizlemesi" },
      problem:
        "Temel engineering challenge; iki store, backend servisleri ve birden fazla client arasında subscription ve entitlement state'i tutarlı tutarken güvenilir release'ler sağlamaktı.",
      build: [
        "Flutter app'i iOS ve Android için geliştirip release ettim.",
        "Google Play Billing ve App Store Server Notifications üzerinden subscription & entitlement flow'larını kurdum.",
        "Google Play RTDN + Pub/Sub + Cloud Functions + webhooks ile entitlement state'i real-time senkronize ettim.",
        "Web client chat.sanoapp.ai'ı kendi CI/CD pipeline'ıyla empty repo'dan kurdum.",
      ],
      architecture: [
        "Flutter client → Firebase auth/data",
        "Mağaza olayları → RTDN / App Store Server Notifications",
        "→ Pub/Sub → Cloud Functions → entitlement store",
        "Edge cases → webhook reconciliation + monitoring",
      ],
      learnings:
        "Subscription state için event-driven bir source of truth, açık reconciliation flow'ları ve refund ile grace period gibi edge case'leri izleyen monitoring gerekiyor.",
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
      role: "Mobile Developer",
      year: "2025",
      stack: ["Flutter", "Supabase", "Edge Functions", "PostgreSQL"],
      metrics: [
        { value: "iOS + Android", label: "yayında" },
        { value: "AI destekli", label: "rutinler" },
        { value: "Gizlilik öncelikli", label: "tasarım" },
      ],
      blurb:
        "Her iki mağazada AI destekli cilt bakım koçu — yönlendirmeli akışlar, hatırlatıcılar, lokalizasyon ve gizlilik öncelikli kontroller.",
      tags: ["Production", "Privacy-first", "Both stores"],
      summary:
        "Revna, iOS ve Android için AI destekli bir skincare routine ürünü. Flutter app, API-driven flow'lar, localization, reminders, privacy controls ve Supabase tabanlı production sistemde çalıştım.",
      features: [
        { title: "Yönlendirmeli mobil akışlar", desc: "Flutter ile API tabanlı onboarding, rutin ve kullanıcı durumu deneyimleri." },
        { title: "Lokalizasyon", desc: "Birden fazla dil için hazırlanmış ürün metinleri ve akışlar." },
        { title: "Hatırlatıcılar", desc: "Rutin durumuna bağlı planlı ürün etkileşimleri." },
        { title: "Gizlilik kontrolleri", desc: "Kullanıcıya açık onay, saklama ve silme seçenekleri." },
        { title: "Store release", desc: "Production build'leri, review requirements ve post-release updates." },
      ],
      preview: { variant: "phone", images: ["revna-1", "revna-2", "revna-3", "revna-4"], placeholder: "Uygulama önizlemesi" },
      problem:
        "Flutter client ile Supabase servisleri arasında guided flow'ları, user state'i, reminders ve privacy-sensitive data'yı koordine etmek gerekiyordu.",
      build: [
        "Flutter'da API odaklı mobil özellikler geliştirdim: yönlendirmeli akışlar, kullanıcı state'i, hatırlatıcılar.",
        "Tam lokalizasyon ve gizlilik öncelikli kullanıcı kontrolleri ekledim.",
        "Production backend flow'larını Supabase üzerinde geliştirdim — Edge Functions, PostgreSQL/SQL ve database triggers.",
        "Store release süreçlerini App Store Connect ve Play Console'da yönettim.",
      ],
      architecture: [
        "Flutter client → Supabase (auth, data)",
        "AI yönlendirme mantığı için Edge Functions",
        "Hatırlatıcı & state için Postgres trigger'ları",
        "Gizlilik kontrolleri veri katmanında",
      ],
      learnings:
        "Gizlilik gereksinimleri; ürün varsayımlarına, kullanıcı kontrollerine ve veri katmanına birlikte yansıtıldığında daha etkili oluyor.",
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
      role: "Frontend & Delivery",
      year: "2025",
      stack: ["React", "Vite", "CI/CD", "Environment config"],
      metrics: [
        { value: "0 → prod", label: "CI/CD hattı" },
        { value: "React + Vite", label: "frontend" },
      ],
      blurb:
        "Sano AI'ın web client'ı — frontend, CI/CD, environment config ve secrets, empty repo'dan production'a taşındı.",
      tags: ["Live on web", "0 → prod", "CI/CD"],
      summary:
        "chat.sanoapp.ai, Sano AI'ın web client'ı. Frontend'i empty repo'dan kurdum; CI/CD pipeline, environment config ve secrets management ile production'a taşıdım.",
      features: [
        { title: "Tarayıcıda Sano AI", desc: "Uygulamanın belirti kontrolü ve tahlil çözücüsü, kurulum gerektirmeden." },
        { title: "React + Vite frontend", desc: "Sıfırdan kurulmuş modern single-page application." },
        { title: "0 → production pipeline", desc: "Repeatable deploy için CI/CD, environment config ve secrets." },
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
        "Web client için maintainable bir frontend foundation ve environment-specific config'e sahip repeatable deployment flow gerekiyordu.",
      build: [
        "React + Vite frontend'i sıfırdan kurdum.",
        "CI/CD, environment config ve secrets management'ı oturttum.",
        "Repeatable bir 0-to-production deploy flow kurdum.",
      ],
      architecture: [
        "React + Vite SPA",
        "CI/CD hattı → otomatik deploy",
        "Ortama göre config & secrets",
      ],
      learnings:
        "Küçük bir web ürünü bile repeatable deploy, explicit environment config ve düzenli secrets management'tan erken aşamada fayda görüyor.",
      stores: [{ label: "chat.sanoapp.ai", href: LINKS.sano }],
    },
  ],
  footer: {
    built: "Recep Özgür Mıh tarafından tasarlandı ve geliştirildi.",
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
