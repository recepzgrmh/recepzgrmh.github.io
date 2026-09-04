---
title: "Saldırganların AI günlükleri güvenlik ekiplerine ne gösteriyor"
description: "Cisco Talos’un incelediği sızmış AI kullanım izleri, saldırganların Claude Code ve benzeri araçları nasıl kullandığını gösteriyor."
slug: "saldirgan-ai-gunlukleri-guvenlik"
publishedAt: 2026-08-06
tags: ["siber güvenlik", "yapay zeka", "Cisco Talos", "Claude Code", "Codex", "geliştirici araçları"]
category: "Güvenlik"
heroImage: "/blog/saldirgan-ai-gunlukleri-guvenlik.png"
heroAlt: "Sızmış prompt geçmişlerinden çıkan üç kullanım kategorisi."
featured: false
draft: false
sources:
  - label: "Axios, Hackers' AI chat logs reveal evolving tactics"
    url: "https://www.axios.com/2026/08/04/exclusive-hackers-ai-chat-logs-reveal-evolving-tactics"
    note: "4 Ağustos 2026 tarihli haber. Cisco Talos’un saldırganların bıraktığı AI kullanım izlerini incelediğini ve Claude Code, Codex, Cursor ve Gemini kullanımına dair prompt geçmişleri bulunduğunu aktarıyor."
  - label: "Cisco, AI-Powered Cyberattack Defense: Security Guidance"
    url: "https://www.cisco.com/site/us/en/solutions/artificial-intelligence/cisco-defending-against-ai-attacks-guidance.html"
    note: "Cisco’nun AI destekli saldırılara karşı yayımladığı resmi rehber."
  - label: "Cisco, Defending Against AI Attacks Guidance PDF"
    url: "https://www.cisco.com/c/dam/en_us/about/doing_business/trust-center/docs/cisco-defending-against-ai-attacks-guidance.pdf"
    note: "Resmi rehberin PDF sürümü."
  - label: "Cisco Talos, Announcing Cisco Talos Threat Hunting"
    url: "https://blogs.cisco.com/security/announcing-cisco-talos-threat-hunting"
    note: "Cisco Talos’un tehdit avcılığı ve AI destekli güvenlik operasyonları hakkındaki resmi yazısı."
  - label: "Reddit r/Cisco, Active Exploitation: Cisco Secure FMC flaw"
    url: "https://www.reddit.com/r/Cisco/comments/1vau0bx/active_exploitation_cisco_secure_fmc_flaw/"
    note: "30 Temmuz ve 4 Ağustos 2026 tarihlerinde Cisco güvenlik olayları çevresindeki topluluk tartışmasını doğrulamak için incelendi; ana yazının konusu olan Talos AI günlükleriyle doğrudan aynı haber değildir."
  - label: "Cisco Secure Firewall Management Center Software Static Credential Vulnerability"
    url: "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-fmc-static-cred-BET3Cjh"
    note: "Cisco’nun 29 Temmuz 2026 tarihli ayrı güvenlik duyurusu; haftalık teknoloji güvenliği taramasında incelendi, yazının ana konusu değildir."
---

4 Ağustos 2026’da Axios, Cisco Talos’un saldırganların çevrim içi bıraktığı AI kullanım izlerini incelediğini yazdı. Bu izlerin arasında Claude Code, Codex, Cursor ve Gemini kullanan uç noktalardan kalan prompt geçmişleri de var. Haber, saldırganların yapay zekâyı yalnızca metin üretmek için değil, keşif ve saldırı hazırlığındaki işleri hızlandırmak için kullandığını anlatıyor. ([axios.com](https://www.axios.com/2026/08/04/exclusive-hackers-ai-chat-logs-reveal-evolving-tactics?utm_source=openai))

Bana kalırsa bu gelişmenin konuşulmasının nedeni “AI saldırıları arttı” cümlesi değil. Daha somut bir şey var. Saldırganların hangi araçları, hangi sırayla ve ne amaçla kullandığına dair çalışma izleri görünür hâle geliyor. Güvenlik ekipleri için bu, bir modelin ne kadar zeki olduğundan daha kullanışlı bir bilgi olabilir.

## Prompt geçmişi neden güvenlik verisi sayılmalı?

Bir yazılım ekibi olarak log deyince genellikle HTTP isteklerini, kimlik doğrulama denemelerini ya da sistem çağrılarını düşünürüz. AI araçları yaygınlaştıkça prompt’lar da benzer bir iz bırakmaya başlıyor. Bir saldırganın hangi alan adlarını sorduğu, hangi dosyaları anlamaya çalıştığı veya hangi komutları üretmek istediği, tek başına saldırıyı kanıtlamayabilir. Yine de olayın bağlamını genişletir.

Cisco’nun Axios’a aktarılan çalışmasında, saldırganların Claude Code, Codex, Cursor ve Gemini gibi araçlardan yararlandığı belirtiliyor. Burada dikkat edilmesi gereken ayrıntı, araç adlarının kendisi değil. Aynı kişinin ya da grubun birden fazla geliştirici aracını saldırı sürecine ekleyebilmesi. Bu tablo, güvenlik ürünlerinin “AI kullanıldı mı?” sorusundan “hangi araç hangi sistem üzerinde ne yaptı?” sorusuna geçmesini gerektiriyor. ([axios.com](https://www.axios.com/2026/08/04/exclusive-hackers-ai-chat-logs-reveal-evolving-tactics?utm_source=openai))

Benim gördüğüm pratik sorun şu: Birçok ekip, AI aracını geliştirici makinesinde çalışan ayrı bir uygulama gibi değerlendiriyor. Oysa bu araç dosya okuyabiliyor, terminal komutu çalıştırabiliyor, ağ üzerinde istek yapabiliyor veya başka araçları çağırabiliyorsa güvenlik açısından yeni bir aktör hâline geliyor. Bu aktör insan değil, ama insanın verdiği bir talimatı sistem üzerinde uygulayabiliyor.

Cisco’nun AI saldırılarına karşı yayımladığı rehber de benzer bir kaygıya işaret ediyor. Şirket, frontier modellerin saldırı hazırlığını hızlandırabileceğini ve savunma ekiplerinin tehdit modelini buna göre değiştirmesi gerektiğini söylüyor. Rehber, Cisco’nun Anthropic’in Mythos Preview modeli ve OpenAI’nin GPT-5.5-Cyber modeliyle yaptığı çalışmalar üzerinden hazırlanmış. ([cisco.com](https://www.cisco.com/site/us/en/solutions/artificial-intelligence/cisco-defending-against-ai-attacks-guidance.html?utm_source=openai))

Bu noktada kendi tereddüdüm var. Sızmış prompt’ları doğrudan saldırganın gerçek niyeti gibi okumak kolay, ama yanlış olabilir. Bir modelin ürettiği komut ile saldırganın gerçekten çalıştırdığı komut aynı şey değil. Prompt geçmişi, olay incelemesinde güçlü bir ipucu olabilir; tek başına olayın tamamı sayılamaz.

## Ürün ekipleri bundan ne öğrenebilir?

Ben bir Product Engineer olarak bu konuya güvenlik operasyonu uzmanı gibi bakamam. Yine de geliştirici araçlarının ürün içine nasıl yerleştiğini takip ederken üç davranışın artık tasarım kararına dönüşmesi gerektiğini düşünüyorum: AI aracının hangi kaynağa eriştiğini bilmek, yaptığı işlemi kaydetmek ve gerektiğinde erişimini kesebilmek.

İlk madde izinlerle ilgili. Bir kod asistanının bütün ev dizinine, tüm ortam değişkenlerine veya üretim kimlik bilgilerine erişmesi gerekmiyorsa bu erişim verilmemeli. Bu kulağa temel bir kural gibi geliyor, fakat yerel geliştirme araçları hızlı kurulduğunda yetki sınırları genellikle sonradan düşünülüyor.

İkinci madde gözlemlenebilirlik. Cisco’nun haberleştirilen çalışmasında saldırganların bıraktığı AI izleri değerli hâle geliyorsa, şirket içindeki AI araçlarının hareketlerini de olay incelemesine dâhil etmek gerekiyor. Hangi ajan hangi dosyayı okudu, hangi komutu önerdi, hangi aracı çağırdı? Bu kayıtların tamamını süresiz saklamak gerekmeyebilir. Fakat üretim sistemine, kaynak koduna veya sır niteliğindeki verilere erişen işlemler için hiçbir iz bırakmamak artık savunulabilir görünmüyor.

Üçüncü madde durdurma mekanizması. Bir AI aracı beklenmedik bir repo taraması yapıyorsa ya da olağandışı sayıda dış bağlantı kuruyorsa ekip bunu fark edip erişimi askıya alabilmeli. Cisco’nun rehberinde savunma tarafı için loglama, tehdit avcılığı ve aldatma teknikleri gibi yaklaşımlar öne çıkıyor. Bir AI ajanını yakalamak için honeypot kullanma fikri özellikle dikkat çekici, fakat bunun nasıl uygulanacağı konusunda genel önerilerin ürün ekiplerine doğrudan reçete sunduğundan emin değilim. ([cisco.com](https://www.cisco.com/site/us/en/solutions/artificial-intelligence/cisco-defending-against-ai-attacks-guidance.html?utm_source=openai))

Bu haber bana göre geliştirici araçlarını yasaklama çağrısı değil. Yasaklamak kolay cevap olurdu, fakat ekiplerin kullandığı araç sayısı zaten artıyor. Daha gerçekçi yaklaşım, AI aracını geliştirici deneyiminin görünmez bir parçası olmaktan çıkarıp sistemde yetkileri ve kayıtları olan bir bileşen gibi ele almak.

Saldırganların prompt geçmişleri güvenlik araştırmacılarına yardımcı oluyorsa, ürün ekipleri kendi ajanlarının bıraktığı izleri de ciddiye almalı. Burada ölçü, modelin iyi ya da kötü olması değil. Modelin hangi verilere ve hangi eylemlere erişebildiği. Benim için bu haftanın en somut dersi bu.
