---
title: "Veritabanı Güncellendiğinde Olayı Nasıl Güvenle Yayınlarsın?"
description: "Veritabanı işlemi başarılı olup olay kaybolmasın diye Transactional Outbox desenini, CDC ve tüketici idempotency’siyle birlikte inceliyoruz."
slug: "transactional-outbox-event-yayinlama"
publishedAt: 2026-08-04
tags: ["backend", "event-driven architecture", "transactional outbox", "CDC", "Debezium", "Kafka"]
category: "Backend"
heroImage: "/blog/transactional-outbox-event-yayinlama.png"
heroAlt: "İş verisi ve olay kaydının aynı transaction'da yazılması."
featured: false
draft: false
sources:
  - label: "Microservices.io — Transactional Outbox Pattern"
    url: "https://microservices.io/patterns/data/transactional-outbox.html"
    note: "Desenin problemi, çözümü, avantajları ve relay’in duplicate yayınlayabilmesi."
  - label: "Debezium Documentation — Outbox Event Router"
    url: "https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html"
    note: "Outbox tablo alanları, event routing, aggregate ID ve CDC tabanlı yayınlama ayrıntıları."
  - label: "Microservices.io — Polling Publisher"
    url: "https://microservices.io/patterns/data/polling-publisher.html"
    note: "Outbox kayıtlarını polling ile yayınlamanın özellikleri ve sınırlamaları."
  - label: "PostgreSQL Documentation — Transaction Isolation"
    url: "https://www.postgresql.org/docs/current/transaction-iso.html"
    note: "PostgreSQL transaction isolation seviyeleri ve varsayılan READ COMMITTED davranışı."
  - label: "Debezium Documentation — Distributed Tracing"
    url: "https://debezium.io/documentation/reference/stable/integrations/tracing.html"
    note: "Outbox olaylarında tracing context aktarımı hakkında resmi dokümantasyon."
---

Bir backend işlemi çoğu zaman iki ayrı sistemi aynı anda etkiler: kendi veritabanını ve mesaj aracısını. Sipariş oluşturulur, stok güncellenir, ödeme durumu değişir veya kullanıcıya bildirim gönderilmesi gerekir. Uygulama veritabanına yazdıktan sonra mesaj yayınlamayı planlıyorsa, bu iki işlem arasında küçük görünen ama gerçek bir hata aralığı oluşur.

Servis, veritabanı işlemi tamamlandıktan hemen sonra çökerse olay hiç yayınlanmayabilir. Mesaj önce yayınlanır ve veritabanı işlemi daha sonra geri alınırsa bu kez tüketiciler gerçekte oluşmamış bir durumu görür. Distributed transaction ya da 2PC her ortamda uygun olmadığı için daha sade bir yaklaşım öne çıkar: **olayı da iş verisiyle aynı veritabanı işleminde saklamak**.

Bu yaklaşım Transactional Outbox olarak bilinir. İşlem tamamlandıktan sonra başka bir süreç, outbox kayıtlarını mesaj aracısına taşır. Desen, veritabanı ile broker arasında sihirli bir atomiklik sağlamaz; atomik olan bölüm, iş verisiyle outbox kaydının birlikte yazılmasıdır. ([microservices.io](https://microservices.io/patterns/data/transactional-outbox.html?source=post_page-----fa3de00ceba5---------------------------------------&utm_source=openai))

## Olayı önce veritabanına yazmak

Basit bir sipariş akışını düşünelim:

1. Sipariş kaydı oluşturulur.
2. Siparişin oluştuğunu belirten olay hazırlanır.
3. Sipariş ve olay aynı transaction içinde kaydedilir.
4. Ayrı bir relay süreci outbox kaydını broker’a gönderir.

Örneğin PostgreSQL üzerinde tablo şu alanları içerebilir:

```sql
CREATE TABLE outbox_events (
    id UUID PRIMARY KEY,
    aggregate_type TEXT NOT NULL,
    aggregate_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    published_at TIMESTAMPTZ NULL
);
```

Uygulama tarafındaki transaction ise kabaca şöyle çalışır:

```sql
BEGIN;

INSERT INTO orders (id, customer_id, status)
VALUES ('order-123', 'customer-42', 'created');

INSERT INTO outbox_events (
    id,
    aggregate_type,
    aggregate_id,
    event_type,
    payload
)
VALUES (
    'event-987',
    'Order',
    'order-123',
    'OrderCreated',
    '{"orderId":"order-123","customerId":"customer-42"}'::jsonb
);

COMMIT;
```

`COMMIT` başarılı olursa iki kayıt da kalır. Geri alınırsa ikisi de kalmaz. PostgreSQL’in varsayılan `READ COMMITTED` davranışı, her sorgunun başladığı anda commit edilmiş veriyi görmesi üzerine kuruludur; bu desenin doğruluğu ise esas olarak sipariş ve outbox yazımının aynı transaction içinde yapılmasına dayanır. ([postgresql.org](https://www.postgresql.org/docs/16/transaction-iso.html?utm_source=openai))

Burada önemli bir uygulama ayrıntısı var: olay payload’ı sonradan mevcut siparişten tekrar üretilmemeli. Çünkü siparişin sonraki hali, ilk olayın temsil ettiği durumu değiştirebilir. Olayın gerekli verisi transaction sırasında oluşturulup outbox kaydına yazılmalıdır.

## Relay seçimi mimariyi değiştirir

Outbox tablosuna kayıt eklemek tek başına yeterli değildir. Bu kayıtların broker’a nasıl taşınacağı da tasarımın parçasıdır.

### Polling publisher

Bir worker, outbox tablosunu belirli aralıklarla tarar. İşlenmemiş kayıtları seçer, broker’a gönderir ve ardından durumu günceller. Bu yöntem SQL veritabanlarıyla çalışması bakımından pratiktir. Ancak çok sayıda worker aynı kayıtları seçebilir. Bu yüzden satır kilitleme, claim süresi ve yeniden deneme davranışı dikkatle tasarlanmalıdır.

Ayrıca relay, mesajı broker’a gönderdikten sonra `published_at` alanını güncellemeden çökerse aynı olay yeniden gönderilebilir. Bu bir istisna değil, desenin beklenen sonucudur. Transactional Outbox, çoğu pratik uygulamada **en az bir kez teslim** davranışına yakındır; tek seferlik teslim garantisi vermez. ([microservices.io](https://microservices.io/patterns/data/polling-publisher.html?utm_source=openai))

### Transaction log tailing ve CDC

İkinci yaklaşım, veritabanının değişiklik günlüğünü izlemektir. Debezium’un Outbox Event Router dönüşümü, outbox tablosundaki değişiklikleri yakalayıp olayları uygun topic ve key bilgileriyle yönlendirebilir. Belgelerdeki varsayılan yapı `id`, `aggregatetype`, `aggregateid`, `type` ve `payload` gibi alanları kullanır. `aggregateid`, Kafka mesaj anahtarı olarak kullanıldığında aynı aggregate için bölüm sıralamasına yardımcı olur. ([debezium.io](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html?utm_source=openai))

CDC, uygulamanın her mesajı kendisinin yayınlaması gereğini azaltır. Fakat bu, operasyonel sorumluluğu ortadan kaldırmaz. Connector durumu, replication slot’ları, gecikme, schema değişiklikleri ve outbox tablosunun büyümesi izlenmelidir.

![İş verisi ve outbox kaydının birlikte yazılıp relay ile broker'a aktarılması.](/blog/transactional-outbox-event-yayinlama-inline-1.svg)

*Tek transaction, iki kayıt*

## Duplicate kaçınılmazsa tüketici ne yapmalı?

Relay’in tekrar yayın yapabilmesi, tüketicinin de tekrar gelen olaya dayanıklı olmasını gerektirir. Her tüketici için ideal çözüm aynı değildir ama şu varsayım güvenlidir: **aynı event ID birden fazla kez görülebilir**.

Tüketici, işlediği event kimliklerini saklayabilir:

```sql
CREATE TABLE processed_events (
    consumer_name TEXT NOT NULL,
    event_id UUID NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (consumer_name, event_id)
);
```

İşlem ve `processed_events` kaydı mümkünse aynı yerel transaction içinde yapılır. Böylece tüketici, olayın etkisini uygulayıp kimliği kaydetmeden çökerse yeniden deneyebilir; kimlik zaten kayıtlıysa aynı etkiyi ikinci kez uygulamaz.

Bu yaklaşımın sınırları da vardır. Tüketici birden fazla dış sistemi etkiliyorsa, kendi veritabanındaki kayıt ile harici API çağrısı yine aynı transaction’a alınamaz. Bu durumda idempotency key, sağlayıcının tekrar güvenli API’si veya telafi işlemleri gerekebilir. Outbox deseni bu problemi yok etmez; problemin sınırlarını daha görünür hale getirir.

## Sıralama, şema ve yaşam döngüsü

Olayları yalnızca “gönderildi” bilgisiyle modellemek çoğu sistem için eksik kalır. En azından şu soruların cevabı olmalıdır:

- Aynı aggregate için olay sırası nasıl korunacak?
- Bir olay kaç kez denendi?
- Son hata neydi?
- Olay ne kadar süre saklanacak?
- Payload şeması nasıl geriye dönük uyumlu kalacak?
- Tüketici eski bir olayla karşılaştığında ne yapacak?

Debezium, olay kimliği, aggregate türü, aggregate kimliği ve payload gibi alanları yönlendirme için kullanabilir. Ancak topic tasarımı, partition key seçimi ve şema evrimi uygulamanın alanına bağlıdır; belgelerdeki varsayılan tablo yapısını her sisteme doğrudan kopyalamak doğru olmaz. ([debezium.io](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html?utm_source=openai))

Outbox tablosu ayrıca bir arşiv değildir. Relay’in güvenle işlediği kayıtların ne zaman silineceği ya da ayrı bir arşive taşınacağı belirlenmelidir. Silme işlemi, gecikmiş consumer’ların ihtiyaçları ve yeniden oynatma beklentisiyle çelişmemelidir.

![Aynı event ID ile gelen tekrar olayın ikinci kez uygulanmaması.](/blog/transactional-outbox-event-yayinlama-inline-2.svg)

*Tüketicide tekilleştirme*

> Transactional Outbox’ın vaadi mesajın yalnızca bir kez gitmesi değildir; iş verisi commit olduysa yayınlanacak bir olayın kaybolmamasını sağlamaktır.

Bu desen her backend için zorunlu değildir. Aynı veritabanındaki basit bir işlem için broker eklemek gereksiz karmaşıklık yaratabilir. Fakat bir komut hem kalıcı iş verisi üretiyor hem de başka bir bileşenin bu değişiklikten haberdar olması gerekiyorsa, “önce veritabanı, sonra mesaj” sıralamasının güvenilir olduğunu varsaymak tehlikelidir.

Daha sağlam tasarım, iş verisiyle yayınlanacak olayı aynı transaction’da kaydeder; relay’in tekrarlarını normal kabul eder; tüketiciyi event ID üzerinden idempotent tasarlar ve gözlemlenebilirliği yalnızca HTTP isteğine değil, olayın bütün yaşam döngüsüne yayar.
