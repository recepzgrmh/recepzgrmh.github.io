/* ----------------------------------------------------------------------------
   mascotChat — the ONE place the mascot chat talks to a model.

   Recep is fine-tuning an open model (Qwen-7B-Instruct) on his own messages so the
   mascot talks like him. That model isn't wired up yet, so this file has two modes:

   • LIVE  — if PUBLIC_MASCOT_CHAT_URL is set, stream from an OpenAI-compatible
             chat-completions endpoint (Ollama / vLLM / LM Studio / TGI all expose
             this). Set PUBLIC_MASCOT_CHAT_MODEL to the served model name.
   • DEMO  — otherwise, stream a few Recep-flavoured canned replies so the whole UI
             is usable today. Flip to LIVE later with zero UI changes — just env.

   env (see .env.example):
     PUBLIC_MASCOT_CHAT_URL=http://localhost:11434/v1/chat/completions
     PUBLIC_MASCOT_CHAT_MODEL=recep-qwen
---------------------------------------------------------------------------- */
import type { Lang } from "../../i18n/content";

export type ChatRole = "system" | "user" | "assistant";
export interface ChatMsg {
  role: ChatRole;
  content: string;
}

const ENDPOINT = (import.meta.env.PUBLIC_MASCOT_CHAT_URL as string | undefined)?.trim();
const MODEL =
  (import.meta.env.PUBLIC_MASCOT_CHAT_MODEL as string | undefined)?.trim() || "recep";

/** true when a real endpoint is configured — the UI shows a demo note when false. */
export const isLive = Boolean(ENDPOINT);

/** Light persona nudge. The fine-tuned model carries the real style; this just frames it. */
export function persona(lang: Lang): string {
  return lang === "tr"
    ? "Sen Recep Özgür Mıh'sın — İzmir'den bir mobil & yapay zekâ ürün mühendisi. " +
        "Sıcak ve samimi konuşursun ('kanka' havası), kısa tutarsın, teknik konuda net ve " +
        "doğru olursun. Sano AI ve Revna'yı sen yaptın. Bilmediğinde uydurmazsın. " +
        "Kullanıcının dilinde yanıt ver."
    : "You are Recep Özgür Mıh — a mobile & AI product engineer from İzmir. You speak warmly " +
        "and casually, keep it short, and get precise and correct when it matters. You built " +
        "Sano AI and Revna. You don't make things up. Reply in the user's language.";
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * Stream the assistant reply as a sequence of text deltas.
 * Works the same for the UI whether we're LIVE or DEMO.
 */
export async function* streamReply(
  history: ChatMsg[],
  lang: Lang,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  if (!ENDPOINT) {
    yield* demoStream(history, lang, signal);
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.7,
      messages: [{ role: "system", content: persona(lang) }, ...history],
    }),
    signal,
  });

  if (!res.ok || !res.body) throw new Error(`chat request failed (${res.status})`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Server-Sent Events: lines like `data: {json}` separated by blank lines.
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const raw of lines) {
      const line = raw.trim();
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const json = JSON.parse(data);
        const choice = json.choices?.[0];
        const delta: string = choice?.delta?.content ?? choice?.message?.content ?? "";
        if (delta) yield delta;
      } catch {
        /* keep-alive / partial chunk — ignore */
      }
    }
  }
}

/* ------------------------------ demo mode -------------------------------- */

async function* demoStream(
  history: ChatMsg[],
  lang: Lang,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  const lastUser = [...history].reverse().find((m) => m.role === "user")?.content ?? "";
  const reply = demoReply(lastUser, lang);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  await sleep(reduce ? 0 : 260); // tiny "thinking" beat
  // stream word by word so it feels alive
  const parts = reply.match(/\S+\s*/g) ?? [reply];
  for (const part of parts) {
    if (signal?.aborted) return;
    yield part;
    if (!reduce) await sleep(28);
  }
}

function demoReply(input: string, lang: Lang): string {
  const q = input.toLocaleLowerCase(lang === "tr" ? "tr" : "en");
  const has = (...keys: string[]) => keys.some((k) => q.includes(k));
  const tr = lang === "tr";

  let body: string;
  if (has("selam", "merhaba", "hey", "hi", "hello", "naber")) {
    body = tr
      ? "Selam kanka! Ben Recep. Aklına takılanı sor — projeler, nasıl kod yazarım, ne yaparım…"
      : "Hey! I'm Recep. Ask me anything — my projects, how I build, what I do…";
  } else if (has("proje", "project", "sano", "revna", "iş", "work")) {
    body = tr
      ? "Sano AI ve Revna'yı baştan sona kurdum — mobil, backend, faturalandırma ve AI katmanı. " +
        "İkisi de mağazalarda yayında, gerçek kullanıcıları var."
      : "I built Sano AI and Revna end to end — mobile, backend, billing and the AI layer. " +
        "Both are live in the stores with real users.";
  } else if (has("skill", "yeten", "stack", "teknoloji", "tech", "nasıl", "how")) {
    body = tr
      ? "Flutter/Dart tarafı güçlü; backend'de GCP, Firebase, Supabase; bir de AI entegrasyonu. " +
        "Tek bir ürün kafasıyla fikirden mağazaya götürmeyi severim."
      : "Strong on Flutter/Dart; backend with GCP, Firebase, Supabase; plus the AI layer. " +
        "I like taking a product from idea to the store with one product mind.";
  } else {
    body = tr
      ? "Güzel soru. Gerçek 'Recep modeli' bağlanınca bunu kendi tarzımla, detaylıca yanıtlarım."
      : "Good question. Once the real 'Recep model' is wired up I'll answer this properly, in my own voice.";
  }

  const note = tr
    ? "\n\n(şimdilik demo — kendi verimle eğittiğim model yakında bağlanacak.)"
    : "\n\n(demo for now — the model I'm fine-tuning on my own data connects soon.)";
  return body + note;
}
