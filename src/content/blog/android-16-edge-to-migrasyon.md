---
title: "Android 16 ile Edge-to-Edge Tasarım Bir Tercih Olmaktan Çıkıyor"
description: "Android 16, edge-to-edge kullanımından çıkış seçeneğini kaldırıyor. Mobil arayüzleri güvenli biçimde taşımak için insets ve adaptif tasarım yaklaşımını inceleyelim."
slug: "android-16-edge-to-migrasyon"
publishedAt: 2026-07-21
updatedAt: 2026-09-07
tags: ["Android 16", "edge-to-edge", "Jetpack Compose", "WindowInsets", "mobil geliştirme"]
category: "Mobil Geliştirme"
heroImage: "/blog/android-16-edge-to-migrasyon.png"
heroAlt: "Android 16'da opt-out kalkınca insets ile taşıma."
featured: false
draft: false
sources:
  - label: "Android Developers — Behavior changes: Apps targeting Android 16 or higher"
    url: "https://developer.android.com/about/versions/16/behavior-changes-16"
    note: "Android 16 hedefleyen uygulamalarda edge-to-edge opt-out seçeneğinin devre dışı bırakılması, predictive back ve büyük ekran davranışları."
  - label: "Android Developers — Android 16 features and changes list"
    url: "https://developer.android.com/about/versions/16/summary"
    note: "Android 16’daki davranış değişikliklerinin resmi özeti."
  - label: "Android Developers — Edge-to-edge design"
    url: "https://developer.android.com/design/ui/mobile/guides/layout-and-content/edge-to-edge"
    note: "Sistem çubuklarının arkasına çizim, window insets ve etkileşim alanları için resmi tasarım rehberi."
  - label: "Android Developers — AEP guideline: Edge to Edge"
    url: "https://developer.android.com/distribute/aep/aep-req-edge-to-edge"
    note: "24 Haziran 2026 tarihli edge-to-edge uygulama gereksinimleri ve sistem çubuklarıyla çakışmayan etkileşimli UI rehberi."
  - label: "Android Developers — Behavior changes: Apps targeting Android 15 or higher"
    url: "https://developer.android.com/about/versions/15/behavior-changes-15"
    note: "Android 15 ile başlayan edge-to-edge zorunluluğunun arka planı ve window inset etkileri."
---

Android 15 ile başlayan edge-to-edge zorunluluğu, Android 16’da yeni bir aşamaya geçiyor. Android 16’yı hedefleyen uygulamalar artık `windowOptOutEdgeToEdgeEnforcement` ile bu davranıştan çıkamayacak. Uygulama, sistem çubuklarının arkasına çizim yapmaya hazır olmak zorunda. ([developer.android.com](https://developer.android.com/about/versions/16/behavior-changes-16))

Bu değişiklik ilk bakışta bir UI ayrıntısı gibi görünebilir. Oysa etkisi daha geniş. Daha önce ekranın üstünde ve altında güvenli boşluk varmış gibi tasarlanan arayüzler; durum çubuğunun, gesture alanının veya ekran çentiğinin altında kalabilir. **Android 16’ya geçiş, aslında uygulamanın ekran geometrisiyle ilgili varsayımlarını test ediyor.**

## Ekranın sınırları artık uygulamanın sınırı değil

Edge-to-edge yaklaşımında uygulama, ekranın tamamını kullanır. Arka plan ve kaydırılabilir içerik sistem çubuklarının arkasına kadar uzanabilir. Ancak etkileşimli bileşenlerin bu alanlara gelişigüzel yerleştirilmesi beklenmez. Android’in tasarım rehberi, dokunma ve sürükleme hedeflerinin sistem inset’leriyle çakışmaması gerektiğini özellikle vurguluyor. ([developer.android.com](https://developer.android.com/design/ui/mobile/guides/layout-and-content/edge-to-edge?hl=en))

Buradaki ayrım önemli:

- **Arka plan**, ekranın kenarlarına kadar taşabilir.
- **İçerik**, gerektiğinde inset değerlerine göre konumlanmalıdır.
- **Etkileşimli öğeler**, gesture navigation ve sistem çubuklarının altında kalmamalıdır.

Örneğin bir ödeme uygulamasındaki “Öde” düğmesi ekranın altına sabitlenmişse, yalnızca görsel olarak görünmesi yeterli değildir. Kullanıcının gesture alanıyla çakışmamalı, farklı ekran boyutlarında erişilebilir kalmalı ve klavye açıldığında yeniden konumlanmalıdır.

Bu yüzden edge-to-edge desteğini tek bir global padding olarak ele almak hatalı olur. Üst bar, liste içeriği, alt aksiyon alanı ve klavye birbirinden farklı inset ihtiyaçlarına sahip olabilir.

![Sistem çubukları, güvenli içerik alanı ve etkileşimli alt bölümün ilişkisi.](/blog/android-16-edge-to-migrasyon-inline-1.svg)

*Sistem çubukları ve güvenli alan*

## Compose tarafında temel yaklaşım

Jetpack Compose kullanan uygulamalarda Material bileşenleri bazı inset senaryolarını zaten yönetebilir. Fakat bu, bütün ekranın otomatik olarak güvenli olduğu anlamına gelmez. Özellikle özel üst barlar, özel bottom sheet’ler, sabit aksiyon alanları ve tam ekran görseller için açık bir inset politikası gerekir. Android’in resmi rehberi, içeriğin sistem çubuklarının arkasına çizilmesini ve gerekli yerlerde inset’lere tepki verilmesini öneriyor. ([developer.android.com](https://developer.android.com/design/ui/mobile/guides/layout-and-content/edge-to-edge?hl=en))

Basit bir ekran şu fikri taşıyabilir:

```kotlin
@Composable
fun CheckoutScreen() {
    Scaffold(
        contentWindowInsets = WindowInsets.safeDrawing,
        bottomBar = {
            Button(
                onClick = { /* ödeme başlat */ },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
                    .windowInsetsPadding(WindowInsets.navigationBars)
            ) {
                Text("Ödemeye geç")
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Ekran içeriği
        }
    }
}
```

Bu örnek her tasarım için doğrudan kopyalanacak bir reçete değil. Önemli olan, inset yönetiminin ekranın gerçek yapısına göre yapılmasıdır. Aynı inset’i hem `Scaffold` hem de alt bileşen uyguluyorsa gereğinden fazla boşluk oluşabilir. Hiçbir katman uygulamıyorsa içerik sistem çubuğunun altında kalabilir.

*Inset yönetimi bir görünüm düzeltmesi değil, bileşenler arası sorumluluk sözleşmesidir.*

## Android 16 yalnızca telefon ekranını düşünmüyor

Android 16’yı hedefleyen uygulamalarda büyük ekran cihazlarda yön, yeniden boyutlandırma ve en-boy oranı kısıtları varsayılan olarak göz ardı edilebiliyor. Bu davranış; tablet, katlanabilir cihaz, masaüstü pencere modu, otomobil ekranı veya benzer geniş yüzeylerde küçük ekran için tasarlanmış düzenlerin bozulmasına yol açabilir. ([developer.android.com](https://developer.android.com/about/versions/16/behavior-changes-16))

Örneğin yalnızca portre modunda test edilen bir uygulamada şu sorunlar görülebilir:

- Sabit genişlikteki kartların fazla gerilmesi
- Alt aksiyon alanının içerikten kopması
- Ekran döndüğünde form durumunun kaybolması
- Modal bileşenlerin pencere boyutuna uyum sağlayamaması
- Liste ve detay görünümünün geniş alanda gereksiz boşluk üretmesi

Bu nedenle edge-to-edge migrasyonu ile adaptif düzen çalışmasını birbirinden tamamen ayırmak zor. Ekranın kenarına kadar çizim yapmak, aynı zamanda uygulamanın farklı pencere boyutlarında nasıl davrandığını görünür hale getiriyor.

![Aynı mobil arayüzün telefon, tablet ve geniş pencere boyutlarına uyarlanması.](/blog/android-16-edge-to-migrasyon-inline-2.svg)

*Aynı arayüz farklı boyutlarda*

## Test listesi birkaç cihazdan daha fazlası

Android 16 geçişinde yalnızca fiziksel cihaz sayısını artırmak yeterli değil. Farklı sistem navigasyonu, font ölçeği, ekran kesiti, pencere boyutu ve klavye durumları birlikte test edilmeli.

Kontrol listesine şunları eklemek mantıklı:

1. Gesture navigation ve üç düğmeli navigasyon
2. Android 15 ve Android 16 üzerinde aynı ekran
3. Çentikli ve çentiksiz cihazlar
4. Küçük telefon, tablet ve katlanabilir pencere boyutları
5. Büyük yazı boyutu ve ekran ölçeği
6. Klavye açıkken sabit alt aksiyon alanları
7. Ekran döndürme sonrası form ve scroll durumu
8. Erişilebilirlik hizmetleri açıkken odak sırası

Android 16’da predictive back davranışı da hedef API 36 uygulamalarında varsayılan hale geliyor. `onBackPressed` çağrılarının ve `KEYCODE_BACK` akışının eski biçimde çalışmaması, özel geri navigasyonu olan ekranların ayrıca incelenmesini gerektiriyor. ([developer.android.com](https://developer.android.com/about/versions/16/behavior-changes-16))

Bu iki değişiklik aynı problemi farklı yerlerden gösteriyor: Uygulama, işletim sisteminin çizim ve navigasyon modeline kendi varsayımlarını dayatamaz. Sistem davranışını kabul edip arayüzü buna göre kurmak gerekiyor.

> Android 16’ya hazırlık, “ekrana biraz daha padding eklemek” değil; uygulamanın ekranı ve geri navigasyonu kimin yönettiğini yeniden netleştirmektir.

## Migrasyonu ertelemek neden pahalılaşabilir?

Edge-to-edge desteğini son haftaya bırakmak genellikle tek bir büyük kırılma üretmez. Bunun yerine onlarca küçük görsel ve etkileşimsel sorun ortaya çıkar. Bir ekranda üst bar kapanır, başka bir ekranda alt düğme gesture alanına yaklaşır, başka bir ekranda modal pencere tablet genişliğinde anlamsız görünür.

Sorunların dağınık olması, sahiplenilmelerini zorlaştırır. Tasarım sistemi, Compose/View katmanı, navigasyon ve QA süreçleri aynı ekran varsayımlarına göre hareket etmiyorsa her düzeltme başka bir yerde yeni boşluk veya çakışma yaratabilir.

Bu yüzden en iyi başlangıç, uygulamanın tüm ekranlarını aynı anda değiştirmek değil; inset kullanan ve kullanmayan bileşenleri görünür hale getirmektir. Özellikle ortak `Scaffold`, üst bar, alt aksiyon alanı, modal ve liste bileşenleri incelenmeli. Bir bileşenin inset sorumluluğu net değilse, Android 16 bunu er ya da geç kullanıcıya gösterecektir.

Android 16’ya geçişin öğretici tarafı burada. Mobil arayüz artık tek bir telefon dikdörtgeni içinde yaşayan kapalı bir yüzey değil. Sistem çubukları, pencere boyutu, geri navigasyonu ve erişilebilirlik davranışı uygulamanın çalışma alanının parçası. **İyi mobil UI, ekranın kenarlarını doldurmakla değil, bu sınırlarla doğru ilişki kurmakla ölçülüyor.**

Daha ayrıntılı okuma: https://recepozgur.com/blog/android-16-edge-to-edge-migrasyon/

Android 16’ya geçişte ilk kontrol edeceğiniz ortak bileşen hangisi olur: üst bar mı, alt aksiyon alanı mı?
