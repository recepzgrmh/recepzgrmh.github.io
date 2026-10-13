---
title: "Deno Cloudflare’a katıldı, runtime için bir yıl kaldı"
description: "Deno ekibinin Cloudflare’a geçişi, Deno runtime ve Deno Deploy için verilen süreyi ve JavaScript ekosistemindeki etkisini yeniden gündeme getirdi."
slug: "deno-cloudflare-runtime"
publishedAt: 2026-10-13
tags: ["Deno","Cloudflare","JavaScript","Workers","Durable Objects","Açık Kaynak"]
category: "Backend ve API"
heroImage: "/blog/deno-cloudflare-runtime.jpg"
heroAlt: "Deno ve Cloudflare duyurusunda kullanılan, ortasında ağ bağlantıları bulunan bir dizüstü bilgisayar ve çevresinde bitkilerle hayvanların yer aldığı illüstrasyon."
featured: false
draft: false
sources:
  - label: "Deno resmi duyurusu, Deno ekibinin Cloudflare’a katılması ve ürün takvimi"
    url: "https://deno.com/blog/cloudflare"
    note: "9 Ekim 2026 tarihli birinci taraf duyuru. Deno runtime için bir yıl, Deno Deploy için altı ay verilen süre burada açıklanıyor."
  - label: "Cloudflare resmi duyurusu, Deno ve workerd birleşimi"
    url: "https://blog.cloudflare.com/deno-joins-cloudflare/"
    note: "Cloudflare’ın Workers, Durable Objects, celld ve self-hosting planını anlattığı duyuru."
  - label: "Hacker News tartışması"
    url: "https://news.ycombinator.com/item?id=50019911"
    note: "Haber 1.338 puan ve yüzlerce yorumla aynı hafta içinde yoğun biçimde tartışıldı."
  - label: "Reddit r/programming tartışması"
    url: "https://www.reddit.com/r/programming/comments/1x23sn2/deno_is_joining_cloudflare/"
    note: "10 Ekim 2026 tarihli, Cloudflare’ın Deno ekibini alması ve runtime planı üzerine tartışma."
  - label: "TechCrunch haberi"
    url: "https://techcrunch.com/2026/10/10/cloudflare-acquires-deno-to-improve-its-workers-programming-model/"
    note: "10 Ekim 2026 tarihli teknoloji gazeteciliği kaynağı; finansal şartların açıklanmadığını belirtiyor."
  - label: "InfoQ ana haber akışı"
    url: "https://www.infoq.com/news/"
    note: "4-11 Ekim haftasındaki yazılım ve altyapı haberleri tarandı. Deno duyurusu için ayrı bir InfoQ haberi bulamadım."
---

Cloudflare’ın 9 Ekim 2026’da Deno ekibinin şirkete katıldığını duyurması, bu haftanın yazılım dünyasındaki en çok konuşulan haberlerinden biri oldu. Hacker News’te haber 1.338 puana ve yüzlerce yoruma ulaştı. r/programming’de de tartışma kısa sürede büyüdü. TechCrunch haberi 10 Ekim’de yayımladı. İlk bakışta bu, Cloudflare’ın JavaScript tarafında yaptığı başka bir ekip alımı gibi görünebilir. Deno’nun kendi duyurusunu okuyunca tablo daha sert: Deno runtime için bir yıl boyunca hata düzeltmeleri ve güvenlik güncellemeleri verilecek, sonrasında resmi geliştirme sona erecek. Deno Deploy ise altı ay daha çalışacak.

## Duyurunun sakin görünen kısmı

Deno’nun açıklamasında odak noktası, runtime’ın kapanmasından çok Cloudflare Workers programlama modelinin farklı ortamlarda çalıştırılabilir hâle getirilmesi. Ryan Dahl ve Deno ekibi, Cloudflare’ın `workerd` projesiyle Deno’nun `celld` projesini birleştirecek. `celld`, Workers ve Durable Objects fikrini kendi altyapısında çalıştırmak isteyenler için geliştirilen açık kaynak bir uygulama. Cloudflare’ın açıklamasına göre hedef, Workers ve Durable Objects modelini kendi sunucusunda çalıştırmayı daha kolay hâle getirmek.

Buradaki teknik fikir bana mantıklı geliyor. Bir uygulamanın hesaplama, kalıcı durum, kuyruk ve gerçek zamanlı iletişim ihtiyaçlarını ayrı servislerle kurmak yerine, bunları programlama modelinin parçası yapmak cazip. Cloudflare, Durable Objects’i tek iş parçacıklı JavaScript çalıştırma, WebSocket desteği ve yerel SQLite veritabanıyla birlikte anlatıyor. Deno tarafındaki `celld` ise bu fikrin Cloudflare ağı dışında dağıtılabilir bir biçimini hedefliyor.

Cloudflare’ın blog yazısında verilen örnek de bu yönde: her sohbet kanalı için bir Durable Object çalıştırmak, kanalın WebSocket bağlantılarını ve verisini aynı yerde tutmak, dağıtımı platforma bırakmak. Bu modelin ne kadar iyi çalışacağını burada deneyerek söyleyemem. Açıklama, üretimdeki maliyetleri, kapasite sınırlarını veya `celld` ile `workerd` birleşiminin ne zaman kullanılabilir olacağını henüz vermiyor.

## Deno adı kalıyor, ürünün yönü değişiyor

Haberin geliştiricileri rahatsız eden bölümü duyurunun sonunda yer alıyor. Deno runtime bir yıl boyunca aylık sürümlerle hata ve güvenlik düzeltmeleri alacak. Bu sürenin sonunda Deno’nun resmi geliştirmesi duracak. Proje açık kaynak kalacak ve başka ekiplerin devam etmesine izin verilecek. Deno Deploy için verilen süre altı ay. Cloudflare, ücretli müşterilere Cloudflare Workers’a geçiş desteği sağlayacağını söylüyor.

Bu ayrıntı, “Deno Cloudflare’a katıldı” başlığını eksik bırakıyor. Cloudflare aslında Deno’nun bağımsız runtime ürününü büyütme sözü vermiyor. Deno ekibinin deneyimini, `celld` kodunu, `rusty_v8` desteğini ve `workerd` tarafındaki self-hosting çalışmasını kendi platform stratejisine taşıyor. Deno markası ve runtime topluluğu ise başka bir döneme bırakılıyor.

Bana kalırsa bu, açık kaynak geliştiriciler için anlaşılır bir ticari karar olsa da kullanıcı tarafında güven problemi yaratıyor. Deno’yu seçen bir ekip, API’leri Node.js uyumluluğuyla birlikte düşünmüş olabilir. İzin sistemi, TypeScript desteği, tek dosyalık çalıştırılabilir dosyalar veya Deno’nun araç zinciri için yatırım yapmış olabilir. Bu ekiplerin önünde artık iki ayrı karar var: mevcut Deno kodunu bir yıl içinde başka bir runtime’a taşımak ya da topluluğun projeyi sürdürmesini beklemek.

Deno’nun açık kaynak kalması teknik olarak bir çıkış yolu bırakıyor. Fakat düzenli sürüm, güvenlik takibi, paket ekosistemi ve dokümantasyon olmadan açık kaynak lisansı tek başına devamlılık sağlamıyor. Hacker News tartışmasındaki sert tepkinin nedeni de bu. İnsanlar yalnızca bir ürünün kapanmasından söz etmiyor. Bir şirketin geliştirdiği runtime’a güvenerek mimari karar vermenin maliyetini tartışıyor.

## Cloudflare’ın kazandığı şey runtime değil, model

Cloudflare’ın kazancı burada Deno’nun mevcut kullanıcı sayısından ibaret görünmüyor. Şirket, Workers fikrini kendi ağına bağlı bir hizmet olmaktan çıkarıp farklı ortamlarda çalıştırılabilen bir altyapı modeline dönüştürmeye çalışıyor. Bu yaklaşım, Cloudflare’ın “platforma kilitlenme” eleştirisine de doğrudan cevap veriyor. Cloudflare blogu, `workerd`’in açık kaynak olduğunu ve `celld` ile birlikte self-hosting deneyimini iyileştirmek istediğini vurguluyor.

Burada ikna olduğum nokta şu: Workers ve Durable Objects’in kendi sunucusunda çalışması, Cloudflare için kısa vadede saf bir kayıp anlamına gelmeyebilir. Geliştiriciler önce açık kaynak runtime’ı deneyip daha sonra yönetilen Cloudflare hizmetlerine geçebilir. Ürün böyle bir giriş kapısı hâline gelebilir. Cloudflare’ın bu hesabının gerçekten karşılık bulup bulmayacağını ise bugünkü duyurudan çıkaramayız.

Tereddüdüm başka yerde. Cloudflare, Deno runtime’ın bağımsız geleceğini bitirirken açık ve taşınabilir altyapı vaadi kuruyor. Bu iki mesaj yan yana duruyor ama birbirini otomatik olarak doğrulamıyor. `workerd` ve `celld` açık kaynak kalabilir, fakat çevresindeki servisler, API’ler ve ticari teşvikler geliştiriciyi yine Cloudflare’a yaklaştırabilir. “Escape hatch” olarak anlatılan şeyin ne kadar gerçek olduğunu, kodun başka bir sağlayıcıda ne kadar az değişiklikle çalışacağı gösterecek.

Bu yüzden haberi Deno’nun öldüğü şeklinde okumuyorum. Deno runtime’ın resmi geliştirmesi için verilen bir yıllık süre gerçek. Deno Deploy için altı aylık süre de gerçek. Aynı anda Cloudflare, Deno ekibinin `celld` deneyimini `workerd` ile birleştirerek dağıtık uygulamalar için yeni bir açık kaynak çalışma zamanı kurmaya hazırlanıyor. Benim için haftanın asıl haberi bu ikisinin birlikte duyurulması: Bir runtime’ın yönü kapanırken, arkasındaki programlama modeli daha büyük bir platformun içine taşınıyor.
