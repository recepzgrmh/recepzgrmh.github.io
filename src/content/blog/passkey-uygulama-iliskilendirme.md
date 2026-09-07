---
title: "Passkey Eklemek Kimlik Doğrulama Değil, Uygulama İlişkilendirme İşidir"
description: "Passkey entegrasyonunda asıl zor kısım kriptografi değil; mobil uygulama, web alan adı, sunucu ve credential provider ilişkisini doğru kurmaktır."
slug: "passkey-uygulama-iliskilendirme"
publishedAt: 2026-07-16
tags: ["passkeys", "WebAuthn", "Credential Manager", "AuthenticationServices", "mobil güvenlik", "backend"]
category: "Mobil ve Backend"
heroImage: "/blog/passkey-uygulama-iliskilendirme.png"
heroAlt: "Uygulama kimliği, alan adı sahipliği ve relying party ilişkisi."
featured: false
draft: false
sources:
  - label: "W3C Web Authentication Level 3"
    url: "https://www.w3.org/news/2026/w3c-invites-implementations-of-web-authentication-an-api-for-accessing-public-key-credentials-level-3/"
    note: "WebAuthn Level 3 Candidate Recommendation Snapshot; passkey ve public-key credential modelinin standardizasyon bağlamı."
  - label: "Apple Passkeys Overview"
    url: "https://developer.apple.com/passkeys/"
    note: "Passkey’lerin public-private key yapısı, phishing direnci ve Apple platformundaki genel yaklaşım."
  - label: "Apple Supporting Passkeys"
    url: "https://developer.apple.com/documentation/AuthenticationServices/supporting-passkeys"
    note: "Associated domains, webcredentials ve WKWebView passkey gereksinimleri."
  - label: "Android About Passkeys"
    url: "https://developer.android.com/identity/passkeys"
    note: "Credential Manager, passkey akışı, cihazlar arası kullanım ve sunucu-istemci rolleri."
  - label: "Android Create a Passkey"
    url: "https://developer.android.com/identity/passkeys/create-passkeys"
    note: "Challenge alma, public key’i sunucuya gönderme, doğrulama ve otomatik passkey oluşturma akışı."
  - label: "Android Credential Manager Prerequisites"
    url: "https://developer.android.com/identity/credential-manager/prerequisites"
    note: "Android uygulaması ile web sitesi arasındaki Digital Asset Links ilişkilendirmesi."
---

# Passkey eklemek kimlik doğrulama değil, uygulama ilişkilendirme işidir

Passkey kullanıcının şifre yazmadan giriş yapmasını sağlar. Telefonda ekran kilidi, parmak izi veya yüz doğrulama kullanılır; sunucu ise kullanıcının özel anahtarını görmez, yalnızca açık anahtarı saklar. Bu yapı, şifre sızıntılarının etkisini ve kimlik avı riskini azaltır. WebAuthn standardı da zaten kimlik doğrulamayı belirli bir alan adına bağlı açık anahtarlı kimlik bilgileri üzerinden kurar. ([developer.apple.com](https://developer.apple.com/passkeys/))

Bu açıklama entegrasyonun yalnızca bir bölümünü anlatıyor. Gerçek ürünlerde passkey, mobil istemci, web alan adı, backend ve credential provider arasında kurulan bir sözleşmedir. Bu sözleşmenin herhangi bir parçası eksik kalırsa kullanıcı, “passkey desteklenmiyor” gibi görünen ama aslında ilişkilendirme hatasından kaynaklanan sorunlarla karşılaşır.

## Kriptografi sunucuda değil, ilişkinin içinde yaşar

Passkey oluşturulurken uygulama sunucudan bir challenge ve credential oluşturma seçenekleri ister. İstemci bu seçenekleri işletim sisteminin kimlik bilgisi API’sine gönderir. Cihaz veya credential provider bir anahtar çifti üretir. Özel anahtar credential provider’da kalır; açık anahtar uygulama sunucusuna gönderilir ve sunucuda kullanıcı hesabıyla ilişkilendirilir. Android’in güncel dokümantasyonu bu akışı açıkça istemci, uygulama sunucusu ve credential provider olarak üç parçaya ayırıyor. ([developer.android.com](https://developer.android.com/identity/passkeys/create-passkeys?hl=en))

Girişte de benzer bir akış vardır. Sunucu yeni bir challenge üretir, istemci Credential Manager veya Apple’ın Authentication Services API’si üzerinden kimlik bilgisini ister, ardından imzalı yanıtı backend’e yollar. Backend imzayı, challenge’ı, origin’i ve credential’ın ilgili hesapla bağını doğrular.

Buradaki önemli nokta şu: Mobil uygulama kendi başına “bu kullanıcı gerçekten hesabın sahibi” kararını vermez. Uygulama, işletim sisteminden aldığı kanıtı sunucuya taşır. Son kararı veren taraf backend’dir.

Bu yüzden istemcide yalnızca “başarılı giriş” sonucunu saklamak yeterli değildir. Sunucu tarafında credential kimliği, açık anahtar, kullanıcı hesabı, kullanım sayacı ve gerekli WebAuthn metaverisi güvenilir biçimde tutulmalıdır. Uygulama yeniden kurulduğunda veya kullanıcı yeni bir cihaz aldığında da bu kayıtların nasıl kullanılacağı baştan düşünülmelidir.

## Mobil uygulama ile web sitesi aynı servisi temsil etmeli

Birçok ürünün hem web sitesi hem de mobil uygulaması vardır. Kullanıcı web’de hesabını açar, daha sonra mobil uygulamayı yükler ve aynı passkey ile giriş yapmak ister. Bu deneyimin çalışması için işletim sistemi, uygulamanın gerçekten ilgili web servisine ait olduğunu doğrulayabilmelidir.

Android tarafında bunun temel araçlarından biri Digital Asset Links’tir. Uygulama ile web sitesi arasındaki güven ilişkisi, alan adında yayınlanan ilişkilendirme dosyası ve uygulamanın imza bilgileriyle kurulur. Google dokümantasyonu passkey’ler için bu ilişkilendirmenin gerekli olduğunu belirtiyor. ([developer.android.com](https://developer.android.com/identity/credential-manager/prerequisites))

iOS tarafında benzer ilişki associated domains üzerinden kurulur. Apple, passkey kayıt veya assertion isteklerinde ilgili alan adının uygulamayla associated domain olarak yapılandırılmasını istiyor. `WKWebView` kullanan uygulamalarda da webcredentials ilişkisinin kurulması gerekiyor. Aksi halde istek, uygulamada passkey desteği varmış gibi görünse bile hata verebilir. ([developer.apple.com](https://developer.apple.com/documentation/AuthenticationServices/supporting-passkeys?changes=_7))

Bu ayrıntı ürün tasarımını doğrudan etkiler. Örneğin şu alan adları birbirinden farklıysa:

- `example.com`
- `login.example.com`
- `api.example.com`
- mobil uygulamanın tanımlayıcısı

Sistemin hangi alan adını relying party olarak kabul edeceği açıkça belirlenmelidir. Sunucu bir alan adı için challenge üretip istemci başka bir relying party ile işlem yaparsa imza doğrulaması başarısız olur. Sorun çoğu zaman kriptografide değildir; taraflar aynı kimliği temsil etmiyordur.

## Android’de API seçimi kadar geçiş planı da önemli

Android’de Credential Manager; passkey, parola ve federated sign-in yöntemlerini ortak bir kullanıcı deneyiminde birleştiren önerilen Jetpack API’sidir. Passkey desteği Android 9 ve üzerindeki cihazlarda çalışır; Credential Manager’ın amacı ise farklı kimlik bilgisi türlerini tek bir akışta yönetmektir. ([developer.android.com](https://developer.android.com/identity/passkeys?hl=en))

Bu, eski giriş yöntemlerini tek gecede kaldırmak gerektiği anlamına gelmez. Ürünlerin önemli bir bölümü hâlâ parola, Google ile giriş veya e-posta doğrulaması kullanır. Daha sağlıklı yaklaşım, Credential Manager’ı bu yöntemlerle birlikte ele almak ve kullanıcının hesabına birden fazla doğrulama yolu bağlamaktır.

Örneğin mevcut kullanıcı parola ile giriş yaptıktan sonra passkey oluşturabilir. Android dokümantasyonu, uygun koşullarda başarılı bir parola girişinin ardından passkey oluşturma akışının otomatik başlatılabildiğini belirtiyor. Ancak kullanıcıya ne zaman ve hangi bildirimle bilgi verileceği credential provider’a göre değişebilir. Bu nedenle ürün ekibi, “passkey oluşturuldu” bilgisinin gerçekten kullanıcıya ulaştığını varsaymamalıdır. ([developer.android.com](https://developer.android.com/identity/passkeys/create-passkeys?hl=en))

Yeni cihaz senaryosu da aynı derecede önemlidir. Passkey’in credential provider tarafından senkronize edilmesi kullanıcı için kolaylık sağlar; fakat backend’in hesabı yalnızca tek bir cihaz kimliğine bağlaması doğru değildir. Hesabın temel kimliği kullanıcı hesabıdır. Cihazlar ve credential’lar bu hesabın altında yönetilmelidir.

## Apple tarafında web görünümü ayrı bir dünya değildir

iOS uygulamalarında giriş ekranı çoğu zaman tamamen native değildir. Bazı ürünler web tabanlı üyelik veya ödeme akışlarını `WKWebView` içinde gösterir. Bu durumda passkey davranışı, web sayfası ile native uygulamanın rastgele bir birleşimi gibi ele alınamaz.

Apple’ın dokümantasyonuna göre `WKWebView` içinde passkey kullanabilmek için uygulamanın ilgili servisi associated domain olarak tanımlaması gerekir. iOS 16.4 ve macOS 13.3 ve sonrasında JavaScript API’leriyle passkey desteğinin ve koşullu arabuluculuğun kullanılabilirliği de test edilebilir. ([developer.apple.com](https://developer.apple.com/documentation/AuthenticationServices/supporting-passkeys?changes=_7))

Buradan çıkan pratik sonuç basit: Web akışınız hangi alan adında çalışıyor, native uygulamanız hangi alan adıyla ilişkilendiriliyor ve backend hangi relying party değerini doğruluyor? Bu üç sorunun cevabı aynı mimari kararı göstermeli.

## Hata ayıklarken “passkey çalışmıyor” demek yetmez

Passkey hatalarını incelerken yalnızca istemcinin döndürdüğü exception’a bakmak yetersizdir. Kontrol edilmesi gerekenler daha geniştir:

1. Sunucunun ürettiği challenge gerçekten tek kullanımlık mı?
2. İstemci aynı challenge’ı değiştirmeden credential API’sine iletiyor mu?
3. Android Digital Asset Links veya Apple associated domains doğru alan adını gösteriyor mu?
4. Uygulamanın imza bilgisi ve bundle identifier değerleri yapılandırmayla eşleşiyor mu?
5. Backend doğru origin, relying party ID ve credential public key ile doğrulama yapıyor mu?
6. Kullanıcı iptal ettiğinde veya credential provider bulunamadığında parola ya da başka bir kurtarma yolu var mı?

Bu kontrollerin bir kısmı mobil ekipte, bir kısmı backend ekibinde kalabilir. Fakat kullanıcı sorunu tek bir ekip sınırında yaşamaz. Bu nedenle test ortamı, staging alan adı, uygulama imzası ve production yapılandırması birlikte yönetilmelidir.

## Passkey entegrasyonu bir özellikten çok sistem sözleşmesidir

Passkey’in değeri yalnızca giriş ekranında daha az alan göstermek değildir. Kullanıcının phishing’e karşı daha dayanıklı bir kimlik doğrulama kullanmasını, sunucunun özel anahtar saklamamasını ve farklı cihazlarda daha tutarlı bir deneyim yaşamasını sağlar. Fakat bu faydalar, mobil uygulama ile web servisinin gerçekten aynı servisi temsil etmesine bağlıdır.

Bu yüzden passkey projesine “hangi SDK’yı ekleyeceğiz?” sorusuyla başlamak eksik kalır. Önce relying party kimliğini, alan adı ilişkilerini, credential yaşam döngüsünü ve backend doğrulama sınırlarını netleştirmek gerekir. SDK seçimi bundan sonra gelir.

İyi bir passkey entegrasyonu kullanıcıya kriptografiyi hissettirmez. Kullanıcı yalnızca hesabına daha rahat girdiğini görür. Bu sadeliğin arkasında ise doğru kurulmuş bir mobil-web ilişkisi, güvenilir bir sunucu doğrulaması ve cihaz değişikliklerini hesaba katan bir yaşam döngüsü vardır.
