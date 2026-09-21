---
title: "Kod Ucuzladığında Yazılımın Pahalı Kısmı Ne Olacak?"
description: "AI ajanları kodun çoğunu yazabildiğinde değer; hedefi tanımlamak, sistemi doğrulamak ve değişimi yönetmekte toplanacak."
slug: "kod-ucuzladiginda-yazilim"
publishedAt: 2026-09-21
tags: ["AI ajanları","yazılım mühendisliği","teknik borç","test","ürün geliştirme","küçük ekipler"]
category: "Yazılım Mühendisliği"
heroImage: "/blog/kod-ucuzladiginda-yazilim.jpg"
heroAlt: "Kod üretimi ucuzlarken yazılım mühendisliğinde hedef, doğrulama ve sistem bütünlüğünün önemini anlatan editoryal illüstrasyon"
featured: false
draft: false
sources:
  - label: "GitHub Changelog — Copilot coding agent is now generally available"
    url: "https://github.blog/changelog/2025-09-25-copilot-coding-agent-is-now-generally-available/"
    note: "Kodlama ajanının özellik, hata, teknik borç, test ve dokümantasyon görevlerini üstlenebildiğini doğruluyor."
  - label: "GitHub Blog — Spec-driven development with AI"
    url: "https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/"
    note: "Spesifikasyonun, küçük ve test edilebilir görevlerin ajan çalışmasındaki rolünü açıklıyor."
  - label: "METR — Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity"
    url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"
    note: "Erken 2025 araçlarıyla deneyimli açık kaynak geliştiriciler üzerindeki kontrollü çalışmanın sonuçlarını ve sınırlarını aktarıyor."
  - label: "METR — Research Update: Algorithmic vs. Holistic Evaluation"
    url: "https://metr.org/blog/2025-08-12-research-update-towards-reconciling-slowdown-with-time-horizons/"
    note: "İşlevsel olarak doğru görünen ajan çıktılarının test, biçimlendirme ve genel kalite açısından kullanıma hazır olmayabileceğini gösteriyor."
  - label: "SWE-EVO — Benchmarking Coding Agents in Long-Horizon Software Evolution Scenarios"
    url: "https://arxiv.org/abs/2512.18470"
    note: "Uzun süreli, çok dosyalı yazılım evrimi görevlerinde ajanların zorlandığını ölçen araştırma."
  - label: "RoadmapBench — Evaluating Long-Horizon Agentic Software Development Across Version Upgrades"
    url: "https://arxiv.org/abs/2605.15846"
    note: "Sürüm yükseltmeleri ve çok hedefli geliştirme görevlerinde ajan performansını inceliyor."
  - label: "Martin Fowler — Fragments: April 2, 2026"
    url: "https://martinfowler.com/fragments/2026-04-02.html"
    note: "Teknik borç, bilişsel borç ve niyet borcu ayrımını tartışıyor."
  - label: "Martin Fowler — Agentic Programming"
    url: "https://martinfowler.com/bliki/AgenticProgramming.html"
    note: "Ajanların kaynak ağacını değiştirdiği, test çalıştırdığı ve insanın çıktıyı denetlediği çalışma biçimini tanımlıyor."
---

## Kod üretimi artık darboğaz olmayabilir

Yazılım geliştirmede uzun süre en pahalı işlerden biri kod yazmaktı. Bir özelliğin tasarlanması, dosyaların değiştirilmesi, testlerin eklenmesi ve dokümantasyonun güncellenmesi insan saatleriyle ölçülüyordu. Kod üretimi hızlandıkça bu hesabın değişeceği zaten belliydi. Fakat değişimin boyutu yalnızca daha hızlı yazmakla sınırlı değil.

Bugün kodlama ajanları bir issue’yu okuyup ilgili dosyaları bulabiliyor, değişiklik yapabiliyor, test çalıştırabiliyor ve pull request açabiliyor. GitHub’ın Copilot coding agent dokümantasyonu; yeni özellik, hata düzeltme, teknik borç, test kapsamı ve dokümantasyon gibi işlerin ajana devredilebildiğini açıkça gösteriyor. Bu, kod üretimini IDE içindeki otomatik tamamlama özelliğinden çıkarıp yazılım geliştirme sürecinin bir parçası hâline getiriyor. ([github.blog](https://github.blog/changelog/2025-09-25-copilot-coding-agent-is-now-generally-available/?utm_source=openai))

Buna rağmen “ajanlar kodun çoğunu yazabiliyor” cümlesi, “yazılım mühendisliğinin çoğu çözüldü” anlamına gelmiyor. Aksine, üretim ucuzladıkça başka işler daha görünür ve daha değerli hâle geliyor.

## En zor iş hedefi doğru tarif etmek olacak

Bir ajana kod yazdırmak için önce ne yapılacağını anlatmak gerekir. Buradaki zorluk, iyi bir prompt yazmaktan daha geniştir. Ürün davranışı, sınırlar, öncelikler, kabul koşulları ve değişikliğin mevcut sistemle ilişkisi açık değilse ajan belirsizliği kodla doldurur.

Bu belirsizlik prototip aşamasında tolere edilebilir. Çalışan bir ürünün içinde ise pahalıdır. Aynı talimat, farklı bir ajan çalıştırmasında farklı mimari tercihlere, farklı hata yönetimine veya farklı veri akışlarına yol açabilir. Kod doğru görünebilir; fakat ürünün gerçekten çözmesi gereken problemi ıskalayabilir.

GitHub’ın spec-driven development yaklaşımı bu nedenle spesifikasyonu sürecin merkezine alıyor. Ajanın işi küçük, izole edilebilir ve test edilebilir parçalara bölündüğünde hem yönlendirme hem doğrulama kolaylaşıyor. Buradaki fikir, ajana daha güzel cümleler yazmak değil; yazılımın niyetini çalıştırılabilir bir mühendislik girdisine dönüştürmek. ([github.blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/?utm_source=openai))

Kodun ucuzladığı dünyada ürün kararları daha sık değişebilir. Bu iyi bir şeydir; çünkü küçük ekipler daha fazla fikri deneyebilir. Fakat karar verme hızı arttıkça yanlış hedefi hızlı gerçekleştirme riski de büyür. Bir ajanın yüzlerce dosyayı değiştirebilmesi, hangi değişikliğin yapılması gerektiğini kendiliğinden bildiği anlamına gelmez.

## Teknik borcun yanında niyet borcu da birikecek

AI tarafından üretilen kodun tamamı kötü olmayacak. Hatta birçok durumda mevcut koddan daha düzenli, daha kapsamlı ve daha iyi test edilmiş olabilir. Sorun başka yerde ortaya çıkıyor: Sistem büyüdükçe insanlar ve ajanlar, sistemin neden bu şekilde çalıştığını ne kadar anlayabiliyor?

Teknik borç, değişimi zorlaştıran kod ve mimari kararlarla ilgilidir. Fakat kod üretimi kolaylaştığında ekipler daha fazla değişikliği daha kısa sürede sisteme ekleyebilir. Bu da yalnızca kötü kod yazma riskini değil, gereğinden fazla kod yazma riskini büyütür. Kullanılmayan soyutlamalar, birbirini tekrar eden akışlar, artık geçerli olmayan varsayımlar ve üst üste eklenmiş ürün kararları sistemin anlaşılmasını zorlaştırır.

Martin Fowler’ın 2026’da aktardığı “cognitive debt” ve “intent debt” ayrımları bu tabloyu açıklamak için yararlı. Ekibin sistemi anlama kapasitesi azalabilir. Daha önemlisi, ürünün hedefleri ve kısıtları kodun dışında yeterince iyi tutulmazsa hem insanlar hem de ajanlar sistemin neyi amaçladığını giderek daha zor çıkarır. ([martinfowler.com](https://martinfowler.com/fragments/2026-04-02.html?utm_source=openai))

Bu yüzden geleceğin teknik borcu yalnızca “kodu temizlemek” meselesi olmayacak. Eski kararların neden alındığını, hangi davranışların korunması gerektiğini ve hangi sınırların değiştirilemeyeceğini de canlı tutmak gerekecek. Aksi hâlde ajanlar her yeni istekte sistemi biraz daha büyütürken, ekip sistemin anlamını kaybedebilir.

## Test, ajanı denetleyen son kapı değil çalışma ortamı olacak

Kod üretimi hızlandığında testleri sonradan yazmak daha da anlamsızlaşır. Ajanın ürettiği değişikliği değerlendirecek ölçütler yoksa ekip yalnızca kod incelemesine güvenmek zorunda kalır. Bu da üretim hızının kazancını kısa sürede geri alabilir.

Test burada yalnızca hataları yakalayan bir güvenlik ağı değildir. Ürünün hangi davranışının önemli olduğunu ajana anlatan bir arayüzdür. İyi tanımlanmış testler, ajanın kendi çıktısını değerlendirmesine ve başarısız olduğunda yeniden denemesine imkân verir. GitHub’ın ajan tabanlı geliştirme yaklaşımında da görevlerin izole ve test edilebilir parçalara ayrılması özellikle vurgulanıyor. ([github.blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/?utm_source=openai))

Yine de testlerin geçmesi tek başına yeterli değildir. METR’nin gerçek açık kaynak görevleriyle yaptığı değerlendirmede bazı ajanlar işlevsel olarak doğru görünen kodlar üretmiş, fakat test kapsamı, biçimlendirme, lint veya genel kod kalitesi açısından doğrudan kullanılamamıştır. Bu bulgu, otomatik test sonucunun yazılım kalitesinin tamamını temsil etmediğini gösteriyor. ([metr.org](https://metr.org/blog/2025-08-12-research-update-towards-reconciling-slowdown-with-time-horizons/?utm_source=openai))

Dolayısıyla doğrulama birkaç katmanda yapılacak: Ürün davranışı doğru mu? Sistem mevcut sözleşmeleri koruyor mu? Kod okunabilir ve değiştirilebilir mi? Yeni değişiklik gelecekteki ajan çalışmalarını kolaylaştırıyor mu, yoksa daha fazla bağlam gerektiren bir yapı mı bırakıyor?

## Bakım işi azalmak yerine hızlanacak

Ajanlar teknik borç görevlerini, test iyileştirmelerini ve dokümantasyon güncellemelerini üstlenebiliyor. Bu, bakım işinin ortadan kalkacağı anlamına gelmiyor. Tam tersine, bakım için daha fazla fırsat doğurabilir; çünkü küçük iyileştirmelerin maliyeti düşer.

Bir ekip artık tek bir büyük bakım projesini beklemeden onlarca küçük temizlik işini yaptırabilir. Bağımlılık güncellemeleri, tekrar eden kodların sadeleştirilmesi veya eksik testlerin tamamlanması daha sık gündeme gelebilir. Fakat her değişiklik bir inceleme ve doğrulama yükü de yaratır. Üretim maliyeti düşerken değişiklikleri anlamanın maliyeti aynı hızda düşmeyebilir.

Uzun vadeli yazılım geliştirme benchmark’ları bu farkı görünür kılıyor. SWE-EVO’da ajanlar tek bir hatayı düzeltmekten çok, birden fazla dosyaya yayılan ve mevcut davranışları koruyarak ilerlemeyi gerektiren evrim görevlerinde belirgin biçimde zorlanıyor. RoadmapBench gibi daha geniş sürüm yükseltme görevlerinde de en güçlü sistemler bile görevlerin tamamını çözemiyor. ([arxiv.org](https://arxiv.org/abs/2512.18470?utm_source=openai))

Bu sonuçlar, kısa bir fonksiyonun üretimiyle çalışan bir ürünü aylar boyunca değiştirebilmenin aynı beceri olmadığını gösteriyor. Kod üretimi hızlanıyor; fakat sistemin zaman içindeki bütünlüğünü korumak hâlâ daha geniş bir problem.

## Küçük ekipler daha güçlü olacak, ama daha fazla karar taşıyacak

Kodun ucuzlaması en çok küçük ekipleri değiştirebilir. Birkaç kişilik bir ekip, geçmişte ayrı ayrı planlama, uygulama, test, dokümantasyon ve bakım gerektiren işleri daha geniş bir yüzeyde yürütebilir. Tek bir geliştirici bile daha fazla fikri deneyebilir ve çalışan bir ürünün kapsamını büyütebilir.

Bu, büyük ekiplerin otomatik olarak gereksizleşeceği anlamına gelmez. Küçük ekiplerin üretim gücü artarken ürün kararlarının, mimari sınırların ve doğrulama sorumluluğunun yoğunluğu da artar. Ajanların yaptığı değişiklikleri kim gözden geçirecek? Hangi davranışlar değiştirilemez? Hangi teknik borç kabul edilebilir? Hangi özellik aslında hiç yapılmamalı?

Bu soruların cevabı ekip büyüklüğüyle değil, karar kalitesiyle ilgilidir. Küçük ekiplerin avantajı daha az koordinasyon olabilir. Dezavantajı ise yanlış kararların arkasına saklanacak katmanların bulunmamasıdır.

## Yazılım mühendisliği yönlendirme ve doğrulamaya kayıyor mu?

Evet, fakat bu dönüşümü “artık kimse kod yazmayacak” kadar basitleştirmemek gerekir. Martin Fowler’ın agentic programming tanımı, geliştiricinin kaynak ağacını doğrudan değiştiren, test çalıştıran ve uzun görevleri sürdüren ajanları yönettiği bir çalışma biçimini tarif ediyor. İnsan hâlâ yazılımın ne yaptığından ve nasıl çalıştığından sorumlu; yalnızca üretim biçimi değişiyor. ([martinfowler.com](https://martinfowler.com/bliki/AgenticProgramming.html?utm_source=openai))

Buradaki yeni mühendislik işi üç kelimeyle özetlenebilir: hedef, kanıt ve kontrol.

Hedef, ürünün ne yapması gerektiğini ve ne yapmaması gerektiğini açıklamaktır. Kanıt, ajanın ürettiği değişikliğin beklentiyi karşıladığını göstermektir. Kontrol ise birden fazla değişiklik, ajan veya deneme arasında sistemin yönünü korumaktır.

Bu dönüşüm, kod bilgisi gereksizleştiği için yaşanmayacak. Kod bilgisi, ajanın çıktısını anlamak, yanlış varsayımı fark etmek, mimari bedeli görmek ve uygun doğrulama yöntemini seçmek için daha önemli hâle gelecek. Fakat değer yalnızca satır üretmekten gelmeyecek.

## Sonuç

AI ajanları kodun büyük bölümünü yazabildiğinde yazılım geliştirmenin en zor kısmı, kodu üretmek değil, doğru değişikliği seçmek ve onun doğruluğunu göstermek olacak.

Ürün geliştirme hızlanacak. Küçük ekiplerin kapasitesi artacak. Teknik borcun bir kısmı daha ucuza temizlenebilecek. Aynı anda gereksiz kod, zayıf testler ve unutulmuş ürün niyetleri daha hızlı birikebilecek.

Bu yüzden geleceğin iyi mühendisliği, ajana en çok kodu yazdıran mühendislik olmayacak. Sistemin neyi amaçladığını açık tutan, değişikliği ölçebilen ve üretim hızını kaliteyle birlikte yöneten mühendislik olacak.

Kod ucuzladığında kıt kaynak, yazma kapasitesi değil; iyi karar verme, güvenilir doğrulama ve sistemin anlamını koruma becerisi hâline gelecek.
