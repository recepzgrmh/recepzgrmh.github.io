---
title: "Hollanda’nın DAWO projesi Windows’tan daha büyük bir karar"
description: "Hollanda’nın DAWO projesi, NixOS tabanlı bir masaüstünden fazlasını kuruyor: devletin yazılım bağımlılığını yeniden tasarlıyor."
slug: "hollanda-dawo-nixos"
publishedAt: 2026-10-04
tags: ["NixOS","DAWO","açık kaynak","dijital egemenlik","Linux","kamu teknolojileri"]
category: "DevOps ve Tedarik Zinciri"
heroImage: "/blog/hollanda-dawo-nixos.jpg"
heroAlt: "Lacivert çerçeve içinde DAWO yazan resmî DAWO proje logosu"
featured: false
draft: false
sources:
  - label: "DAWO resmî sitesi"
    url: "https://dawo.community/en/"
    note: "DAWO’nun dijital özerklik, değiştirilebilir yapı taşları ve DAWO-NixOS açıklamaları."
  - label: "DAWO-NixOS resmî kamu kod deposu"
    url: "https://code.overheid.nl/MinBZK/DAWO-NixOS"
    note: "NixOS yapılandırması, modüler yapı, güvenlik ve CI dosyaları."
  - label: "Tweakers, 24 Eylül 2026"
    url: "https://tweakers.net/reviews/15334/nederland-maakt-soeverein-alternatief-voor-windows-en-office-op-basis-van-linux.html"
    note: "Projenin kapsamı, sekiz belediyedeki pilotlar, ICBR görevi, maliyet ve NixOS seçiminin arka planı."
  - label: "The Register, 28 Eylül 2026"
    url: "https://www.theregister.com/os-platforms/2026/09/28/dutch-government-turns-to-nixos-for-a-sovereign-desktop/5299501"
    note: "DAWO’nun resmî görevlendirilmesi, bileşenleri ve küçük ölçekli pilotları üzerine İngilizce haber."
  - label: "Hacker News, 25 Eylül 2026"
    url: "https://news.ycombinator.com/front?day=2026-09-25"
    note: "DAWO başlığının aynı hafta içindeki görünürlüğü ve yorum/puan sayısı."
  - label: "Reddit r/BuyFromEU, 24 Eylül 2026"
    url: "https://www.reddit.com/r/BuyFromEU/comments/1wp80ip/dutch_government_developing_a_sovereign_linux/"
    note: "Aynı hafta içindeki topluluk tartışması ve oy sayısı."
  - label: "GitHub Trending"
    url: "https://github.com/trending"
    note: "GitHub Trending kontrol edildi; DAWO deposunun bu sayfada ilgili hafta için doğrulanabilir bir trend kaydı bulunamadı."
---

24 Eylül 2026’da Tweakers, Hollanda hükümetinin Windows ve Microsoft 365’e alternatif olarak NixOS tabanlı bir çalışma ortamı geliştirdiğini yazdı. Haber birkaç gün içinde Hacker News ve Reddit’te büyük tartışma yarattı. Hacker News’te DAWO başlığı 1.019 puan ve 581 yorum gördü. Reddit’te aynı konuya açılan başlık 1.769 oy aldı. Bu rakamlar tek başına projenin hazır olduğu anlamına gelmiyor. İnsanların ilgisini çeken şey, bir devletin masaüstü seçimini lisans maliyetinden çıkarıp bağımlılık ve kontrol meselesi olarak ele almasıydı. ([tweakers.net](https://tweakers.net/reviews/15334/nederland-maakt-soeverein-alternatief-voor-windows-en-office-op-basis-van-linux.html))

Benim okuduğum kadarıyla burada haberin başlığı sık sık yanlış yere oturuyor. Hollanda yeni bir Linux dağıtımı yazmıyor. DAWO, “Digitaal Autonome Werkomgeving Overheid” adıyla, işletim sistemini ofis uygulamalarını, bulut servislerini, iletişim araçlarını ve yönetim bileşenlerini birlikte ele alan bir çalışma ortamı planı. Resmî DAWO sitesi de projeyi tek bir ürün yerine değiştirilebilir yapı taşlarından oluşan bir çalışma alanı olarak tanımlıyor. İşletim sistemi tarafında ise DAWO-NixOS, tekrarlanabilir bir iş istasyonu kurmak için kullanılıyor. ([dawo.community](https://dawo.community/en/))

Bu ayrım bence yazılım tarafında en fazla gözden kaçan nokta. Bir kurumun Windows yerine NixOS kurması teknik bir geçiş olurdu. DAWO’nun iddiası daha geniş: aynı yaklaşımı dosya paylaşımı, iletişim, bulut ve cihaz yönetimine taşımak. Resmî kod deposunda NixOS yapılandırmalarının flake tabanlı, modüler ve farklı rol türlerine göre ayrılabildiği görülüyor. Bu, “her bilgisayarı elle ayarlayalım” yaklaşımından farklı. Bir cihazın nasıl kurulacağını, hangi paketleri taşıyacağını ve hangi güvenlik kurallarının uygulanacağını kodla tarif etmeye çalışıyorlar. ([code.overheid.nl](https://code.overheid.nl/MinBZK/DAWO-NixOS))

NixOS’un burada seçilmesinin nedeni yalnızca Hollanda bağlantısı değil. Tweakers’ın aktardığına göre ekip önce openSUSE ve Fedora’yı değerlendirmiş, daha sonra NixOS’a geçmiş. Nix’in yapılandırma modeli, aynı sistem tanımını farklı cihazlara uygulamaya ve değişiklikleri geri almaya uygun. DAWO deposunda bunun izlerini görmek mümkün. Depoda donanım, ağ, kullanıcı, servis ve güvenlik yapılandırmaları ayrı modüller halinde tutuluyor. Bu yapı, büyük bir cihaz filosunda “hangi makinede ne var?” sorusuna daha denetlenebilir bir cevap verebilir. ([tweakers.net](https://tweakers.net/reviews/15334/nederland-maakt-soeverein-alternatief-voor-windows-en-office-op-basis-van-linux.html))

Burada benim net görüşüm şu: Kamu kurumları için yazılım bağımlılığını yalnızca sözleşme ve lisans düzeyinde konuşmak eksik kalıyor. Bir sağlayıcı hesabı kapattığında veya hizmet koşulları değiştiğinde neyin çalışmaya devam edeceğini bilmek de teknik bir kapasite meselesi. Hollanda’daki proje bu soruyu masaüstü bilgisayardan başlayarak soruyor. 2025’te ABD hükümetinin Uluslararası Ceza Mahkemesi’ne yönelik yaptırımları sonrasında Microsoft’un mahkeme başsavcısının bazı hizmetlere erişimini kapatması, Hollanda tarafında bu bağımlılık tartışmasını hızlandıran olaylardan biri olarak anlatılıyor. ([tweakers.net](https://tweakers.net/reviews/15334/nederland-maakt-soeverein-alternatief-voor-windows-en-office-op-basis-van-linux.html))

Yine de burada temkinli olmak gerekiyor. DAWO henüz genel kullanıma açılmış bir ürün değil. Tweakers, sekiz belediyenin bir uygulama incelemesine katıldığını ve ilk pilotların küçük ölçekte yürüdüğünü yazıyor. Hollanda hükümetindeki ICBR, temmuz ayında SSC-ICT, DICTU ve DUO-ICT’ye daha egemen bir dijital çalışma ortamı geliştirme görevi vermiş. Projenin geliştiricileri ise 1.0 sürümü için kesin bir tarih vermiyor. Haberde 2027 hedefinden söz ediliyor, fakat bu bir kamuya açıklanmış dağıtım takvimi değil. ([tweakers.net](https://tweakers.net/reviews/15334/nederland-maakt-soeverein-alternatief-voor-windows-en-office-op-basis-van-linux.html))

Bir başka tereddüdüm de “açık kaynak daha ucuzdur” varsayımı. DAWO ekibinden Bram Buijs ve Rutger Putter, Tweakers’a açık kaynağın daha az değil, farklı maliyet anlamına geldiğini söylüyor. Lisans faturası azalabilir ama bunun yerine kendi yöneticilerini, geliştiricilerini, barındırma kapasitesini ve açık kaynak projelerine katkıyı finanse etmek gerekir. Bu bana daha dürüst bir çerçeve gibi geliyor. Devlet, Microsoft’tan çıkınca bakım sorumluluğu ortadan kalkmıyor. Sorumluluğun kimde olduğu değişiyor. ([tweakers.net](https://tweakers.net/reviews/15334/nederland-maakt-soeverein-alternatief-voor-windows-en-office-op-basis-van-linux.html))

DAWO’nun yazılım geliştiriciler için ilginç tarafı, NixOS’un kendisinden çok yönetim modelinde. Bir kurumun işletim sistemi, ofis araçları ve cihaz politikaları aynı depoda tanımlanabiliyorsa, değişikliklerin gözden geçirilmesi ve izlenmesi kolaylaşabilir. Bu, geliştirici ekiplerinin günlük işine de benziyor: yapılandırma kodda tutuluyor, değişiklikler sürümleniyor, CI ile doğrulanıyor ve gerektiğinde önceki duruma dönülüyor. DAWO-NixOS deposunda Secure Boot, SBOM üretimi, CI kontrolleri ve otomatik güncelleme gibi konuların ayrı işler olarak ele alındığını gördüm. Bu hâlâ bir pilotun teknik altyapısı, üretimde kanıtlanmış bir kamu platformu değil. ([code.overheid.nl](https://code.overheid.nl/MinBZK/DAWO-NixOS))

Hollanda’nın yaptığı şey bu yüzden bana “Linux masaüstü geri dönüyor” haberinden daha somut geliyor. Devlet, kullandığı yazılımın hangi parçalardan oluştuğunu, bunların nasıl değiştirileceğini ve bir satıcıya ne kadar bağımlı olduğunu yeniden hesaplıyor. Sonucun başarılı olup olmayacağını bugün söylemek zor. Kullanıcı deneyimi, kurumsal uygulama uyumluluğu, destek kapasitesi ve siyasi devamlılık çözülmeden NixOS seçimi tek başına bir şey garanti etmiyor.

Benim için bu haftanın asıl haberi NixOS’un seçilmesi değil, bir hükümetin çalışma ortamını ürün satın alma kalıbından çıkarıp birlikte geliştirilecek bir platform olarak tarif etmesi. DAWO 1.0’a ulaşırsa, başka ülkelerin doğrudan kopyalayacağı bir dağıtımdan çok, kendi dijital bağımlılıklarını ölçmek için bakacağı bir referans olabilir. Şimdilik elimizde çalışan bir kamu standardı değil, kodu yayımlanmış ve küçük pilotlarla sınanan bir yön değişikliği var. Bu ayrımı korumak gerekiyor.
