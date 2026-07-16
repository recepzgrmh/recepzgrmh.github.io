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
}

type Status = "draft" | "review" | "approved" | "scheduled" | "published";
type Source = { label: string; url: string; note: string };
type GeneratedBundle = {
  title: string; slug: string; description: string; category: string; tags: string[];
  hook: string; blogMarkdown: string; linkedinPost: string; visualPrompt: string;
  heroAlt: string; sources: Source[]; generationNote: string;
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

function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try { return JSON.parse(value) as T; } catch { return fallback; }
}

function bundleFromRow(row: Record<string, unknown>) {
  return { ...row, tags: parseJson(row.tagsJson, []), sources: parseJson(row.sourcesJson, []), tagsJson: undefined, sourcesJson: undefined };
}

const selectColumns = `id, title, slug, description, hook, blog_path AS blogPath, blog_markdown AS blogMarkdown,
linkedin_post AS linkedinPost, visual_prompt AS visualPrompt, hero_alt AS heroAlt, status, category,
tags_json AS tagsJson, sources_json AS sourcesJson, generation_note AS generationNote,
updated_at AS updatedAt, created_at AS createdAt, source_count AS sourceCount,
checks_passed AS checksPassed, checks_total AS checksTotal, visual_url AS visualUrl, published_url AS publishedUrl`;

function extractJson(text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = cleaned.indexOf("{"); const end = cleaned.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("Model geçerli JSON döndürmedi.");
  return JSON.parse(cleaned.slice(start, end + 1));
}

async function generateBundle(env: Env, topic: string, recentTitles: string[] = []): Promise<GeneratedBundle> {
  if (!env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY secret'ı henüz tanımlı değil.");
  const schema = {
    type: "object", additionalProperties: false, required: ["title","slug","description","category","tags","hook","blogMarkdown","linkedinPost","visualPrompt","heroAlt","sources","generationNote"],
    properties: {
      title:{type:"string"}, slug:{type:"string"}, description:{type:"string"}, category:{type:"string"}, tags:{type:"array",items:{type:"string"},maxItems:6}, hook:{type:"string"},
      blogMarkdown:{type:"string"}, linkedinPost:{type:"string"}, visualPrompt:{type:"string"}, heroAlt:{type:"string"},
      sources:{type:"array",minItems:2,maxItems:12,items:{type:"object",additionalProperties:false,required:["label","url","note"],properties:{label:{type:"string"},url:{type:"string"},note:{type:"string"}}}}, generationNote:{type:"string"}
    }
  };
  const prompt = `Bugünün tarihi ${new Date().toISOString().slice(0, 10)}. Web'de araştırma yap ve Recep Özgür Mıh için tek bir Türkçe yayın paketi üret.

Konu: ${topic || "Mobil, backend, ödeme sistemleri veya güvenilir AI ürünleri alanında güncel ve öğretici bir konu seç."}
Son içerik başlıkları (bunları veya çok benzerini seçme): ${recentTitles.length ? recentTitles.join(" | ") : "Henüz yok"}

Araştırma ve yazım kuralları:
- Öncelikle resmi dokümantasyon, standart, araştırma makalesi ve ilgili ürünün engineering blogunu kullan.
- Kritik iddiaları mümkünse birinci taraf kaynakla doğrula. Eski gelişmeyi yeniymiş gibi sunma.
- Her kaynak için doğrudan HTTPS URL ver; arama sonucu veya yönlendirme URL'si kullanma.
- Kaynakların söylemediği iddiaları ekleme. Belirsizliği generationNote alanında belirt.
- Recep kariyerinin başında, mobil + backend + ürün teslimi kesişiminde çalışan bir Product Engineer.
- Kullanıcısı veya ölçeği olmayan kişisel projelerini başarı hikâyesi gibi anlatma. Proje adı kullanmak zorunda değilsin.
- Kariyer tavsiyesi, motivasyon ve topluluk içeriği üretme.
- Türkçe, doğal, ölçülü ve teknik yaz. Recep'i deneyiminin ötesinde otorite gibi gösterme.
- Başlık net; description en fazla 170 karakter; slug ASCII kebab-case olsun.
- blogMarkdown yalnız Markdown gövdesi olsun, frontmatter ekleme. 900-1500 kelime, H2 başlıklar, somut örnek/trade-off ve sonuç içersin.
- LinkedIn metni 180-300 kelime: ilk satır scroll-stop hook, kısa paragraflar, sahte başarı/etkileşim tuzağı yok, sonda “Daha ayrıntılı okuma: https://recepozgur.com/blog/<slug>/” olsun.
- visualPrompt, ChatGPT web arayüzünde üretilecek yazıya özel 16:9 editorial görsel için ayrıntılı İngilizce prompt olsun; yazı/logo/UI screenshot isteme.
- generationNote belirsizlikleri ve insanın kontrol etmesi gereken noktaları kısaça söylesin.`;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-5.6-luna",
      input: prompt,
      tools: [{ type: "web_search", external_web_access: true }],
      tool_choice: "required",
      reasoning: { effort: "low" },
      max_output_tokens: 9000,
      text: { format: { type: "json_schema", name: "content_bundle", strict: true, schema } },
    }),
  });
  const result = await response.json<Record<string, any>>();
  if (!response.ok) throw new Error(result.error?.message || `OpenAI isteği başarısız (${response.status}).`);
  const outputText = result.output_text || result.output?.flatMap((item: any) => item.content || []).find((item: any) => item.type === "output_text")?.text;
  if (!outputText) throw new Error("OpenAI boş veya tamamlanmamış yanıt döndürdü.");
  const raw = extractJson(outputText) as GeneratedBundle;
  const slug = safeName(raw.slug || raw.title);
  const sources = (raw.sources || []).filter((s) => /^https:\/\//.test(s.url)).slice(0, 12);
  if (sources.length < 2) throw new Error("Yeterli doğrulanabilir kaynak bulunamadı; paket kaydedilmedi.");
  return { ...raw, slug, sources, tags: (raw.tags || []).slice(0, 6), description: raw.description.slice(0, 170) };
}

async function recentTitles(env: Env) {
  const result = await env.DB.prepare("SELECT title FROM content_bundles ORDER BY updated_at DESC LIMIT 20").all<{title:string}>();
  return result.results.map((row) => row.title);
}

async function storeGeneratedBundle(env: Env, generated: GeneratedBundle, actor: string, action = "generated") {
  const id = crypto.randomUUID(); const timestamp = now();
  await env.DB.prepare(`INSERT INTO content_bundles (id,title,slug,description,hook,blog_path,blog_markdown,linkedin_post,visual_prompt,hero_alt,status,category,tags_json,sources_json,generation_note,source_count,checks_passed,checks_total,updated_at,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .bind(id,generated.title,generated.slug,generated.description,generated.hook,`/blog/${generated.slug}/`,generated.blogMarkdown,generated.linkedinPost,generated.visualPrompt,generated.heroAlt,"review",generated.category,JSON.stringify(generated.tags),JSON.stringify(generated.sources),generated.generationNote,generated.sources.length,4,5,timestamp,timestamp).run();
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
function markdownFile(bundle: any, heroImage: string) {
  const sources = (bundle.sources as Source[]).map((s) => `  - label: ${yaml(s.label)}\n    url: ${yaml(s.url)}\n    note: ${yaml(s.note)}`).join("\n");
  return `---\ntitle: ${yaml(bundle.title)}\ndescription: ${yaml(bundle.description)}\nslug: ${yaml(bundle.slug)}\npublishedAt: ${new Date().toISOString().slice(0,10)}\ntags: ${JSON.stringify(bundle.tags)}\ncategory: ${yaml(bundle.category)}\nheroImage: ${yaml(heroImage)}\nheroAlt: ${yaml(bundle.heroAlt)}\nfeatured: false\ndraft: false\nsources:\n${sources}\n---\n\n${bundle.blogMarkdown.trim()}\n`;
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
        const result = await env.DB.prepare(`SELECT assets.id, assets.bundle_id AS bundleId, assets.filename, assets.content_type AS contentType, assets.size_bytes AS sizeBytes, assets.created_at AS createdAt, '/api/assets/' || assets.object_key AS url, content_bundles.title AS bundleTitle FROM assets LEFT JOIN content_bundles ON content_bundles.id=assets.bundle_id ORDER BY assets.created_at DESC`).all();
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
        const editable: Record<string,string> = { title:"title",description:"description",hook:"hook",blogMarkdown:"blog_markdown",linkedinPost:"linkedin_post",visualPrompt:"visual_prompt",heroAlt:"hero_alt",category:"category",generationNote:"generation_note" };
        for (const [key,column] of Object.entries(editable)) if (typeof body[key] === "string") { fields.push(`${column}=?`); values.push(String(body[key]).trim()); }
        if (Array.isArray(body.tags)) { fields.push("tags_json=?"); values.push(JSON.stringify(body.tags)); }
        if (Array.isArray(body.sources)) { fields.push("sources_json=?","source_count=?"); values.push(JSON.stringify(body.sources),body.sources.length); }
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
        await githubPut(env,`src/content/blog/${bundle.slug}.md`,new TextEncoder().encode(markdownFile(bundle,heroImage)),`content: publish ${bundle.slug}`);
        const publishedUrl = `https://recepozgur.com/blog/${bundle.slug}/`; await env.DB.prepare("UPDATE content_bundles SET status='scheduled',published_url=?,updated_at=? WHERE id=?").bind(publishedUrl,now(),match[1]).run();
        await env.DB.prepare("INSERT INTO audit_log (bundle_id,action,actor_email,created_at) VALUES (?,?,?,?)").bind(match[1],"blog_commit",actor,now()).run(); return json({ok:true,url:publishedUrl,status:"scheduled"});
      }
      if (match && request.method === "POST" && match[2] === "verify") {
        const row = await env.DB.prepare("SELECT published_url AS publishedUrl FROM content_bundles WHERE id=?").bind(match[1]).first<{publishedUrl:string}>(); if (!row?.publishedUrl) return json({error:"Yayın isteği bulunamadı."},409);
        const live = await fetch(row.publishedUrl,{redirect:"follow",headers:{"User-Agent":"RecepOzgur-Studio-Verifier"}}); if (!live.ok) return json({ok:false,pending:true,status:live.status},202);
        await env.DB.prepare("UPDATE content_bundles SET status='published',updated_at=? WHERE id=?").bind(now(),match[1]).run(); return json({ok:true,status:"published",url:row.publishedUrl});
      }
      if (request.method === "POST" && url.pathname === "/api/assets") {
        const form=await request.formData(); const file=form.get("file"); const bundleId=String(form.get("bundleId")||"unassigned"); if (!(file instanceof File)) return json({error:"Bir görsel seçmelisin."},400);
        if (!new Set(["image/png","image/jpeg","image/webp","image/svg+xml"]).has(file.type)) return json({error:"Yalnızca PNG, JPG, WebP veya SVG yüklenebilir."},415); if (file.size>Number(env.MAX_UPLOAD_BYTES||10_485_760)) return json({error:"Görsel 10 MB sınırını aşıyor."},413);
        const key=`${safeName(bundleId)}/${Date.now()}-${safeName(file.name)}`; await env.UPLOADS.put(key,file.stream(),{httpMetadata:{contentType:file.type,cacheControl:"public, max-age=31536000, immutable"},customMetadata:{bundleId}}); const assetUrl=`/api/assets/${encodeURIComponent(key)}`;
        await env.DB.prepare("INSERT INTO assets (id,bundle_id,object_key,filename,content_type,size_bytes,created_at) VALUES (?,?,?,?,?,?,?)").bind(crypto.randomUUID(),bundleId,key,file.name,file.type,file.size,now()).run(); await env.DB.prepare("UPDATE content_bundles SET visual_url=?,checks_passed=checks_total,updated_at=? WHERE id=?").bind(assetUrl,now(),bundleId).run(); return json({ok:true,key,url:assetUrl},201);
      }
      const asset=url.pathname.match(/^\/api\/assets\/(.+)$/); if (request.method==="GET"&&asset) { const object=await env.UPLOADS.get(decodeURIComponent(asset[1])); if(!object)return new Response("Not found",{status:404}); const headers=new Headers();object.writeHttpMetadata(headers);headers.set("etag",object.httpEtag);headers.set("X-Robots-Tag","noindex, nofollow, noarchive");return new Response(object.body,{headers}); }
      return json({error:"Endpoint bulunamadı."},404);
    } catch (error) { console.error(error); return json({error:error instanceof Error?error.message:"Beklenmeyen sunucu hatası."},500); }
  },
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(automaticGeneration(env));
  },
} satisfies ExportedHandler<Env>;
