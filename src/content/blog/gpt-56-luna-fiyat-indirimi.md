---
title: "GPT-5.6 Luna Fiyat İndirimi Ajanları Ucuzlatıyor"
description: "OpenAI, GPT-5.6 Luna fiyatını yüzde 80 düşürdü. Bu hamle, kod yazan ajanların kullanım maliyetini ve ürün tasarımını değiştirebilir."
slug: "gpt-56-luna-fiyat-indirimi"
publishedAt: 2026-08-05
tags: ["OpenAI", "GPT-5.6", "Codex", "AI ajanları", "API maliyeti", "yazılım geliştirme"]
category: "Yapay Zeka"
heroImage: "/blog/gpt-56-luna-fiyat-indirimi.png"
heroAlt: "Milyon token başına input fiyatının beşte bire inmesi."
featured: false
draft: false
sources:
  - label: "OpenAI, GPT-5.6 fiyat ve erişim duyurusu, 30 Temmuz 2026"
    url: "https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/"
    note: "Resmi duyuru; GPT-5.6 Luna ve Terra fiyatları, Fast mode, Codex ve ChatGPT Work kullanım bilgileri."
  - label: "Reddit r/codex, OpenAI cuts GPT-5.6 Terra and Luna prices, 30 Temmuz 2026"
    url: "https://www.reddit.com/r/codex/comments/1vazoph/openai_cuts_gpt56_terra_and_luna_prices/"
    note: "Aynı gün geliştirici topluluğundaki fiyat ve kullanım tartışması."
  - label: "Reddit r/singularity, OpenAI beats DeepSeek on price/performance after 80% Luna price cut, 30 Temmuz 2026"
    url: "https://www.reddit.com/r/singularity/comments/1vb1pen/openai_beats_deepseek_on_priceperformance_after/"
    note: "Aynı gün fiyat-performans ve maliyet tartışması."
  - label: "OpenAI Codex changelog"
    url: "https://releases.sh/openai/openai-codex-changelog?page=2"
    note: "Codex sürüm geçmişi ve GPT-5.6 dönemindeki araç, sandbox ve uygulama değişiklikleri için kontrol edildi."
  - label: "GitHub Trending"
    url: "https://github.com/trending"
    note: "Hafta içindeki geliştirici ilgisini ve GPT-5.6 ile ilişkili açık kaynak hareketini kontrol etmek için tarandı."
  - label: "TechCrunch, GPT-5.6 haberleri"
    url: "https://techcrunch.com/2026/07/09/openai-launches-its-new-family-of-models-with-gpt-5-6/"
    note: "GPT-5.6 ailesinin önceki lansman bağlamı için kullanıldı; 30 Temmuz fiyat indirimi için birinci taraf duyuru esas alındı."
  - label: "InfoQ Software Engineering News"
    url: "https://www.infoq.com/SoftwareEngineering/news/"
    note: "Aynı tarih aralığında doğrudan bu fiyat indirimiyle ilgili bir haber bulunup bulunmadığını kontrol etmek için tarandı."
  - label: "The Verge"
    url: "https://www.theverge.com/"
    note: "Aynı tarih aralığında doğrudan bu fiyat indirimiyle ilgili haber bulunup bulunmadığını kontrol etmek için tarandı."
  - label: "Ars Technica Information Technology"
    url: "https://arstechnica.com/information-technology/"
    note: "Aynı tarih aralığında doğrudan bu fiyat indirimiyle ilgili haber bulunup bulunmadığını kontrol etmek için tarandı."
---

OpenAI, 30 Temmuz 2026'da GPT-5.6 Luna ve GPT-5.6 Terra için API fiyatlarını düşürdü. Luna'nın giriş fiyatı milyon token başına 1 dolardan 0,20 dolara, çıkış fiyatı 6 dolardan 1,20 dolara indi. Terra ise milyon giriş token'ı için 2 dolara, çıkış token'ı için 12 dolara geldi. GPT-5.6 Sol'un fiyatı değişmedi. Aynı duyuruda Sol için API tarafında Fast mode da açıldı. OpenAI bu modun standart işleme göre 2,5 kata kadar daha hızlı çalışacağını, fiyatın ise iki kat olacağını söylüyor.

Bu haberi hafta boyunca konuşulan gelişme olarak seçmemin nedeni fiyatın kendisinden çok, fiyat indiriminin Codex ve ChatGPT Work kullanımına da yansıması. OpenAI, Luna ve Terra kullanımının ücretli aboneliklerde daha az kredi tüketeceğini belirtiyor. Reddit'te r/codex ve r/singularity topluluklarında 30 Temmuz'da açılan başlıklarda tartışma doğrudan bu noktaya kaydı. İnsanlar modelin daha iyi olup olmadığından önce, aynı bütçeyle kaç görev çalıştırabileceklerini hesaplamaya başladı.

## Luna'nın ucuzlaması geliştirici için ne değiştirir?

Bir Product Engineer olarak benim ilk baktığım yer modelin benchmark skoru değil, bir görevin baştan sona maliyeti oluyor. Bir ajan sadece cevap üretmiyor. Depoyu tarıyor, dosya okuyor, komut çalıştırıyor, test başlatıyor, hata çıktısını yeniden modele veriyor ve birkaç tur daha devam ediyor. Bu zincirde modelin her çağrısı küçük görünse bile toplam kullanım hızla büyüyebiliyor.

Luna'nın yeni fiyatı bu hesabı aşağı çekiyor. OpenAI'nin verdiği fiyatlara göre 1 milyon giriş ve 1 milyon çıkış token'ı için toplam bedel 7 dolardan 1,40 dolara iniyor. Bu oran, özellikle iyi tanımlanmış ve tekrar eden işlerde deneme eşiğini azaltabilir. Örneğin kod biçimlendirme, test dosyası üretme, basit migration taslağı hazırlama veya pull request açıklaması yazma gibi işlerde daha ucuz bir modelin sürekli çalışması makul hale gelebilir.

Burada benim görüşüm net: Ajanları üretime sokmanın önündeki engellerden biri model kalitesi kadar görev başına maliyetti. Luna indirimi bu engeli gerçekten küçültüyor. Fakat maliyet hesabını yalnız token fiyatından yapmak hatalı olur. Ajanın yanlış dosyaya yazdığı değişikliği incelemek, başarısız denemeleri tekrar çalıştırmak ve insan onayı eklemek de toplam hesabın parçası.

OpenAI'nin duyurusunda Luna'nın araç kullanabildiği ve çok adımlı iş akışlarını tamamlayabildiği yazıyor. Şirket ayrıca kendi müşterilerinden örnekler veriyor. Replit, Notion, Ramp, Blitzy, Cognition ve Dust gibi şirketlerin Luna ile maliyet veya hız kazanımı bildirdiği aktarılıyor. Bu örnekleri okudum, fakat bunların bağımsız test olmadığını unutmamak gerekiyor. Şirketlerin hangi görevleri ölçtüğünü, başarısız çağrıları nasıl saydığını ve önceki varsayılan modellerinin ne olduğunu her zaman bilmiyoruz.

## Ucuz model, daha fazla otomasyon anlamına gelmez

Fiyatın düşmesi ekipleri daha fazla otomasyon denemeye itebilir. Benim tereddüdüm burada başlıyor. Daha ucuz bir model, ajanı daha geniş yetkilerle çalıştırmak için tek başına gerekçe değil. Özellikle dosya silme, veritabanı değişikliği veya ödeme akışı gibi geri dönüşü zor işlemlerde modelin ucuzlaması izin sınırlarını gevşetmemeli.

Bu nedenle Luna'yı daha çok bir iş bölümü aracı gibi düşünmek bana daha mantıklı geliyor. Sol belirsizliği azaltabilir, planı çıkarabilir veya zor bir hatayı inceleyebilir. Luna ise açıkça tarif edilmiş değişikliği uygulayabilir, testleri çalıştırabilir ve çıktıyı raporlayabilir. Bu yaklaşım OpenAI'nin kendi duyurusundaki örnekle de uyumlu. Şirket, Sol'un planlama ve belirsizlik çözme aşamasında, Luna'nın da uygulama ve test aşamasında kullanılabileceğini söylüyor.

Yine de bu mimarinin gerçekten daha ucuz olup olmadığını proje bazında ölçmek gerekir. Luna daha az para harcatırken daha fazla tur çalıştırıyorsa kazanç küçülebilir. Ajanın ürettiği patch sürekli insan tarafından düzeltiliyorsa düşük token fiyatı pratikte anlamını yitirir. Ben olsam ilk denemede üç metriği ayrı izlerdim: başarılı görev başına model maliyeti, insan müdahalesi gereken görev oranı ve geri alınan değişiklik sayısı.

OpenAI, fiyat indiriminin arkasında model, inference sistemi ve ajan altyapısındaki verimlilik iyileştirmelerini gösteriyor. Şirket, GPT-5.6 Sol'un üretim kernel'larını yeniden düzenlediğini ve bunun servis maliyetini yüzde 20 azalttığını, token üretim verimliliğini de yüzde 15'ten fazla artırdığını belirtiyor. Bu rakamları dışarıdan doğrulayamıyorum. Duyuruda kullanılan deney düzeni, karşılaştırma tabanı ve maliyet hesabının ayrıntıları yer almıyor. Bu yüzden bunu kanıtlanmış bir sektör maliyeti düşüşü olarak değil, OpenAI'nin kendi açıklaması olarak okumak gerekiyor.

Benim için haberin değeri Luna'nın artık ucuz olmasıyla sınırlı değil. OpenAI, model seçimini tek bir “en iyi model” kararından çıkarıp iş akışının farklı adımlarına dağıtıyor. Bu yaklaşım doğru kurulursa ajanlar daha çok yerde kullanılabilir. Yanlış kurulursa ekipler düşük fiyatın verdiği rahatlıkla daha fazla otomasyonu kontrolsüz biçimde çalıştırabilir.

30 Temmuz'daki değişiklikten sonra benim bakacağım şey, fiyat tablosu değil görev başına sonuç olacak. Bir modelin milyon token fiyatı düşebilir. Ürünün maliyeti ancak görev güvenilir biçimde tamamlandığında düşmüş sayılır.
