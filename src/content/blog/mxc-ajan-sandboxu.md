---
title: "Microsoft MXC, ajanların çalışacağı sınırı işletim sistemine koyuyor"
description: "Microsoft Execution Containers, yapay zekâ ajanlarını dosya, ağ ve oturum sınırları içinde çalıştırmayı hedefliyor. İlk izlenimim: mesele modelden çok yetki."
slug: "mxc-ajan-sandboxu"
publishedAt: 2026-10-14
tags: ["Microsoft Execution Containers","MXC","yapay zekâ ajanları","sandbox","Windows 11","güvenli kod çalıştırma"]
category: "Güvenlik"
heroImage: "/blog/mxc-ajan-sandboxu.jpg"
heroAlt: "Windows hibrit zekâ, NVIDIA RTX Spark ve Microsoft Execution Containers duyurularını gösteren Microsoft kolaj görseli"
featured: false
draft: false
sources:
  - label: "Microsoft Windows Developer Blog, Microsoft Execution Containers duyurusu, 7 Ekim 2026"
    url: "https://blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/"
    note: "MXC’nin genel kullanılabilirliği, politika modeli ve process, session, WSL ve MicroVM arka uçları."
  - label: "Microsoft Windows Experience Blog, Building Windows for hybrid intelligence, 7 Ekim 2026"
    url: "https://blogs.windows.com/windowsexperience/2026/10/07/building-windows-for-hybrid-intelligence/"
    note: "MXC’nin Windows 11, Agent 365 ve yerel ajan stratejisindeki konumu."
  - label: "Microsoft, MXC GitHub deposu"
    url: "https://github.com/microsoft/mxc"
    note: "SDK’lar, politika tabanlı izolasyon modeli ve desteklenen çalışma arka uçları."
  - label: "Ars Technica, Microsoft event debuts new AI-friendly hardware and Windows changes, 8 Ekim 2026"
    url: "https://arstechnica.com/gadgets/2026/10/microsoft-event-debuts-new-ai-friendly-hardware-and-windows-changes/"
    note: "Microsoft etkinliğinin ve MXC’nin teknoloji basınındaki aktarımı."
  - label: "Hacker News, 9 Ekim 2026 ön sayfası"
    url: "https://news.ycombinator.com/front?day=2026-10-09"
    note: "MXC GitHub gönderisi aynı hafta 196 puan ve 85 yorumla ilk 20 hikâye içinde yer aldı."
  - label: "Reddit r/technology, Microsoft ve NVIDIA Surface Laptop Ultra paylaşımı"
    url: "https://www.reddit.com/r/technology/comments/1x0ap6r/microsoft_and_nvidia_launch_surface_laptop_ultra/"
    note: "Aynı 7 Ekim haftasında Windows ajan özellikleri ve MXC çevresindeki topluluk tartışması. r/programming ve r/ExperiencedDevs içinde MXC başlığına rastlamadım."
---

7 Ekim 2026’da Microsoft, **Microsoft Execution Containers** için genel kullanılabilirlik duyurdu. Aynı hafta Windows 11, Surface Laptop Ultra ve NVIDIA RTX Spark etrafında konuşulan büyük paket içinde benim en çok takıldığım parça donanım olmadı. Ajanın komut çalıştırdığı, dosya okuduğu ve ağ bağlantısı açtığı anda hangi sınırın gerçekten geçerli olduğunu işletim sistemine bırakma fikriydi.

Microsoft’un Windows Developer Blog duyurusuna göre MXC, geliştiricinin bir ajanın erişebileceği dosyaları ve ağ hedeflerini tanımladığı, bu politikanın da çalışma zamanında uygulandığı bir yürütme katmanı. Politika ajanın kendi kontrolünde tutulmuyor. Model ürettiği kodla kendisine yeni yetki veremiyor. Bu ayrım kulağa basit geliyor, fakat bugün birçok yerel kod ajanında güvenlik davranışının önemli bölümü çalıştırıcıya, kabuk yapılandırmasına veya kullanıcının dikkatine kalıyor.

Aynı hafta konu Hacker News’te Microsoft’un `mxc` deposu üzerinden gündeme geldi. 9 Ekim tarihli listede MXC, 196 puan ve 85 yorumla ilk 20 hikâye arasındaydı. Ars Technica da 8 Ekim’deki Microsoft etkinliğini aktarırken MXC’yi Windows’un ajanlar için duyurduğu güvenlik çerçevesinin parçası olarak yazdı. GitHub deposu ise birkaç gün içinde yaklaşık 2.800 yıldız seviyesine geldi. Benim ölçümüm bilimsel bir popülerlik analizi değil, fakat gelişmenin aynı hafta içinde resmi duyurudan geliştirici topluluğuna ve teknoloji basınına taşındığı açık.

## MXC’nin yaptığı iş modelin kararını değiştirmek değil

Bir kod ajanına “bu projeyi güncelle” dediğinizde, modelin hangi dosyaları açacağı, hangi komutu çalıştıracağı ve dışarıya istek gönderip göndermeyeceği önceden tamamen belli olmayabilir. Ajan görevi tamamlamak için makul görünen bir yol seçebilir. Sorun, makul görünen yolun üretim yapılandırmasını değiştirmesi, gizli bir dosyayı okuması veya beklenmeyen bir adrese veri göndermesi olabilir.

MXC’nin yaklaşımı burada modeli daha akıllı hâle getirmek değil. Modelin ürettiği çıktıyı ve çağırdığı araçları bir çalışma alanına kapatmak. Microsoft’un verdiği örnekte ajan bir web sitesinin deposuna okuma ve yazma erişimine sahip olabilir, sunucu yapılandırmasını okuyabilir, fakat yapılandırmayı değiştiremez. Ajan bunu yapmaya çalışırsa, uygulama veya eklenti izin vermese bile çalışma sınırı işlemi durduracak şekilde tasarlanıyor.

Bu modelde yetki kararını ajanın verdiği cevap belirlemiyor. Geliştirici veya kurum bir politika tanımlıyor, MXC de bu politikanın uygun platform mekanizmasıyla uygulanmasını sağlıyor. Windows’ta AppContainer, macOS’ta Seatbelt, Linux’ta Bubblewrap gibi arka uçlar aynı istek modelinin arkasında çalışabiliyor. Windows tarafında oturum izolasyonu ve WSL tabanlı çalışma da seçenekler arasında.

Microsoft’un belgelerinde dört farklı kullanım biçimi özellikle ayrılıyor. Process container, model üretimli kod ve araç çalıştırma gibi düşük gecikme isteyen işler için tasarlanıyor. Session container, ajanın kullanıcı oturumundan ayrı bir masaüstü, pano ve giriş alanıyla çalışmasını sağlıyor. WSL container, Linux araç zincirlerine ihtiyaç duyan işlerde kullanılıyor. MicroVM ise daha güçlü bir sınır isteyen deneysel seçenek olarak gösteriliyor.

Bu ayrım bana mantıklı geliyor, çünkü her ajan görevini sanal makineye koymak pratik değil. Bir test komutunu her seferinde ağır bir izolasyonda çalıştırmak geliştirici deneyimini bozabilir. Hassas veriyle çalışan veya uzun süre kendi başına hareket eden bir ajan için process sandbox da yetersiz kalabilir. MXC’nin değeri, tek bir izolasyon seviyesini herkese dayatmak yerine bu seçimi ortak bir politika modeliyle yapmaya çalışmasında.



## Windows’un ajan stratejisinde yeni katman

MXC duyurusu tek başına bir güvenlik kütüphanesi sürümü gibi okunabilir. Microsoft’un 7 Ekim’de yayımladığı Windows duyurusu daha geniş bir planı gösteriyor. Şirket, ajan güvenliğini üç parçayla anlatıyor: containment, identity ve manageability. MXC containment kısmını karşılıyor. Ajanın hangi erişimlerle çalıştığı sınırlandırılıyor. Entra tabanlı kimlik ve Agent 365 entegrasyonları ise ileride bu etkinliklerin kullanıcıdan ayırt edilmesini ve merkezi olarak yönetilmesini hedefliyor.

Burada Microsoft’un ürün anlatımıyla gerçek kullanım arasındaki mesafeyi ayırmak gerekiyor. “Politika çalışma zamanında zorlanıyor” ifadesi, doğru kurulmuş bir sınırın model tarafından aşılmasını zorlaştırır. Bu, ajanın yaptığı işin doğru olduğu anlamına gelmez. İzin verilen klasörde yanlış dosyaları silebilir, dış ağa açık bir endpoint’e gereğinden fazla istek gönderebilir veya verilen yetkiyi kötü bir sırayla kullanabilir. Sandbox hasarı sınırlar; görevin niyetini doğrulamaz.

Benim tereddüdüm de burada. Microsoft’un duyurusunda desteklenen arka uçların güvenlik özelliklerinin birbirinden farklı olduğu açıkça belirtiliyor. Bu cümle önemli, çünkü “MXC kullanıyorum” demek her platformda aynı izolasyon seviyesine sahip olduğunuz anlamına gelmiyor. Process container ile MicroVM aynı güvenlik garantisini vermez. Hangi dosya yollarının, ağ adreslerinin, sembolik bağlantıların ve kullanıcı kimliklerinin nasıl ele alındığını her proje kendi tehdit modelinde incelemeli.

GitHub deposunun açık olması bu incelemeyi kolaylaştırabilir. Belgelerde Rust, .NET ve Node SDK’ları, JSON tabanlı istekler ve farklı container arka uçları anlatılıyor. Bu, kapalı bir ajan platformuna güvenmekten daha denetlenebilir bir başlangıç sunuyor. Yine de kodun GitHub’da bulunması, bütün kurulumların güvenli olduğu anlamına gelmiyor. Özellikle Windows sürümü, WSL desteği, ağ politikaları ve işletim sistemi güncellemeleri birlikte kontrol edilmeli.

Bu gelişmeyi donanım duyurusundan daha değerli bulmamın nedeni bu. Surface Laptop Ultra veya RTX Spark, yerel model çalıştırmayı kolaylaştırabilir. Ajanlar gerçekten yerel cihazlarda daha fazla iş yapacaksa, yetki sınırlarının da uygulama seviyesinden aşağı inmesi gerekecek. Bir modele “dosyalarımı koru” demekle işletim sisteminin o dosyalara erişimi gerçekten reddetmesi aynı şey değil.

MXC’nin başarılı olup olmadığını bugün yalnızca duyuruya bakarak söyleyemem. Bağımsız testleri, kötü niyetli eklenti senaryolarını, ağ kaçışlarını ve platformlar arası davranış farklarını görmek gerekiyor. Fakat 7 Ekim’deki genel kullanılabilirlik duyurusu, ajan güvenliğini prompt kurallarından işletim sistemi politikasına taşıyan somut bir ürün çizgisi ortaya koydu. Benim için haftanın haberi bu: ajanların ne söyleyeceğinden önce, çalışırken nereye kadar ulaşabildiğini ölçmemiz gerekecek.
