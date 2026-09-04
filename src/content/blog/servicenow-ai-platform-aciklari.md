---
title: "ServiceNow AI Platform'ında dört açık neden alarm yarattı"
description: "ServiceNow, AI Platform ve Now Platform için dört güvenlik açığını yamaladı. Üçü CVSS 10.0 aldı ve bazı senaryolarda kimlik doğrulama istemiyor."
slug: "servicenow-ai-platform-aciklari"
publishedAt: 2026-09-03
tags: ["ServiceNow", "AI Platform", "siber güvenlik", "CVE", "kurumsal yazılım"]
category: "Güvenlik"
heroImage: "/blog/servicenow-ai-platform-aciklari.png"
heroAlt: "CVSS 10.0 alan üç açığın paylaştığı erişim vektörü."
featured: false
draft: false
sources:
  - label: "ServiceNow, August 2026 CVE Advisory Notification, resmi güvenlik duyurusu"
    url: "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB3152242"
    note: "27 Ağustos 2026 tarihli resmi advisory. Dört CVE, etkilenen sürümler ve düzeltme bilgileri burada."
  - label: "The Hacker News, ServiceNow güvenlik açıkları haberi"
    url: "https://thehackernews.com/2026/08/three-cvss-100-servicenow-flaws-could.html"
    note: "28 Ağustos 2026 tarihli bağımsız teknoloji güvenliği haberi. CVE ayrıntıları, CVSS vektörleri ve istismar durumu aktarılıyor."
  - label: "NHS England Digital, siber uyarı CC-4839"
    url: "https://digital.nhs.uk/cyber-alerts/2026/cc-4839"
    note: "28 Ağustos 2026 tarihli kamu kurumu uyarısı. Açıkların etkilerini ve ServiceNow'un patch eşiklerini özetliyor."
  - label: "Reddit tartışması, r/TechNadu"
    url: "https://www.reddit.com/r/TechNadu/comments/1w1m3jj/servicenow_patches_three_cvss_100_ai_platform/"
    note: "Aynı hafta içinde geliştirici ve güvenlik topluluklarında görülen tartışma. Self-hosted kurulumlar ve patch uygulama pratiği konuşuluyor."
---

ServiceNow'un 27 Ağustos 2026 tarihli güvenlik duyurusu, AI Platform'ın birkaç farklı katmanında aynı anda sorun bulunduğunu ortaya çıkardı. Dört açık için yama yayımlandı. Bunların üçü ServiceNow tarafından CVSS 10.0 olarak derecelendirildi. Bazı saldırı senaryolarında kimlik doğrulaması gerekmiyor.

İlk okumada bu, yüksek skorlu bir güvenlik duyurusu gibi görünüyor. Detaylara girince daha somut bir tablo çıkıyor: sorunlar GraphQL Composite Data API, sistem yapılandırması için kullanılan görsel yükleme işlemcisi ve dinamik şema sorguları üzerinden çalışan SQL katmanına uzanıyor. Dördüncü açık ise Now Platform içindeki sandbox mekanizmasıyla ilgili.

Benim dikkatimi çeken nokta, açıkların tek bir özelliğe sıkışmaması oldu. ServiceNow AI Platform, iş akışları, veriler ve otomasyonlar arasında köprü kuran bir yapı olarak konumlanıyor. Böyle bir üründe API katmanı, dosya işleme ve veritabanı sorguları birbirinden bağımsız parçalar gibi çalışmıyor. Birindeki hata, uygulamanın tuttuğu veriye ve yaptığı işlemlere erişim sınırlarını değiştirebiliyor.

## Duyurudaki dört CVE aynı şeyi söylemiyor

CVE-2026-18885, ServiceNow AI Platform içindeki GraphQL Composite Data API ile ilişkili bir kod enjeksiyonu açığı. ServiceNow'un açıklamasına göre kimliği doğrulanmamış bir kullanıcı, bazı koşullarda platform içinde kod çalıştırabilir ve amaçlanandan daha geniş biçimde örnek verilerine erişebilir ya da bu verileri değiştirebilir.

CVE-2026-18886, sistem yapılandırmasındaki görsel yükleme işlemcisiyle ilişkili bir erişim kontrolü hatası. Buradaki risk, örnek verilerinin oluşturulması veya değiştirilmesi ve bunun sonucunda ayrıcalık yükseltilmesi.

CVE-2026-74820 ise dinamik şema sorgusundaki `ORDER BY` bölümünden ulaşılabilen bir SQL enjeksiyonu. Açıklamadaki etki, temel veritabanında keyfi SQL ifadeleri çalıştırabilmek ve örnek verilerini okuyabilmek ya da değiştirebilmek.

CVE-2026-6876'nın puanı 8.7. Bu açık Now Platform'daki sandbox sınırlarıyla ilgili ve kimliği doğrulanmamış bir kullanıcının platform içinde kod çalıştırmasına yol açabiliyor. Burada küçük ama kayda değer bir belirsizlik var: ServiceNow açıklamasında kimlik doğrulaması olmayan kullanıcıdan bahsedilirken, CVSS vektöründe düşük ayrıcalık gerektiği görülüyor. Bu yüzden bu açığı diğer üçüyle aynı saldırı koşuluna koymak doğru olmaz.

**CVSS 10.0 ifadesini tek başına saldırı kanıtı gibi okumamak gerekiyor.** The Hacker News'in aktardığı bilgilere göre ServiceNow, dört açık için de aktif istismar bildiğini söylemedi. Üç yeni açık için kamuya açık bir exploit kodu da 28 Ağustos itibarıyla bulunmuyordu. Bu iyi haber, fakat yamayı ertelemek için gerekçe değil.

## Barındırılan örnekle kendi yönettiğin örnek aynı durumda değil

ServiceNow, barındırılan örneklere güvenlik güncellemesini kendisinin uyguladığını ve partnerlerle self-hosted müşterilere de güncellemeleri verdiğini açıkladı. Bu ayrım, duyurunun pratik tarafını belirliyor. Kendi örneğini veya partner üzerinden yönetilen bir kurulumu kullanan ekip, ServiceNow'un düzeltmeyi hazırlamış olmasına rağmen uygulama adımını kendisi takip etmek zorunda.

Etkilenen sürüm aralıkları arasında Xanadu, Yokohama, Zurich ve Australia bulunuyor. Duyuruda her sürüm için farklı patch ve hotfix eşikleri listelenmiş. Bu nedenle “ServiceNow güncel” ifadesi tek başına yeterli değil. Kullanılan sürüm ailesiyle birlikte ilgili patch seviyesini kontrol etmek gerekiyor.

Ben olsam kontrolü yalnızca sürüm numarasıyla sınırlamazdım. Değişiklik kaydı, örnek yapılandırması ve güncelleme sonrası regresyon testleri de aynı işin parçası olurdu. Özellikle GraphQL çağrıları, dosya yükleme akışı ve AI Platform'ın veritabanına erişen bölümleri için olağandışı kayıtları gözden geçirmek mantıklı. Bu, saldırı yaşandığı anlamına gelmez. Ön duyuru öncesi erişim olup olmadığını anlamaya yardımcı olabilecek bir inceleme olur.

Burada emin olmadığım bir konu var: Kamuya açık kaynaklarda bu dört yeni açığın gerçek ortamlarda kullanıldığına dair doğrulanmış bir kayıt göremedim. ServiceNow'un kendi ifadesi de istismar fark etmediği yönünde. Buna rağmen CVSS vektöründeki `AV:N/AC:L/PR:N/UI:N` değerleri, ağ üzerinden düşük karmaşıklıkla ve ayrıcalık gerektirmeden ulaşılabilen senaryolar tarif ediyor. Benim görüşüm, “henüz istismar edilmedi” cümlesinin bu tür bir ürün için rahatlatıcı bir kapanış olarak kullanılmaması gerektiği.

## AI özellikleri büyüdükçe eski giriş noktaları yeniden önem kazanıyor

Bu duyuruyu AI Platform etiketi yüzünden ilginç buldum. Açıkların hiçbiri model davranışıyla ilgili değil. Sorunlar, daha alışık olduğumuz uygulama güvenliği yüzeylerinde ortaya çıkıyor: API işleme, erişim kontrolü, dosya kabulü ve SQL sorguları.

AI özellikleri mevcut bir kurumsal platforma eklendiğinde güvenlik sınırı model çağrısından ibaret kalmıyor. Ajanların veri okuması, iş akışı başlatması veya yapılandırma değiştirmesi için bağlandığı servisler de aynı zincire dahil oluyor. ServiceNow duyurusundaki dört CVE, bu zincirin en gösterişli bölümünün model değil, modelin dokunduğu eski uygulama katmanları olabileceğini gösteriyor.

Bu olaydan çıkaracağım pratik ders basit: ServiceNow kullanan ekipler önce resmi advisory içindeki sürüm eşiklerini kontrol etmeli, ardından barındırma modelini netleştirmeli. Self-hosted veya partner tarafından yönetilen örneklerde güncelleme sorumluluğu gerçekten kimin üzerinde, bunu yazılı olarak doğrulamak gerekir.

Bir de CVSS puanlarını bağlamından koparmamak gerekiyor. Üç açık 10.0 olarak derecelendirilmiş olsa da etki, kurulumun hangi API'leri dışarı açtığına, ağ erişimine ve platform yapılandırmasına göre değişebilir. Benim için bu duyurunun en önemli tarafı, “AI güvenliği” diye ayrı bir kategori ararken klasik web güvenliği kontrollerini gözden kaçırmanın ne kadar kolay olduğunu göstermesi.
