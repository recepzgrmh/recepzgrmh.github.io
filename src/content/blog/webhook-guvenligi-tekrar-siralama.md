---
title: "Webhook İmzası Doğrulandıktan Sonra Ne Kontrol Edilmeli?"
description: "İmza doğrulama webhook güvenliğinin yalnızca ilk adımıdır. Tekrar oynatma, sıralama ve işlem durumunu birlikte ele alalım."
slug: "webhook-guvenligi-tekrar-siralama"
publishedAt: 2026-09-21
tags: ["webhook","backend","güvenlik","ödeme sistemleri","idempotency","event-driven"]
category: "Backend"
heroImage: "/blog/webhook-guvenligi-tekrar-siralama.jpg"
heroAlt: "İmza doğrulamasından idempotency ve kuyruk işlemine ilerleyen webhook güvenliği akışı"
featured: false
draft: false
sources:
  - label: "IETF RFC 9421 — HTTP Message Signatures"
    url: "https://datatracker.ietf.org/doc/html/rfc9421"
    note: "HTTP mesajlarının imzalanması, imza kapsamı, zaman sınırları ve nonce ile tekrar oynatma riskleri."
  - label: "Stripe — Receive Stripe events in your webhook endpoint"
    url: "https://docs.stripe.com/webhooks?lang=node"
    note: "Yeniden denemeler, olay sırası, yinelenen olaylar, imza doğrulama, replay koruması ve hızlı 2xx yanıtı."
  - label: "Stripe — Resolve webhook signature verification errors"
    url: "https://docs.stripe.com/webhooks/signature?lang=node"
    note: "Ham istek gövdesi, Stripe-Signature başlığı ve endpoint secret ile doğrulama."
  - label: "MDN — Replay attack"
    url: "https://developer.mozilla.org/en-US/docs/Glossary/Replay_attack"
    note: "Tekrar oynatma saldırısının genel tanımı ve benzersiz tanımlayıcı kullanımı."
  - label: "Clerk — Webhooks overview"
    url: "https://clerk.com/docs/guides/development/webhooks/overview"
    note: "İmza doğrulama ve IP tabanlı ek koruma katmanları hakkında ürün dokümantasyonu."
---

Webhook alan bir backend’in ilk savunması genellikle imza doğrulamadır. Bu doğru bir başlangıçtır. Gönderen servis, isteğin kendisinden geldiğini ve gövdenin değiştirilmediğini kanıtlamaya çalışır.

Fakat bu kanıt tek başına şu soruları cevaplamaz:

- Bu olay daha önce işlendi mi?
- Olay, hâlâ geçerli olduğu zaman aralığında mı geldi?
- Aynı kaynağa ait daha yeni bir durum zaten işlendi mi?
- Bu mesajın içindeki veriye güvenmeli miyim, yoksa kaynağı tekrar okumalı mıyım?

**Güvenilir bir webhook tüketicisi, isteği yalnızca doğrulamaz; onu kontrollü biçimde kabul eder.** Ödeme, üyelik, teslimat veya kimlik senkronizasyonu gibi işlerde hata çoğu zaman imzanın yanlış olmasından değil, geçerli bir mesajın yanlış zamanda ya da ikinci kez işlenmesinden çıkar.

## Geçerli imza, yeni mesaj anlamına gelmez

Bir saldırgan geçerli bir isteği ve imzasını ele geçirirse, aynı isteği daha sonra tekrar göndermeyi deneyebilir. İmza hâlâ geçerli olabilir; çünkü imza mesajın değiştirilmediğini gösterir, mesajın daha önce kullanılıp kullanılmadığını değil.

Bu, tekrar oynatma saldırısının temelidir. IETF’in HTTP Message Signatures standardı, imzanın zaman sınırıyla birlikte değerlendirilmesini ve gerektiğinde her mesaj için benzersiz bir `nonce` kullanılmasını öneren mekanizmalar tanımlar. Standart aynı zamanda TLS’in hâlâ gerekli olduğunu açıkça belirtir; imza, aktarım sırasında gizlilik sağlamaz. ([datatracker.ietf.org](https://datatracker.ietf.org/doc/html/rfc9421?utm_source=openai))

Stripe’ın webhook modelinde bu ayrım pratik biçimde görülür. İmza başlığında zaman damgası bulunur ve resmi kütüphaneler varsayılan olarak beş dakikalık bir toleransla eski istekleri reddedebilir. Stripe ayrıca yeniden denenen her teslimat için yeni bir zaman damgası ve imza üretir. ([docs.stripe.com](https://docs.stripe.com/webhooks?lang=node&utm_source=openai))

Bu yüzden tüketici tarafında en az şu kontroller bulunmalıdır:

1. Gövde, ham hâliyle imza doğrulamasından geçirilir.
2. Zaman damgası kabul edilebilir aralıkta mı bakılır.
3. Olay kimliği veya benzersiz mesaj kimliği daha önce işlendi mi kontrol edilir.
4. Aynı anahtar için eşzamanlı iki işlem yarış koşuluna karşı korunur.

*Saat kontrolü yapıyorsanız sunucu saatinin doğru olması da güvenlik kontrolünün parçasıdır.* Dağıtık sistemlerde NTP senkronizasyonu bu nedenle önem kazanır. ([docs.stripe.com](https://docs.stripe.com/webhooks?lang=node&utm_source=openai))

## Idempotency anahtarı log satırı değildir

Bir olayı işledikten sonra yalnızca log’a “event received” yazmak yeterli değildir. Log, gözlem yapmayı sağlar; işlemi durduracak atomik bir garanti vermez.

Bunun yerine veritabanında benzersiz kısıtla korunan bir kayıt tutulabilir:

```sql
CREATE TABLE webhook_receipts (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  received_at TIMESTAMP NOT NULL,
  processed_at TIMESTAMP NULL,
  status TEXT NOT NULL
);
```

İstek geldiğinde uygulama önce `event_id` için kayıt açmayı dener. Kayıt başarıyla açılırsa olay işlenmeye adaydır. Benzersiz anahtar hatası alınırsa mesaj daha önce görülmüştür.

Buradaki ayrıntı önemlidir: **“önce kontrol et, sonra ekle” yaklaşımı yarış koşuluna açıktır.** İki worker aynı anda kontrol edip kaydı yok görebilir. Atomik `INSERT`, benzersiz indeks veya eşdeğer bir veritabanı mekanizması kullanılmalıdır.

Stripe’ın güncel dokümantasyonu da yinelenen olaylara karşı olay kimliklerinin kaydedilmesini ve daha önce işlenmiş kimliklerin atlanmasını öneriyor. Bazı durumlarda iki ayrı Event nesnesi aynı iş nesnesini temsil edebileceği için olay türüyle birlikte kaynak nesnenin kimliğinin de değerlendirilmesi gerekebilir. ([docs.stripe.com](https://docs.stripe.com/webhooks?lang=node&utm_source=openai))

Basit bir akış şöyle görünebilir:

```javascript
async function receiveWebhook(request) {
  const event = verifySignature(request.rawBody, request.headers);

  const inserted = await db.webhookReceipts.insertIfAbsent({
    eventId: event.id,
    eventType: event.type,
    status: "received"
  });

  if (!inserted) {
    return { status: 200, body: "already received" };
  }

  await queue.publish({ eventId: event.id });
  return { status: 200, body: "accepted" };
}
```

Bu örnekte kuyruk mesajı da kendi deduplication mekanizmasına sahip olmalıdır. Çünkü webhook alıcısı bir kez kayıt açsa bile, kuyruk gönderimi ile worker işlemesi arasında hata yaşanabilir.

## Olaylar her zaman sırayla gelmez

Bir abonelik oluşturulurken birden fazla olay üretilebilir. Faturalandırma, ödeme ve abonelik olayları ağ gecikmesi, yeniden deneme veya farklı worker’lar nedeniyle beklenmeyen sırada ulaşabilir.

Stripe, olayların üretildikleri sırayla teslim edileceğini garanti etmediğini belirtiyor. Örneğin bir ödeme olayı, kendisinden önce beklenen fatura veya abonelik olayından önce gelebilir. Bu durumda tüketici, olay sırasına körü körüne güvenmek yerine gerektiğinde API üzerinden güncel nesneyi tekrar okumalıdır. ([docs.stripe.com](https://docs.stripe.com/webhooks?lang=node&utm_source=openai))



Bu yaklaşım, olayları tamamen değersiz hâle getirmez. Olay yine “bir şey değişti” sinyalidir. Ancak son durumun kaynağı olarak her mesajın gövdesine güvenmek yerine, kritik kararları kaynak sistemdeki güncel veriye bağlamak daha güvenlidir.

Bir kaydın durumunu geriye götürmemek için de sürüm veya zaman kontrolü uygulanabilir:

```text
Gelen olayın sürümü < mevcut sürüm ise:
    olayı kabul et, fakat durumu değiştirme

Gelen olayın sürümü == mevcut sürüm ise:
    idempotent tekrar olarak ele al

Gelen olayın sürümü > mevcut sürüm ise:
    durumu güncelle
```

Her sağlayıcı sürüm alanı sunmaz. Böyle bir alan yoksa kaynak nesnenin güncel hâlini çekmek, yalnızca olayların geliş sırasına güvenmekten daha sağlam olabilir. Bu kararın maliyeti ve tutarlılık modeli ürüne göre değerlendirilmelidir.

## Hızlı yanıt, güvenli işleme karşı değildir

Webhook endpoint’inin uzun süren iş mantığını doğrudan HTTP isteği içinde çalıştırması, hem zaman aşımına hem de gereksiz yeniden denemelere yol açabilir. Stripe, endpoint’in karmaşık işlemlerden önce hızlı biçimde `2xx` yanıtı vermesini ve olayların asenkron bir kuyrukla işlenmesini öneriyor. ([docs.stripe.com](https://docs.stripe.com/webhooks?lang=node&utm_source=openai))

Bu, “her isteğe hemen 200 dön” anlamına gelmez. İmza doğrulanmamışsa veya mesaj biçimi geçersizse istek reddedilmelidir. Başarılı yanıt, olayın güvenli biçimde alındığını ve yeniden işlenmeyecek şekilde kayda geçtiğini ifade etmelidir.

İyi bir webhook endpoint’i genellikle şu sırayı izler:

- HTTPS üzerinden isteği alır.
- Ham gövdeyle imzayı doğrular.
- Zaman damgasını kontrol eder.
- Olay kimliğini atomik biçimde kaydeder.
- Olayı kuyruğa bırakır.
- İşleme sonucunu ve hata durumunu ölçülebilir şekilde saklar.
- Gerekirse kaynak sistemden güncel nesneyi okur.



Webhook güvenliği için IP allowlist de ek bir katman olabilir. Fakat tek başına yeterli değildir. Sağlayıcının IP aralıkları değişebilir, ağ katmanındaki kontrol uygulama mesajının daha önce işlenip işlenmediğini söylemez. Clerk’in dokümantasyonu da imza doğrulamasını temel kontrol olarak sunarken, sağlayıcının IP’lerini kabul etmenin ek bir koruma olduğunu belirtiyor. ([clerk.com](https://clerk.com/docs/guides/development/webhooks/overview?utm_source=openai))

> Webhook’un gerçekten gönderenden geldiğini kanıtlamak, onun bugün ve ilk kez işlendiğini kanıtlamaz.

Bu ayrımı tasarımın başında yapmak, sonradan eklenen `try/catch` bloklarından daha değerlidir. Çünkü webhook tüketicisi aslında tek bir HTTP endpoint’i değil; doğrulama, deduplication, kuyruk, durum geçişi ve gözlemlenebilirlikten oluşan küçük bir dağıtık sistemdir.

Bir sonraki entegrasyonda yalnızca “imza doğru mu?” diye sormak yerine şu dört soruyu birlikte sorun: Mesaj eski mi, daha önce işlendi mi, sırası güvenilir mi ve işlem başarısız olursa tekrar denendiğinde aynı sonucu üretecek mi? Cevaplar net değilse webhook henüz güvenilir değildir.
