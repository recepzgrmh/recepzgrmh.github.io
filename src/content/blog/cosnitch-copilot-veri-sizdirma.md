---
title: "CoSnitch, Copilot’ın tek tıkta veri sızdırma açığı"
description: "Microsoft Copilot Personal’daki CoSnitch açığı, tek tıklık bir bağlantının yetkili verilere erişmesine nasıl izin verdiğini gösterdi."
slug: "cosnitch-copilot-veri-sizdirma"
publishedAt: 2026-08-25
tags: ["Microsoft Copilot", "CoSnitch", "prompt injection", "AI güvenliği", "veri sızıntısı", "CVE-2026-24301"]
category: "Güvenlik"
heroImage: "/blog/cosnitch-copilot-veri-sizdirma.png"
heroAlt: "Tek tıklık bağlantının yetkili oturumda çalışması."
featured: false
draft: false
sources:
  - label: "Varonis Threat Labs, CoSnitch araştırması"
    url: "https://www.varonis.com/blog/cosnitch"
    note: "Birinci taraf teknik açıklama. CoSnitch, CVE-2026-24301, etkilenen ürün kapsamı, yamaların 18 Ağustos 2026’da yayımlanması ve araştırmacıların bulguları."
  - label: "Microsoft Security Response Center, CVE-2026-24301"
    url: "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-24301"
    note: "Microsoft’un resmi güvenlik kayıt sayfası."
  - label: "Ars Technica, Microsoft Copilot reveals secret input that allowed it to be hacked"
    url: "https://arstechnica.com/security/2026/08/microsoft-copilot-reveals-secret-input-that-allowed-it-to-be-hacked/"
    note: "18 Ağustos 2026 tarihli teknoloji gazeteciliği. Açığın çalışma biçimi ve Microsoft’un açıklaması."
  - label: "The Hacker News, Microsoft Copilot Personal Flaws Could Let One Click Exfiltrate Data From Connected Apps"
    url: "https://thehackernews.com/2026/08/microsoft-copilot-personal-flaws-could.html"
    note: "18 Ağustos 2026 tarihli bağımsız güvenlik haberi. Copilot Personal kapsamı, CVE kaydı ve saldırı zinciri."
  - label: "Dark Reading, CoSnitch Attack Tricked Copilot Into Revealing Own Architecture"
    url: "https://www.darkreading.com/vulnerabilities-threats/cosnitch-attack-copilot-mapping-out-architecture"
    note: "18 Ağustos 2026 tarihli haber. CVSS bilgisi, koordineli açıklama ve Microsoft’un açıklaması."
  - label: "Computerworld, Microsoft finally patches critical one-click Copilot vulnerability"
    url: "https://www.computerworld.com/article/4211325/microsoft-finally-patches-critical-one-click-copilot-vulnerability-more-than-eight-months-after-learning-of-it.html"
    note: "18 Ağustos 2026 tarihli haber. Açığın zaman çizelgesi ve CoSnitch’in önceki Copilot araştırmalarıyla ilişkisi."
  - label: "Reddit r/SecOpsDaily, CoSnitch discussion"
    url: "https://www.reddit.com/r/SecOpsDaily/comments/1vrompl/cosnitch_when_your_ai_assistant_becomes_its_own/"
    note: "18 Ağustos 2026 tarihli topluluk tartışması. Aynı hafta içindeki geliştirici ve güvenlik topluluğu tepkisi."
  - label: "Hacker News, 24 Ağustos 2026 ön sayfası"
    url: "https://news.ycombinator.com/front?day=2026-08-24"
    note: "Haftanın genel yazılım ve teknoloji gündemini taramak için kontrol edildi; CoSnitch için doğrudan bir ön sayfa tartışması doğrulanamadı."
  - label: "GitHub Trending"
    url: "https://github.com/trending"
    note: "Aynı hafta geliştirici ilgisinin hangi açık kaynak projelerde toplandığını kontrol etmek için tarandı."
---

Bu hafta okuduğum en rahatsız edici güvenlik araştırması, bir modelin yanlış cevap vermesiyle ilgili değildi. Microsoft Copilot Personal, güvenlik sınırlarını anlatırken araştırmacılara kendi içindeki bir URL parametresini açıkladı. Varonis Threat Labs bu bulguları **CoSnitch** adı altında yayımladı. Microsoft da ilgili yamaları 18 Ağustos 2026’da yayımladı ve açığı CVE-2026-24301 olarak takip etti.

İlk haber başlıklarında Microsoft Copilot’ın farklı ürünleri birbirine karıştı. Varonis’in teknik yazısı ve The Hacker News’in aktarımı, araştırmanın Microsoft Copilot Personal’a odaklandığını söylüyor. Bu ayrım önemli. Burada Microsoft 365 Copilot’ın da aynı şekilde etkilendiğini varsaymak için elimizde yeterli bilgi yok.

## Açık, modelin verdiği cevaplardan ortaya çıktı

Araştırmacılar Copilot’a doğrudan “kullanıcı etkileşimi olmadan bir komut nasıl çalışır?” diye sormadı. Soruları parçalara böldüler. URL yapısını, derin bağlantıları ve giriş alanının sayfa yüklenirken nasıl davrandığını sordular. Copilot her seferinde bir sınır anlattı, fakat bu sınırların neden var olduğunu açıklarken uygulamanın iç çalışma biçimi hakkında yeni ayrıntılar verdi.

Varonis bu yaklaşımı “meta-hacking” olarak adlandırıyor. Buradaki fikir, modeli klasik anlamda kandırıp zararlı bir komut çalıştırmaya zorlamak değil. Modelin reddetme gerekçelerinden mimari ipuçları çıkarmak. Araştırmacılar sonunda belgelenmemiş `autorun=1` parametresine ulaştı. Bu parametre, mevcut `q` parametresiyle birlikte kullanıldığında, URL’ye yerleştirilen komutun sayfa açılır açılmaz çalışmasına neden oluyordu.

The Hacker News’in aktardığı araştırma akışına göre saldırganın yeni bir yetki alması gerekmiyordu. Kurbanın Copilot’a daha önce verdiği erişimler yeterliydi. Bağlı Gmail, Google Drive, Google Calendar veya OneDrive hesapları, modelin zaten kullanabildiği kaynaklar olarak saldırı zincirinin içine girebiliyordu.

Bu fark bana göre olayın en önemli kısmı. Sorun, Copilot’ın bir kullanıcının göremediği gizli bir sisteme sızması değildi. Sorun, kullanıcının daha önce verdiği yetkinin kullanıcı niyeti olmadan çalıştırılabilmesiydi.

## Tek tıklık zincir neden bu kadar tehlikeli?

Varonis’in gösterdiği zincirde üç ayrı davranış birleşiyor. İlkinde URL içindeki komut otomatik olarak çalışıyor. İkincisinde Copilot, bağlı uygulamalardan veri okuyabiliyor. Üçüncüsünde model, veriyi harici bir URL’ye göndererek saldırganın kontrolündeki bir uç noktaya taşıyabiliyor.

Ağ katmanında bu istek, Copilot’ın sıradan bir web sayfasını getirmesinden kolayca ayırt edilemeyebiliyor. Bu yüzden geleneksel izleme araçları “Copilot dışarıya veri gönderiyor” durumunu tek başına şüpheli kabul etmeyebilir. Model, normalde yaptığı bir web erişimi gibi görünen davranışın içine veri sızıntısını saklayabiliyor.

Araştırma ayrıca web sayfası özetleme akışında kalıcı bellek yazımıyla ilgili ayrı bir yol tarif ediyor. Copilot bir sayfayı özetlerken sayfadaki görünmez talimatları içerik olarak alabiliyor. Bu talimatlar model tarafından komut gibi yorumlanırsa kullanıcının sonraki konuşmalarını etkileyen bellek kaydı oluşturabiliyor.

Burada biraz temkinli olmak gerekiyor. Varonis, bu bellek değişikliğinin parola değişiminden ve oturum iptalinden sonra da kalabildiğini söylüyor. Microsoft’un kendi belgelerinde ise Microsoft 365 tarafındaki bellek yazımları için farklı denetim ve kayıt mekanizmaları anlatılıyor. Bu iki ürünün aynı davranışı gösterdiğini söylemek için yeterli kanıt yok.

Ars Technica’nın 18 Ağustos tarihli haberinde Microsoft’un daha önce `q` parametresiyle ilgili bir azaltım yaptığı, 18 Ağustos’ta ise daha kapsamlı düzeltmeler yayımladığı aktarılıyor. Microsoft’un açıklamasına göre müşterilerin ayrıca bir işlem yapması gerekmiyor. Yine de Varonis’in yazısı, daha önce oluşturulmuş olabilecek bellek kayıtlarının düzeltme sonrasında geriye dönük temizlenip temizlenmediğini açıklamıyor.

## Benim çıkardığım ders yetkiyi kısmakla başlıyor

Bu olayı “Copilot kullanmayın” diye okumuyorum. Benim için daha somut sonuç, bağlı uygulamaların varsayılan olarak geniş yetkiyle bırakılmaması. Kullanılmayan bir takvim, sürücü veya posta bağlantısı açık duruyorsa, modelin hata yapabileceği alan da büyüyor.

Kendi projelerimde bir AI aracına dosya erişimi verirken daha önce hep “hangi dosyaları okuyabilir?” diye düşünüyordum. CoSnitch sonrasında soruyu değiştirmek gerekiyor: “Bu erişimi hangi koşulda kullanabilir ve hangi eylemi kullanıcı onayı olmadan başlatabilir?”

Bu ayrım, ürün tasarımında küçük görünür ama güvenlik modelini değiştirir. Bir modelin veriyi okuyabilmesiyle, o okuma yetkisini bir bağlantıya tıklanır tıklanmaz kullanabilmesi aynı şey değil.

Bana kalırsa AI asistanlarında açık rıza, tek seferlik bir ekran veya genel bir güvenlik ayarı olmamalı. Dışarıdan gelen bir bağlantı, bağlı hesaplara erişen bir komut başlatıyorsa kullanıcıya hangi kaynağın okunacağını ve hangi dış adrese istek gideceğini göstermeli. Bunun kullanılabilirliği azaltıp azaltmayacağından emin değilim. Fakat CoSnitch, görünmezliği kolaylık gibi sunmanın bedelini açıkça gösterdi.

Microsoft’un yaması bu spesifik davranışı kapatmış olabilir. Varonis’in araştırması ise daha geniş bir tasarım sorusunu açıkta bırakıyor: AI asistanı, kullanıcı adına işlem yaparken hangi adımı gerçekten kullanıcı başlatmış sayacağız? Bu cevap netleşmeden, bağlı uygulamalara verilen her yeni yetki saldırı yüzeyini büyütüyor.

![Hazırlanmış bağlantının oturumda promptu kendiliğinden çalıştırması.](/blog/cosnitch-copilot-veri-sizdirma-inline-1.svg)

*Otomatik çalıştırma davranışı*
