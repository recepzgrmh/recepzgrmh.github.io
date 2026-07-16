# recepozgur.com Blog Trafik Planı

## Hedef

Amaç rastgele pageview toplamak değil; mobil, backend, API, ödeme sistemleri ve AI ürünleriyle ilgilenen doğru kişilerin Recep'i bulmasını sağlamak. Bu nedenle her yazı hem arama niyetine cevap vermeli hem LinkedIn'de tek başına değer üretmelidir.

## İçerik modeli

Her yazı şu beş koşulu sağlamalı:

1. Tek bir somut soruya veya karara odaklanır.
2. İlk elden deneyim yoksa bunu varmış gibi anlatmaz; araştırma notu olarak çerçeveler.
3. Dış iddialar birincil/otoriter kaynaklarla eşleştirilir.
4. Okuyucuya uygulanabilir kontrol listesi, karar çerçevesi veya örnek verir.
5. LinkedIn postu yazının tamamını özetlemez; güçlü tezi açar ve ayrıntı için yazıya bağlanır.

Google'ın people-first content rehberi, içeriğin öncelikle kullanıcıya yardım etmek için üretilmesini; yalnızca arama trafiği için çok sayıda konu üretmekten kaçınılmasını öneriyor. Otomasyon konu ve taslak üretebilir, fakat yayın kararı bu nedenle insanda kalır.

## Konu kümeleri

İlk 12–16 yazı dört kümeye ayrılmalı:

- API güvenilirliği: hata sözleşmeleri, idempotency, retry, versioning, offline davranışı.
- Mobil ürün operasyonu: store release, entitlement, billing, notification, observability.
- Mimari kararlar: modüler monolit, BFF, cache, queue, veri sahipliği, trade-off.
- AI ürün güvenilirliği: structured output, eval, kaynak doğrulama, maliyet ve human-in-the-loop.

Her kümede bir ana rehber ve onu destekleyen 3–4 dar yazı olmalı. Yeni yazılar doğal bağlamda önceki ilgili yazılara link vermeli. Konu dışı kariyer/topluluk içerikleri bu plana dahil edilmemeli.

## Teknik dağıtım

Mevcut uygulama şunları otomatik üretiyor:

- Her sayfa için canonical URL
- `BlogPosting` JSON-LD
- Open Graph ve Twitter kartı
- 1200×630 paylaşım görseli
- `/sitemap.xml`
- `/rss.xml`
- `/robots.txt`
- Okunma süresi, güncelleme tarihi ve erişilebilir alt metin

Canlıya çıktıktan sonra:

1. Domain Google Search Console'a eklenir.
2. `https://recepozgur.com/sitemap.xml` gönderilir.
3. İlk üç URL, URL Inspection ile kontrol edilir; manuel indeks talebi keşif garantisi değil yalnızca sinyaldir.
4. 404, canonical, mobile usability ve structured data raporları haftalık kontrol edilir.
5. Search Console sorguları 28 günlük pencerede incelenir; gösterim alan ama tıklanmayan yazıların başlık/açıklaması düzeltilir.

## LinkedIn dağıtımı

Her blog için tek paket:

- 3 hook adayı
- 1 ana LinkedIn postu
- 1 yazıya özel görsel
- Doğrudan canonical blog URL'si
- Yayından 7–14 gün sonra farklı açıdan ikinci dağıtım notu

Post linke ulaşmadan da yararlı olmalı. Link “ayrıntı ve kaynaklar” için doğal sonraki adım olur. Aynı paragraf farklı haftalarda tekrar paylaşılmaz.

Önerilen ritim: haftada 1 güçlü blog + 2 LinkedIn postu. İkinci post yeni blog zorunluluğu olmadan mevcut bir yazıdaki tek alt fikri işler. İlk 8 hafta hacim artırmak yerine ritmin sürdürülebilirliği ölçülür.

## Dış dağıtım

- RSS linki GitHub profil README ve uygun developer profillerine eklenir.
- Bir yazı gerçekten bir GitHub projesinin teknik kararını açıklıyorsa ilgili README'den bloga bağlanır.
- Kaynak sahibini etiketlemek veya topluluğa link bırakmak yalnızca gerçek bağlam ve katkı varsa yapılır; otomatik yorum/DM yoktur.
- Dev.to/Medium kopyası kullanılacaksa asıl yazıya canonical verilmeden duplicate yayın yapılmaz.

## Ölçüm

İlk 90 gün için takip edilecek metrikler:

- Search Console impressions, clicks, CTR ve ortalama konum
- Hangi sorguların doğru hedef kitleyi getirdiği
- Blog → iletişim/LinkedIn/GitHub çıkış tıklamaları
- LinkedIn post görüntülenmesi → blog tıklaması
- Yazı başına nitelikli dönüş: bağlantı, iş görüşmesi, teknik konuşma, issue/PR
- Güncelleme gerektiren eski kaynak oranı

Pageview tek başına başarı ölçütü değildir. On doğru okuyucudan gelen bir iş görüşmesi, yüzlerce alakasız ziyaretten daha değerlidir.

## 30 günlük başlangıç

### 1. hafta

- Blog ve üç başlangıç yazısını yayınla.
- Search Console ve sitemap'i bağla.
- Her yazının mobil, canonical, OG ve kaynak linklerini canlıda kontrol et.

### 2. hafta

- “Mobilde idempotency neden UI kararıdır?” yazısını üret.
- İlk üç yazı arasında yalnızca bağlama uygun internal linkler ekle.
- İlk LinkedIn dağıtım paketini yayınla.

### 3. hafta

- “Entitlement için tek gerçek kaynağı nerede tutmalı?” yazısını üret.
- Search Console'da keşif/index durumunu kontrol et; henüz sıralama çıkmamasını hata sayma.
- En iyi hook biçimini kaydet, genellemek için en az 10 post bekle.

### 4. hafta

- İlk 28 günlük sorguları ve LinkedIn tıklamalarını karşılaştır.
- Gösterim alan başlıkları iyileştir; gösterim almayan yazıları yalnızca kelime ekleyerek şişirme.
- Sonraki dört yazıyı gerçek sorgular + hedef kitle ihtiyacına göre seç.

## Ana kaynaklar

- [Google Search — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search — Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google Search — Image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)
- [Astro — Content collections](https://docs.astro.build/en/guides/content-collections/)
