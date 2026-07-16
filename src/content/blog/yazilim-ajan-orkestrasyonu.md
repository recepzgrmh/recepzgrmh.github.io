---
title: "Yazılım ekipleri artık kod değil, ajan orduları yönetiyor"
description: "Kod üreten ajanlar çoğaldı. Yazılım geliştirmede yeni darboğaz, bu ajanları güvenilir biçimde koordine etmek ve sonuçlarını denetlemek oluyor."
slug: "yazilim-ajan-orkestrasyonu"
publishedAt: 2026-07-16
tags: ["AI ajanları","yazılım geliştirme","agentic engineering","çoklu ajan sistemleri","yazılım ekipleri"]
category: "Yazılım Geliştirme"
heroImage: "/blog/yazilim-ajan-orkestrasyonu.webp"
heroAlt: "Bir geliştiricinin birden fazla yazılım ajanının koordinasyonunu izlediği editoryal illüstrasyon"
featured: false
draft: false
sources:
  - label: "Microsoft Agent Framework — Orchestration Patterns 1.0"
    url: "https://devblogs.microsoft.com/agent-framework/agent-frameworks-orchestration-patterns-reach-1-0/"
    note: "8 Temmuz 2026’da sıralı, paralel, group chat, handoff ve magentic orkestrasyon desenlerinin Python ve .NET için 1.0’a ulaştığını açıklıyor."
  - label: "Microsoft Build 2026 — Official Microsoft Blog"
    url: "https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/"
    note: "GitHub Copilot uygulamasında paralel ajan oturumları, ayrı Git worktree’leri ve ajan tabanlı geliştirme akışlarını açıklıyor."
  - label: "Microsoft Foundry — Build and run agents at scale"
    url: "https://devblogs.microsoft.com/foundry/agent-service-build2026/"
    note: "Ajan prototipinden üretim ortamına geçişte kimlik, izolasyon, kalıcı durum, izleme ve değerlendirme gereksinimlerini ele alıyor."
  - label: "Microsoft Agent Framework — CodeAct and multi-agent orchestration"
    url: "https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-at-build-2026-announce/"
    note: "CodeAct yaklaşımını, ajan orkestrasyonunu ve çoklu ajan handoff desenini açıklıyor; performans sayıları belirli bir örnek iş yüküne ait."
  - label: "OpenAI — How agents are transforming work"
    url: "https://openai.com/index/how-agents-are-transforming-work/"
    note: "Codex kullanımında uzun süreli ve paralel ajan görevlerinin arttığına dair OpenAI iç kullanım verilerini paylaşıyor."
  - label: "OpenAI — Harness engineering"
    url: "https://openai.com/index/harness-engineering/"
    note: "Coding agent kullanan ekiplerde ortam, bağlam, kısıtlar ve geri bildirim döngülerinin önemini açıklıyor."
  - label: "Microsoft Agent Framework — Durable Workflows"
    url: "https://devblogs.microsoft.com/dotnet/durable-workflows-in-microsoft-agent-framework/"
    note: "Çok adımlı ajan iş akışlarında yönlendirilmiş grafik, paralel çalışma, koşullu dallanma ve insan onayı örneklerini açıklıyor."
---

Yazılım dünyasında son aylarda konuşulan konu artık yalnızca “AI kod yazabiliyor mu?” sorusu değil. Daha büyük değişim, **birden fazla yazılım ajanının aynı iş üzerinde görev paylaşması, birbirine iş devretmesi ve uzun süren görevleri kendi başına ilerletmesi** etrafında şekilleniyor.

Microsoft Agent Framework’ün Temmuz 2026’da orkestrasyon desenlerini 1.0 sürümüne taşıması, Microsoft Build 2026’da GitHub Copilot için paralel ajan oturumlarının duyurulması ve OpenAI’nin Codex kullanımına dair paylaştığı veriler aynı yöne işaret ediyor: Kod yardımcısı, editörün yanında duran tekil bir araç olmaktan çıkıp yazılım sürecinin çalışan parçalarından biri hâline geliyor. [1][2][3]

Bu gelişme, “insanlar artık kod yazmayacak” cümlesinden daha somut. Asıl değişen şey, yazılım işinin nasıl bölündüğü.

## Tek bir yardımcıdan çalışan bir ekibe

Bir coding agent bugün bir issue’yu okuyabilir, dosyaları inceleyebilir, kod yazabilir, test çalıştırabilir ve pull request hazırlayabilir. Ancak büyük görevlerde tek ajan yaklaşımı kısa sürede sınıra dayanıyor. Araştırma, uygulama, test, güvenlik incelemesi ve dokümantasyon aynı bağlamda yürütülmeye çalışıldığında maliyet ve hata riski büyüyor.

Bu yüzden yeni araçlar, işleri farklı ajanlara paylaştıran yapılar sunuyor. Microsoft Agent Framework içinde sıralı, paralel, grup sohbeti, handoff ve “magentic” orkestrasyon desenleri artık kararlı olarak sunuluyor. Bir ajan işi başlatıyor, başka bir ajan uzmanlık gerektiren parçayı devralıyor; geliştirici ise bu akışın sınırlarını ve izinlerini belirliyor. [1]

GitHub da Build 2026’da Copilot uygulamasının bir fikirden, issue’dan veya pull request’ten yola çıkarak birden fazla ajan oturumunu paralel çalıştırabileceğini açıkladı. Her oturumun ayrı Git worktree kullanması, ajanların aynı çalışma alanını birbirinin üzerine yazmadan ilerlemesini sağlıyor. [2]

![Bir yazılım projesinde paralel çalışan ajanların ve insan kontrol noktalarının soyut gösterimi](/blog/yazilim-ajan-orkestrasyonu-inline-1.png)

*Çoklu ajan yaklaşımında değer, ajan sayısından çok görevlerin nasıl ayrıldığı ve sonuçların nasıl birleştirildiğiyle belirleniyor.*

Bu yaklaşımın cazibesi açık: Küçük bir ekip, aynı anda birden fazla teknik hattı ilerletebilir. Bir ajan API değişikliğini hazırlarken diğeri testleri genişletebilir, üçüncüsü de dokümantasyonu güncelleyebilir. Yazılımcının işi her satırı elle yazmak yerine bu parçaların doğru bağlamla çalışmasını sağlamak olur.

## Yeni darboğaz kod üretimi değil, koordinasyon

Kod üretimi ucuzladıkça yazılımın pahalı kısmı başka bir yere kayıyor. Ajanın hangi dosyaları okuyacağı, hangi araçlara erişeceği, hangi durumda duracağı ve ürettiği sonucu nasıl kanıtlayacağı önem kazanıyor.

Microsoft’un ajan platformuna dair duyurusunda da benzer bir sorun tarif ediliyor: Prototip oluşturmak kolaylaşıyor; fakat üretim ortamında kimlik, izolasyon, kalıcı durum, gözlemlenebilirlik, değerlendirme ve hata sonrası iyileştirme gerekiyor. [3]

Bu, klasik yazılım mühendisliğinin ortadan kalktığı anlamına gelmiyor. Tam tersine, mühendislik kararları daha görünür hâle geliyor. Bir ekibin şu sorulara net yanıt vermesi gerekiyor:

- Ajan hangi kaynaklara erişebilir?
- Aynı görevi iki ajan yaparsa sonuçlar nasıl birleştirilecek?
- Bir ajan başarısız olduğunda süreç nereden devam edecek?
- İnsan onayı hangi adımda zorunlu olacak?
- Başarılı bir çalışma yalnızca “çıktı iyi görünüyor” diye mi kabul edilecek?

Bu soruların cevabı yalnızca sistem prompt’unda bulunmuyor. Kod tabanının yapısı, testlerin kalitesi, araçların sınırları, log’lar ve değerlendirme senaryoları birlikte çalışıyor.

> Ajanların çoğalması, yazılım mühendisliğini ortadan kaldırmıyor; mühendisliği kod parçalarından çalışma sisteminin tamamına yayıyor.

## “Ajan ordusu” her zaman iyi fikir değil

Çoklu ajan mimarisi kulağa etkileyici geliyor. Fakat her problemi birkaç ajana bölmek verimlilik sağlamaz. Basit bir CRUD değişikliğinde dört ayrı ajanı devreye almak, tek bir iyi yapılandırılmış görevi çalıştırmaktan daha pahalı ve daha yavaş olabilir.

Üstelik ajanlar arasında iletişim kurmak da ücretsiz değil. Her devirde bağlam taşınır, yeni kararlar üretilir ve hata ihtimali eklenir. Microsoft’un Agent Framework dokümantasyonunda yer alan CodeAct örneği, bazı çok adımlı araç kullanım senaryolarında modelin tek tek tool çağrıları yerine bir program üretmesinin süre ve token kullanımını azaltabildiğini gösteriyor. Ancak bu sonuç belirli bir örnek iş yüküne ait; genel bir performans garantisi olarak okunmamalı. [4]

Bu nedenle ekiplerin “kaç ajan kullanıyoruz?” sorusundan önce “bu görevi neden bölüyoruz?” sorusunu sorması gerekiyor. Ajan sayısı bir başarı ölçütü değil. Daha az koordinasyonla daha güvenilir sonuç üretmek çoğu zaman daha iyi mimaridir.

![Bir yapay zekâ ajanının prototipten üretim ortamına geçerken geçtiği kontrol noktalarının soyut anlatımı](/blog/yazilim-ajan-orkestrasyonu-inline-2.png)

*Ajanı üretime taşımak, yalnızca görev çalıştırmak değil; erişim, gözlemlenebilirlik ve değerlendirme katmanlarını kurmak anlamına geliyor.*

## Geliştiricinin işi nereye kayıyor?

Bugün AI’ın kod, test, dokümantasyon ve uzun süren ajan görevlerinin büyük bölümünü üstlenebildiğini inkâr etmek gerçekçi değil. OpenAI, Codex kullanıcılarının giderek daha uzun görevler verdiğini ve bazı kullanıcıların aynı gün içinde paralel ajan oturumlarını saatler boyunca çalıştırdığını paylaşıyor. Bu, “AI sadece küçük otomatik tamamlama önerileri veriyor” döneminden farklı bir kullanım biçimi. [5]

Bunun sonucu, geliştiricinin değerinin yalnızca yazdığı kod miktarıyla ölçülmemesi olacak. İyi bir yazılımcı aynı zamanda:

- işi doğru parçalara ayırabilecek,
- ajanlara yeterli ve güvenilir bağlam sağlayabilecek,
- üretilen değişiklikleri test ve gözlem verileriyle değerlendirebilecek,
- sistemin hangi noktalarında otomasyonun durması gerektiğini belirleyebilecek.

Bu beceriler, kod bilgisine alternatif değil. Kod bilgisi olmadan ajanın yanlış kararını ayırt etmek, mimari etkisini görmek veya güvenlik sınırını çizmek zorlaşır. Fakat kod yazmak artık işin tamamı da değil.

Yazılım ekipleri için önümüzdeki dönemin önemli sorusu “hangi model daha iyi?” olmaya devam edecek. Fakat bunun yanına daha zor bir soru eklenecek: **Bu modeli, diğer ajanlarla ve gerçek ürün kısıtlarıyla birlikte güvenilir biçimde çalıştırabiliyor muyuz?**

Cevap evetse, küçük ekiplerin üretim kapasitesi ciddi biçimde artabilir. Cevap hayırsa, hızlı üretilen kod yalnızca daha hızlı büyüyen bir karmaşaya dönüşür.
