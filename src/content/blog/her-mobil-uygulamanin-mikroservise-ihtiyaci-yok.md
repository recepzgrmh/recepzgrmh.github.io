---
title: "Her mobil uygulamanın mikroservise ihtiyacı yok"
description: "Mikroservis kararını moda, ekip hayali veya CV değeriyle değil; sistemin gerçek sınırları ve operasyon maliyetiyle vermek için pratik bir çerçeve."
slug: "her-mobil-uygulamanin-mikroservise-ihtiyaci-yok"
publishedAt: 2026-07-16
tags: ["mimari", "backend", "mobil"]
category: "Backend ve API"
heroImage: "/blog/mikroservis-karari.png"
heroAlt: "Tek bir sağlam bloktan gereksiz yere ayrılan küçük servis parçalarını gösteren soyut diyagram"
featured: true
draft: false
sources:
  - label: "Microsoft Azure Architecture Center — Microservices architecture style"
    url: "https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices"
    note: "Mikroservislerin faydalarıyla birlikte dağıtık sistem, veri tutarlılığı ve operasyon karmaşıklığını ele alıyor."
  - label: "Microsoft Azure Architecture Center — Assess a microservices architecture"
    url: "https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/microservices-assessment"
    note: "Mikroservis kararından önce ekip ve sistem olgunluğunu değerlendirmek için kontrol noktaları sunuyor."
  - label: "AWS Prescriptive Guidance — Decomposing monoliths into microservices"
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-decomposing-monoliths/decomposing-patterns.html"
    note: "Bir monoliti parçalarken kullanılabilecek desenleri ve artımlı geçiş yaklaşımını anlatıyor."
---

Bir ürünün backend’i tek uygulama olarak çalışıyorsa bu, henüz “ölçeklenemediği” anlamına gelmez. Aynı şekilde sistemi on servise bölmek de otomatik olarak iyi mimari üretmez.

Mikroservis konuşmalarında en sık atlanan nokta şu: **servis sayısı teknik olgunluğun ölçüsü değildir.** Asıl soru, elde ettiğimiz bağımsızlığın karşılığında üstlendiğimiz dağıtık sistem maliyetine değip değmediğidir.

Bu yazı mikroservislere karşı değil. Kararın hangi koşullarda anlamlı hâle geldiğini ayırmaya çalışıyor.

## Mikroservis aslında ne satın alır?

Doğru sınırlarla tasarlandığında mikroservisler bağımsız geliştirme, dağıtım ve ölçekleme imkânı verir. Bir ekip ödeme alanını geliştirirken başka bir ekip bildirim sistemini ayrı bir yaşam döngüsüyle yönetebilir. Yük yalnızca belirli bir işlevde artıyorsa bütün sistemi değil, o servisi büyütmek mümkün olur.

Fakat bu bağımsızlık ücretsiz değildir. Uygulama içindeki bir fonksiyon çağrısının yerini ağ çağrısı alır. Tek transaction içinde çözülebilen veri tutarlılığı problemi servisler arasında koordinasyon ister. Log okumak yerine dağıtık iz sürme, yerel hata yerine timeout ve kısmi kesinti düşünmek gerekir.

Microsoft’un mimari rehberi de ölçeklenebilirlik ve ekip bağımsızlığını avantajlar arasında sayarken; servis keşfi, veri tutarlılığı, test ve operasyon karmaşıklığını açıkça maliyet olarak listeliyor. Kullandığım rehberlerin bağlantıları yazının sonundaki kaynak bölümünde yer alıyor.

## Önce organizasyon sınırına bakarım

Bir sistemi kaç servise böleceğime koddan önce ekibe bakarak başlamayı daha doğru buluyorum.

Ürünü aynı üç kişi geliştiriyor, aynı kişiler deploy ediyor ve her değişiklikte bütün ekip birlikte hareket ediyorsa; teknik olarak ayrılmış on servis gerçekte bağımsız değildir. Sadece aynı koordinasyonu daha fazla repository, pipeline ve ağ çağrısıyla yaparız.

Şu sorular daha açıklayıcıdır:

- Alanların gerçekten farklı değişim ritimleri var mı?
- Bir parçanın diğerlerinden bağımsız dağıtılması somut bir ihtiyacı çözüyor mu?
- Ekipler servislerin üretim sorumluluğunu uçtan uca alabilecek mi?
- Gözlemlenebilirlik, hata ayıklama ve incident yönetimi hazır mı?
- Verinin servisler arasında nasıl tutarlı kalacağı belli mi?

Bu soruların çoğuna “henüz değil” diyorsak modüler bir monolit, teknik borç değil; bilinçli bir başlangıç olabilir.

## Modüler monolit neden güçlü bir varsayılandır?

“Monolit” kelimesi genellikle bütün kodun birbirine girdiği eski bir uygulamayı çağrıştırıyor. Oysa iyi tasarlanmış bir modüler monolitte sınırlar nettir: modüller birbirlerinin iç detaylarına dokunmaz, iletişim tanımlı arayüzlerden geçer ve veri sahipliği mümkün olduğunca ayrılır.

Bunun önemli bir avantajı var: **iş alanlarını ayırmayı öğrenirken dağıtık sistem vergisini hemen ödemezsin.**

Örneğin bir etkinlik uygulamasında kullanıcı, katalog, bilet ve bildirim alanları ayrı modüller olabilir. Başlangıçta aynı process içinde çalışırlar. Zamanla bildirim kuyruğu farklı ölçeklenmeye, ayrı hata toleransına veya bağımsız bir ekibe ihtiyaç duyarsa o sınır zaten görünür olduğu için servise çıkarılabilir.

AWS’in monolit parçalama rehberinde de tek seferlik büyük bir yeniden yazım yerine iş kabiliyetleri etrafında artımlı ayrıştırma desenleri anlatılıyor. Bu yaklaşım, “önce dağıtalım, sonra sınır buluruz” riskini azaltır.

## Karar için kullandığım basit eşik

Bir modülü ayrı servise çıkarmak için en az bir güçlü neden ararım:

1. **Bağımsız ölçek ihtiyacı:** Trafik veya kaynak kullanımı sistemin geri kalanından belirgin biçimde farklıdır.
2. **Bağımsız teslim ihtiyacı:** Ayrı bir ekip, diğer ekipleri beklemeden sık dağıtım yapmak zorundadır.
3. **İzolasyon ihtiyacı:** Bu alanın hatası ya da yoğunluğu ana sistemi etkilememelidir.
4. **Teknoloji veya regülasyon sınırı:** Güvenlik, veri yerleşimi ya da çalışma zamanı gereksinimi gerçekten farklıdır.

“İleride büyüyebiliriz” tek başına yeterli bir neden değildir. Çünkü gelecekteki olası karmaşıklığı çözmek için bugüne kesin bir karmaşıklık ekler.

## Mobil taraf bu karardan nasıl etkilenir?

Backend’in iç mimarisi mobil istemciye sızmamalı. Mobil uygulamanın on ayrı servisin endpoint’lerini, hata modellerini ve versiyonlarını yönetmesi kırılgan bir bağımlılık ağı oluşturur.

İçeride mikroservis olsa bile dışarıda mobil istemciye tutarlı bir sözleşme sunmak gerekir. API gateway veya mobile özel bir Backend for Frontend katmanı; kimlik doğrulama, response birleştirme, hata standardizasyonu ve geriye uyumluluk için sınır görevi görebilir.

Buradaki amaç her ekran için yeni bir servis üretmek değil; istemcinin ürün deneyimine uygun, kararlı bir API yüzeyi sağlamaktır.

## Sonuç: ayrıştırma hedef değil, araçtır

Mikroservis, büyümenin ön koşulu değildir. Bazı sistemlerde büyümenin sonucunda ortaya çıkan net bir ihtiyaçtır.

Bu yüzden başlangıç varsayımım genellikle şudur: sınırları iyi çizilmiş bir modüler yapı kur, ölç, darboğazın nerede oluştuğunu gör ve yalnızca kanıt oluşan parçaları ayır. Böylece mimari, tahmin edilen prestije değil ürünün ve ekibin gerçek davranışına göre gelişir.

En iyi mimari en çok parçaya sahip olan değil; değişiklik yapmayı bugün kolaylaştırırken yarının seçeneklerini de açık tutandır.
