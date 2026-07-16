interface Env {
  DB: D1Database;
  UPLOADS: R2Bucket;
  ALLOWED_EMAILS: string;
  MAX_UPLOAD_BYTES: string;
}

const demoBundles = [
  { id: "architecture-001", title: "Her mobil uygulamanın mikroservise ihtiyacı yok", hook: "Servis sayısı, teknik olgunluğun ölçüsü değildir.", blogPath: "/blog/her-mobil-uygulamanin-mikroservise-ihtiyaci-yok/", status: "review", category: "Yazılım Mimarisi", updatedAt: "2026-07-16T08:30:00.000Z", sourceCount: 3, checksPassed: 5, checksTotal: 5 },
  { id: "api-001", title: "API hataları kullanıcı deneyiminin bir parçasıdır", hook: "‘Bir hata oluştu’ bir sonraki adım değildir.", blogPath: "/blog/api-hatalari-kullanici-deneyiminin-parcasidir/", status: "review", category: "API Tasarımı", updatedAt: "2026-07-16T08:10:00.000Z", sourceCount: 2, checksPassed: 5, checksTotal: 5 },
  { id: "ai-001", title: "Geçerli JSON, güvenilir AI çıktısı değildir", hook: "JSON’ın parse edilmesi, doğrulamanın bittiği değil başladığı andır.", blogPath: "/blog/gecerli-json-guvenilir-ai-ciktisi-degildir/", status: "review", category: "AI Ürünleri", updatedAt: "2026-07-16T07:45:00.000Z", sourceCount: 3, checksPassed: 4, checksTotal: 5 },
];

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" } });

function authenticated(request: Request, env: Env) {
  const hostname = new URL(request.url).hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  const email = request.headers.get("Cf-Access-Authenticated-User-Email")?.toLowerCase();
  const allowedEmails = env.ALLOWED_EMAILS.split(",").map((value) => value.trim().toLowerCase());
  return Boolean(email && allowedEmails.includes(email));
}

function safeName(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 100) || "visual";
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
    if (!authenticated(request, env)) return json({ error: "Bu stüdyoya erişim iznin yok." }, 403);

    if (request.method === "GET" && url.pathname === "/api/health") return json({ ok: true });

    if (request.method === "GET" && url.pathname === "/api/bundles") {
      try {
        const result = await env.DB.prepare(`SELECT id, title, hook, blog_path AS blogPath, status, category, updated_at AS updatedAt, source_count AS sourceCount, checks_passed AS checksPassed, checks_total AS checksTotal, visual_url AS visualUrl FROM content_bundles ORDER BY updated_at DESC`).all();
        return json({ bundles: result.results.length ? result.results : demoBundles });
      } catch {
        return json({ bundles: demoBundles, setupRequired: true });
      }
    }

    const bundleMatch = url.pathname.match(/^\/api\/bundles\/([a-zA-Z0-9_-]+)$/);
    if (request.method === "PATCH" && bundleMatch) {
      const body = await request.json<{ status?: string }>();
      const allowed = new Set(["draft", "review", "approved", "scheduled", "published"]);
      if (!body.status || !allowed.has(body.status)) return json({ error: "Geçersiz durum." }, 400);
      try {
        await env.DB.prepare("UPDATE content_bundles SET status = ?, updated_at = ? WHERE id = ?").bind(body.status, new Date().toISOString(), bundleMatch[1]).run();
        await env.DB.prepare("INSERT INTO audit_log (bundle_id, action, actor_email, created_at) VALUES (?, ?, ?, ?)").bind(bundleMatch[1], `status:${body.status}`, request.headers.get("Cf-Access-Authenticated-User-Email") || "local", new Date().toISOString()).run();
      } catch {
        // Demo mode remains usable before the first D1 migration.
      }
      return json({ ok: true, status: body.status });
    }

    if (request.method === "POST" && url.pathname === "/api/assets") {
      const form = await request.formData();
      const file = form.get("file");
      const bundleId = String(form.get("bundleId") || "unassigned");
      if (!(file instanceof File)) return json({ error: "Bir görsel dosyası seçmelisin." }, 400);
      const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml"]);
      if (!allowedTypes.has(file.type)) return json({ error: "Yalnızca PNG, JPG, WebP veya SVG yüklenebilir." }, 415);
      const maxBytes = Number(env.MAX_UPLOAD_BYTES || 10_485_760);
      if (file.size > maxBytes) return json({ error: "Görsel 10 MB sınırını aşıyor." }, 413);
      const key = `${safeName(bundleId)}/${Date.now()}-${safeName(file.name)}`;
      await env.UPLOADS.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" }, customMetadata: { bundleId } });
      const assetUrl = `/api/assets/${encodeURIComponent(key)}`;
      try {
        await env.DB.prepare("INSERT INTO assets (id, bundle_id, object_key, filename, content_type, size_bytes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(crypto.randomUUID(), bundleId, key, file.name, file.type, file.size, new Date().toISOString()).run();
        await env.DB.prepare("UPDATE content_bundles SET visual_url = ?, updated_at = ? WHERE id = ?").bind(assetUrl, new Date().toISOString(), bundleId).run();
      } catch {
        // R2 upload succeeded; metadata can be reconciled after D1 setup.
      }
      return json({ ok: true, key, url: assetUrl }, 201);
    }

    const assetMatch = url.pathname.match(/^\/api\/assets\/(.+)$/);
    if (request.method === "GET" && assetMatch) {
      const key = decodeURIComponent(assetMatch[1]);
      const object = await env.UPLOADS.get(key);
      if (!object) return new Response("Not found", { status: 404 });
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return new Response(object.body, { headers });
    }

    return json({ error: "Endpoint bulunamadı." }, 404);
  },
} satisfies ExportedHandler<Env>;
