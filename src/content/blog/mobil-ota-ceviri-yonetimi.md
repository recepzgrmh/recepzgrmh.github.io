---
title: "Mobil Çevirilerde OTA Rahatlığı, Dağıtım Disiplini İster"
description: "Mobil çevirileri OTA ile güncellemek hız kazandırır; fakat önbellek, fallback, sürümleme ve rollback tasarlanmazsa riski büyütür."
slug: "mobil-ota-ceviri-yonetimi"
publishedAt: 2026-07-29
tags: ["mobil uygulama", "i18n", "lokalizasyon", "OTA", "remote config", "Flutter"]
category: "Mobil Geliştirme"
heroImage: "/blog/mobil-ota-ceviri-yonetimi.png"
heroAlt: "Çeviri paketinin doğrulama, kademeli yayın ve rollback döngüsü."
featured: false
draft: false
sources:
  - label: "Firebase Remote Config"
    url: "https://firebase.google.com/docs/remote-config"
    note: "Uygulama güncellemesi olmadan değer değiştirme, varsayılan değerler, önbellekleme, fetch/activate akışı, segmentleme ve gizli veri uyarıları."
  - label: "Firebase Remote Config rollouts"
    url: "https://firebase.google.com/docs/remote-config/rollouts"
    note: "Aşamalı dağıtım, izleme ve önceki değere rollback yaklaşımı."
  - label: "Firebase Remote Config condition reference"
    url: "https://firebase.google.com/docs/remote-config/condition-reference"
    note: "Dil, uygulama sürümü ve yüzde bazlı koşulların yapılandırılmasına ilişkin resmi referans."
  - label: "Apple App Review Guidelines"
    url: "https://developer.apple.com/app-store/review/guidelines/"
    note: "2.5.2 kapsamında uygulamanın işlevini veya özelliklerini değiştiren indirilebilir kodla ilgili sınırlar."
  - label: "Apple Developer Program License Agreement"
    url: "https://developer.apple.com/support/terms/apple-developer-program-license-agreement/"
    note: "İndirilen yorumlanan kodun koşullarına ilişkin resmi sözleşme metni."
  - label: "Apple Localization documentation"
    url: "https://developer.apple.com/documentation/xcode/localization"
    note: "Apple platformlarında yerelleştirme ve string catalog yaklaşımı için resmi dokümantasyon."
  - label: "Microsoft CodePush CLI documentation"
    url: "https://microsoft.github.io/code-push/docs/cli.html"
    note: "OTA dağıtımlarında rollback komutuna ilişkin resmi dokümantasyon; makaledeki genel rollback fikrini destekleyen tamamlayıcı kaynak."
---

Mobil uygulamalarda çeviriler çoğu zaman uygulama paketine gömülü JSON, string catalog veya benzeri i18n dosyalarıyla tutulur. Bu yaklaşım basittir: uygulama hangi sürümle geldiyse, kullanıcı o sürümün çevirilerini görür. Bir metin değiştiğinde yeni uygulama sürümü yayınlamak gerekir.

Bu model yavaş olabilir ama davranışı öngörülebilirdir. Uygulama mağazasında incelenen paket ile kullanıcının çalıştırdığı paket aynıdır. İnternet bağlantısı olmasa da temel metinler hazırdır. Çeviri dosyasının uygulama sürümüyle uyumsuz olması gibi bir problem yaşanmaz.

OTA yaklaşımı ise çeviri paketini uzaktaki bir servisten alır. Uygulama açıldığında veya belirli aralıklarla yeni dil verisini kontrol eder. Böylece bir yazım hatası düzeltilebilir, yeni bir dil daha hızlı açılabilir, bölgeye göre içerik gösterilebilir ya da farklı metin varyasyonları denenebilir. Firebase Remote Config gibi sistemler, uygulama güncellemesi yayınlamadan davranış ve görünüm parametrelerini değiştirmeyi; ayrıca dil, uygulama sürümü ve kullanıcı segmentine göre farklı değerler sunmayı destekler. ([firebase.google.com](https://firebase.google.com/docs/remote-config?utm_source=openai))

Fakat OTA, “JSON’u CDN’e koyup uygulamada çekmek” kadar basit bir özellik değildir. Uygulamanın her zaman erişilebilir bir çeviri servisine bağlı olamayacağını kabul ederek tasarlanmalıdır.

## Uygulama paketi güvenlik ağı olarak kalmalı

OTA kullanırken en önemli karar, uzaktan gelen verinin uygulamadaki yerel çevirilerin yerine tamamen geçip geçmeyeceğidir. Benim tercihim, **pakete gömülü çevirileri son güvenlik ağı olarak tutmak** olur.

Uygulama ilk açıldığında şu sırayla çalışabilir:

1. Paket içindeki varsayılan çeviri yüklenir.
2. Daha önce doğrulanmış yerel OTA paketi varsa ve geçerliyse kullanılabilir.
3. Yeni uzak paket arka planda indirilir.
4. Paket doğrulanır ve sonraki açılışta veya güvenli bir anda etkinleştirilir.
5. İndirme başarısızsa mevcut geçerli paket korunur.

Bu yapı, kullanıcının açılış ekranında çeviri servisini beklemesini engeller. Aynı zamanda çevrimdışı kullanımda uygulamanın temel işlevleri çalışmaya devam eder.

Uzak paketin yalnızca dil koduyla tanımlanması da yeterli değildir. En azından şu alanlar düşünülmelidir:

```json
{
  "locale": "tr-TR",
  "schemaVersion": 2,
  "contentVersion": 17,
  "minAppVersion": "4.8.0",
  "fallbackLocale": "en-US",
  "checksum": "sha256:...",
  "strings": {
    "home.title": "Merhaba",
    "checkout.retry": "Tekrar dene"
  }
}
```

`schemaVersion`, uygulamanın dosya biçimini anlayıp anlamadığını belirtir. `contentVersion`, çeviri paketinin sırasını takip eder. `minAppVersion` ise yeni bir anahtarın veya biçimin eski istemcilerde sorun çıkarmasını önlemeye yardımcı olur. İsimler ve alanlar projeye göre değişebilir; burada amaç, çeviri verisini kontrolsüz bir metin torbası olmaktan çıkarmaktır.

## Önbellek yalnızca hız konusu değil

Önbellekleme, OTA sisteminin performans katmanı gibi görünür. Aslında güvenilirlik katmanıdır. Ağ yavaşsa, servis geçici olarak kapalıysa veya kullanıcı uçak modundaysa uygulamanın hangi çeviriyi kullanacağı önceden belli olmalıdır.

İyi bir önbellek politikası şu sorulara cevap verir:

- Yeni paket ne zaman indirilecek?
- İndirme uygulama açılışını bloke edecek mi?
- Eski paket ne kadar süre kullanılabilir?
- Aynı sürüm tekrar tekrar indirilmeyecek mi?
- Paket bozuk çıkarsa son geçerli sürüme nasıl dönülecek?

Firebase Remote Config dokümantasyonu da varsayılan değerlerin uygulamada tutulmasını, değerlerin indirilip daha sonra etkinleştirilmesini ve istemcinin güncellemenin ne zaman uygulanacağını kontrol etmesini önerir. Bu yaklaşım, uzaktan gelen içeriğin doğrudan ilk okuma anında kullanıcı arayüzüne yazılmasından daha güvenlidir. ([firebase.google.com](https://firebase.google.com/docs/remote-config?utm_source=openai))

![Çeviri paketinin indirme, doğrulama ve etkinleştirme süreci.](/blog/mobil-ota-ceviri-yonetimi-inline-1.svg)

*OTA çeviri paketi akışı*

Örneğin uygulama, yeni çeviriyi indirip hemen etkinleştirmek yerine önce geçici dosyaya yazabilir. JSON ayrıştırılır, zorunlu anahtarlar kontrol edilir, checksum doğrulanır ve ardından atomik bir taşıma işlemiyle “aktif paket” olarak işaretlenir. Uygulama yarıda kapanırsa eski paket bozulmaz.

## Fallback dili kullanıcıyı yarı yolda bırakmamalı

Bir anahtar seçili dilde bulunamadığında ne olacağı, OTA tasarımının en görünür parçasıdır. Eksik bir çeviri için boş metin göstermek, anahtar adını ekrana basmak veya uygulamayı çökertecek bir istisna fırlatmak kabul edilebilir varsayılanlar değildir.

Daha güvenli bir çözüm, kademeli fallback kullanmaktır:

- `tr-TR` anahtarı
- `tr` anahtarı
- uygulamanın varsayılan dili, örneğin `en-US`
- paket içindeki zorunlu metin yedeği

Bu zincir yalnızca dil seçimi için değil, içerik paketinin sürümü için de geçerli olabilir. Uzak pakette bulunmayan yeni bir anahtar, eski istemcinin anlayabileceği yerel paketten çözülebilmelidir.

Fallback davranışı test edilmeden OTA yayına alınmamalıdır. Özellikle şu durumlar ayrı ayrı denenmelidir:

- Uzak paket tamamen boş.
- Seçili dil var ama bazı anahtarlar eksik.
- Uzak paket daha yeni bir şema kullanıyor.
- Kullanıcı çevrimdışı.
- Paket indirilirken uygulama kapanıyor.
- Dil değiştirildikten sonra ekran yeniden çiziliyor.

*Fallback, yalnızca teknik bir yedek değildir; kullanıcının uygulamaya duyduğu güvenin parçasıdır.*

## Sürümleme ve rollback birlikte tasarlanmalı

Uzaktan çeviri dağıtımında “son dosyayı yayınladık” yaklaşımı kısa sürede yetersiz kalır. Hangi paketin hangi uygulama sürümüne, hangi ülkeye ve hangi kullanıcı grubuna gittiği izlenebilmelidir.

Bu nedenle çeviri paketleri değiştirilemez sürümler olarak yayımlanabilir. Örneğin `tr-TR@17` paketi daha sonra yerinde düzenlenmez; hata varsa `tr-TR@18` oluşturulur. Sunucu, istemciye hangi paketi önerdiğini ayrıca bildirebilir. Böylece hata araştırılırken kullanıcıların hangi içeriği gördüğü anlaşılır.

Dağıtım da kademeli yapılabilir. Önce küçük bir kullanıcı grubuna, ardından belirli uygulama sürümlerine veya bölgelere açılır. Firebase Remote Config rollouts dokümantasyonu, değişikliklerin aşamalı dağıtılmasını, Crashlytics ve Analytics gibi sinyallerle izlenmesini ve sorun görülürse önceki değere dönülmesini destekleyen bir model tanımlar. ([firebase.google.com](https://firebase.google.com/docs/remote-config/rollouts?utm_source=openai))

Rollback yalnızca sunucuda “eski dosyayı seçmek” değildir. İstemci tarafında da şu davranışlar bulunmalıdır:

- Son çalışan paket korunmalı.
- Başarısız paket tekrar etkinleştirilmemeli.
- Gerekirse belirli bir `contentVersion` kara listeye alınmalı.
- Hata oranı ve fallback kullanım oranı izlenmeli.
- Geri dönüşten sonra istemcinin eski pakete geçtiği doğrulanmalı.

![OTA çeviri dağıtımında kademeli yayın ve hatalı sürüme rollback.](/blog/mobil-ota-ceviri-yonetimi-inline-2.svg)

*Kademeli yayın ve rollback*

Çeviri metni uygulamanın işleyişini değiştirmiyor gibi görünse de uzaktan dağıtım, ürünün kullanıcıya görünen davranışını değiştirir. Bu yüzden güvenlik sınırları da gözden geçirilmelidir. Uzak çeviri servisine gizli bilgi koyulmamalı; paketler HTTPS üzerinden alınmalı ve mümkünse bütünlük doğrulaması yapılmalıdır. Firebase, Remote Config değerlerinin istemci tarafından erişilebilir olduğunu ve gizli verilerin burada tutulmaması gerektiğini açıkça belirtiyor. ([firebase.google.com](https://firebase.google.com/docs/remote-config?utm_source=openai))

Ayrıca OTA mekanizması, uygulamaya yeni kod veya incelenmemiş özellikler indiren bir sisteme dönüştürülmemelidir. Apple’ın App Review Guidelines belgesindeki 2.5.2 maddesi, uygulamanın işlevini veya özelliklerini değiştiren kodun indirilip çalıştırılmasına ilişkin sınırlar koyuyor. Salt metin ve içerik güncellemesi ile çalıştırılabilir kod indirmek aynı şey değildir; yine de uzaktan yapılandırmanın mağaza kurallarını dolanmak için kullanılmaması gerekir. ([developer.apple.com](https://developer.apple.com/app-store/review/guidelines/?utm_source=openai))

> OTA, mağaza yayınını ortadan kaldırmaz; yalnızca hangi değişikliklerin güvenle mağaza dışında yönetilebileceğini yeniden tanımlar.

## Her metin uzaktan yönetilmemeli

Çevirileri OTA’ya taşımak, bütün metinleri merkezî bir servise vermek anlamına gelmez. Yasal açıklamalar, ödeme akışındaki kritik uyarılar, erişilebilirlik açısından zorunlu metinler ve uygulamanın ilk açılışında gereken ifadeler paket içinde tutulabilir.

Uzak yönetim için daha uygun metinler şunlardır:

- Yazım hatası düzeltmeleri
- Kampanya veya bölgesel içerik metinleri
- Yeni dilin kademeli açılması
- A/B testi yapılan başlık ve açıklamalar
- Mağaza yayını beklemeden düzeltilmek istenen düşük riskli ifadeler

Buna karşılık, uzaktan gelen metin bir butonun davranışını belirliyorsa veya kullanıcıyı ödeme, izin ya da güvenlik kararına yönlendiriyorsa daha sıkı inceleme gerekir. Metni değiştirmek teknik olarak kolay olabilir; fakat metnin ürün içindeki anlamı değiştiğinde test, onay ve rollback süreci de değişmelidir.

Benim için iyi OTA mimarisinin ölçütü, çeviriyi ne kadar hızlı değiştirdiği değil, **hatalı değişiklikte uygulamanın ne kadar kontrollü davranabildiğidir**. Paket içi varsayılanlar, doğrulanmış önbellek, açık sürümleme, sağlam fallback ve hızlı rollback birlikte kurulmadığında OTA yalnızca yayın baskısını başka bir yere taşır.
