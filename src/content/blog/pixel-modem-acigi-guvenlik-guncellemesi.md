---
title: "Pixel modem açığı, güncelleme ekranının arkasını gösterdi"
description: "Google’ın CVE-2026-58704 için yayımladığı yama, telefon güvenliğinde modem katmanının neden ayrı izlenmesi gerektiğini gösterdi."
slug: "pixel-modem-acigi-guvenlik-guncellemesi"
publishedAt: 2026-09-24
tags: ["Google Pixel","CVE-2026-58704","Android güvenliği","zero-click","modem güvenliği"]
category: "Güvenlik"
heroImage: "/blog/pixel-modem-acigi-guvenlik-guncellemesi.jpg"
heroAlt: "Google Pixel Drop duyurusunu temsil eden pembe üç boyutlu grafik ve Google logosu"
featured: false
draft: false
sources:
  - label: "Google, Pixel Update Bulletin, September 2026"
    url: "https://source.android.google.cn/docs/security/bulletin/pixel/2026/2026-09-01?hl=en"
    note: "15 Eylül 2026 tarihli resmi bülten. CVE-2026-58704, modem bileşeni, yüksek önem derecesi, sınırlı ve hedefli istismar notu ve 2026-09-05 yama seviyesi burada yer alıyor."
  - label: "TechCrunch, Google says some Pixel phone owners were hacked in zero-day attacks"
    url: "https://techcrunch.com/2026/09/16/google-says-some-pixel-phone-owners-were-hacked-in-zero-day-attacks/"
    note: "16 Eylül 2026 tarihli haber. Modem açığının yetki yükseltme ve zero-click niteliği hakkında resmi bültendeki bilgileri aktarıyor."
  - label: "Reddit r/GooglePixel, Google Pixel phones exploited in targeted zero-day attack"
    url: "https://www.reddit.com/r/GooglePixel/comments/1wi3yld/google_pixel_phones_exploited_in_targeted_zeroday/"
    note: "16 Eylül 2026 tarihli kullanıcı tartışması. Güncellemenin sorunu çözdüğüne dair kullanıcı yorumları ve etkilenen modellerle ilgili belirsizlikler tartışılıyor."
  - label: "Reddit r/Android, Google confirms Pixel phones were exploited in targeted attack related to modem"
    url: "https://www.reddit.com/r/Android/comments/1wipa85/google_confirms_pixel_phones_were_exploited_in/"
    note: "17 Eylül 2026 tarihli tartışma. Zero-click ifadesinin saldırı koşulları bakımından nasıl yorumlandığı ve modem katmanının sınırları konuşuluyor."
  - label: "Hacker News, September 18, 2026 front page"
    url: "https://news.ycombinator.com/front?birth=ereiamjh&day=2026-09-18"
    note: "Aynı hafta geliştirici topluluğundaki görünürlüğü karşılaştırmak için kontrol edildi; Pixel açığı bu sayfada haftanın en yüksek görünürlüklü başlıkları arasında görünmüyor."
  - label: "GitHub Trending"
    url: "https://github.com/trending?spoken_language_code=en"
    note: "Aynı hafta güvenlik ve geliştirici araçlarının görünürlüğünü karşılaştırmak için kontrol edildi."
---

Google’ın 15 Eylül 2026 tarihli Pixel Update Bulletin’ını okurken ilk dikkatimi çeken şey CVE numarası olmadı. Duyurunun üst kısmındaki kısa not oldu: CVE-2026-58704 için sınırlı ve hedefli istismar işaretleri vardı. Aynı belgede açık, Pixel cihazlarının modem bileşeninde ve önem derecesi yüksek olarak listeleniyor. Google, 2026-09-05 veya daha yeni güvenlik yaması seviyesinin bu sorunu giderdiğini söylüyor. ([source.android.google.cn](https://source.android.google.cn/docs/security/bulletin/pixel/2026/2026-09-01?hl=en))

Bu bilgi 16 Eylül’de TechCrunch’ın haberiyle daha anlaşılır hale geldi. Habere göre sorun, modem sınırlarının dışına çıkıp telefonun daha geniş veri alanına erişim sağlayabilecek bir yetki yükseltme açığıydı. Saldırının kullanıcıdan tıklama veya dosya açma gibi bir işlem beklememesi de haberi “zero-click” kategorisine taşıdı. Google, saldırının arkasındaki kişi veya grubu açıklamadı. ([techcrunch.com](https://techcrunch.com/2026/09/16/google-says-some-pixel-phone-owners-were-hacked-in-zero-day-attacks/))

Burada küçük ama önemli bir ayrım var. “Zero-click” ifadesi, her Pixel sahibinin uzaktan ve zahmetsizce hedef alınabileceği anlamına gelmiyor. Açığın resmi kaydı modem bileşenini ve yetki yükseltmeyi işaret ediyor. Güvenlik araştırmacılarının paylaştığı değerlendirmelerde CVE’nin ağ komşuluğu gerektirebileceği, yani saldırganın cihazla aynı Wi-Fi veya Bluetooth çevresinde bulunmasının gerekebileceği tartışıldı. Bu ayrıntı, saldırının kapsamını değiştiriyor. Google’ın yayımladığı bültende saldırı yöntemi ve hedef cihaz listesi verilmediği için burada kesin bir tehdit profili çizmek mümkün değil.

## Modem neden uygulama gibi güncellenmiyor?

Bir uygulama açığı konuşulduğunda geliştiricinin aklına genellikle sürüm, bağımlılık ve dağıtım kanalı geliyor. Modem tarafında tablo daha kapalı. Bu katman, telefonun hücresel bağlantısını yöneten düşük seviyeli yazılım ve güvenlik güncellemelerinde çoğu zaman uygulama mağazasında gördüğümüz bir değişiklik günlüğü kadar ayrıntılı görünmüyor. Google’ın bülteninde CVE-2026-58704 “Modem” alt bileşeninde, yüksek önem derecesine sahip bir yetki yükseltme açığı olarak yer alıyor. Açığın teknik düzeltmesi kamuya açık bir kod değişikliği olarak sunulmamış. ([source.android.google.cn](https://source.android.google.cn/docs/security/bulletin/pixel/2026/2026-09-01?hl=en))

Bu yüzden Android telefonlarda “güncelim” cümlesini kurarken hangi katmanın güncellendiğini de bilmek gerekiyor. Pixel Update Bulletin, güvenlik yaması seviyesinin 2026-09-05 veya daha ileri bir tarihte olmasını istiyor. Google ayrıca cihaz firmware görüntülerinin geliştirici sitesinde bulunduğunu belirtiyor. Kullanıcı tarafında yapılacak kontrol basit: Ayarlar içindeki güvenlik yaması tarihine bakmak. Fakat kurumsal cihaz filolarında kontrol bununla bitmiyor. Güncellemenin gerçekten hangi modele dağıtıldığını, operatör kanalında bekleyip beklemediğini ve cihazın değiştirilmiş firmware kullanıp kullanmadığını ayrıca doğrulamak gerekiyor. ([source.android.google.cn](https://source.android.google.cn/docs/security/bulletin/pixel/2026/2026-09-01?hl=en))

Benim açımdan haberin en rahatsız edici tarafı, CVE’nin yüksek önem derecesinden çok modem katmanının uygulama güvenlik modelinin dışında kalması. Bir uygulama sandbox içindeyse, saldırganın daha geniş sisteme geçmesi için birkaç sınırı aşması gerekir. TechCrunch’ın aktardığı senaryoda sorun doğrudan modemin sınırlarından telefonun daha geniş verilerine doğru ilerleyebilecek bir yetki yükseltme olarak anlatılıyor. Bu, “telefon güncel mi?” sorusunun yanında “telefonun bağlantı katmanı güncel mi?” sorusunu da gerekli kılıyor. ([techcrunch.com](https://techcrunch.com/2026/09/16/google-says-some-pixel-phone-owners-were-hacked-in-zero-day-attacks/))

## Yama yayımlandı, belirsizlik bitmedi

Google’ın açıklaması iki şeyi aynı anda yapıyor: Kullanıcıya güncelleme yolunu gösteriyor ve saldırının ayrıntılarını sınırlı tutuyor. Bu tercih anlaşılır. Saldırının hedefleri, istismar zinciri veya saldırganın kimliği paylaşılmadan önce mümkün olduğunca çok cihazın güncellenmesi istenmiş olabilir. Bana kalırsa bu, güvenlik duyurularında sık gördüğümüz “kullanıcıyı bilgilendirirken saldırı tarifini yayımlamama” dengesinin bir örneği.

Yine de bu yaklaşımın bir bedeli var. Hangi Pixel modellerinin gerçekten hedeflendiğini, istismarın modemden işletim sistemine hangi geçişle yapıldığını ve saldırının aynı ağ koşulunu gerektirip gerektirmediğini bilmiyoruz. Reddit’teki Pixel kullanıcıları tartışmasında birçok kişi güncellemenin sorunu çözdüğünü doğrulamaya odaklanırken, bazı kullanıcılar etkilenen modellerin açıklanmasını istedi. Bir başka tartışmada ise açığın “zero-click” olarak adlandırılmasının, genel internet üzerinden çalıştığı şeklinde yorumlanmaması gerektiği vurgulandı. ([reddit.com](https://www.reddit.com/r/GooglePixel/comments/1wi3yld/google_pixel_phones_exploited_in_targeted_zeroday/?utm_source=openai))

Bu hafta Hacker News, GitHub Trending, r/programming, r/ExperiencedDevs, TechCrunch, The Verge, Ars Technica ve InfoQ akışlarını da karşılaştırdım. Hacker News’te aynı tarihlerde Cloudflare Quick Tunnels, Android 17’nin AOSP dışında kalan API’leri ve yapay zekâ destekli saldırı haberleri daha yüksek görünürlük aldı. GitHub Trending’de de güvenlik araçları öne çıktı. Pixel açığı bu kanalların tamamında aynı yoğunlukta yer almadı. Buna rağmen resmi Google bülteni, TechCrunch haberi ve aynı hafta içindeki Reddit tartışmaları aynı olayı birbirinden bağımsız biçimde doğruluyor. Bu nedenle konuyu haftanın en görünür geliştirici haberi olarak değil, kullanıcı cihazlarını doğrudan ilgilendiren en somut güvenlik gelişmelerinden biri olarak seçtim.

Pixel kullanıyorsanız kontrol edilecek şey CVE numarasını ezberlemek değil, güvenlik yaması tarihidir. Cihaz 2026-09-05 veya daha yeni bir yamayı göstermiyorsa güncelleme durumunu bugün kontrol etmek mantıklı. Root edilmiş, alternatif firmware kullanan veya güncellemeleri operatör üzerinden alan cihazlarda bu kontrolün sonucu ayrıca doğrulanmalı. Burada emin olmadığım nokta, Google’ın daha sonra paylaşacağı teknik ayrıntıların saldırının gerçek erişim koşullarını ne kadar değiştireceği. Şimdilik eldeki en sağlam bilgi şu: Google açığı yamadı, sınırlı ve hedefli istismar işaretleri bildirdi, fakat saldırının nasıl çalıştığını ayrıntılı biçimde açıklamadı. ([source.android.google.cn](https://source.android.google.cn/docs/security/bulletin/pixel/2026/2026-09-01?hl=en))
