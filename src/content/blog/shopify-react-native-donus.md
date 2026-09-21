---
title: "Shopify React Native’dan neden Swift ve Kotlin’e döndü"
description: "Shopify, Shop uygulamasını React Native’den Swift ve Kotlin’e taşıdı. Bu kararın arkasında performanstan çok kodlama ajanlarının değiştirdiği maliyet hesabı var."
slug: "shopify-react-native-donus"
publishedAt: 2026-09-21
tags: ["Shopify","React Native","Swift","Kotlin","kodlama ajanları","mobil geliştirme"]
category: "Mobil geliştirme"
heroImage: "/blog/shopify-react-native-donus.jpg"
heroAlt: "Shopify Shop uygulamasının iOS ve Android platformlarına ayrılan mobil geliştirme yolunu gösteren illüstrasyon"
featured: false
draft: false
sources:
  - label: "Shopify Engineering, Native is now the future of mobile at Shopify"
    url: "https://shopify.engineering/back-to-native"
    note: "Shopify’ın 10 Eylül 2026 tarihli resmi açıklaması; React Native’den Swift ve Kotlin’e dönüş gerekçelerini anlatıyor."
  - label: "Shopify Engineering, Migrating Shop app from React Native to native"
    url: "https://shopify.engineering/shop-app-migration"
    note: "Shop uygulamasının 12 haftalık geçişi ve startup, kararlılık, boyut, derleme süresi ve FPS ölçümleri."
  - label: "Hacker News tartışması"
    url: "https://news.ycombinator.com/item?id=49643982"
    note: "10 Eylül 2026 tarihli başlık; 1.238 puan ve 924 yorumla tartışmanın ölçeğini gösteriyor."
  - label: "Reddit r/programming tartışması"
    url: "https://www.reddit.com/r/programming/comments/1wd7wmu/shopify_is_moving_from_react_native_back_to_swift/"
    note: "11 Eylül 2026 tarihli tartışma; gönderi 1.004 oy aldı."
  - label: "Reddit r/ExperiencedDevs araması"
    url: "https://www.reddit.com/r/ExperiencedDevs/search/?q=Shopify%20React%20Native&restrict_sr=1&sort=new"
    note: "8-15 Eylül 2026 aralığında konuya doğrudan bağlanan görünür bir tartışma bulamadım."
  - label: "Reddit r/reactnative tartışması"
    url: "https://www.reddit.com/r/reactnative/comments/1wclvv0/shopify_is_moving_from_react_native_to_native/"
    note: "10 Eylül 2026 tarihli topluluk tartışması; React Native’in geleceği, OSS projeleri ve yerel geliştirme maliyeti konuşuldu."
---

Shopify, 10 Eylül 2026’da mobil uygulamalarının yönünü yeniden değiştirdiğini açıkladı. Şirket, 2020’de büyük ölçüde React Native’e geçtikten sonra Shop uygulamasını Swift ve Kotlin ile yeniden geliştirdi. Shopify’ın kendi açıklamasına göre bu karar, React Native’in yavaşlaması ya da çalışmaması yüzünden alınmadı. Kararı değiştiren varsayım, iki platform için aynı özelliği ayrı ayrı geliştirmenin eskisi kadar pahalı görünmemeye başlamasıydı. ([shopify.engineering](https://shopify.engineering/back-to-native))

Bu hafta konu bu yüzden çok konuşuldu. Haber, Hacker News’te 10 Eylül’de 885 puan ve 603 yorumla günün en üst sırasına çıktı. Reddit’te r/programming başlığında 1.004 oy aldı. r/reactnative ve r/iOSProgramming gibi topluluklarda da tartışma aynı gün yayıldı. Benim gördüğüm kadarıyla The Verge, TechCrunch, Ars Technica ve InfoQ tarafında bu kararı doğrudan ele alan aynı hafta tarihli bir haber yoktu. Bu da tartışmanın ilk dalgasının haber sitelerinden çok mühendislik blogu ve geliştirici topluluklarında büyüdüğünü gösteriyor. ([news.ycombinator.com](https://news.ycombinator.com/front?birth=nasutton12&day=2026-09-10&utm_source=openai))

## Shopify’ın değiştirdiği varsayım iki kod tabanı değildi

Shopify’ın 2020’de React Native’e geçiş gerekçesi anlaşılırdı. Bir özelliği iki kez yazmamak, web ağırlıklı çalışan geliştiricilerin mobil uygulamalara katkı verebilmesi ve platformlar arasındaki davranış farklarını daha az uğraşla yönetmek istiyorlardı. Şirket, Ocak 2025’te React Native yatırımının doğru yönde ilerlediğini de yazmıştı. 2026’daki açıklama, önceki kararın hata olduğunu söylemiyor. Shopify, o dönemdeki hesabın doğru olduğunu, yeni araçların hesabı değiştirdiğini söylüyor. ([shopify.engineering](https://shopify.engineering/back-to-native))

Buradaki değişiklik “yapay zekâ bütün mobil geliştirmeyi çözdü” iddiasından daha dar. Shopify, mevcut React Native uygulamasını bir referans olarak kullanıp SwiftUI ve Jetpack Compose tarafında ekranları, akışları, animasyonları ve veri bağlantılarını yeniden kurdu. Kodlama ajanları, özellikle davranışı zaten tanımlanmış bir uygulamayı başka platformlara taşırken işe yaramış. Şirketin mühendisleri yine planları incelemiş, testleri çalıştırmış, performans ölçmüş ve üretilen kodu gözden geçirmiş. ([shopify.engineering](https://shopify.engineering/shop-app-migration))

Bu ayrıntı bana göre haberin en değerli kısmı. Ajan, belirsiz bir ürün fikrinden güvenilir bir mobil uygulama çıkarmaktan çok, çalışan bir uygulamayı başka bir uygulama olarak ifade etme işinde daha öngörülebilir görünüyor. Shopify’ın elinde ekranlar, etkileşimler, analitik olaylar ve test edilebilir davranışlar vardı. “Aynısını iOS ve Android’de koru” talimatı, boş bir tasarım dosyasından uygulama üretmekten daha somut bir görev.

Shopify, Shop uygulamasının yeniden yazımında altı mühendisten oluşan çekirdek bir ekiple çalıştığını ve kavram kanıtından mağazalarda yayımlanan uygulamaya 12 haftada ulaştığını belirtiyor. Bu süreyi küçük ekiplerin doğrudan örnek alacağı bir takvim gibi okumuyorum. Mevcut ürünün kaynak kodu, ekiplerin platform bilgisi, test altyapısı ve şirketin dağıtım kapasitesi bu sonuca dahil. ([shopify.engineering](https://shopify.engineering/shop-app-migration))

## Rakamlar ne söylüyor, ne söylemiyor?

Shopify’ın paylaştığı karşılaştırmada yerel iOS sürümünün soğuk açılışı 3.200 milisaniyeden 2.466 milisaniyeye, Android sürümünün açılışı 4.433 milisaniyeden 2.233 milisaniyeye indi. Android’de yayın derlemesi yaklaşık yüzde 75 daha kısa sürdü. Android uygulamasının boyutu da 293 MB’tan 184 MB’a düştü. iOS uygulaması ise 67 MB’tan 68 MB’a çıktı. ([shopify.engineering](https://shopify.engineering/shop-app-migration))

Oturum kararlılığındaki değişim de dikkat çekiyor. Shopify, geçmişte yüzde 99,5’in üzerinde olan oranının yerel sürümle yüzde 99,95’in üzerine çıktığını ve çöken oturum sayısında 10 kat azalma gördüğünü yazıyor. Android’de kaydırma ve ekranlar arasında geçiş sırasında 120 FPS ölçüldüğü de belirtilmiş. Bu rakamlar Shop uygulaması için anlamlı, fakat React Native kullanan her uygulamanın aynı sonucu alacağını kanıtlamıyor. Ölçümlerin hangi cihazlarda, hangi ağ koşullarında ve hangi kullanıcı akışlarında yapıldığını yazıdan tüm ayrıntılarıyla çıkaramıyorum. ([shopify.engineering](https://shopify.engineering/shop-app-migration))

Benim görüşüm şu: Shopify’ın kararı, React Native’in bittiğini göstermiyor. Büyük bir ekibin, platform katmanına doğrudan erişimi ve iki uygulamayı ayrı ayrı geliştirecek kapasitesi varsa yerel geliştirme yeniden daha cazip hale gelebilir. Küçük bir ekip için iki mağaza, iki dağıtım hattı ve iki hata ayıklama süreci hâlâ ciddi bir yük. Bu nedenle Shopify’ın tercihini teknoloji seçimi için genel reçete olarak almak yanlış olur.

Daha çok şu soruyu sormak gerekiyor: Bizim uygulamamızda iki platformu tek kod tabanında tutmanın kazancı nerede, yerel API’lere doğrudan erişmenin kazancı nerede? Eğer uygulamanın büyük bölümü platform davranışlarını taklit etmek için React Native katmanının etrafında dolaşıyorsa, Shopify’ın deneyimi incelenmeye değer. Eğer ürünün ilk sürümünü küçük bir ekiple çıkarmak ve hızlı değişiklik yapmak öncelikliyse, aynı deneyim farklı bir sonuca götürebilir.

Hacker News ve Reddit tartışmalarında benim dikkatimi çeken karşı argüman da bu oldu. Bazı geliştiriciler Shopify’ın sonucu için “iki platformu karşılayacak mühendislik bütçesine sahip bir şirketin sonucu” yorumunu yaptı. Bazıları ise React Native’in bağımlılık, yükseltme ve yerel modül sorunlarının zaten uzun süredir verimlilik maliyeti yarattığını yazdı. Bu itirazların ikisi de makul. Shopify’ın yazısı geçişin teknik sonuçlarını ölçüyor, fakat mühendis saatlerini, ajan maliyetini ve uzun vadeli bakım farkını açıklamıyor. ([news.ycombinator.com](https://news.ycombinator.com/item?id=49643982&utm_source=openai))

Ben burada henüz emin değilim: Kodlama ajanlarının yeni bir özelliği iki platformda, mevcut uygulamayı taşırken gösterdikleri hızla geliştirebildiğini görmedik. Shopify’ın deneyimi, “mevcut kodu çevirme” işinin ucuzladığını gösteriyor. Ürün geliştirme sırasında ortaya çıkan belirsizliği, platforma özgü tasarım kararlarını ve mağaza onay süreçlerini aynı ölçüde ucuzlatıp ucuzlatmadığını zaman gösterecek.

Şimdilik çıkarabildiğim sonuç daha sınırlı. Shopify, React Native seçimini geri alarak geçmişte yanıldığını ilan etmedi. Şirket, 2020’de paylaşılmış kodun ve ekip yapısının bugün farklı araçlarla yeniden değerlendirilebileceğini gösterdi. Mobil mimari kararları artık birkaç yıl önceki “tek kod tabanı mı, iki yerel uygulama mı?” tartışmasında kalmıyor. Kullanılan geliştirme araçları, test döngüsü ve mevcut ürünün ne kadar iyi tanımlandığı hesabın parçası haline geliyor.
