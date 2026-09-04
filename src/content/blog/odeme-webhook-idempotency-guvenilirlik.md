---
title: "Ödemede Güvenilirlik, İstek Başarılı Olduğunda Bitmez"
description: "Ödeme entegrasyonlarında idempotency, webhook tekrarları ve imza doğrulamasını birlikte tasarlamak için pratik bir teknik çerçeve."
slug: "odeme-webhook-idempotency-guvenilirlik"
publishedAt: 2026-07-19
tags: ["ödeme sistemleri", "webhook", "idempotency", "Stripe", "backend", "güvenilirlik"]
category: "Ödeme Sistemleri"
heroImage: "/blog/odeme-webhook-idempotency-guvenilirlik.png"
heroAlt: "Aynı ödeme operasyonunun tek kez uygulanması."
featured: false
draft: false
sources:
  - label: "Stripe — Receive Stripe events in your webhook endpoint"
    url: "https://docs.stripe.com/webhooks"
    note: "Webhook imza doğrulaması, ham request body, duplicate event’ler, asenkron işleme, hızlı 2xx yanıtı ve replay saldırılarına karşı zaman toleransı."
  - label: "Stripe — Idempotent requests"
    url: "https://docs.stripe.com/api/idempotent_requests"
    note: "Idempotency key kullanımı, aynı anahtarla tekrar çağrılar, parametre uyuşmazlığı ve API v1 davranışı."
  - label: "Stripe — API v2 overview"
    url: "https://docs.stripe.com/api-v2-overview"
    note: "API v1 ve API v2 idempotency davranışları, API v2’de başarısız isteklerin yeniden yürütülmesi ve 30 günlük kapsam."
  - label: "Stripe — Resolve webhook signature verification errors"
    url: "https://docs.stripe.com/webhooks/signature"
    note: "Ham payload, Stripe-Signature başlığı ve endpoint secret ile imza doğrulama gereklilikleri."
  - label: "Stripe — Error handling"
    url: "https://docs.stripe.com/error-handling"
    note: "Idempotency hataları ve rate limit durumlarında yeniden deneme yaklaşımı."
---

Bir ödeme akışı ilk bakışta basit görünür. Kullanıcı düğmeye basar, backend ödeme sağlayıcısına istek gönderir, sonuç döner ve uygulama erişimi açar. Fakat gerçek sistemlerde ağ kopar, istemci zaman aşımına uğrar, sağlayıcı isteği işleyip yanıtı ulaştıramaz veya aynı webhook tekrar gönderilir.

Bu durumda sorun genellikle “ödeme sağlayıcısı çalışmadı” değildir. Sorun, uygulamanın **aynı operasyonun tekrarını güvenle yönetememesidir**.

Stripe’ın güncel dokümantasyonu bu alanı birkaç ayrı mekanizma üzerinden tarif ediyor: API isteklerinde idempotency key kullanımı, webhook imza doğrulaması, tekrar eden event’lerin ayıklanması, olayların asenkron işlenmesi ve hızlı `2xx` yanıtı. Bunları tek tek eklemek kolaydır. Zor olan, hepsini aynı durum modelinin parçası hâline getirmektir.

## Tekrar, istisna değil normal akıştır

Bir istemci ödeme başlatmak için backend’e istek gönderdiğinde iki farklı belirsizlik oluşabilir:

- İstek sağlayıcıya hiç ulaşmamış olabilir.
- Sağlayıcı isteği işlemiş, fakat yanıt backend’e ulaşmamış olabilir.

İkinci durumda backend isteği yeniden gönderebilir. Eğer ödeme oluşturma işlemi tekrar çalıştırıldığında yeni bir ödeme nesnesi yaratıyorsa kullanıcı iki kez ücretlendirilebilir veya sistemde iki ayrı sipariş oluşabilir.

Bu nedenle ödeme oluşturan `POST` isteği, iş operasyonunu temsil eden kararlı bir anahtarla gönderilmelidir. Stripe API’sinde bu amaçla `Idempotency-Key` kullanılır. Aynı anahtarla yapılan tekrar çağrılar, API v1’de ilk isteğin saklanan sonucunu döndürür; parametreler ilk çağrıyla uyuşmuyorsa idempotency hatası oluşur. Stripe’ın API v2 dokümantasyonu ise başarısız idempotent isteklerin yan etki üretmeden yeniden yürütülebileceğini ve idempotency kapsamının API v1’den farklı olduğunu belirtiyor.

```javascript
const payment = await stripe.paymentIntents.create(
  {
    amount: 4999,
    currency: 'try',
    metadata: { orderId }
  },
  {
    idempotencyKey: `order:${orderId}:payment:create`
  }
);
```

Buradaki anahtarın her HTTP denemesinde yeniden üretilmemesi gerekir. Aynı iş operasyonunu temsil eden tekrarlar aynı anahtarı taşımalıdır. Buna karşılık farklı bir ödeme denemesi, örneğin kullanıcı siparişi yeniden başlatıyorsa, farklı bir operasyon kimliğine sahip olmalıdır.

*Idempotency key, veritabanındaki sipariş durumunun yerine geçmez.* Sadece sağlayıcıya gönderilen belirli operasyonun tekrarında aynı davranışı korumaya yardım eder.

## Webhook geldiğinde önce güvenlik, sonra iş mantığı

Ödeme sağlayıcısının yanıtı, ödeme akışının son ve kesin kaynağı olmak zorunda değildir. Banka onayı, başarısız tahsilat, iade veya abonelik yenilemesi gibi olaylar daha sonra webhook olarak gelebilir.

Webhook endpoint’inin ilk işi JSON’u parse edip siparişi güncellemek olmamalı. Önce isteğin gerçekten sağlayıcıdan geldiği doğrulanmalıdır. Stripe, imza doğrulaması için ham request body’yi, `Stripe-Signature` başlığını ve endpoint secret’ını kullanır. Framework’ün body’yi parse edip yeniden biçimlendirmesi doğrulamayı bozabilir.

```javascript
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const signature = request.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      return response.status(400).send('Invalid webhook signature');
    }

    // Burada ağır iş yapma; olayı kuyruğa bırak.
    return response.sendStatus(200);
  }
);
```

İmza doğrulaması yalnızca kimlik kontrolü değildir. Stripe, imzalı payload içinde zaman damgası da taşır ve kütüphaneler varsayılan olarak beş dakikalık bir toleransla eski payload’ları reddedebilir. Sunucunun saatinin doğru olması bu yüzden önemlidir. Sıfır tolerans kullanmak ise yeniden oynatma korumasını devre dışı bırakabilir.

![Tekrar eden ödeme isteklerinin tek operasyonda birleşmesi.](/blog/odeme-webhook-idempotency-guvenilirlik-inline-1.svg)

*Idempotency anahtarı*

## Aynı event iki kez gelirse ne olacak?

Stripe, webhook endpoint’lerinin aynı event’i birden fazla kez alabileceğini açıkça belirtiyor. Daha da önemlisi, bazı durumlarda aynı iş olayını anlatan iki ayrı Event nesnesi üretilebilir. Bu yüzden yalnızca event ID’sini kontrol etmek her senaryoyu kapsamayabilir; `data.object` içindeki nesne kimliği ile event türünü birlikte değerlendirmek gerekebilir.

Uygulamada webhook tüketicisinin kalıcı bir kayıt tutması gerekir. Örneğin:

| Kayıt | Amaç |
|---|---|
| `event_id` | Aynı webhook teslimatını ikinci kez çalıştırmamak |
| `event_type` | Hangi iş kuralının tetiklendiğini bilmek |
| `object_id` | Aynı ödeme veya abonelik nesnesini izlemek |
| `processed_at` | İşlemin ne zaman tamamlandığını görmek |
| `status` | Alındı, işlendi veya hata durumunu ayırmak |

Bu kayıt yalnızca “daha önce gördüm” kontrolü için kullanılmamalı. Aynı zamanda gözlemlenebilirlik ve yeniden işleme mekanizmasının temelini oluşturmalı.

Örneğin event daha önce `processed` olarak kayıtlıysa tekrar gelen webhook güvenle başarıyla cevaplanabilir. Ancak kayıt `failed` durumundaysa olayın yeniden kuyruğa alınması veya operatör incelemesine bırakılması gerekir. Her tekrarın sessizce yok sayılması, gerçek bir işleme hatasını da gizleyebilir.

## Hızlı yanıt ile doğru işleme aynı şey değil

Webhook endpoint’inin sağlayıcıya hızlı bir `2xx` yanıt vermesi gerekir. Stripe, karmaşık iş mantığını yanıt vermeden önce çalıştırmanın zaman aşımı ve ölçeklenme sorunlarına yol açabileceğini belirtiyor. Bu nedenle tipik akış şöyle kurulabilir:

1. Ham isteği al.
2. İmzayı doğrula.
3. Event kimliğini ve temel metadata’yı kalıcı kayda yaz.
4. Daha önce başarıyla işlendi ise `2xx` dön.
5. Yeni olayı kuyruğa bırak.
6. Ayrı bir worker ile sipariş, abonelik veya erişim durumunu güncelle.
7. İşlem sonucunu kaydet.

Bu yapı, “webhook geldiği anda her şeyi bitir” yaklaşımından daha dayanıklıdır. Fakat kuyruğa bırakmak tek başına yeterli değildir. Worker aynı mesajı iki kez alabilir; işleme yarıda kalabilir; olaylar beklenmeyen sırada gelebilir.

Bu yüzden iş kuralı, event’in geliş sırasına körü körüne güvenmemelidir. Mevcut sağlayıcı durumunu yeniden okuyarak karar vermek, özellikle ödeme ve abonelik gibi kaynaklarda daha güvenli olabilir. Yine de bu davranış her ürün için otomatik bir zorunluluk değildir; veri modeli ve sağlayıcının olay semantiği ayrıca incelenmelidir.

![İmza doğrulama, kalıcı event kaydı ve kuyruk üzerinden işleme.](/blog/odeme-webhook-idempotency-guvenilirlik-inline-2.svg)

*Webhook işleme akışı*

## Güvenilir ödeme akışının sınırları

Idempotency, webhook deduplication ve imza doğrulaması birlikte kullanıldığında önemli bir koruma sağlar. Fakat bunlar her problemi çözmez.

- Idempotency key yanlış kapsamda üretilirse iki farklı iş operasyonu aynı kabul edilebilir.
- Webhook kaydı yazıldıktan sonra worker çalışmazsa yeniden işleme mekanizması gerekir.
- Event türleri gereğinden fazla dinlenirse endpoint ve kuyruk gereksiz yük alır.
- Sağlayıcıdaki başarılı ödeme ile uygulamadaki sipariş durumu arasında kısa süreli gecikme olabilir.
- Endpoint secret’ları düzenli olarak döndürülmeli ve eski secret’ın ne kadar süre aktif kalacağı planlanmalıdır.

Bu nedenle tasarım toplantısında yalnızca “ödeme başarılı mı?” sorusunu sormak eksik kalır. Daha yararlı sorular şunlardır:

- Aynı istek ağ hatasından sonra tekrarlandığında ne olur?
- Aynı webhook on kez geldiğinde hangi kayıt değişir?
- İmza geçersizse olay nerede görünür?
- İşleme yarıda kalırsa aynı event güvenle tekrar çalışır mı?
- Sağlayıcı yanıtı ile webhook farklı zamanlarda gelirse hangi durum geçerli sayılır?

> Ödeme sisteminde güvenilirlik, tek bir başarılı çağrıdan değil, aynı operasyon tekrar tekrar denendiğinde hâlâ tek bir doğru sonuca ulaşabilmekten anlaşılır.

Bir backend’in ödeme entegrasyonu sağlam görünmek için yalnızca test modunda başarılı ödeme üretmesi yetmez. Ağ zaman aşımı, duplicate webhook, geçersiz imza, gecikmiş event ve yarıda kalmış worker gibi durumlar da tasarımın parçası olmalıdır.

Bu yaklaşım belirli bir sağlayıcıya özgü değildir. Stripe’ın isimlendirmeleri ve süreleri değişebilir; fakat problem sınıfı aynıdır: dış sistemlerle konuşan bir uygulama, tekrarları ve belirsizliği açıkça modellemezse doğru görünen kod yanlış sonuçlar üretebilir.
