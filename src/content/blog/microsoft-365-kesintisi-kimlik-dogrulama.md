---
title: "Microsoft 365 kesintisi, kimlik doğrulamayı tek arıza noktası yaptı"
description: "31 Ağustos 2026’da başlayan Microsoft 365 kesintisi, tek bir kimlik doğrulama yapılandırmasının Outlook’tan Copilot’a uzanan etkisini gösterdi."
slug: "microsoft-365-kesintisi-kimlik-dogrulama"
publishedAt: 2026-09-21
tags: ["Microsoft 365","Exchange Online","outage","kimlik doğrulama","bulut güvenilirliği"]
category: "DevOps ve Tedarik Zinciri"
heroImage: "/blog/microsoft-365-kesintisi-kimlik-dogrulama.jpg"
heroAlt: "Microsoft 365 logosu"
featured: false
draft: false
sources:
  - label: "Microsoft 365 servis sağlık durumu"
    url: "https://sdf.status.cloud.microsoft/"
    note: "Microsoft 365 hizmetlerinin güncel servis durumunu ve olay kayıtlarını gösteren resmi sayfa."
  - label: "TechCrunch, Microsoft 365 outage drags on, but things are improving"
    url: "https://techcrunch.com/2026/09/01/microsoft-365-outage-drags-on-but-things-are-improving/"
    note: "1 Eylül 2026 tarihli haber; Exchange Online ve diğer Microsoft 365 hizmetlerindeki çok günlük kesintiyi aktarıyor."
  - label: "Microsoft 365 outage tartışması, r/sysadmin"
    url: "https://www.reddit.com/r/sysadmin/comments/1w3i2nl/is_m365_outlook_down/"
    note: "31 Ağustos ve 1 Eylül 2026’da kullanıcıların Outlook ve Microsoft 365 erişim sorunlarını tartıştığı başlık."
  - label: "Microsoft 365 olay tartışması, r/sysadmin"
    url: "https://www.reddit.com/r/sysadmin/comments/1w3rkx1/rough_summer_for_microsoft/"
    note: "Microsoft’un kimlik doğrulama yapılandırması açıklamasının ve olay güncellemelerinin tartışıldığı başlık."
  - label: "Microsoft 365 olay çözüm özeti, NHSmail Support"
    url: "https://support.nhs.net/2026/07/microsoft-365-alert-service-degradation-microsoft-365-suite-users-may-experience-issues-when-utilizing-multiple-microsoft-365-services/"
    note: "Microsoft telemetrisi ve 3 Eylül 2026’daki çözüm bilgilerini özetleyen destek kaydı."
  - label: "Hacker News araması"
    url: "https://news.ycombinator.com/"
    note: "31 Ağustos ile 6 Eylül 2026 aralığında bu olayı doğrudan ele alan güçlü bir kayıt bulunamadı; aramalarda eski Microsoft ve Azure kesintileri öne çıktı."
  - label: "Reddit r/programming"
    url: "https://www.reddit.com/r/programming/"
    note: "Aynı tarih aralığında Microsoft 365 kesintisini doğrudan ele alan güçlü bir başlık bulunamadı."
  - label: "Reddit r/ExperiencedDevs"
    url: "https://www.reddit.com/r/ExperiencedDevs/"
    note: "Aynı tarih aralığında bu olayı doğrudan ele alan güçlü bir başlık bulunamadı."
  - label: "GitHub Trending"
    url: "https://github.com/trending"
    note: "Aynı tarih aralığında Microsoft 365 kesintisiyle doğrudan ilişkili belirgin bir trend deposu tespit edilmedi."
  - label: "The Verge"
    url: "https://www.theverge.com/"
    note: "31 Ağustos ile 6 Eylül 2026 aralığında bu olay için doğrulanabilir doğrudan haber kaydı bulunamadı."
  - label: "Ars Technica"
    url: "https://arstechnica.com/"
    note: "Aynı hafta Microsoft 365 kesintisine ilişkin doğrulanabilir doğrudan haber kaydı bulunamadı."
  - label: "InfoQ"
    url: "https://www.infoq.com/"
    note: "Aynı hafta Microsoft 365 kesintisine ilişkin doğrulanabilir doğrudan haber kaydı bulunamadı."
---

31 Ağustos 2026 Pazartesi günü Microsoft 365 kullanıcıları Outlook’ta e-posta gecikmeleri, başarısız oturum açmalar ve Exchange Online bağlantı sorunları yaşamaya başladı. Microsoft’un servis kaydına göre olay 15:08 UTC’de başladı. İlk açıklamada sorun, birden fazla Microsoft 365 hizmetinin kullandığı çekirdek bir kimlik doğrulama yapılandırmasına bağlandı. Kesinti birkaç saat içinde kapanmadı. 1 Eylül’de hâlâ bazı kullanıcılar etkileniyordu ve Microsoft, kalan altyapıya düzeltmeleri kademeli olarak uyguladığını bildirdi. ([techcrunch.com](https://techcrunch.com/2026/09/01/microsoft-365-outage-drags-on-but-things-are-improving/?utm_source=openai))

Bu hafta bu olayı seçmemin nedeni, arızanın Outlook ekranında başlayıp Microsoft 365’in başka parçalarına yayılması. Exchange Online, SharePoint, OneDrive, Teams, Copilot, Purview, Defender XDR ve yönetim merkezi farklı biçimlerde etkilenebildi. TechCrunch, Microsoft’un sorunu birden fazla servisin kullandığı kimlik doğrulama yapılandırmasındaki problem olarak açıkladığını aktardı. Reddit’teki sistem yöneticileri ise 1 Eylül boyunca hâlâ e-posta gönderme, alma ve Outlook erişimi sorunlarını tartışıyordu. ([techcrunch.com](https://techcrunch.com/2026/09/01/microsoft-365-outage-drags-on-but-things-are-improving/?utm_source=openai))

Benim için burada dikkat çekici olan, uygulamaların tek tek bozulması değil, ortak bir kontrol düzleminin arızalanması. Bir kullanıcı Outlook’a giremediğinde bunu e-posta sorunu sanabilir. Aynı kimlik doğrulama bileşenine bağlı Copilot istemleri, SharePoint aramaları veya Teams işlemleri de bozulduğunda bunun farklı ürünlerde yaşanan bağımsız hatalar olmadığını anlıyoruz.

## Microsoft’un açıkladığı sınır burada bitiyor

Microsoft, olayın nedenini “core authentication configuration” içindeki bir sorun olarak açıkladı. Bu ifade, arızanın hangi yapılandırma alanında veya hangi değişiklikten sonra oluştuğunu söylemiyor. Reddit’te bazı kullanıcılar süresi dolmuş bir sertifika ihtimalinden söz etti. Bu iddia Microsoft tarafından doğrulanmış görünmüyor. Bu yüzden ben sertifika teorisini olayın nedeni gibi yazmam. Şu anda güvenle söylenebilen şey, kimlik doğrulama yapılandırmasının birden fazla Microsoft 365 hizmetini etkilediği.

Microsoft’un 2 Eylül güncellemelerinde servis kullanılabilirliğinin etkilenen ortamlarda yüzde 99’un üzerine çıktığı, kalan senaryolar için düzeltmelerin uygulanmaya devam ettiği aktarıldı. 3 Eylül’de Microsoft 365’in daha önce etkilenen servislerinin sağlıklı kalması üzerine olayın çözüldüğü bildirildi. Bu tarihler, “Outlook açılmaya başladı” ile “olay tamamen kapandı” arasındaki farkı gösteriyor. ([reddit.com](https://www.reddit.com/r/sysadmin/comments/1w3i2nl/is_m365_outlook_down/?utm_source=openai))

Bana kalırsa Microsoft’un bu olaydaki en zayıf tarafı teknik arızadan önce iletişim katmanıydı. Kullanıcılar sorun yaşarken servis sağlık ekranının herkese açık olmaması, güncellemelerin farklı kanallarda parçalı görünmesi ve “mitigation actions are continuing to progress” gibi ifadelerin son kullanıcıya net bir durum vermemesi güveni azaltıyor. Bir şirketin karmaşık altyapısı olabilir. Kullanıcı yine de neyin bozuk olduğunu, neyin düzeldiğini ve hangi iş akışlarının hâlâ risk altında olduğunu bilmek istiyor.

## Ürün ekipleri bu olaydan ne almalı?

Ben bir Product Engineer olarak böyle bir kesintiden ilk önce bağımlılık haritasına bakarım. Bir uygulamanın giriş akışı Microsoft Entra ID’ye, iş verisi Microsoft Graph’a, dosyalar SharePoint’e ve iletişim Teams’e bağlıysa “Microsoft 365 çalışıyor mu?” sorusu fazla geniş kalır. Hangi isteklerin hangi kimlik sağlayıcısından token aldığını, hangi işlemlerin Exchange Online’a ihtiyaç duyduğunu ve kullanıcıya hangi hata mesajının gösterileceğini ayrı ayrı bilmek gerekir.

Bu olay bana iki tasarım kararını yeniden düşündürüyor. Birincisi, kritik bir iş akışı için tek sağlayıcının kimlik doğrulamasına tamamen güvenmek. İkincisi, sağlayıcı kesintisini uygulama seviyesinde ayırt edememek. Kullanıcıya genel bir 500 hatası göstermekle, “kimlik sağlayıcısına erişilemiyor, e-posta işlemi geçici olarak beklemeye alındı” demek aynı deneyim değil.

Burada bir karşı argüman var. Büyük kuruluşların her Microsoft 365 özelliği için ikinci bir sağlayıcı kurması pahalı ve operasyonel olarak karmaşık olabilir. Her ekip kendi yedek kimlik sistemini kuramaz. Buna katılıyorum. Yine de yedeklilik kararı almamak, bağımlılığı ortadan kaldırmıyor. Sadece onun maliyetini kesinti sırasında görünür hâle getiriyor.

Bu yazıyı hazırlarken Hacker News, r/programming, r/ExperiencedDevs ve GitHub Trending’de 31 Ağustos ile 6 Eylül arasına ait bu olayı doğrudan tartışan güçlü bir kayıt bulamadım. Hacker News aramalarında eski Microsoft ve Azure kesintileri öne çıktı. Reddit’te doğrudan geliştirici topluluklarından çok r/sysadmin ve r/MSP başlıkları görünüyordu. Haber tarafında TechCrunch’ın 1 Eylül yazısı, Microsoft servis kaydı ve aynı hafta içindeki yönetici tartışmaları aynı olayı doğruluyor. Bu yüzden “tüm geliştirici topluluklarında en çok konuşulan konu” iddiasını ölçülmüş bir veri gibi sunmuyorum. Seçimim, kontrol edilen kaynaklar içinde aynı hafta en az üç bağımsız kanalda tekrarlanan, gerçek bir üretim kesintisine dayanıyor.
