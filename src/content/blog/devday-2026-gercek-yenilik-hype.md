---
title: "DevDay 2026 sonrası yenilik ile hype arasındaki çizgi"
description: "DevDay 2026 sonrası Dots, ajanlar ve GPT-6.1 Sol üzerinden AI ilerlemesini kullanıcıya gerçekten ne kazandırdığıyla ölçmeyi deniyorum."
slug: "devday-2026-gercek-yenilik-hype"
publishedAt: 2026-09-30
tags: ["OpenAI","DevDay 2026","yapay zekâ ajanları","GPT-6.1 Sol","Dots","AI hype"]
category: "Yapay Zekâ"
heroImage: "/blog/devday-2026-gercek-yenilik-hype.png"
heroAlt: "OpenAI Dots ürün sayfasında kullanılan turuncu renkli Dots simgesi"
featured: false
draft: false
sources:
  - label: "OpenAI DevDay 2026 Recap"
    url: "https://openai.com/index/devday-2026-recap/"
    note: "29 Eylül 2026 tarihli resmi etkinlik özeti; Dots, GPT-6.1 Sol, Agents API ve diğer DevDay duyurularını listeliyor."
  - label: "Introducing dots"
    url: "https://openai.com/index/introducing-dots/"
    note: "Dots’un çalışma biçimi, bulut bilgisayarı, uygulama bağlantıları, izinleri ve erişim planları için resmi ürün duyurusu."
  - label: "Introducing GPT-6.1 Sol"
    url: "https://openai.com/index/introducing-gpt-6-1-sol/"
    note: "GPT-6.1 Sol’un GPT-6 Sol’a göre test sonuçları, fiyatlandırması, erişimi ve değerlendirme sınırlamaları için resmi duyuru."
  - label: "Introducing the Agents API"
    url: "https://openai.com/index/introducing-the-agents-api/"
    note: "Agents API’nin hosted sandbox, araç kullanımı, context compaction ve çoklu ajan özellikleri için resmi duyuru."
  - label: "Yapay zekâ devleri artık domain üzerinden birbirine laf atıyor"
    url: "https://recepozgur.com/blog/ai-devleri-domain-marka-savasi/"
    note: "Yazıda doğal biçimde atıf yapılan önceki kişisel blog yazısı."
---

29 Eylül 2026’daki OpenAI DevDay’in ardından önümde uzun bir duyuru listesi var. OpenAI, etkinliği 20’den fazla büyük duyurunun yapıldığı bir gün olarak özetliyor. Dots, GPT-6.1 Sol, Agents API, Codex’in bulut tarafı, plugin uzantıları ve ChatGPT içinde ekiplerle çalışmaya dönük yeni yüzeyler aynı paketin içinde sunuldu. Bu kadar çok başlık gelince ilk refleksim heyecanlanmak olmadı. Önce şu soruya dönüyorum: Dün yapamadığım neyi bugün yapabiliyorum? ([openai.com](https://openai.com/index/devday-2026-recap/))

Bu soruyu daha önce yazdığım [“Yapay zekâ devleri artık domain üzerinden birbirine laf atıyor”](https://recepozgur.com/blog/ai-devleri-domain-marka-savasi/) yazısındaki marka rekabetiyle birlikte düşünmek gerekiyor. Orada şirketlerin ürün kadar isim, alan adı ve algı üzerinden de yarıştığını yazmıştım. DevDay sonrasında yarışın yeni sahnesi ürün isimleriyle sınırlı kalmıyor. Her şirket, kendi kelimelerini kuruyor: ajan, çalışma alanı, yardımcı, ekip arkadaşı, bulut bilgisayar. Bu kelimeler bazen yeni bir kullanım biçimini anlatıyor, bazen de zaten bildiğimiz bir özelliği daha büyük bir hikâyenin içine yerleştiriyor.

## Dots gerçekten neyi değiştiriyor?

Dots, OpenAI’ın anlattığı biçimiyle sürekli çalışan, kendi bulut bilgisayarı ve tarayıcısı olan ajanlar. Bağlanan uygulamalara erişebiliyor, arka planda araştırma yapabiliyor ve bazı eylemler için kullanıcı onayı isteyebiliyor. OpenAI’ın verdiği örneklerde bir dot müşteri geri bildirimlerini izleyip küçük düzeltmeler hazırlıyor, test ediyor ve incelenmek üzere pull request oluşturuyor. Bu, sohbet penceresine cevap yazdırmaktan farklı bir çalışma biçimi. Kullanıcı görevi tek seferlik vermek yerine bir hedef, bağlam ve sınır tanımlıyor. ([openai.com](https://openai.com/index/introducing-dots/))

Buradaki ilerlemeyi gerçek buluyorum, çünkü işin bir bölümü kullanıcının ekranından kopup süreklilik kazanıyor. Ajanın kendi ortamında çalışması, dosyaları incelemesi ve günler boyunca bağlamı koruması, model kalitesinden bağımsız yeni bir ürün davranışı yaratıyor. Fakat Dots’un bugün her kullanıcı için aynı anlama geldiğini söyleyemem. Ürün uygun pazarlarda Pro ve Business Premium planlarına açılıyor; Enterprise, Edu ve Healthcare tarafında beta kullanımı yöneticinin etkinleştirmesine bağlı. Bu nedenle duyurudaki “her zaman yanında çalışan yardımcı” anlatısını, genel kullanıma açılmış tamamlanmış bir deneyim gibi okumak erken olur. ([openai.com](https://openai.com/index/devday-2026-recap/))

Agents API tarafında daha elle tutulur bir değişiklik var. OpenAI, geliştiricilerin kendi uygulamalarına uzun süre çalışan ajanlar ekleyebilmesi için Codex’in harness yapısını API olarak sunuyor. Hosted sandbox, araç kullanımı, context compaction ve paralel çalışan alt ajanlar aynı altyapının parçaları olarak anlatılıyor. Bunun üretimde gerçekten işe yarayıp yaramadığını ölçmek için hâlâ uygulamanın hata oranına, geri dönüş davranışına ve insan onayının nerede kaldığına bakmak gerekiyor. “Tek API çağrısıyla production-ready agent” ifadesi, teknik başlangıcı kolaylaştırabilir; üretim güvenilirliğini tek başına kanıtlamaz. ([openai.com](https://openai.com/index/introducing-the-agents-api/))

## GPT-6’dan GPT-6.1’e geçiş ne anlatıyor?

GPT-6.1 Sol duyurusu, artımlı model güncellemelerinin neden hâlâ değerli olabileceğini gösteriyor. OpenAI, GPT-6.1 Sol’un GPT-6 Sol’a göre kodlama, bilgisayar kullanımı, profesyonel belgeler ve bilimsel iş akışlarında daha iyi sonuç verdiğini yazıyor. DeepSWE v1.1 testinde GPT-6.1 Sol’un GPT-6 Sol’un en iyi skorunu 6,4 puan aştığı, OSWorld 2.0 testinde ise yedi puanlık fark elde ettiği belirtiliyor. API tarafında standart fiyatlar GPT-6 Astra’nın beşte biri olarak açıklanıyor. ([openai.com](https://openai.com/index/introducing-gpt-6-1-sol/))

Bunlar küçük bir sürüm numarasının önemsiz olduğu anlamına gelmediğini gösteriyor. Daha düşük maliyetle benzer işi yapabiliyorsam, dün ekonomik olmayan bir ajan akışı bugün kurulabilir. Kullanıcı açısından gerçek yenilik bazen yeni bir yetenekten çok aynı yeteneğin kullanılabilir maliyete inmesidir.

Yine de burada temkinli kalıyorum. Bu ölçümlerin önemli bölümü OpenAI’ın kendi değerlendirmeleriyle aktarılıyor. Rakip modeller için kullanılan sonuçların kamuya açık raporlardan alındığı, üretim ChatGPT’si ile araştırma ortamındaki testlerin farklı olabileceği de sayfanın dipnotunda belirtiliyor. Bu yüzden “GPT-6.1 Sol her işte daha iyi” sonucu çıkarmıyorum. Daha dar bir iddia kuruyorum: OpenAI’ın paylaştığı testlerde bazı uzun görevlerde GPT-6 Sol’a göre belirgin kazanımlar ve daha düşük maliyet görülüyor. Bunun gerçek hayattaki karşılığı, kendi iş akışımda aynı görevi kaç denemede tamamladığına bakmadan anlaşılmaz. ([openai.com](https://openai.com/index/introducing-gpt-6-1-sol/))

Bana kalırsa DevDay 2026’nın gerçek yeniliği tek tek özelliklerde değil, yazılımın kullanıcı adına daha uzun süre çalıştırılabilmesinde. Dots ve Agents API bu yöne işaret ediyor. Hype tarafı ise bu çalışma biçimini hemen “yanında çalışan ekip arkadaşı” diye paketliyor. Aradaki farkı anlamanın yolu ürünün kaç özellik sunduğunu saymak değil. Bir görevi bugün daha az yönlendirmeyle, daha düşük maliyetle ve sonucu kontrol edebileceğim bir biçimde tamamlayıp tamamlayamadığına bakmak.

Benim DevDay sonrası kısa testim bu nedenle hâlâ aynı cümleye dönüyor: Dün yapamadığım neyi bugün yapabiliyorum? Cevap bir pull request’in laptop kapalıyken hazırlanması, uzun bir araştırmanın bağlam kaybetmeden sürmesi veya GPT-6.1 Sol’un maliyeti yüzünden daha önce kuramadığım bir akışın kurulabilmesi ise ortada gerçek bir ilerleme vardır. Cevap yalnızca yeni bir isim, yeni bir logo veya aynı düğmenin başka bir ekrana taşınmasıysa, orada ürün yeniliğinden çok pazarlama dili konuşuyordur.
