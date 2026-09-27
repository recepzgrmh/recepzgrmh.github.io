---
title: "Android 17 QPR1, AOSP takvimindeki boşluğu görünür kıldı"
description: "Android 17 QPR1 ile gelen API’lerin Pixel cihazlarda önce açılması, Android’in açık kaynak dağıtım modelini yeniden tartışmaya açtı."
slug: "android-17-qpr1-aosp-api"
publishedAt: 2026-09-27
tags: ["Android 17","Android QPR1","AOSP","GrapheneOS","Pixel","mobil geliştirme"]
category: "Mobil Geliştirme"
heroImage: "/blog/android-17-qpr1-aosp-api.jpg"
heroAlt: ""
featured: false
draft: false
sources:
  - label: "Android 17 QPR 1 GSI binaries and release notes"
    url: "https://developer.android.com/about/versions/17/qpr1/gsi-release-notes"
    note: "Google’ın resmi Android Developers sayfası. Android 17 QPR1 GSI görüntülerinin tarihi, API/SDK kapsamı ve deneysel kullanım uyarıları burada yer alıyor."
  - label: "GrapheneOS’un Android 17 QPR1 açıklaması"
    url: "https://bsky.app/profile/grapheneos.org/post/3mvnrhp3vfs26"
    note: "GrapheneOS’un 16 Eylül 2026 tarihli resmi Bluesky gönderisi. API iddiasını değil, QPR1 kodunun dağıtım ve backport durumunu doğrudan doğruluyor."
  - label: "Android 17, AOSP’ye API yayımlamadan 3.x’ten beri ilk kez güncellendi"
    url: "https://news.ycombinator.com/item?id=49758736"
    note: "Hacker News tartışması. 18 Eylül 2026’da 1.161 puan ve 708 yorum görünüyordu; konu aynı hafta içinde geniş biçimde tartışıldı."
  - label: "Android 17 Pixel-Only APIs: What the Diff Actually Shows"
    url: "https://whatjustshipped.com/android-17-qpr1-pixel-api-diff/"
    note: "API diff’ini inceleyen teknoloji yazısı. 84 ekleme, sıfır çıkarma ve örneklenen 48 isimden 12’sinin AOSP’de bulunduğu hesaplamasını içeriyor."
  - label: "Android 17 QPR1 API tartışması"
    url: "https://www.reddit.com/r/Android/comments/1wi8830/grapheneos_android_17_qpr1_is_the_first_release/"
    note: "Reddit r/Android başlığı, 17 Eylül 2026 tarihli tartışma ve GrapheneOS iddiasına verilen topluluk tepkileri."
  - label: "Android Developers Blog: Android 17 is here"
    url: "https://android-developers.googleblog.com/2026/06/Android-17.html"
    note: "Android 17’nin resmi geliştirici duyurusu. QPR1 tartışmasının bağlı olduğu SDK 37 ve Android 17 geliştirici değişiklikleri için başvuru kaynağı."
---

Android 17 QPR1, 15 Eylül 2026’da Pixel cihazlara geldi. İki gün sonra konu Hacker News ana sayfasında 1.178 puan ve 720 yorumla üst sıralara çıktı. Tartışmayı başlatan şey yeni bir kullanıcı arayüzü ya da performans ölçümü değildi. GrapheneOS, bu sürümün uygulama geliştiricilerine yönelik yeni API’leri AOSP kaynak koduyla aynı anda yayımlamadığını yazdı.

Bu iddianın dikkat çekici tarafı tarihsel karşılaştırmaydı. GrapheneOS’a göre Android 17 QPR1, Android Honeycomb’dan, yani Android 3.x döneminden beri yeni geliştirici API’leri AOSP yayını olmadan getiren ilk sürüm. Google’ın resmi Android 17 QPR1 GSI sayfası ise 17 Eylül tarihli görüntülerin Pixel sürümleriyle aynı API ve SDK’yı içerdiğini söylüyor. Bu iki bilgi yan yana gelince soru teknik hale geliyor: Bir API’nin Pixel imajında çalışması, onun Android’in ortak açık kaynak tabanının parçası olduğu anlamına geliyor mu?

## Tartışmanın merkezinde sürüm takvimi var

İlk okumada konu Google’ın bazı API’leri gizlediği gibi görünüyor. Ben de ilk haberi okuduğumda bunu böyle anladım. Sonra Android 17 API farklarını inceleyen WhatJustShipped yazısını okudum ve tablo biraz değişti.

Yazının aktardığı API diff’inde 84 ekleme ve sıfır çıkarma var. İncelenen 48 yeni isimden 12’sinin zaten AOSP kaynaklarında bulunduğu, fakat bazı özelliklerin etkinleştirildiği yapının Pixel sürümünde önce yayımlandığı belirtiliyor. En büyük ekleme gruplarından biri, Linux `madvise` çağrısına ait 24 sabit ve bir metot. Bunlar Pixel’e özel bir ürün özelliği gibi durmuyor. Daha çok mevcut platform kabiliyetlerinin uygulama geliştiricilerine açılma zamanlamasıyla ilgili.

WhatJustShipped’in aktardığı GrapheneOS yanıtı da bu ayrımı yapıyor. GrapheneOS, API’lerin standart Android API’leri olduğunu ve Android 17 QPR2 ile AOSP’ye ve diğer üreticilere ulaşacağını söylüyor. Buradaki takvim aralığı yaklaşık üç ay. Android 17 QPR1 15 Eylül’de yayımlandı, QPR2’nin Aralık 2026’da gelmesi bekleniyor.

Bu yüzden “Google kaynak kodunu saklıyor” cümlesi fazla geniş kalıyor. Daha isabetli ifade şu: **Google, API’leri etkin biçimde kullanan sürümü Pixel cihazlara önce veriyor.** Bazı bildirimler ve uygulama geliştirici API’leri bu ara dönemde diğer üreticilerin ve AOSP tabanlı projelerin erişimine açık olmayabiliyor.

## Geliştirici açısından fark ne?

Bir Android uygulaması geliştiriyorsam, yeni API’nin dokümantasyonda görünmesiyle cihaz üreticilerinde kullanılabilir olması arasında fark var. Android 17 QPR1 için yayımlanan GSI görüntüleri aynı API ve SDK’yı taşısa da Google bu görüntüleri genel kullanım için değil, uygulama testleri ve uyumluluk doğrulaması için sunuyor. GSI sayfası da görüntülerin deneysel olduğunu ve CTS onaylı olmadığını açıkça belirtiyor.

Bu, kütüphane ve SDK geliştiricileri için planlamayı zorlaştırabilir. Bir özellik Pixel cihazda çalışırken Samsung, Xiaomi ya da özel ROM tarafında aynı API’nin bulunmaması, koşullu kod ve daha fazla test matrisi demek. Üç aylık süre her uygulamada felaket yaratmaz. Yine de bir API’nin varlığı ile üretim ortamında güvenle kullanılabilmesi arasındaki mesafe büyüyor.

Benim görüşüm, burada en rahatsız edici şeyin Pixel’e özel özellikler olmadığını düşünüyorum. Mobil platformlarda üreticiye özel davranış zaten alışıldık. Sorun, Android’in ortak platform sürümleriyle Pixel’e özel çeyreklik sürümler arasındaki sınırın geliştirici API’lerine taşınması. Bu sınır dokümantasyonda açık anlatılmazsa geliştirici, hangi API’nin platform sözleşmesi, hangisinin geçici Pixel avantajı olduğunu takip etmek zorunda kalır.

Karşı argüman da makul. GrapheneOS’un kendi yanıtında belirtildiği gibi QPR1 ve QPR3 sürümlerinin Pixel odaklı olması Android 16’dan beri kullanılan yeni bir takvim olabilir. Android 17 QPR1, bu takvimde ilk kez uygulama geliştiricilerini ilgilendiren API’ler bulunduğu için görünür hale gelmiş olabilir. Yani bu olay Google’ın bir gecede Android’i kapatmaya karar verdiğini kanıtlamıyor. Burada emin olmadığım nokta, bu takvimin üreticilerle yapılan teknik ve ticari anlaşmalarda nasıl uygulandığı. Kamuya açık belgeler bunun bütün ayrıntılarını göstermiyor.

## Açıklık takvime de bağlı

Bu haftaki tartışmayı değerli bulmamın nedeni, “Android açık kaynak mı?” sorusuna kolay bir cevap vermemesi. Android 17 QPR1’in API yüzeyindeki değişiklikler küçük görünebilir. WhatJustShipped, toplam farkın API yüzeyinin yaklaşık yüzde 0,52’si olduğunu hesaplıyor. Buna rağmen kaynak kodu, SDK ve cihaz dağıtımı farklı tarihlere ayrıldığında geliştiricinin gördüğü platform değişiyor.

Android’in açık kaynak niteliği yalnızca kaynak kodunun bir yerde bulunmasına bağlı değil. Geliştiricinin o kodu ne zaman görebildiği, API’yi hangi cihazlarda test edebildiği ve üreticilerin düzeltmeleri ne zaman alacağı da aynı hikâyenin parçası. Android 17 QPR1 bu farkı, tek bir yeni API’den daha görünür hale getirdi.
