---
title: "OAuth Token’ı Çalındığında Tek Başına Yetmemeli"
description: "OAuth 2.0’de DPoP, çalınan access token’ın başka bir istemcide kullanılmasını nasıl zorlaştırır? Uygulama ve sunucu tarafını inceliyoruz."
slug: "oauth-dpop-token-guvenligi"
publishedAt: 2026-08-02
tags: ["OAuth 2.0", "DPoP", "API güvenliği", "access token", "backend", "kimlik doğrulama"]
category: "Backend ve Güvenlik"
heroImage: "/blog/oauth-dpop-token-guvenligi.png"
heroAlt: "Çalınan token'ın başka istemcide kullanılabilirliği."
featured: false
draft: false
sources:
  - label: "RFC 9700 — Best Current Practice for OAuth 2.0 Security"
    url: "https://www.rfc-editor.org/rfc/rfc9700.html"
    note: "OAuth 2.0 için güncel güvenlik tavsiyeleri; authorization code, sender-constrained token ve daha zayıf akışların kullanımdan kaldırılması."
  - label: "RFC 9449 — OAuth 2.0 Demonstrating Proof of Possession (DPoP)"
    url: "https://www.rfc-editor.org/rfc/rfc9449.html"
    note: "DPoP proof JWT yapısı, token-key binding, nonce ve resource server doğrulama kuralları."
  - label: "RFC 7636 — Proof Key for Code Exchange by OAuth Public Clients"
    url: "https://www.rfc-editor.org/rfc/rfc7636.html"
    note: "PKCE’nin authorization code interception riskine karşı çalışma mantığı."
  - label: "RFC 8705 — OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens"
    url: "https://www.rfc-editor.org/rfc/rfc8705.html"
    note: "DPoP’ye alternatif sender-constrained token yaklaşımı olan mTLS ve sertifikaya bağlı token’lar."
---

OAuth 2.0 access token’ları çoğu sistemde **bearer token** olarak kullanılır. Token’ı taşıyan kişi, token geçerliyse API’ye erişebilir. Sunucu token’ın gerçekten uygulama tarafından mı üretildiğini, yoksa loglardan, tarayıcı depolamasından veya başka bir sızıntıdan mı geldiğini ayırt edemez.

Bu model pratik ve yaygındır. Fakat token sızdığında saldırganın önünde çoğu zaman tek engel token’ın süresidir. OAuth 2.0 Security Best Current Practice belgesi, erişim token’larının yeniden kullanılmasını zorlaştırmak için **sender-constrained access token** mekanizmalarını öneriyor. DPoP de bu amaçla tasarlanmış standartlardan biri. ([rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9700.html?utm_source=openai))

## Bearer token’ın varsayımı

Bearer token’ın çalışma mantığı basittir:

```http
GET /api/orders HTTP/1.1
Host: api.example.com
Authorization: Bearer ACCESS_TOKEN
```

Sunucu genellikle token’ın imzasını, süresini, kapsamını ve hedefini kontrol eder. Bu kontroller önemlidir ama token’ın isteği yapan tarafın elinde nasıl bulunduğunu kanıtlamaz.

Bir access token aşağıdaki yollardan biriyle sızabilir:

- Hatalı yapılandırılmış loglar veya izleme sistemleri
- Tarayıcı tarafındaki XSS açığı
- Yanlışlıkla istemciye gönderilen hata kayıtları
- Üçüncü taraf kütüphaneler veya proxy katmanları
- Uygulama, sunucu ya da CI ortamındaki bilgi sızıntıları

Bu örneklerin her biri aynı sonucu doğurmaz. DPoP de her saldırıyı çözmez. Ancak saldırgan yalnızca token değerini ele geçirdiyse, token’ı başka bir ortamda doğrudan kullanmasını zorlaştırabilir.

## DPoP neyi değiştiriyor?

DPoP, access token’ı bir açık anahtara bağlar. İstemci önce bir özel anahtar ve ona karşılık gelen açık anahtar üretir. Token alınırken bu anahtarın parmak izi yetkilendirme sürecine dahil edilir. Daha sonra API’ye yapılan her istekte istemci, o isteğe özel imzalı bir DPoP proof JWT gönderir.

Basitleştirilmiş bir istek şöyle görünür:

```http
GET /api/orders HTTP/1.1
Host: api.example.com
Authorization: DPoP ACCESS_TOKEN
DPoP: SIGNED_PROOF_JWT
```

Proof içinde en azından şu bilgiler bulunur:

- Kullanılan HTTP metodu
- Hedef URI
- Benzersiz bir `jti` değeri
- Üretim zamanı olan `iat`
- İmzayı doğrulamak için açık anahtar

Sunucu imzayı doğrular. Proof içindeki HTTP metodu ve URI’nin gerçek istekle eşleştiğini kontrol eder. Ardından token’ın bağlı olduğu açık anahtar ile proof içindeki açık anahtarın aynı olduğuna bakar. RFC 9449, bu kontrollerin yanında proof’un biçimi, algoritması ve tekrar kullanımına ilişkin kuralları da tanımlar. ([rfc-editor.org](https://www.rfc-editor.org/info/rfc9449/?utm_source=openai))

Böylece saldırgan yalnızca access token’ı ele geçirdiyse, geçerli bir proof üretemez. Çünkü proof imzalamak için token’ın bağlandığı özel anahtara da sahip olması gerekir.

![Bearer token ile DPoP bağlı token isteğinin karşılaştırması.](/blog/oauth-dpop-token-guvenligi-inline-1.svg)

*Bearer ile DPoP karşılaştırması*

## PKCE’nin yerine geçmez

DPoP, OAuth akışındaki bütün güvenlik problemlerini çözmez. Özellikle mobil ve tarayıcı tabanlı uygulamalarda PKCE hâlâ ayrı bir ihtiyacı karşılar.

PKCE, authorization code’un başka bir istemci tarafından kullanılması riskini azaltır. İstemci, yetkilendirme isteği sırasında bir `code_challenge` gönderir; token değişimi sırasında da karşılık gelen `code_verifier` değerini sunar. Böylece yalnızca authorization code’u ele geçiren taraf token alamaz.

DPoP ise alınmış token’ın hangi anahtar sahibi tarafından kullanılabileceğini sınırlar. İki mekanizma farklı aşamalarda devreye girer:

| Mekanizma | Koruduğu aşama | Temel fikir |
|---|---|---|
| PKCE | Authorization code değişimi | Code’u ele geçiren taraf verifier olmadan token alamaz |
| DPoP | Token kullanımı | Token’ı ele geçiren taraf özel anahtar olmadan API’ye erişemez |
| mTLS | Token ve bağlantı kullanımı | İstemci, sertifikasıyla kendini kanıtlar |

RFC 9700, yetkilendirme kodu akışını tercih etmeyi ve istemci türüne göre uygun güvenlik önlemlerini uygulamayı öneriyor. Aynı belge, erişim token’larını mTLS veya DPoP gibi yöntemlerle sender-constrain etmeyi de tavsiye ediyor. ([rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9700.html?utm_source=openai))

*DPoP, PKCE’nin daha güçlü bir versiyonu değildir; farklı bir problemi hedefler.*

## Sunucu tarafında kontrol sırası

DPoP eklemek, `DPoP` başlığının varlığını kontrol etmekten ibaret değildir. Resource server’ın her istekte birkaç ayrı doğrulama yapması gerekir:

1. `DPoP` başlığının tek bir değer içerdiğini kontrol etmek.
2. Proof’un geçerli ve imzalı bir JWT olduğunu doğrulamak.
3. `typ` değerinin `dpop+jwt` olduğunu kontrol etmek.
4. Simetrik veya güvensiz imza algoritmalarını kabul etmemek.
5. Proof’taki açık anahtarın gerçekten imzayı doğruladığını kontrol etmek.
6. `htm` değerini gerçek HTTP metoduyla karşılaştırmak.
7. `htu` değerini gerçek hedef URI ile karşılaştırmak.
8. `iat` ve `jti` değerleriyle proof’un süresini ve tekrar kullanımını denetlemek.
9. Token’ın bağlı olduğu anahtarla proof’taki anahtarın eşleştiğini doğrulamak.
10. Access token’ın kapsam, süre, issuer ve audience kontrollerini ayrıca yapmak.

RFC 9449’un önemli uyarılarından biri şu: **Geçerli bir DPoP proof tek başına erişim kararı vermek için yeterli değildir.** Proof, istemcinin belirli bir özel anahtara sahip olduğunu gösterir; kullanıcının veya istemcinin o kaynağa erişme yetkisini göstermez. ([rfc-editor.org](https://www.rfc-editor.org/info/rfc9449/?utm_source=openai))

Sunucu nonce kullanmayı da tercih edebilir. Bu durumda sunucu `DPoP-Nonce` başlığıyla istemciden yeni proof üretmesini ister. İstemci, nonce değerini sonraki proof içine ekler. Bu yöntem, önceden üretilmiş proof’ların kullanılabildiği bazı saldırı senaryolarının etkisini azaltır. RFC 9449, nonce değerlerinin tahmin edilemez olmasını ve istemcinin sunucudan gelen nonce’u kullanmasını tarif eder. ([rfc-editor.org](https://www.rfc-editor.org/info/rfc9449/?utm_source=openai))

![API gateway üzerinde DPoP proof doğrulama adımları.](/blog/oauth-dpop-token-guvenligi-inline-2.svg)

*DPoP proof doğrulama*

## Uygularken hangi sınırları koymalı?

DPoP’nin güvenlik katkısı, anahtar yaşam döngüsü ve sunucu kontrolleri kadar güçlüdür. Mobil uygulamada özel anahtarın güvenli depolanması, web uygulamasında anahtarın XSS karşısındaki davranışı ve backend servislerinde anahtar rotasyonu ayrıca tasarlanmalıdır.

Bir proxy veya gateway URI’yi yeniden yazıyorsa `htu` karşılaştırması da dikkat ister. İstemcinin imzaladığı URI ile resource server’ın gördüğü URI aynı olmayabilir. Bu durumda hangi canonical URI’nin kullanılacağı açıkça belirlenmelidir.

Ayrıca her API’nin DPoP kullanması gerekmeyebilir. Düşük riskli ve kısa ömürlü token’larda maliyet-fayda hesabı farklı olabilir. Buna karşılık kişisel veri, finansal işlem veya geniş yetkili backend API’lerinde token sızıntısının etkisi yüksekse sender constraint daha anlamlı hale gelir.

> DPoP, token’ın çalınmasını engellemez; çalınan token’ın tek başına işe yaramasını zorlaştırır.

Bu ayrım tasarım kararını netleştirir. Token’ı güvenli saklama, TLS, kısa süreli access token, refresh token rotasyonu, dar scope’lar ve doğru yetkilendirme kontrolleri yine gerekir. DPoP, bunların yerine konan tek bir güvenlik katmanı değildir.

OAuth 2.0’nin güncel güvenlik yaklaşımı da bu yönde ilerliyor: daha güvenli akışlar, açık redirect URI eşleşmesi, mümkün olduğunda istemci kimlik doğrulaması ve token replay riskini azaltan mekanizmalar birlikte ele alınıyor. RFC 9700, 2025 yılında yayımlanan güncel bir Best Current Practice belgesi olarak önceki OAuth güvenlik tavsiyelerini genişletiyor ve daha zayıf bazı kullanım biçimlerini kullanımdan kaldırıyor. ([rfc-editor.org](https://www.rfc-editor.org/info/rfc9700/?utm_source=openai))

Bir API’ye DPoP eklemeyi düşünüyorsanız ilk sorunuz “proof JWT’sini nasıl üretirim?” olmamalı. Daha önce şu soruyu yanıtlayın: **Token sızarsa saldırgan hangi kaynaklara erişebilir ve bu erişimi anahtar sahipliğine bağlamak riski gerçekten azaltır mı?** Cevap evetse, DPoP’yi PKCE ve mevcut OAuth kontrollerinin yanına yerleştirmek anlamlı bir sonraki adım olabilir.
