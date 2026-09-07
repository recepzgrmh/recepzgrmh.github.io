interface Env {
  DB: D1Database;
  UPLOADS: R2Bucket;
  ALLOWED_EMAILS: string;
  MAX_UPLOAD_BYTES: string;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  GITHUB_TOKEN?: string;
  GITHUB_REPOSITORY?: string;
  GITHUB_BRANCH?: string;
  INDEXNOW_KEY?: string;
  INDEXNOW_KEY_LOCATION?: string;
}

type Status = "draft" | "review" | "approved" | "scheduled" | "published";
type Source = { label: string; url: string; note: string };
type InlineVisual = { needed: boolean; slot: number; imageUrl: string; alt: string; caption: string };
type GeneratedBundle = {
  title: string; slug: string; description: string; category: string; tags: string[];
  hook: string; blogMarkdown: string; linkedinPost: string; heroImageUrl: string;
  heroAlt: string; articleType: string; inlineVisuals: InlineVisual[]; sources: Source[]; generationNote: string;
};

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" } });
const now = () => new Date().toISOString();
const allowedStatuses = new Set<Status>(["draft", "review", "approved", "scheduled", "published"]);

function authenticated(request: Request, env: Env) {
  const hostname = new URL(request.url).hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  const email = request.headers.get("Cf-Access-Authenticated-User-Email")?.toLowerCase();
  return Boolean(email && env.ALLOWED_EMAILS.split(",").map((v) => v.trim().toLowerCase()).includes(email));
}

function safeName(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 100) || "icerik";
}

const slugStopWords = new Set(["acaba","ama","ancak","bir","bu","da","de","daha","icin","ile","mi","mu","mı","mü","nasil","neden","ne","olarak","olan","olur","ve","veya","yalnizca"]);

function compactSlug(value: string) {
  const ascii = value.toLowerCase().replace(/[çğıöşü]/g, (letter) => ({ ç:"c", ğ:"g", ı:"i", ö:"o", ş:"s", ü:"u" } as Record<string,string>)[letter] || letter);
  const words = safeName(ascii).split("-").filter((word) => word.length > 1 && !slugStopWords.has(word));
  const chosen: string[] = [];
  for (const word of words) {
    if (!chosen.includes(word)) chosen.push(word);
    if (chosen.length === 5) break;
  }
  while (chosen.join("-").length > 60 && chosen.length > 3) chosen.pop();
  return chosen.join("-") || "teknik-not";
}

function syncLinkedinUrl(post: string, slug: string) {
  const url = `https://recepozgur.com/blog/${slug}/`;
  if (/https:\/\/recepozgur\.com\/blog\/[^\s/]+\/?/i.test(post)) return post.replace(/https:\/\/recepozgur\.com\/blog\/[^\s/]+\/?/gi, url);
  return `${post.trim()}\n\nDaha ayrıntılı okuma: ${url}`;
}

async function uniqueSlug(env: Env, requested: string, excludeId = "") {
  const base = compactSlug(requested); let candidate = base; let suffix = 2;
  while (await env.DB.prepare("SELECT id FROM content_bundles WHERE slug=? AND id<>? LIMIT 1").bind(candidate, excludeId).first()) candidate = `${base.slice(0, 56)}-${suffix++}`;
  return candidate;
}

function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

function bundleFromRow(row: Record<string, unknown>) {
  return { ...row, tags: parseJson(row.tagsJson, []), sources: parseJson(row.sourcesJson, []), inlineVisuals: parseJson(row.inlineVisualsJson, []), tagsJson: undefined, sourcesJson: undefined, inlineVisualsJson: undefined };
}

const selectColumns = `id, title, slug, description, hook, blog_path AS blogPath, blog_markdown AS blogMarkdown,
linkedin_post AS linkedinPost, visual_prompt AS heroImageUrl, hero_alt AS heroAlt, status, category,
tags_json AS tagsJson, sources_json AS sourcesJson, generation_note AS generationNote,
article_type AS articleType, inline_visuals_json AS inlineVisualsJson,
updated_at AS updatedAt, created_at AS createdAt, source_count AS sourceCount,
checks_passed AS checksPassed, checks_total AS checksTotal, visual_url AS visualUrl, published_url AS publishedUrl`;

function extractJson(text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = cleaned.indexOf("{"); const end = cleaned.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("Model geçerli JSON döndürmedi.");
  return JSON.parse(cleaned.slice(start, end + 1));
}

const assetRoles = new Set(["hero", "inline-1", "inline-2"]);
const imageTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml"]);
const imageExtensions: Record<string, string> = { "image/png":"png", "image/jpeg":"jpg", "image/webp":"webp", "image/svg+xml":"svg" };

function directImageUrl(value: unknown) {
  const url = typeof value === "string" ? value.trim() : "";
  if (!/^https:\/\/[^\s<>"']+$/i.test(url) || url.length > 500) return "";
  if (/\.(?:html?|php|aspx?|jsp)(?:$|\?|#)/i.test(url)) return "";
  if (/^https:\/\/(?:[a-z0-9-]+\.)*(?:google|bing|duckduckgo|yandex)\.[a-z.]+\//i.test(url)) return "";
  return url;
}

async function saveAsset(env: Env, bundleId: string, role: string, filename: string, contentType: string, body: ReadableStream | Uint8Array, size: number, alt: string, caption: string) {
  const key = `${safeName(bundleId)}/${Date.now()}-${safeName(filename)}`;
  await env.UPLOADS.put(key, body, { httpMetadata: { contentType, cacheControl: "public, max-age=31536000, immutable" }, customMetadata: { bundleId, role } });
  const assetUrl = `/api/assets/${encodeURIComponent(key)}`;
  await env.DB.prepare("INSERT INTO assets (id,bundle_id,object_key,filename,content_type,size_bytes,role,alt_text,caption,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)")
    .bind(crypto.randomUUID(), bundleId, key, filename, contentType, size, role, alt, caption, now()).run();
  if (role === "hero") await env.DB.prepare("UPDATE content_bundles SET visual_url=?,checks_passed=checks_total,updated_at=? WHERE id=?").bind(assetUrl, now(), bundleId).run();
  else await env.DB.prepare("UPDATE content_bundles SET updated_at=? WHERE id=?").bind(now(), bundleId).run();
  return { key, assetUrl };
}

async function generateBundle(env: Env, topic: string, recentTitles: string[] = []): Promise<GeneratedBundle> {
  if (!env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY secret'ı henüz tanımlı değil.");
  const schema = {
    type: "object", additionalProperties: false, required: ["title","slug","description","category","tags","hook","blogMarkdown","linkedinPost","heroImageUrl","heroAlt","articleType","inlineVisuals","sources","generationNote"],
    properties: {
      title:{type:"string"}, slug:{type:"string"}, description:{type:"string"}, category:{type:"string"}, tags:{type:"array",items:{type:"string"},maxItems:6}, hook:{type:"string"},
      blogMarkdown:{type:"string"}, linkedinPost:{type:"string"}, heroImageUrl:{type:"string"}, heroAlt:{type:"string"}, articleType:{type:"string",enum:["opinion","technical","tutorial","comparison","data","case-study"]},
      inlineVisuals:{type:"array",minItems:2,maxItems:2,items:{type:"object",additionalProperties:false,required:["needed","slot","imageUrl","alt","caption"],properties:{needed:{type:"boolean"},slot:{type:"integer",minimum:1,maximum:2},imageUrl:{type:"string"},alt:{type:"string"},caption:{type:"string"}}}},
      sources:{type:"array",minItems:2,maxItems:12,items:{type:"object",additionalProperties:false,required:["label","url","note"],properties:{label:{type:"string"},url:{type:"string"},note:{type:"string"}}}}, generationNote:{type:"string"}
    }
  };
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString().slice(0, 10);
  const topicBlock = topic
    ? `Konu (kullanıcı yazdı, EN YÜKSEK ÖNCELİK): ${topic}
- Bu konuyu ve kapsamını aynen uygula. Recep'in CV'sine, mobil/backend/ödeme geçmişine veya sevdiğin bir yan konuya kaydırma.`
    : `Konu seçimi — kullanıcı konu vermedi, konuyu SEN bulacaksın ve tek işin şu:
- Web'de arama yap ve ${weekAgo} – ${today} aralığında yazılım ve teknoloji dünyasında EN ÇOK konuşulan tek gelişmeyi bul. Yazıyı o gelişme hakkında yaz.
- Hacker News (news.ycombinator.com), Reddit r/programming ve r/ExperiencedDevs, GitHub Trending, TechCrunch, The Verge, Ars Technica, InfoQ ve ilgili şirketin resmi blogu/changelog'una bak. En az 3 farklı kaynağın aynı hafta içinde konuştuğunu doğrula.
- Bu gerçek bir haber olmalı: bir sürüm, satın alma, güvenlik olayı, lisans değişikliği, outage, benchmark, mahkeme kararı, açık kaynak tartışması. Tarihi ${weekAgo} sonrası olsun.
- Kafandan jenerik konu ÜRETME. Şunlar yasak: "temiz kod", "kariyer tavsiyesi", "yeni başlayanlar için X", "yazılımın geleceği", "AI insanların işini alacak mı", "10 ipucu", "X vs Y" karşılaştırması (o hafta gerçekten tartışılmadıysa).
- generationNote'un ilk cümlesinde şunu yaz: hangi gelişmeyi seçtin, hangi tarihte oldu, bu hafta neden konuşuldu.`;
  const prompt = `Bugünün tarihi ${today}. Web'de gerçekten araştırma yap ve Recep Özgür Mıh'ın kişisel blogu için tek bir Türkçe yayın paketi üret.

${topicBlock}

Son içerik başlıkları (bunları veya çok benzerini seçme): ${recentTitles.length ? recentTitles.join(" | ") : "Henüz yok"}

ARAŞTIRMA
- Önce birinci taraf kaynak: resmi duyuru, changelog, dokümantasyon, engineering blog, mahkeme/kurum belgesi, araştırma makalesi. Sonra iyi teknoloji gazeteciliği.
- Her kaynak için doğrudan HTTPS URL ver; arama sonucu, yönlendirme veya kısaltılmış link verme.
- Kaynağın söylemediği hiçbir şeyi yazma. Sayı, tarih, sürüm ve alıntıları uydurma. Emin olmadığın yeri generationNote'ta söyle.
- Ürün, sürüm ve kişi adlarını resmi kaynaktaki yazımıyla yaz.

SES VE BAKIŞ AÇISI
- Recep kariyerinin başında bir Product Engineer. Onu deneyiminin ötesinde otorite gibi gösterme. Uzman ağzıyla değil, konuyu takip eden ve okuduğunu anlatan biri gibi yaz.
- Birinci tekil şahıs kullan: "okudum", "denedim", "bana kalırsa", "burada emin değilim". Ansiklopedi anlatıcısı gibi yazma.
- Kullanıcısı veya ölçeği olmayan kişisel projeleri başarı hikâyesi gibi anlatma.
- YALNIZ konu Claude Fable 5 veya GPT-5.6 Sol'ün doğrudan karşılaştırmasıysa Recep bu iki modeli bizzat kullandığını söyleyebilir. Başka konuya bu tartışmayı sokma.

AI GİBİ DURMAMA KURALLARI — BU BÖLÜM EN ÖNEMLİSİ
- Yazı MADDE MADDE OLMAYACAK. Anlatım düz paragrafla akacak. Yazıyı liste + alt başlık iskeletine oturtma.
- Tüm yazıda en fazla 1 Markdown listesi kullanabilirsin ve yalnız gerçekten sayılabilir bir şey varsa (sürüm farkları, fiyatlar, sıralı adımlar). Gerekmiyorsa hiç liste kullanma. Liste maddesi 4'ü geçmesin.
- "Sadece X değil, Y" / "yalnızca X değil aynı zamanda Y" / "X değil; asıl olan Y" kalıbını hiç kurma. İddiayı doğrudan söyle.
- Süs amaçlı üçleme yapma ("hız, kalite ve maliyet" gibi). Gerçekten iki şey varsa iki yaz.
- Paragrafa "Ayrıca", "Dahası", "Bununla birlikte", "Öte yandan", "Sonuç olarak", "Özetle", "Kısacası" ile başlama.
- Uzun tire (—) kullanma. Virgül, nokta veya iki ayrı cümle kullan.
- Paragrafları simetrik kurma. Bir paragraf beş cümle, diğeri tek cümle olabilir. Cümle uzunluklarını bilinçli değiştir.
- İçi boş sıfat ve kalıpları kullanma: "gelişmiş", "güçlü", "devrim niteliğinde", "kritik", "önemli bir adım", "oyun değiştirici", "ekosistem", "dönüşüm", "teslimat akışı", "en az sürtünme", "asıl mesele", "kritik nokta şu", "X kesişiminde".
- Her iddiada somut ol: tarih, sürüm numarası, şirket adı, gerçek rakam, gerçek alıntı. Soyut genelleme yerine olayın kendisini anlat.
- En az bir yerde net bir görüş bildir ve en az bir yerde kendi tereddüdünü ya da karşı argümanı yaz. Her şeyi dengeleyip nötr kapatma.
- Metin İngilizceden çevrilmiş kurumsal metin gibi durmasın. Bitirmeden önce sessizce yüksek sesle okuma testi yap: bir Türk yazılımcının sohbette kurmayacağı cümleyi sil, yeniden yaz.

BAŞLIK VE BİÇİM
- Başlık için sessizce en az 5 aday düşün, en somut olanı seç. 45-72 karakter; "X nedir?" kalıbı, clickbait ve iki nokta üst üste yok. description en fazla 170 karakter.
- slug: arama niyetini taşıyan 3-5 kısa kelime, en fazla 60 karakter ASCII kebab-case. "neden", "nasıl", "için", "ve" gibi dolgu kelimesi kullanma.
- articleType seç: opinion, technical, tutorial, comparison, data, case-study. Uzunluk: opinion 650-900; technical 900-1300; tutorial 1100-1500; comparison 800-1100; data 700-1000; case-study 800-1100 kelime.
- blogMarkdown yalnız Markdown gövdesi; frontmatter ve H1 yok. En fazla 3 H2 kullan, hiç kullanmaman da olabilir. Başlıklar somut ve cümle gibi olsun; "Giriş", "Sonuç", "Neden önemli?" gibi jenerik başlık ve başlıkta her kelimeyi büyük harfle başlatma yasak. Yatay çizgi (---) kullanma.
- En fazla 3 ifadeyi **kalın**, en fazla 2 ifadeyi *italik* yap. Blockquote yalnız gerçek bir alıntı varsa ve kimin söylediğini yazarak kullan.
- Tablo yalnız iki şeyi gerçekten karşılaştırıyorsan ve sayılar kaynakta doğrulanmışsa. Kod yalnız konuyu açıklıyorsa: dil adı verilmiş fenced code block, faydalıysa ardından \`\`\`test ve \`\`\`output blokları (sistem bunları Kod / Test / Çıktı sekmesi olarak gösterir).

GÖRSEL — ARTIK PROMPT ÜRETME, İNTERNETTEN GERÇEK GÖRSEL BUL
- heroImageUrl: web aramanda GERÇEKTEN gördüğün, doğrudan görsel DOSYASINA giden tek bir HTTPS bağlantısı olsun. Tercihen .jpg, .jpeg, .png veya .webp ile bitsin; Unsplash gibi uzantısız CDN bağlantıları da olur. HTML sayfası, arama sonucu, Google Images yönlendirmesi, kısaltılmış link veya data URI verme.
- Bu bağlantıyı sistem sunucu tarafında indirip pakete ekleyecek. Bu yüzden giriş, çerez veya hotlink koruması istemeyen, herkese açık bir bağlantı seç.
- Kaynak önceliği: konunun sahibi şirketin resmi basın/blog görseli, GitHub veya resmi dokümantasyon ekran görüntüsü, Wikimedia Commons, Unsplash, Pexels. Haber ajansı fotoğrafı (Getty, Reuters, AP) ve telifli stok görsel kullanma.
- Görsel konuyla doğrudan ilgili olsun: olayın ürünü, arayüzü, logosu, grafiği. Alakasız dekoratif "teknoloji" fotoğrafı koyma. Yatay ve en az 1200 piksel genişlikte olmasını tercih et.
- Bağlantıyı UYDURMA. Erişemediğin veya emin olmadığın URL yerine boş string döndür ve nedenini generationNote'ta yaz.
- heroAlt: görselin gerçekte ne gösterdiğini anlatan Türkçe alt metin. generationNote'un sonuna görselin kaynağını ve lisansını tek satır ekle (ör. "Görsel: Wikimedia Commons, CC BY-SA 4.0").
- inlineVisuals her zaman tam 2 kayıt içersin. Yazı gerçekten ek bir görsel gerektiriyorsa needed=true yap, aynı kurallarla imageUrl bul, doğal Türkçe alt ve caption yaz. Gerekmiyorsa needed=false ve metin alanlarını boş bırak; süs olsun diye görsel ekleme.
- needed=true olan görsel için blogMarkdown içinde uygun bölüm sonuna tek başına {{INLINE_IMAGE_1}} veya {{INLINE_IMAGE_2}} yer tutucusunu tam bir kez koy. Başlığın hemen altına, ilk paragraftan önce veya art arda koyma.

LINKEDIN
- 180-300 kelime. İlk satır doğal ama merak uyandıran olsun. Kısa paragraflar, sahte başarı ve etkileşim tuzağı yok. Yukarıdaki AI gibi durmama kurallarının tamamı burada da geçerli; madde madde yazma.
- Son bölümde önce "Daha ayrıntılı okuma: https://recepozgur.com/blog/<slug>/" bağlantısını ver; en son satırda konuya özel, tek ve kolay cevaplanabilir bir soru sor. "Siz ne düşünüyorsunuz?" gibi genel soru sorma.
- generationNote: seçilen haberin özeti, belirsizlikler, insanın kontrol etmesi gereken noktalar ve görsel kaynağı.`;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-5.6-luna",
      input: prompt,
      tools: [{ type: "web_search", external_web_access: true }],
      tool_choice: "required",
      reasoning: { effort: "medium" },
      max_output_tokens: 9000,
      text: { format: { type: "json_schema", name: "content_bundle", strict: true, schema } },
    }),
  });
  const result = await response.json<Record<string, any>>();
  if (!response.ok) throw new Error(result.error?.message || `OpenAI isteği başarısız (${response.status}).`);
  const outputText = result.output_text || result.output?.flatMap((item: any) => item.content || []).find((item: any) => item.type === "output_text")?.text;
  if (!outputText) throw new Error("OpenAI boş veya tamamlanmamış yanıt döndürdü.");
  const raw = extractJson(outputText) as GeneratedBundle;
  const slug = compactSlug(raw.slug || raw.title);
  const sources = (raw.sources || []).filter((s) => /^https:\/\//.test(s.url)).slice(0, 12);
  if (sources.length < 2) throw new Error("Yeterli doğrulanabilir kaynak bulunamadı; paket kaydedilmedi.");
  const inlineVisuals = (raw.inlineVisuals || []).slice(0, 2).map((visual, index) => ({ ...visual, slot: index + 1, imageUrl: directImageUrl(visual.imageUrl) }));
  while (inlineVisuals.length < 2) inlineVisuals.push({ needed:false, slot:inlineVisuals.length + 1, imageUrl:"", alt:"", caption:"" });
  return { ...raw, slug, sources, inlineVisuals, heroImageUrl: directImageUrl(raw.heroImageUrl), tags: (raw.tags || []).slice(0, 6), description: raw.description.slice(0, 170) };
}

async function recentTitles(env: Env) {
  const result = await env.DB.prepare("SELECT title FROM content_bundles ORDER BY updated_at DESC LIMIT 20").all<{title:string}>();
  return result.results.map((row) => row.title);
}

async function storeGeneratedBundle(env: Env, generated: GeneratedBundle, actor: string, action = "generated") {
  const id = crypto.randomUUID(); const timestamp = now(); const slug = await uniqueSlug(env, generated.slug);
  const linkedinPost = syncLinkedinUrl(generated.linkedinPost, slug);
  await env.DB.prepare(`INSERT INTO content_bundles (id,title,slug,description,hook,blog_path,blog_markdown,linkedin_post,visual_prompt,hero_alt,status,category,tags_json,sources_json,generation_note,article_type,inline_visuals_json,source_count,checks_passed,checks_total,updated_at,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .bind(id,generated.title,slug,generated.description,generated.hook,`/blog/${slug}/`,generated.blogMarkdown,linkedinPost,generated.heroImageUrl,generated.heroAlt,"review",generated.category,JSON.stringify(generated.tags),JSON.stringify(generated.sources),generated.generationNote,generated.articleType,JSON.stringify(generated.inlineVisuals),generated.sources.length,4,5,timestamp,timestamp).run();
  await env.DB.prepare("INSERT INTO audit_log (bundle_id,action,actor_email,created_at) VALUES (?,?,?,?)").bind(id,action,actor,timestamp).run();
  const row = await env.DB.prepare(`SELECT ${selectColumns} FROM content_bundles WHERE id=?`).bind(id).first<Record<string, unknown>>();
  return bundleFromRow(row || {});
}

async function automaticGeneration(env: Env) {
  const recent = await env.DB.prepare("SELECT id FROM audit_log WHERE action='auto_generated' AND datetime(created_at) > datetime('now','-12 hours') LIMIT 1").first();
  if (recent) return;
  const generated = await generateBundle(env, "", await recentTitles(env));
  await storeGeneratedBundle(env, generated, "cloudflare-cron", "auto_generated");
}

function yaml(value: string) { return JSON.stringify(value.replace(/\r/g, "")); }
function markdownFile(bundle: any, heroImage: string, inlineImages: Record<number, string> = {}) {
  const sources = (bundle.sources as Source[]).map((s) => `  - label: ${yaml(s.label)}\n    url: ${yaml(s.url)}\n    note: ${yaml(s.note)}`).join("\n");
  let body = String(bundle.blogMarkdown || "").trim();
  for (const visual of (bundle.inlineVisuals || []) as InlineVisual[]) {
    const marker = `{{INLINE_IMAGE_${visual.slot}}}`;
    const path = inlineImages[visual.slot];
    const replacement = path ? `![${visual.alt || bundle.title}](${path})${visual.caption ? `\n\n*${visual.caption}*` : ""}` : "";
    body = body.split(marker).join(replacement);
  }
  body = body.replace(/\{\{INLINE_IMAGE_[12]\}\}/g, "");
  return `---\ntitle: ${yaml(bundle.title)}\ndescription: ${yaml(bundle.description)}\nslug: ${yaml(bundle.slug)}\npublishedAt: ${new Date().toISOString().slice(0,10)}\ntags: ${JSON.stringify(bundle.tags)}\ncategory: ${yaml(bundle.category)}\nheroImage: ${yaml(heroImage)}\nheroAlt: ${yaml(bundle.heroAlt)}\nfeatured: false\ndraft: false\nsources:\n${sources}\n---\n\n${body}\n`;
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = ""; for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(binary);
}

async function githubPut(env: Env, path: string, content: Uint8Array, message: string) {
  if (!env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN secret'ı henüz tanımlı değil.");
  const repo = env.GITHUB_REPOSITORY || "recepzgrmh/recepzgrmh.github.io"; const branch = env.GITHUB_BRANCH || "main";
  const endpoint = `https://api.github.com/repos/${repo}/contents/${path}`;
  const headers = { Accept: "application/vnd.github+json", Authorization: `Bearer ${env.GITHUB_TOKEN}`, "X-GitHub-Api-Version": "2026-03-10", "User-Agent": "recepozgur-content-studio" };
  const current = await fetch(`${endpoint}?ref=${encodeURIComponent(branch)}`, { headers });
  const existing = current.ok ? await current.json<{sha:string}>() : null;
  const response = await fetch(endpoint, { method: "PUT", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ message, branch, content: bytesToBase64(content), ...(existing?.sha ? { sha: existing.sha } : {}) }) });
  const result = await response.json<Record<string, any>>();
  if (!response.ok) throw new Error(result.message || `GitHub yazma hatası (${response.status}).`);
  return result;
}

async function pingIndexNow(env: Env, bundleId: string, actor: string, targetUrl: string) {
  if (!env.INDEXNOW_KEY) return;
  let action = "indexnow_ping_error";
  try {
    const keyLocation = env.INDEXNOW_KEY_LOCATION || `https://recepozgur.com/${env.INDEXNOW_KEY}.txt`;
    const response = await fetch("https://api.indexnow.org/IndexNow", { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": "RecepOzgur-Studio-IndexNow" }, body: JSON.stringify({ host: "recepozgur.com", key: env.INDEXNOW_KEY, keyLocation, urlList: [targetUrl] }), signal: AbortSignal.timeout(5000) });
    action = response.status === 200 || response.status === 202 ? `indexnow_ping_ok_${response.status}` : `indexnow_ping_failed_${response.status}`;
  } catch (error) { console.error("IndexNow bildirimi başarısız:", error); }
  try { await env.DB.prepare("INSERT INTO audit_log (bundle_id,action,actor_email,created_at) VALUES (?,?,?,?)").bind(bundleId,action,actor,now()).run(); } catch (error) { console.error("IndexNow denetim kaydı yazılamadı:", error); }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url); const actor = request.headers.get("Cf-Access-Authenticated-User-Email") || "local";
    if (!url.pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
    if (!authenticated(request, env)) return json({ error: "Bu stüdyoya erişim iznin yok." }, 403);
    try {
      if (request.method === "GET" && url.pathname === "/api/health") return json({ ok: true, generationReady: Boolean(env.OPENAI_API_KEY), publishingReady: Boolean(env.GITHUB_TOKEN) });
      if (request.method === "GET" && url.pathname === "/api/bundles") {
        const result = await env.DB.prepare(`SELECT ${selectColumns} FROM content_bundles ORDER BY updated_at DESC`).all<Record<string, unknown>>();
        return json({ bundles: result.results.map(bundleFromRow), generationReady: Boolean(env.OPENAI_API_KEY), publishingReady: Boolean(env.GITHUB_TOKEN) });
      }
      if (request.method === "GET" && url.pathname === "/api/assets") {
        const result = await env.DB.prepare(`SELECT assets.id, assets.bundle_id AS bundleId, assets.filename, assets.content_type AS contentType, assets.size_bytes AS sizeBytes, assets.created_at AS createdAt, assets.role, assets.alt_text AS alt, assets.caption, '/api/assets/' || assets.object_key AS url, content_bundles.title AS bundleTitle FROM assets LEFT JOIN content_bundles ON content_bundles.id=assets.bundle_id ${url.searchParams.get("bundleId") ? "WHERE assets.bundle_id=?" : ""} ORDER BY assets.created_at DESC`).bind(...(url.searchParams.get("bundleId") ? [url.searchParams.get("bundleId")] : [])).all();
        return json({ assets: result.results });
      }
      if (request.method === "POST" && url.pathname === "/api/bundles/generate") {
        const { topic = "" } = await request.json<{topic?:string}>();
        if (topic.length > 500) return json({ error: "Konu en fazla 500 karakter olabilir." }, 400);
        const generated = await generateBundle(env, topic.trim(), await recentTitles(env));
        return json({ bundle: await storeGeneratedBundle(env, generated, actor) }, 201);
      }
      const match = url.pathname.match(/^\/api\/bundles\/([a-zA-Z0-9_-]+)(?:\/(publish|verify))?$/);
      if (match && request.method === "PATCH" && !match[2]) {
        const body = await request.json<Record<string, unknown>>(); const fields: string[]=[]; const values: unknown[]=[];
        const existing = await env.DB.prepare("SELECT slug,status,linkedin_post AS linkedinPost FROM content_bundles WHERE id=?").bind(match[1]).first<{slug:string;status:Status;linkedinPost:string}>();
        if (!existing) return json({error:"Paket bulunamadı."},404);
        if (typeof body.slug === "string") {
          const slug = await uniqueSlug(env, body.slug, match[1]);
          if ((existing.status === "scheduled" || existing.status === "published") && slug !== existing.slug) return json({error:"Yayınlanmış URL değiştirilemez. Değişiklik gerekiyorsa 301 yönlendirme planlanmalı."},409);
          fields.push("slug=?","blog_path=?"); values.push(slug,`/blog/${slug}/`);
          body.linkedinPost = syncLinkedinUrl(typeof body.linkedinPost === "string" ? body.linkedinPost : existing.linkedinPost, slug);
        }
        const editable: Record<string,string> = { title:"title",description:"description",hook:"hook",blogMarkdown:"blog_markdown",linkedinPost:"linkedin_post",heroImageUrl:"visual_prompt",heroAlt:"hero_alt",category:"category",generationNote:"generation_note",articleType:"article_type" };
        for (const [key,column] of Object.entries(editable)) if (typeof body[key] === "string") { fields.push(`${column}=?`); values.push(String(body[key]).trim()); }
        if (Array.isArray(body.tags)) { fields.push("tags_json=?"); values.push(JSON.stringify(body.tags)); }
        if (Array.isArray(body.sources)) { fields.push("sources_json=?","source_count=?"); values.push(JSON.stringify(body.sources),body.sources.length); }
        if (Array.isArray(body.inlineVisuals)) { fields.push("inline_visuals_json=?"); values.push(JSON.stringify(body.inlineVisuals.slice(0,2))); }
        if (typeof body.status === "string") {
          if (!allowedStatuses.has(body.status as Status)) return json({error:"Geçersiz durum."},400);
          if (body.status === "approved") {
            const candidate = await env.DB.prepare("SELECT blog_markdown AS blogMarkdown,linkedin_post AS linkedinPost,sources_json AS sourcesJson,visual_url AS visualUrl FROM content_bundles WHERE id=?").bind(match[1]).first<Record<string,unknown>>();
            const sourceCount = parseJson(candidate?.sourcesJson, [] as Source[]).length;
            if (!candidate?.blogMarkdown || !candidate?.linkedinPost || !candidate?.visualUrl || sourceCount < 2) return json({error:"Onay için blog, LinkedIn metni, en az 2 kaynak ve görsel zorunlu."},409);
          }
          fields.push("status=?"); values.push(body.status);
        }
        if (!fields.length) return json({error:"Güncellenecek alan yok."},400); fields.push("updated_at=?"); values.push(now(),match[1]);
        await env.DB.prepare(`UPDATE content_bundles SET ${fields.join(",")} WHERE id=?`).bind(...values).run();
        await env.DB.prepare("INSERT INTO audit_log (bundle_id,action,actor_email,created_at) VALUES (?,?,?,?)").bind(match[1],"updated",actor,now()).run();
        const row = await env.DB.prepare(`SELECT ${selectColumns} FROM content_bundles WHERE id=?`).bind(match[1]).first<Record<string, unknown>>(); return json({bundle:bundleFromRow(row||{})});
      }
      if (match && request.method === "POST" && match[2] === "publish") {
        const row = await env.DB.prepare(`SELECT ${selectColumns} FROM content_bundles WHERE id=?`).bind(match[1]).first<Record<string, unknown>>(); if (!row) return json({error:"Paket bulunamadı."},404);
        const bundle = bundleFromRow(row) as any; if (bundle.status !== "approved") return json({error:"Önce paketi onaylamalısın."},409); if (!bundle.visualUrl || !bundle.blogMarkdown || !bundle.linkedinPost || bundle.sources.length < 2) return json({error:"Yayın için blog, LinkedIn metni, en az 2 kaynak ve görsel zorunlu."},409);
        const key = decodeURIComponent(String(bundle.visualUrl).replace(/^\/api\/assets\//,"")); const object = await env.UPLOADS.get(key); if (!object) return json({error:"Görsel R2'de bulunamadı."},404);
        const ext = safeName(key.split(".").pop() || "webp"); const assetPath = `public/blog/${bundle.slug}.${ext}`; const heroImage = `/blog/${bundle.slug}.${ext}`;
        await githubPut(env,assetPath,new Uint8Array(await object.arrayBuffer()),`content: add visual for ${bundle.slug}`);
        const inlineRows = await env.DB.prepare("SELECT object_key AS objectKey, role FROM assets WHERE bundle_id=? AND role IN ('inline-1','inline-2') ORDER BY created_at DESC").bind(match[1]).all<{objectKey:string;role:string}>();
        const inlineImages: Record<number,string> = {};
        for (const row of inlineRows.results) {
          const slot = Number(row.role.slice(-1)); if (inlineImages[slot]) continue;
          const inlineObject = await env.UPLOADS.get(row.objectKey); if (!inlineObject) continue;
          const inlineExt = safeName(row.objectKey.split(".").pop() || "webp"); const inlinePath = `public/blog/${bundle.slug}-inline-${slot}.${inlineExt}`;
          await githubPut(env,inlinePath,new Uint8Array(await inlineObject.arrayBuffer()),`content: add inline visual ${slot} for ${bundle.slug}`);
          inlineImages[slot] = `/blog/${bundle.slug}-inline-${slot}.${inlineExt}`;
        }
        await githubPut(env,`src/content/blog/${bundle.slug}.md`,new TextEncoder().encode(markdownFile(bundle,heroImage,inlineImages)),`content: publish ${bundle.slug}`);
        const publishedUrl = `https://recepozgur.com/blog/${bundle.slug}/`; await env.DB.prepare("UPDATE content_bundles SET status='scheduled',published_url=?,updated_at=? WHERE id=?").bind(publishedUrl,now(),match[1]).run();
        await env.DB.prepare("INSERT INTO audit_log (bundle_id,action,actor_email,created_at) VALUES (?,?,?,?)").bind(match[1],"blog_commit",actor,now()).run();
        try { await pingIndexNow(env,match[1],actor,publishedUrl); } catch (error) { console.error("IndexNow adımı atlandı:", error); }
        return json({ok:true,url:publishedUrl,status:"scheduled"});
      }
      if (match && request.method === "POST" && match[2] === "verify") {
        const row = await env.DB.prepare("SELECT published_url AS publishedUrl FROM content_bundles WHERE id=?").bind(match[1]).first<{publishedUrl:string}>(); if (!row?.publishedUrl) return json({error:"Yayın isteği bulunamadı."},409);
        const live = await fetch(row.publishedUrl,{redirect:"follow",headers:{"User-Agent":"RecepOzgur-Studio-Verifier"}}); if (!live.ok) return json({ok:false,pending:true,status:live.status},202);
        await env.DB.prepare("UPDATE content_bundles SET status='published',updated_at=? WHERE id=?").bind(now(),match[1]).run(); return json({ok:true,status:"published",url:row.publishedUrl});
      }
      if (request.method === "POST" && url.pathname === "/api/assets") {
        const form=await request.formData(); const file=form.get("file"); const bundleId=String(form.get("bundleId")||"unassigned"); const role=String(form.get("role")||"hero"); const alt=String(form.get("alt")||"").slice(0,300); const caption=String(form.get("caption")||"").slice(0,500); if (!(file instanceof File)) return json({error:"Bir görsel seçmelisin."},400);
        if (!assetRoles.has(role)) return json({error:"Geçersiz görsel alanı."},400);
        if (!imageTypes.has(file.type)) return json({error:"Yalnızca PNG, JPG, WebP veya SVG yüklenebilir."},415); if (file.size>Number(env.MAX_UPLOAD_BYTES||10_485_760)) return json({error:"Görsel 10 MB sınırını aşıyor."},413);
        const saved = await saveAsset(env,bundleId,role,file.name,file.type,file.stream(),file.size,alt,caption);
        return json({ok:true,key:saved.key,url:saved.assetUrl,role},201);
      }
      if (request.method === "POST" && url.pathname === "/api/assets/fetch") {
        const body = await request.json<{bundleId?:string;role?:string;url?:string;alt?:string;caption?:string}>();
        const bundleId = String(body.bundleId||"").trim(); const role = String(body.role||"hero"); const remote = directImageUrl(body.url);
        if (!bundleId) return json({error:"Önce bir paket seçmelisin."},400);
        if (!assetRoles.has(role)) return json({error:"Geçersiz görsel alanı."},400);
        if (!remote) return json({error:"Geçerli bir HTTPS görsel bağlantısı gerekiyor."},400);
        let remoteResponse: Response;
        try { remoteResponse = await fetch(remote,{redirect:"follow",headers:{"User-Agent":"RecepOzgur-Studio-ImageFetcher",Accept:"image/*"}}); }
        catch { return json({error:"Bağlantıya ulaşılamadı; görsel indirilemedi."},502); }
        if (!remoteResponse.ok) return json({error:`Görsel indirilemedi (${remoteResponse.status}).`},502);
        const contentType = (remoteResponse.headers.get("content-type")||"").split(";")[0].trim().toLowerCase();
        if (!imageTypes.has(contentType)) return json({error:`Bu bağlantı görsel dosyası değil (${contentType||"tür bilinmiyor"}). Doğrudan .jpg, .png veya .webp dosyasına giden bir link gerekiyor.`},415);
        const bytes = new Uint8Array(await remoteResponse.arrayBuffer());
        if (!bytes.byteLength) return json({error:"Görsel boş geldi."},502);
        if (bytes.byteLength > Number(env.MAX_UPLOAD_BYTES||10_485_760)) return json({error:"Görsel 10 MB sınırını aşıyor."},413);
        const stem = safeName(decodeURIComponent(new URL(remote).pathname.split("/").pop()||"").replace(/\.[a-z0-9]+$/i,"")) || "gorsel";
        const filename = `${stem.slice(0,60)}.${imageExtensions[contentType]}`;
        const saved = await saveAsset(env,bundleId,role,filename,contentType,bytes,bytes.byteLength,String(body.alt||"").slice(0,300),String(body.caption||"").slice(0,500));
        return json({ok:true,key:saved.key,url:saved.assetUrl,role,filename,contentType,sizeBytes:bytes.byteLength,sourceUrl:remote},201);
      }
      const asset=url.pathname.match(/^\/api\/assets\/(.+)$/); if (request.method==="GET"&&asset) { const object=await env.UPLOADS.get(decodeURIComponent(asset[1])); if(!object)return new Response("Not found",{status:404}); const headers=new Headers();object.writeHttpMetadata(headers);headers.set("etag",object.httpEtag);headers.set("X-Robots-Tag","noindex, nofollow, noarchive");return new Response(object.body,{headers}); }
      return json({error:"Endpoint bulunamadı."},404);
    } catch (error) { console.error(error); return json({error:error instanceof Error?error.message:"Beklenmeyen sunucu hatası."},500); }
  },
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(automaticGeneration(env));
  },
} satisfies ExportedHandler<Env>;
