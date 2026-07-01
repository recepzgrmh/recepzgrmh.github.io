/* ----------------------------------------------------------------------------
   Mascot voice. ALL scripted — no LLM here (fast, free, never hallucinates).
   Tone: warm, a little "kanka", doesn't take itself too seriously, but precise
   and serious on the technical bits. Few emojis. No empty "AI vibe" lines.
---------------------------------------------------------------------------- */
import type { Lang } from "../../i18n/content";

export type Pose =
  | "idle"
  | "wave"
  | "point"
  | "think"
  | "talk"
  | "surprised"
  | "panic"
  | "dizzy"
  | "serious";

export interface Line {
  text: string;
  pose?: Pose;
}

export interface LineBook {
  greet: Line;
  /** keyed by data-mascot="<key>" */
  hover: Record<string, Line>;
  click: Record<string, Line>;
  /** keyed by <body data-page="<key>">, said on navigation */
  page: Record<string, Line>;
  drag: { start: Line[]; fast: Line[] };
  thrown: Line[];
  recover: Line[];
  /** occasional self-talk when idle for a while */
  idle: Line[];
  /** said when re-hovering something already seen (kept tiny) */
  repeat: Line[];
  /** poking the mascot itself */
  poke: Line[];
  /** scrolling the page too fast */
  scrollFast: Line[];
  /** said when returning to the tab — time-of-day aware */
  timeGreet: { morning: Line; afternoon: Line; evening: Line; night: Line };
}

const EN: LineBook = {
  greet: { text: "Hey — I'm Recep. Have a poke around.", pose: "wave" },
  hover: {
    cv: { text: "Hit this for the formal version of me.", pose: "point" },
    work: { text: "These aren't demos — they're live.", pose: "point" },
    sano: { text: "Sano's the real one. 5k+ installs, 4.7 stars.", pose: "point" },
    revna: { text: "Skincare coach, both stores. Quietly proud of it.", pose: "talk" },
    chat: { text: "Stood this whole web app up from an empty repo.", pose: "talk" },
    skills: { text: "Mobile, backend, AI and shipping — one product mind.", pose: "serious" },
    academic: { text: "This is where the theory met the things I build.", pose: "think" },
    community: { text: "I get people in rooms too, not just code.", pose: "talk" },
    contact: { text: "This is the part where we talk.", pose: "point" },
    github: { text: "Bit messy in there. That's real life.", pose: "talk" },
    linkedin: { text: "The tie-and-jacket channel.", pose: "talk" },
    lang: { text: "Going global, are we?", pose: "talk" },
    paint: { text: "Okay — did the whole page just turn red?", pose: "surprised" },
  },
  click: {
    cv: { text: "Switching to corporate mode.", pose: "serious" },
    contact: { text: "Good. Let's actually talk.", pose: "wave" },
    sano: { text: "Numbers are the real flex here.", pose: "point" },
    github: { text: "Off you go.", pose: "talk" },
    linkedin: { text: "See you on the other side.", pose: "talk" },
    lang: { text: "Globalizing, apparently.", pose: "talk" },
  },
  page: {
    home: { text: "Welcome — pick a project, poke around.", pose: "wave" },
    work: { text: "All of it's here. The numbers are real.", pose: "point" },
    "project:sano-ai": { text: "This is the big one. Check the metrics.", pose: "point" },
    "project:revna": { text: "Quietly proud of this one.", pose: "talk" },
    "project:chat-sanoapp-ai": { text: "Built this from an empty repo.", pose: "talk" },
    about: { text: "Okay, the human bits.", pose: "talk" },
    "academic-life": { text: "Scroll slowly — this one tells itself.", pose: "think" },
    contact: { text: "Here's where we talk.", pose: "wave" },
  },
  drag: {
    start: [
      { text: "Whoa — where are you taking me?", pose: "panic" },
      { text: "Okay okay, I'm coming.", pose: "panic" },
    ],
    fast: [
      { text: "Easy! This isn't a deploy.", pose: "panic" },
      { text: "Slow down, I bruise.", pose: "panic" },
    ],
  },
  thrown: [
    { text: "I did not deserve that.", pose: "dizzy" },
    { text: "There goes my crash-free rate.", pose: "dizzy" },
    { text: "Noted. You're a tester.", pose: "dizzy" },
  ],
  recover: [
    { text: "...okay, we're back up.", pose: "idle" },
    { text: "Reconnected. No data lost.", pose: "idle" },
  ],
  idle: [
    { text: "Still here. Go see the work.", pose: "idle" },
    { text: "Take your time.", pose: "idle" },
  ],
  repeat: [
    { text: "Yeah, that one.", pose: "talk" },
    { text: "Told you.", pose: "talk" },
  ],
  poke: [
    { text: "What's the poking for?", pose: "surprised" },
    { text: "I'm right here — go check the work.", pose: "point" },
    { text: "Okay okay, I'm awake.", pose: "talk" },
    { text: "Poke the projects, not me.", pose: "talk" },
  ],
  scrollFast: [
    { text: "Easy — the page isn't going anywhere.", pose: "surprised" },
    { text: "Whoa, where's the fire?", pose: "surprised" },
  ],
  timeGreet: {
    morning: { text: "Morning — grab a coffee, let's go.", pose: "wave" },
    afternoon: { text: "Afternoon. Welcome back.", pose: "wave" },
    evening: { text: "Evening — good time to browse a portfolio.", pose: "wave" },
    night: { text: "This late? Respect. Look around.", pose: "talk" },
  },
};

const TR: LineBook = {
  greet: { text: "Selam — ben Recep. Şöyle bir kurcala bakalım.", pose: "wave" },
  hover: {
    cv: { text: "Buna basarsan resmi tarafımı görüyorsun.", pose: "point" },
    work: { text: "Bunlar demo değil — hepsi yayında.", pose: "point" },
    sano: { text: "Asıl olay Sano. 5 bin+ indirme, 4.7 puan.", pose: "point" },
    revna: { text: "Cilt bakım koçu, iki mağazada da var. Gizli gururum.", pose: "talk" },
    chat: { text: "Bu web app'i boş repodan ayağa kaldırdım.", pose: "talk" },
    skills: { text: "Mobil, backend, AI ve yayın — tek ürün aklı.", pose: "serious" },
    academic: { text: "Teoriyle yaptığım işler burada birbirine bağlanıyor.", pose: "think" },
    community: { text: "Sadece kod değil, insan da topluyorum bir araya.", pose: "talk" },
    contact: { text: "Burası tam konuşma kısmı.", pose: "point" },
    github: { text: "İçerisi biraz dağınık. Gerçek hayat işte.", pose: "talk" },
    linkedin: { text: "Ceket-kravat kanalı burası.", pose: "talk" },
    lang: { text: "Globalleşiyoruz galiba.", pose: "talk" },
    paint: { text: "Oha — bütün sayfa bir anda kırmızı oldu.", pose: "surprised" },
  },
  click: {
    cv: { text: "Kurumsal moda geçiyorum.", pose: "serious" },
    contact: { text: "Güzel. Hadi gerçekten konuşalım.", pose: "wave" },
    sano: { text: "Asıl flex sayılarda kanka.", pose: "point" },
    github: { text: "Hadi bakalım.", pose: "talk" },
    linkedin: { text: "Öbür tarafta görüşürüz.", pose: "talk" },
    lang: { text: "Globalleşmişiz anlaşılan.", pose: "talk" },
  },
  page: {
    home: { text: "Hoş geldin — bir projeye gir, kurcala.", pose: "wave" },
    work: { text: "Hepsi burada. Sayılar gerçek.", pose: "point" },
    "project:sano-ai": { text: "Asıl büyük olay bu. Metriklere bak.", pose: "point" },
    "project:revna": { text: "Bunun gizli gururum.", pose: "talk" },
    "project:chat-sanoapp-ai": { text: "Bunu boş repodan kurdum.", pose: "talk" },
    about: { text: "Tamam, insani kısımlar.", pose: "talk" },
    "academic-life": { text: "Yavaş kaydır kanka, bu hikâye kendi anlatıyor.", pose: "think" },
    contact: { text: "İşte tam konuşma yeri.", pose: "wave" },
  },
  drag: {
    start: [
      { text: "Hop — nereye götürüyorsun beni?", pose: "panic" },
      { text: "Tamam tamam, geliyorum.", pose: "panic" },
    ],
    fast: [
      { text: "Yavaş kanka, deploy değil bu.", pose: "panic" },
      { text: "Sakin, ben de morarıyorum.", pose: "panic" },
    ],
  },
  thrown: [
    { text: "Bunu hak etmedim.", pose: "dizzy" },
    { text: "Crash-free oranım düştü kanka.", pose: "dizzy" },
    { text: "Not aldım. Sen bir tester'sın.", pose: "dizzy" },
  ],
  recover: [
    { text: "...tamam, yine ayaktayız.", pose: "idle" },
    { text: "Bağlandık. Veri kaybı yok.", pose: "idle" },
  ],
  idle: [
    { text: "Buradayım. Şu işlere bir bak.", pose: "idle" },
    { text: "Acele yok, takıl.", pose: "idle" },
  ],
  repeat: [
    { text: "He, o işte.", pose: "talk" },
    { text: "Demiştim.", pose: "talk" },
  ],
  poke: [
    { text: "Ne dürtüyorsun kanka?", pose: "surprised" },
    { text: "Buradayım, sen işlere baksana.", pose: "point" },
    { text: "Tamam tamam, uyandım.", pose: "talk" },
    { text: "Beni değil, projeleri dürt.", pose: "talk" },
  ],
  scrollFast: [
    { text: "Yavaş kanka, sayfa kaçmıyor.", pose: "surprised" },
    { text: "Hop, nereye bu hız?", pose: "surprised" },
  ],
  timeGreet: {
    morning: { text: "Günaydın — kahveyi al, başlayalım.", pose: "wave" },
    afternoon: { text: "İyi günler, hoş geldin.", pose: "wave" },
    evening: { text: "İyi akşamlar — portföy gezmenin tam vakti.", pose: "wave" },
    night: { text: "Bu saatte mi? Helal. Gez bakalım.", pose: "talk" },
  },
};

const BOOKS: Record<Lang, LineBook> = { en: EN, tr: TR };

export function getLineBook(lang: Lang): LineBook {
  return BOOKS[lang] ?? EN;
}

export function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}
