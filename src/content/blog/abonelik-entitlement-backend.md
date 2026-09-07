---
title: "Mobil Aboneliklerde Entitlement Neden Yalnızca İstemcide Tutulmamalı?"
description: "Mobil abonelik erişimini güvenilir kılmak için backend doğrulaması, Apple bildirimleri, Google RTDN ve idempotency trade-offlarını ele alıyoruz."
slug: "abonelik-entitlement-backend"
publishedAt: 2026-07-16
tags: ["mobil abonelik", "entitlement", "backend doğrulaması", "App Store Server Notifications", "Google Play RTDN", "idempotency"]
category: "Mobil ve Backend"
heroImage: "/blog/abonelik-entitlement-backend.png"
heroAlt: "İstemcideki erişim bayrağı ile sunucuda doğrulanan yetkinin ayrımı."
featured: false
draft: false
sources:
  - label: "Apple — App Store Server Notifications"
    url: "https://developer.apple.com/documentation/appstoreservernotifications"
    note: "App Store Server Notifications V2, yaşam döngüsü olayları ve backend güncellemeleri."
  - label: "Apple — Validating receipts with the App Store"
    url: "https://developer.apple.com/documentation/storekit/validating-receipts-with-the-app-store"
    note: "Doğrulamanın güvenli sunucuda yapılması ve verifyReceipt yaklaşımının güncel durumu."
  - label: "Apple — App Store Server API"
    url: "https://developer.apple.com/documentation/appstoreserverapi"
    note: "Apple imzalı transaction/subscription verileri, güncel durum ve bildirim geçmişi."
  - label: "Apple — Responding to App Store Server Notifications"
    url: "https://developer.apple.com/documentation/AppStoreServerNotifications/responding-to-app-store-server-notifications"
    note: "HTTP yanıtları, yeniden deneme aralıkları ve kaçırılan bildirimlerin kurtarılması."
  - label: "Google — Real-time developer notifications reference guide"
    url: "https://developer.android.com/google/play/billing/rtdn-reference"
    note: "RTDN olay türleri ve bildirimden sonra Developer API çağrılması gereği."
  - label: "Google — Integrate the Google Play Billing Library"
    url: "https://developer.android.com/google/play/billing/integrate.html"
    note: "Purchase token’ın güvenli backend’e gönderilmesi, doğrulama ve entitlement güncelleme akışı."
  - label: "Google — About subscriptions"
    url: "https://developer.android.com/google/play/billing/subscriptions"
    note: "Purchase token değişimleri, yükseltme/düşürme ve eski token’ın geçersizleştirilmesi."
  - label: "Google Cloud — Pub/Sub subscription overview"
    url: "https://cloud.google.com/pubsub/docs/subscription-overview"
    note: "Varsayılan at-least-once teslimat, sırasız/tekrarlı mesajlar ve idempotent subscriber gereği."
  - label: "Google Cloud — Exactly-once delivery"
    url: "https://cloud.google.com/pubsub/docs/exactly-once-delivery"
    note: "Exactly-once kapsamı, pull-only kısıtı, gecikme ve operasyonel trade-offlar."
---

## Entitlement neden istemcinin kararı olmamalı?

Mobil aboneliklerde entitlement, kullanıcının ücretli bir özelliğe erişip erişemeyeceğini ifade eder. İstemci uygulama bu bilgiyi gösterebilir; ancak tek başına bu bilginin kaynağı olmamalıdır.

Bunun temel nedeni güven sınırıdır. Uygulama cihazda çalışır, kullanıcı tarafından kontrol edilebilir ve ağ yanıtları değiştirilebilir. Apple da makbuz doğrulamasının güvenli bir sunucuda yapılmasını, `verifyReceipt` çağrısının doğrudan uygulamadan yapılmamasını söyler. Apple’ın gerekçesi, uygulama ile App Store arasında güvenilir bir bağlantının cihaz üzerinden kurulamayacağı ve bunun araya girme saldırılarına açık olduğudur. ([developer.apple.com](https://developer.apple.com/documentation/storekit/validating-receipts-with-the-app-store?changes=__3))

Google Play dokümantasyonu da satın alma jetonunun yerelde tutulabileceğini, ancak güvenli backend’e gönderilip orada doğrulanmasının ve dolandırıcılığa karşı korunmanın güçlü biçimde önerildiğini belirtir. Ayrıca satın alma doğrulanmadan entitlement verilmemesi ve bu işlemin backend’de yapılması önerilir. ([developer.android.com](https://developer.android.com/google/play/billing/integrate.html))

Bu nedenle istemci şu işleri yapabilir:

- Satın alma akışını başlatmak,
- Store’dan gelen transaction veya purchase token’ı backend’e iletmek,
- Backend’in verdiği erişim durumunu önbelleğe almak,
- Geçici ağ kesintilerinde kullanıcı arayüzünü makul biçimde sürdürmek.

Ama istemci tek başına şu kararı vermemelidir: “Bu kullanıcı premium özellikleri kullanabilir.” Bu kararın kalıcı ve güvenilir kaynağı backend olmalıdır.

## Backend doğrulaması nasıl çalışır?

Basit bir akış şöyle kurulabilir:

1. Kullanıcı App Store veya Google Play satın alma akışını tamamlar.
2. Uygulama, transaction bilgisi ya da purchase token’ı backend’e gönderir.
3. Backend, ilgili mağazanın API’ı üzerinden işlemi doğrular.
4. Backend; ürün, kullanıcı eşleşmesi, ödeme durumu, başlangıç-bitiş zamanı, iptal ve iade bilgilerini değerlendirir.
5. Backend kendi entitlement kaydını günceller.
6. Uygulama, API üzerinden bu entitlement durumunu okur.

Apple tarafında güncel yaklaşım, App Store Server API’den Apple imzalı transaction ve abonelik bilgilerini almak veya uygulamanın elde ettiği imzalı verileri backend’de doğrulamaktır. App Store Server API, uygulamanın cihazda kurulu olup olmamasından bağımsız olarak satın alma geçmişi ve abonelik durumu hakkında bilgi sağlayabilir. ([developer.apple.com](https://developer.apple.com/documentation/appstoreserverapi))

Google Play tarafında backend, purchase token ile Google Play Developer API’a başvurur. RTDN mesajı tek başına tam satın alma durumu taşımaz; Google’ın dokümantasyonuna göre bildirim alındığında purchase token kullanılarak Developer API’dan güncel durum alınmalıdır. ([developer.android.com](https://developer.android.com/google/play/billing/rtdn-reference?hl=en))

Buradaki önemli ayrım şudur: **mağaza olayı, backend’in nihai entitlement kaydı değildir.** Mağaza, bir durum değişikliği sinyali verir; backend bu sinyali doğrular, yorumlar ve kendi erişim modeline dönüştürür.

## App Store Server Notifications ne sağlar?

Apple’ın App Store Server Notifications V2 sistemi, satın alma yaşam döngüsündeki olayları sunucuya iletir. Satın alma, yenileme, teklif kullanımı, iade, abonelik sona ermesi ve Family Sharing erişiminin kaybedilmesi gibi olaylar bu yaşam döngüsünün parçasıdır. Apple, bu bildirimleri kullanıcı hesabı veritabanını güncellemek ve hizmet durumuna tepki vermek için kullanmayı önerir. V1 bildirimleri deprecated durumdadır; yeni entegrasyonlarda V2 kullanılmalıdır. ([developer.apple.com](https://developer.apple.com/documentation/appstoreservernotifications))

Örneğin kullanıcı App Store ayarlarından aboneliği iptal ederse uygulama açık olmayabilir. Yalnızca istemcinin `restore` veya `query` akışına güvenen bir sistem bu değişikliği geç öğrenebilir. Server Notification ise backend’e olayın gerçekleştiğini bildirir. Ancak bildirim geldi diye doğrudan “erişimi kapat” demek de doğru olmayabilir; olayın türü, subtype’ı ve imzalı transaction/subscription verisi birlikte değerlendirilmelidir.

Bildirim endpoint’i de güvenilir bir iş kuyruğu gibi ele alınmalıdır. Apple, başarılı işleme için 200–206 arası HTTP yanıtlarını; başarısızlıkta yeniden deneme amacıyla 40x veya 50x yanıtlarını kullanır. V2 bildirimleri üretim ortamında ilk denemeden sonra 1, 12, 24, 48 ve 72 saatlik aralıklarla yeniden gönderilebilir. Ayrıca kaçırılan bildirimler için Notification History ve güncel abonelik durumu için App Store Server API kullanılabilir. ([developer.apple.com](https://developer.apple.com/documentation/AppStoreServerNotifications/responding-to-app-store-server-notifications))

Bu, backend’in yalnızca webhook alıcısı değil, aynı zamanda yeniden senkronizasyon yapabilen bir sistem olması gerektiğini gösterir.

## Google Play RTDN ne sağlar?

Google Play Real-time Developer Notifications, Cloud Pub/Sub üzerinden satın alma veya abonelik durumunda değişiklik olduğunu bildirir. Abonelik için yenileme, iptal, account hold, grace period ve yeniden etkinleşme gibi olay türleri bulunur. Ancak RTDN mesajı çoğunlukla “bir şey değişti” sinyalidir; tam güncel durum değildir. Google’ın açık önerisi, RTDN alındıktan sonra Google Play Developer API’ın çağrılmasıdır. ([developer.android.com](https://developer.android.com/google/play/billing/rtdn-reference?hl=en))

Bu ayrım özellikle abonelik yükseltme, düşürme ve yeniden abonelik akışlarında önemlidir. Google, yeni purchase token geldiğinde normal doğrulama sürecinin uygulanmasını; eski token’ın artık erişim sağlamak için kullanılmaması gerektiğini belirtir. ([developer.android.com](https://developer.android.com/google/play/billing/subscriptions?hl=en))

Pratik bir RTDN tüketicisi şu adımları izleyebilir:

- Pub/Sub mesajını alır.
- Mesajın kimliğini ve purchase token’ı kaydeder.
- Aynı olay daha önce işlendi mi kontrol eder.
- Purchase token ile Google Play Developer API’dan güncel kaydı çeker.
- Kullanıcı ve ürün eşleşmesini doğrular.
- Entitlement kaydını yeni duruma taşır.
- İşlem başarılıysa mesajı acknowledge eder.

Google Cloud Pub/Sub varsayılan olarak at-least-once teslimat sağlar; mesajlar birden fazla kez veya sırasız gelebilir. Bu nedenle subscriber’ın duplicate teslimatlara toleranslı olması gerekir. ([docs.cloud.google.com](https://docs.cloud.google.com/pubsub/docs/subscription-overview))

## Idempotency trade-off’u nerede başlar?

Idempotency, aynı olayın birden fazla kez işlenmesinin aynı nihai sonucu üretmesi demektir. Örneğin aynı `SUBSCRIPTION_RENEWED` olayını iki kez almak, kullanıcıya iki ayrı abonelik dönemi eklememelidir.

En basit koruma, işlenmiş olayları bir anahtarla saklamaktır:

```text
event_key = provider + environment + transaction_id + event_type
```

Ancak tek bir kimlik her zaman yeterli olmayabilir. Apple bildirimlerinde imzalı payload içindeki transaction ve renewal bilgileri; Google tarafında purchase token, notification message ID ve API’dan dönen güncel durum birlikte değerlendirilmelidir. Aynı purchase token için daha yeni bir durum, eski bir bildirimin arkasından gelebilir. Bu nedenle yalnızca “bu anahtar daha önce görüldü mü?” kontrolü yerine, durum geçişlerinin zaman ve mağaza verisiyle tutarlı olması gerekir.

İki yaygın yaklaşımın trade-off’u vardır:

**Sadece son durumu tutmak:** Uygulaması kolaydır ve sorgular hızlıdır. Ancak hangi mağaza olaylarının geldiğini, bir iadenin ne zaman işlendiğini veya hatalı bir geçişin nasıl oluştuğunu geriye dönük incelemek zorlaşır.

**Olay günlüğü ve türetilmiş entitlement:** Her doğrulanmış mağaza olayını saklar, erişim durumunu bu olaylardan üretirsiniz. Denetlenebilirlik ve yeniden oynatma kabiliyeti daha iyidir; karşılığında veri modeli, sıralama ve düzeltme süreçleri daha karmaşık olur.

Genellikle makul çözüm, doğrulanmış provider olaylarını değişmez kayıt olarak saklamak ve kullanıcıya hızlı cevap vermek için ayrıca güncel entitlement tablosu tutmaktır. Böylece “ne oldu?” ile “şu anda erişim var mı?” soruları ayrılır.

Tam olarak-once işleme hedefi de dikkatle ele alınmalıdır. Pub/Sub, bazı pull subscription senaryolarında exactly-once delivery sunar; fakat bu özellik push subscription’larda geçerli değildir ve daha yüksek gecikme ile ek operasyonel koşullar getirebilir. Ayrıca uygulama tarafındaki dış sistem çağrıları için yine idempotent tasarım gerekir. ([docs.cloud.google.com](https://docs.cloud.google.com/pubsub/docs/exactly-once-delivery?hl=en))

Bu yüzden çoğu abonelik backend’i için daha gerçekçi hedef şudur: **at-least-once teslimat + idempotent işleme + gerektiğinde provider’dan yeniden doğrulama.**

## Sonuç: istemci önbellek, backend karar noktasıdır

Entitlement’ı yalnızca istemcide tutmak; cihaz değişimi, uygulamanın silinip yeniden kurulması, iade, iptal, başarısız yenileme ve sahte istemci yanıtları gibi durumlarda güvenilirliğini kaybeder.

Daha sağlam bir modelde:

- App Store veya Google Play, işlemin kaynağıdır.
- Backend, mağaza verisini doğrular ve kullanıcı hesabıyla eşleştirir.
- App Store Server Notifications ve Google Play RTDN, durum değişikliklerini haber verir.
- Provider API’ları, kritik olayların güncel durumunu doğrular.
- Entitlement tablosu, uygulamanın hızlı erişim kararını taşır.
- Olay kaydı ve idempotency, tekrar teslimatları ve yeniden işlemeyi güvenli hale getirir.
- İstemci, backend kararını önbelleğe alabilir; fakat kendi başına kalıcı yetki veremez.

Bu yaklaşım daha fazla backend işi ve gözlemlenebilirlik gerektirir. Trade-off budur: basit bir istemci bayrağı yerine doğrulama, senkronizasyon ve tekrar işleme mekanizmaları kurarsınız. Karşılığında abonelik erişimi cihazdan, uygulama oturumundan ve tek bir ağ yanıtından bağımsız hale gelir.
