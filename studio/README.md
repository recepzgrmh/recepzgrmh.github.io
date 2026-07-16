# Recep Özgür İçerik Stüdyosu

Cloudflare Workers üzerinde çalışan özel onay paneli. Cloudflare Access tüm uygulamayı e-posta allowlist ile kapatır; D1 içerik paketlerini ve audit kayıtlarını, R2 ise yüklenen görselleri tutar.

Production: `https://studio.recepozgur.com`

Aktif kaynaklar:

- Worker: `recepozgur-content-studio`
- D1: `recepozgur-content-studio` (`EEUR`)
- R2: `recepozgur-content-assets` (private, Standard)
- Access policy: `Owner only`

## İlk Cloudflare kurulumu

1. `npm install`
2. `npx wrangler login`
3. `npx wrangler d1 create recepozgur-content-studio`
4. Dönen `database_id` değerini `wrangler.jsonc` içine yaz.
5. `npx wrangler r2 bucket create recepozgur-content-assets`
6. `npm run db:migrate:remote`
7. `npm run deploy`
8. Cloudflare Zero Trust → Access → Applications altında Worker domainini ekle.
9. Policy: `Allow` → Emails → yalnızca `recepzgrmh@gmail.com` ve/veya `recep.ozgur.mih@gmail.com`. Başka Allow kuralı ekleme.

Yerelde `npm run db:migrate:local` ardından `npm run dev` kullan. Localhost, Cloudflare Access başlığı olmadığı için geliştirme amacıyla otomatik kabul edilir; uzaktaki `/api/*` çağrıları doğru Access e-postası olmadan `403` döner.

Cloudflare Access policy uygulamanın tamamını korumalıdır. Worker'daki e-posta kontrolü ikinci savunma katmanıdır; tek başına login ekranı değildir.

## İçerik motoru ve yayın secret'ları

Canlı Worker iki şifreli secret kullanır; değerleri dosyaya veya GitHub'a yazma:

```bash
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put GITHUB_TOKEN
```

- `OPENAI_API_KEY`: OpenAI Platform proje anahtarı. Tek Responses API çağrısında `web_search` ile kaynaklı araştırma ve Structured Outputs ile doğrulanmış içerik paketi üretir.
- `GITHUB_TOKEN`: yalnız `recepzgrmh/recepzgrmh.github.io` deposu için `Contents: Read and write` izni bulunan fine-grained token. Başka repository veya account izni verme.

Akış: `Yeni paket` → kaynaklı araştırma → blog + LinkedIn + görsel promptu → düzenleme → görsel yükleme → onay → GitHub commit → GitHub Pages deploy → canlılık doğrulama. LinkedIn'e otomatik giriş/bot yoktur; son metin panoya kopyalanır ve kullanıcı tarafından paylaşılır.

## GitHub Actions secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Secrets hazır olunca repository variable olarak `STUDIO_DEPLOY_ENABLED=true` ekle. Bu yapılana kadar deploy job’u güvenli biçimde atlanır.

## Teknik referanslar

- [Cloudflare — Full-stack React applications](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/)
- [Cloudflare — Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare R2 — Upload objects](https://developers.cloudflare.com/r2/objects/upload-objects/)
- [Cloudflare Access — Application types](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/choose-application-type/)
- [Cloudflare Access — Policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)
