---
title: "API Sürümlemek URL’ye Bir Sayı Eklemekten Fazlası"
description: "API’ler büyürken kırıcı değişiklikleri yönetmek için sürümleme stratejilerini, uyumluluğu ve geçiş planını birlikte ele alıyoruz."
slug: "api-surumleme-breaking-degisiklikler"
publishedAt: 2026-07-26
updatedAt: 2026-09-07
tags: ["API", "backend", "sürümleme", "uyumluluk", "OpenAPI", "Stripe"]
category: "Backend ve API"
heroImage: "/blog/api-surumleme-breaking-degisiklikler.png"
heroAlt: "Kırıcı değişikliğin sürüm ve geçiş planıyla ele alınması."
featured: false
draft: false
sources:
  - label: "Google Cloud API Design Guide"
    url: "https://docs.cloud.google.com/apis/design"
    note: "API tasarımı, geriye dönük uyumluluk ve sürümleme yaklaşımı için birinci taraf rehber."
  - label: "Google AIP-185: API Versioning"
    url: "https://google.aip.dev/185"
    note: "Google API’lerinde sürümleme stratejileri için resmi AIP belgesi."
  - label: "Google Cloud API Design Guide Changelog"
    url: "https://docs.cloud.google.com/apis/design/changelog"
    note: "Rehberin güncel sürümleme yaklaşımındaki değişiklikleri doğrulamak için kullanıldı."
  - label: "Stripe API Versioning"
    url: "https://docs.stripe.com/api/versioning"
    note: "Stripe’ın aylık uyumlu sürümler, büyük sürümler ve webhook sürümleme yaklaşımı."
  - label: "Stripe Versioning and Support Policy"
    url: "https://docs.stripe.com/sdks/versioning"
    note: "Stripe API sürümlerinin release ritmi ve sürüm header’ı kullanımı."
  - label: "Azure Service SDK and REST API Versioning Policy"
    url: "https://learn.microsoft.com/en-us/azure/developer/intro/azure-service-sdk-tool-versioning"
    note: "Tarih tabanlı api-version yaklaşımını doğrulamak için Microsoft’un resmi politikası."
  - label: "OpenAPI Specification"
    url: "https://spec.openapis.org/oas/"
    note: "OpenAPI spesifikasyonunun güncel sürümleri ve spesifikasyon sürümleme modeli."
  - label: "OpenAPI Specification v3.1.1"
    url: "https://spec.openapis.org/oas/v3.1.1.html"
    note: "Major/minor/patch ayrımı ve patch sürümlerinin anlamı için resmi metin."
  - label: "Google Cloud Blog: Versioning in API Design"
    url: "https://cloud.google.com/blog/products/api-management/api-design-which-version-of-versioning-is-right-for-you"
    note: "Format sürümleme ile varlık sürümlemesi arasındaki ayrımı açıklayan Google mühendislik yazısı; tarihsel bir kaynak olduğu için güncel politika yerine kavramsal destek olarak kullanıldı."
---

Bir API ilk yayımlandığında sürümleme uzak bir konu gibi görünür. İstemci sayısı azdır, değişiklikler aynı ekip içinde konuşularak yapılır ve herkes güncel kodu çalıştırır. Zamanla bu varsayımlar bozulur. Mobil uygulamaların eski sürümleri, partner entegrasyonları, arka planda çalışan işler ve dokümantasyondan örnek alan geliştiriciler aynı API’ye bağlanmaya devam eder.

Bu yüzden API sürümleme, URL’ye bir sayı ekleme kararı değildir. **Bir API’nin değişme biçimi için verdiğiniz işletim kararıdır.**

Google’ın güncel API Design Guide’ı sürümlemeyi geriye dönük uyumlulukla birlikte ele alıyor. Rehber, API sürümlerinin kanal tabanlı veya sürüm/release tabanlı biçimde yönetilebileceğini belirtiyor. ([docs.cloud.google.com](https://docs.cloud.google.com/apis/design)) Stripe ise yeni API sürümlerini tarih ve release adıyla yönetiyor; aylık sürümlerde geriye dönük uyumlu değişiklikleri, daha seyrek büyük sürümlerde ise kırıcı değişiklikleri ayırıyor. ([docs.stripe.com](https://docs.stripe.com/api/versioning?lang=curl))

## Her değişiklik yeni sürüm gerektirmez

Önce hangi değişikliğin gerçekten kırıcı olduğunu ayırmak gerekir. Bir yanıt nesnesine yeni, opsiyonel bir alan eklemek çoğu istemci için güvenlidir. Mevcut bir alanı kaldırmak, türünü değiştirmek veya aynı hata durumunda farklı bir HTTP davranışı üretmek ise istemcinin varsayımlarını bozabilir.

Pratik bir sınıflandırma şöyle düşünülebilir:

- **Uyumlu ekleme:** Yeni bir response alanı veya yeni bir endpoint eklemek.
- **Davranış değişikliği:** Aynı isteğin artık farklı varsayılan değerle çalışması.
- **Kırıcı değişiklik:** Alan kaldırmak, alan türünü değiştirmek veya mevcut anlamı değiştirmek.
- **Sözleşme dışı risk:** Dokümante edilmemiş ama istemcilerin kullandığı davranışı değiştirmek.

Son madde özellikle önemlidir. Bir alan dokümantasyonda “sıra garanti edilmez” diye yazsa bile istemciler fiilen sıralamaya güvenebilir. Sözleşme yalnızca OpenAPI dosyası değildir; gerçek istemcilerin yaptığı varsayımlar da sistemin parçasıdır.

OpenAPI spesifikasyonu, kendi sürümünü `major.minor.patch` biçiminde tanımlar ve patch sürümlerinin özellik setini değiştirmemesi gerektiğini söyler. Bu, API’nizin de aynı şekilde sürümlenmesi gerektiği anlamına gelmez. OpenAPI belgesinin sürümü ile sunduğunuz ürün API’sinin sürümü farklı şeylerdir. ([spec.openapis.org](https://spec.openapis.org/oas/))

![Sürümün URL, header ve tarih parametresiyle taşınmasının karşılaştırılması.](/blog/api-surumleme-breaking-degisiklikler-inline-1.svg)

*Sürüm bilgisi nerede taşınır*

## URL, header veya tarih: Hangisi daha doğru?

API sürümünü path içine koymak en görünür yaklaşımdır:

```http
GET /v1/customers/123
GET /v2/customers/123
```

Bunun avantajı, hangi sürümün çağrıldığının loglarda, cache anahtarlarında ve hata mesajlarında kolayca görünmesidir. Dezavantajı ise iki ayrı URL yüzeyi işletmeniz ve dokümantasyonu bölmenizdir.

Header tabanlı yaklaşımda kaynak URL’si aynı kalır, sürüm isteğin metadata’sında taşınır:

```http
GET /customers/123
Accept: application/json
API-Version: 2026-02-01
```

Bu yaklaşım URL’leri sade tutar ancak gözlemleme, cache ve hata ayıklama katmanlarında sürüm bilgisini ayrıca taşımanız gerekir. Google’ın API tasarım yaklaşımı, format sürümü ile kaynak/varlık sürümünü birbirinden ayırmanın önemli olduğunu vurgular. ([cloud.google.com](https://cloud.google.com/blog/products/api-management/api-design-which-version-of-versioning-is-right-for-you))

Tarih tabanlı sürümleme de başka bir seçenektir. Azure REST API’lerinde istemciler `api-version` parametresiyle belirli bir sürümü açıkça seçer. ([learn.microsoft.com](https://learn.microsoft.com/en-us/azure/developer/intro/azure-service-sdk-tool-versioning)) Stripe’ın API’sinde ise sürüm, istek header’ı üzerinden de sabitlenebilir ve webhook davranışı için de API sürümü dikkate alınır. ([docs.stripe.com](https://docs.stripe.com/api/versioning?lang=curl))

Tek bir evrensel doğru yok. Karar verirken şu sorular daha kullanışlıdır:

1. İstemci sürümü loglarda doğrudan görünmeli mi?
2. Aynı kaynak için birden fazla davranışı uzun süre destekleyecek misiniz?
3. Cache ve gateway katmanları sürüm bilgisini doğal biçimde taşıyabiliyor mu?
4. Mobil istemcilerinizin güncellenmesi haftalar mı, aylar mı sürüyor?

*İç ekiplerin kullandığı bir API ile bağımsız müşterilerin bağlandığı bir API aynı geçiş planını gerektirmez.* Yine de “istemciler bizim ekipte, haber veririz” varsayımı uzun vadede pahalı olabilir. Google’ın API sürümleme değerlendirmesi, bağımsız tüketiciler arttıkça uyumluluk yükünün de arttığını belirtiyor. ([cloud.google.com](https://cloud.google.com/blog/products/api-management/api-design-which-version-of-versioning-is-right-for-you))

## Eski sürümü yaşatmak yetmez

Bir v1’i korumaya karar verdiğinizde yalnızca eski controller’ı silmemek yeterli değildir. Eski sürümün ne kadar süre destekleneceği, güvenlik düzeltmelerinin hangi sürümlere uygulanacağı ve istemcilerin nasıl taşınacağı baştan görünür olmalıdır.

İyi bir geçiş planında en azından şu bilgiler bulunur:

- Sürümün yayın tarihi ve destek bitiş tarihi
- Kırıcı değişikliklerin listesi
- Yeni sürüme geçiş örnekleri
- İstemci bazında kullanılan sürüm
- Eski sürüm çağrılarının gözlemlenmesi
- Kapatmadan önce gönderilecek uyarılar

Sürüm başına ayrı kod dalları açmak ilk bakışta güvenli görünür, fakat uzun süre yaşatılan dallar düzeltmelerin çoğalmasına neden olur. Daha sürdürülebilir bir yaklaşım, ortak iş mantığını koruyup sürüm farklarını sınırda dönüştürmektir. Örneğin v1’in `full_name` alanını beklediği, v2’nin ise `first_name` ve `last_name` döndürdüğü bir durumda iş mantığını iki kez yazmak yerine response mapper kullanılabilir.

```typescript
type User = {
  firstName: string;
  lastName: string;
};

function toV1(user: User) {
  return {
    full_name: `${user.firstName} ${user.lastName}`
  };
}

function toV2(user: User) {
  return {
    first_name: user.firstName,
    last_name: user.lastName
  };
}
```

Burada amaç her farkı mapper’a sıkıştırmak değildir. İş kuralları gerçekten değişiyorsa iki sürümün davranışı açıkça ayrılmalıdır. Mapper yalnızca temsil biçimi farklı olduğunda anlamlıdır.

## Sürümleme kararını test edilebilir yapın

API sözleşmesi değişiklikleri kod incelemesinde fark edilebilir, ama yalnızca insan gözden geçirmesine bırakılmamalı. OpenAPI belgeleri, sözleşme testleri ve gerçek istemci örnekleri birlikte kullanılabilir.

Bir değişiklikten önce şu kontroller çalıştırılabilir:

- Eski OpenAPI belgesiyle yeni belge arasındaki breaking-change taraması
- v1 istemcileriyle geriye dönük entegrasyon testleri
- v2 istemcileriyle yeni davranış testleri
- Aynı kaynağın iki sürümde de beklenen anlamı koruyup korumadığı
- Deprecated endpoint çağrılarının log ve metriklerde izlenmesi

```test
GET /v1/users/42
Beklenen: 200
Beklenen alan: full_name

GET /v2/users/42
Beklenen: 200
Beklenen alanlar: first_name, last_name
```

```output
v1 contract: PASS
v2 contract: PASS
deprecated endpoint usage: 3,421 requests / 24h
```

Bu metrik, yalnızca “kaç istek geldi?” sorusunu yanıtlamamalı. Hangi istemci sürümünün çağrı yaptığı, çağrıların hangi endpoint’ten geldiği ve eski sürümün hangi özelliklerinin hâlâ kullanıldığı da görünmelidir.

![Farklı istemcilerin uyumluluk katmanı üzerinden API sürümlerine bağlanması.](/blog/api-surumleme-breaking-degisiklikler-inline-2.svg)

*Uyumluluk katmanı*

> Bir API sürümünü kapatmak teknik bir deploy kararı değil, istemcilerle yaptığınız sözleşmenin sona erdirilmesidir.

## Sürüm sayısını değil, değişim maliyetini yönetin

API sürümleme tartışmaları sık sık path mi header mı sorusuna indirgeniyor. Oysa mekanizma, kararın yalnızca bir parçası. Daha önemli olan, geriye dönük uyumluluğu hangi değişikliklerde koruyacağınız ve kırıcı değişiklikleri hangi ritimle yayımlayacağınızdır.

Küçük ekipler için sade bir politika genellikle yeterlidir:

- Uyumlu eklemeleri mevcut sürümde yayımlayın.
- Kırıcı değişiklikleri açık bir yeni sürüm altında toplayın.
- Her sürüm için destek süresi belirleyin.
- Eski istemcileri ölçmeden sürüm kapatmayın.
- Dokümantasyon, SDK ve örnek kodu aynı geçiş planına bağlayın.

Stripe’ın sürüm yaklaşımı gibi daha katı bir takvim, çok sayıda bağımsız istemcisi olan ürünlerde öngörülebilirlik sağlar. Google’ın API rehberindeki kanal veya release tabanlı seçenekler ise farklı olgunluk seviyelerine sahip API’lerin aynı çatı altında yönetilmesine izin verir. Bunlar doğrudan kopyalanacak reçeteler değil; kendi API’nizin değişim maliyetini düşünmek için referanslardır. ([docs.stripe.com](https://docs.stripe.com/api/versioning?lang=curl))

İyi sürümleme, hiç kırıcı değişiklik yapmamak değildir. Kırıcı değişikliğin nerede başladığını bilmek, onu görünür biçimde taşımak ve eski istemciyi hazırlıksız bırakmamaktır.
