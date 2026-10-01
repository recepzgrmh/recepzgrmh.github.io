---
title: "Codex Cloud, kod işini bilgisayardan koparıp ortama taşıyor"
description: "OpenAI’nin 29 Eylül’de duyurduğu Codex Cloud güncellemesi, kodlama görevlerini cihazdan bağımsız ve yeniden kullanılabilir ortamlara taşıyor."
slug: "codex-cloud-kod-gelistirme-ortami"
publishedAt: 2026-10-01
tags: ["OpenAI","Codex","Codex Cloud","yazılım geliştirme","AI ajanları","geliştirme ortamları"]
category: "Yapay Zekâ"
heroImage: "/blog/codex-cloud-kod-gelistirme-ortami.jpg"
heroAlt: "Codex Cloud sekmesinde proje klasörleri ve görevlerin gösterildiği mobil arayüz"
featured: false
draft: false
sources:
  - label: "OpenAI DevDay 2026 resmi etkinlik sayfası"
    url: "https://devday.openai.com/"
    note: "Etkinliğin 29 Eylül 2026 tarihinde San Francisco’da yapıldığını doğruluyor."
  - label: "OpenAI ChatGPT Business release notes"
    url: "https://help-lb.openai.com/en/articles/11391654-chatgpt-business-release-notes"
    note: "29 Eylül 2026 tarihli Codex Cloud bölümünde yeniden kullanılabilir ortamları, masaüstü/web/mobil erişimini ve bilgisayar uyurken devam eden görevleri açıklıyor."
  - label: "TechCrunch, OpenAI gives Codex reusable cloud environments that work across devices"
    url: "https://techcrunch.com/2026/09/29/openai-gives-codex-reusable-cloud-environments-that-work-across-devices/"
    note: "Codex Cloud, yeni code review deneyimi, Codex Security Cloud ve API duyurularını aynı haber içinde aktarıyor."
  - label: "Reddit r/OpenAI, Was anyone else underwhelmed by Dev Day?"
    url: "https://www.reddit.com/r/OpenAI/comments/1wtkt11/was_anyone_else_underwhelmed_by_dev_day/"
    note: "29 Eylül 2026 tarihli kullanıcı tartışması; Codex, DevDay beklentileri ve kullanım sınırları hakkındaki tepkileri gösteriyor."
  - label: "Reddit r/OpenAI, Worst Dev Day"
    url: "https://www.reddit.com/r/OpenAI/comments/1wtgzp7/worst_dev_day/"
    note: "29-30 Eylül 2026 tarihli tartışma; DevDay duyurularının kullanıcılar tarafından nasıl değerlendirildiğini gösteriyor."
  - label: "OpenAI Help Center, Using Codex Cloud"
    url: "https://help-lb.openai.com/en/articles/20001545-using-codex-cloud"
    note: "Codex Cloud’un OpenAI tarafından yönetilen bilgisayarlarda çalıştığını ve ortamın repo, araç, bağımlılık ve erişim ayarlarını bir araya getirdiğini açıklıyor."
  - label: "Hacker News, A week of using Codex more than Claude"
    url: "https://news.ycombinator.com/item?id=49393051"
    note: "Aynı haftanın öncesinden Codex’in CLI, masaüstü ve cloud kullanımına dair geliştirici tartışması; yeni duyurunun bağlamını anlamak için tarandı."
  - label: "GitHub Trending"
    url: "https://github.com/trending"
    note: "23-30 Eylül 2026 aralığında geliştirici topluluğunda öne çıkan depoları kontrol etmek için tarandı; Codex Cloud duyurusuyla doğrudan ilişkili belirgin bir tekil trend doğrulanamadı."
  - label: "InfoQ Artificial Intelligence News"
    url: "https://www.infoq.com/artificial_intelligence/news/"
    note: "23-30 Eylül 2026 aralığındaki yapay zekâ ve yazılım haberleri kontrol edildi; Codex Cloud duyurusuna doğrudan ayrılmış bir haber bulunamadı."
---

OpenAI, 29 Eylül 2026’daki DevDay etkinliğinde Codex Cloud için yeniden kullanılabilir bulut geliştirme ortamlarını duyurdu. İlk bakışta bu, Codex’in telefondan veya tarayıcıdan kullanılabilmesi gibi görünüyor. Okuduğum duyurulara göre değişiklik bundan biraz daha somut: Codex artık her görev için baştan kurulmuş, geçici bir çalışma alanı açmak yerine proje depolarını, araçlarını, bağımlılıklarını ve erişim ayarlarını taşıyan bir ortamı tekrar kullanabiliyor.

Bu hafta konunun çok konuşulmasının nedeni duyurunun tek başına “yeni bir arayüz” olmaması. OpenAI, Codex’i geliştiricinin açık olan bilgisayarına bağlı bir yardımcı olmaktan çıkarıp, işin devam ettiği bir çalışma alanı gibi konumlandırıyor. TechCrunch bunu cihazlar arasında erişilebilen ve daha kalıcı hale gelen bulut geliştirme ortamları olarak aktardı. OpenAI’nin kendi Business sürüm notlarında da görevlerin masaüstü, web veya mobil üzerinden başlatılıp sürdürülebileceği ve bilgisayar uyurken çalışmaya devam edebileceği yazıyor. ([techcrunch.com](https://techcrunch.com/2026/09/29/openai-gives-codex-reusable-cloud-environments-that-work-across-devices/))

Benim için haberin en ilginç tarafı mobil uygulama değil, ortamın yeniden kullanılabilir olması. Bir coding agent’ın her seferinde repo klonlaması, bağımlılık kurması ve araç erişimini yeniden ayarlaması geliştirici açısından görünmeyen bir bekleme maliyeti yaratıyor. Bu adımların bir kısmı kalıcı bir ortamda hazır tutulduğunda görev başlatmak daha kısa sürebilir. OpenAI, her görevin kendi izole çalışma alanına sahip olduğunu da belirtiyor. Bu ayrım önemli, çünkü aynı proje ortamını paylaşmak ile aynı dosya durumunu kontrolsüz biçimde paylaşmak arasında güvenlik açısından ciddi fark var.

## Codex Cloud’un değiştirdiği çalışma biçimi

Daha önce bir görevi bilgisayarımda başlatıp sonra başka bir yerde sürdürmek istediğimde, önce oturumun nerede kaldığını anlamam, çalışma ağacını kontrol etmem ve gerekli dosyaların gerçekten erişilebilir olup olmadığını doğrulamam gerekirdi. Codex Cloud’un yeni yaklaşımı bu akışı ortama taşıyor. Görev, açık bir terminal penceresine veya tek bir cihaza bağlı kalmadan ilerleyebiliyor.

OpenAI’nin açıklaması burada iki ayrı kullanım biçimini birleştiriyor. Geliştirici bir ortam hazırlayıp onu tekrar kullanabiliyor. Görevler ise bu ortam içinde kendi izole çalışma alanlarında çalışıyor. Bu, ekiplerin onaylanmış araç ve izinlerle ortak bir başlangıç noktası oluşturmasına yardımcı olabilir. TechCrunch haberinde paylaşılan ayarların ve izinlerin ekipler için tanımlanabildiği belirtiliyor. ([techcrunch.com](https://techcrunch.com/2026/09/29/openai-gives-codex-reusable-cloud-environments-that-work-across-devices/))

Bu modelin pratik karşılığını bir pull request üzerinden düşünmek daha kolay. Bir görev, testleri çalıştırıp değişiklikleri hazırlarken bilgisayarınızı kapatabilirsiniz. Daha sonra mobil cihazdan ilerlemeyi inceleyebilir, masaüstü uygulamasından diff’i açabilir ve GitHub ya da GitLab üzerindeki incelemeye geçebilirsiniz. OpenAI aynı etkinlikte Codex için yeni bir code review deneyimi ve otomatik ilk inceleme özelliği de duyurdu. Bu parçalar bir araya geldiğinde Codex, komut yazılan bir pencere olmaktan çıkıp devam eden bir iş kuyruğuna yaklaşıyor. ([techcrunch.com](https://techcrunch.com/2026/09/29/openai-gives-codex-reusable-cloud-environments-that-work-across-devices/))

## Benim tereddüdüm ortamın kendisinden çok sınırlarında

Burada dikkat edilmesi gereken nokta “ajan artık arka planda çalışıyor” cümlesinin pratikte ne anlama geldiği. Bilgisayarın uyuması engeli ortadan kalkabilir, fakat bu görevlerin hangi kaynaklarla, hangi süre sınırlarıyla ve hangi izinlerle çalıştığı hâlâ belirleyici. OpenAI’nin Codex Cloud dokümantasyonu ortamın OpenAI tarafından yönetilen bilgisayarlarda çalıştığını söylüyor. Bu nedenle ekiplerin repo erişimi, gizli değişkenler, paket depoları ve ağ izinleri için varsayılan ayarları olduğu gibi kabul etmemesi gerekir. ([help-lb.openai.com](https://help-lb.openai.com/en/articles/20001545-using-codex-cloud?utm_source=openai))

Reddit’teki ilk tepkiler de bu yüzden ikiye ayrılmış görünüyor. Bazı kullanıcılar DevDay duyurusunu Codex’in uzun süredir eksik olan devamlılık katmanını tamamlaması olarak yorumladı. Bazıları ise duyurunun ürünün kullanım limitleri ve fiyatlandırmasıyla birlikte değerlendirilmesi gerektiğini yazdı. Bu ikinci itirazı makul buluyorum. Bir geliştirme ortamını istediğim zaman sürdürebilmek faydalı, fakat görevler sık sık kullanım sınırına takılıyorsa ortamın kalıcı olması tek başına akışı kurtarmıyor. ([reddit.com](https://www.reddit.com/r/OpenAI/comments/1wtgzp7/worst_dev_day/?utm_source=openai))

Benim net görüşüm şu: Codex Cloud’daki asıl ilerleme, Codex’in telefonda açılması değil, çalışma ortamının bir oturumdan daha uzun ömürlü hale gelmesi. Yazılım geliştirmede bağlamı korumak, yeni bir sohbet başlatmaktan daha değerlidir. Repo, bağımlılıklar, test komutları ve izinler her görevde yeniden kuruluyorsa ajan hızlı görünse bile iş yavaşlar.

Yine de bunun geliştirici bilgisayarının yerini hemen alacağını düşünmüyorum. Ben olsam ilk denemeyi kişisel bir yan projede değil, erişim izinleri sınırlı bir test reposunda yapardım. Önce ortamın hangi dosyalara eriştiğini, başarısız bir görevden sonra neyin kaldığını ve bir sonraki görevin hangi durumu devraldığını kontrol ederdim. OpenAI’nin duyurusu bu soruların tümünü cevaplamıyor.

29 Eylül 2026’daki DevDay’in yazılım tarafındaki en somut sonucu bana göre bu: coding agent’ın çalışma yeri artık geliştiricinin laptop’ı olmak zorunda değil. Bundan sonra tartışma, “ajan kod yazabiliyor mu?” sorusundan çok “ajanın çalıştığı ortamı kim hazırlıyor, kim denetliyor ve ne kadar süre koruyor?” sorusuna kayacak.
