---
title: "Claude’un görünmez işareti kod yazımını da tartışmaya açtı"
description: "Anthropic’in 14 Ağustos tarihli açıklaması, Claude çıktılarındaki görünmez işaretlerin kod ve ürün ekipleri için ne anlama geldiğini gündeme taşıdı."
slug: "claude-gorunmez-isaret-kod-yazimi"
publishedAt: 2026-08-20
tags: ["Anthropic", "Claude", "AI watermarking", "Claude Code", "yazılım geliştirme", "EU AI Act"]
category: "Yapay zeka"
heroImage: "/blog/claude-gorunmez-isaret-kod-yazimi.png"
heroAlt: "Seçimin rastgele sayı yerine anahtar hash'iyle yapılması."
featured: false
draft: false
sources:
  - label: "Anthropic, How Claude marks AI-generated content"
    url: "https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content"
    note: "Birincil kaynak. Metin ve dosya işaretleme yaklaşımı, model seviyesi uygulama ve sınırlamalar."
  - label: "Anthropic’in watermarking FAQ açıklaması üzerine r/ClaudeAI tartışması"
    url: "https://www.reddit.com/r/ClaudeAI/comments/1vokr48/anthropic_writes_an_faq_about_watermarking/"
    note: "14 Ağustos 2026 tarihli topluluk tartışması; kullanıcıların resmi FAQ’daki belirsizlikleri ve sınırları tartıştığı kaynak."
  - label: "Claude görünmez watermark tartışması, r/ClaudeAI"
    url: "https://www.reddit.com/r/ClaudeAI/comments/1vn3342/claude_is_now_invisibly_watermarking_all_text/"
    note: "13 Ağustos 2026 tarihli tartışma; API, Claude Code, model seviyesi işaretleme ve kalite iddiası hakkında kullanıcı tepkileri."
  - label: "Claude görünmez watermark tartışması, r/artificial"
    url: "https://www.reddit.com/r/artificial/comments/1vlag0q/claude_now_embeds_an_invisible_watermark_into/"
    note: "Aynı hafta içinde daha geniş AI topluluğundaki tartışma; işaretin kapsamı ve sınırlamaları."
  - label: "Hacker News, SynthID tartışması"
    url: "https://news.ycombinator.com/item?id=47169146"
    note: "Metin işaretleme ve AI çıktılarının tespit edilebilirliği üzerine geliştirici topluluğu tartışması."
  - label: "GitHub Trending"
    url: "https://github.com/trending"
    note: "20 Ağustos 2026 tarihinde Claude Code ve ajan iş akışları çevresindeki projelerin görünürlüğünü kontrol etmek için incelendi."
---

Anthropic’in 14 Ağustos’ta yayımladığı açıklama, Claude’un ürettiği içeriklere makine tarafından okunabilir işaretler ekleme yaklaşımını ayrıntılandırdı. Konu birkaç gün içinde Claude kullanıcı topluluklarında büyüdü. Tartışmanın teknik tarafı kadar, bu işaretlerin kod yazarken ne anlama geldiği de konuşuldu.

Benim dikkatimi çeken bölüm şu: Anthropic bunu yalnızca Claude sohbet ekranına bağlı bir özellik gibi anlatmıyor. Yardım merkezindeki açıklamaya göre işaretleme model seviyesinde uygulanıyor. Bu yüzden içerik API’den, Claude Code’dan ya da başka bir Claude ürününden gelmiş olsa da aynı yaklaşımın parçası olabiliyor. Desteklenen görsel dosyalarında C2PA tabanlı imzalı kaynak bilgisi kullanılıyor. Metin tarafında ise gözle görülemeyen bir işaretleme yöntemi tarif ediliyor.

Bu bilgi, “Claude ile yazılmış metni nasıl anlarım?” sorusundan daha dar ve daha kullanışlı bir yere gidiyor. Bir ekip, kendi sisteminde model çıktısını saklıyorsa, işaretleme bilgisini üretim sürecinin bir parçası olarak değerlendirebilir. Bir editör, destek talebine verilen yanıtın model tarafından hazırlanıp hazırlanmadığını inceleyebilir. Bir yazılım ekibi de kod incelemesinde Claude’un kullandığı dosyaları ve ürettiği yamaları ayrı bir kayıtla takip edebilir.

Burada bir ayrım yapmak gerekiyor. Bir işaretin bulunması, içeriğin tamamını Claude’un yazdığını kanıtlamıyor. Anthropic’in kendi açıklamasında da işaretin, içeriğin Claude tarafından işlendiğine dair bir sinyal olduğu ve tek başına tam kaynak doğrulaması sağlamadığı belirtiliyor. İşaretin bulunmaması da insan yazımı için kesin kanıt sayılmıyor. İçerik yoğun biçimde yeniden yazıldığında işaretin kalıcılığı değişebilir.

Bu ayrım, kod için daha da önemli. Bir geliştirici Claude Code’dan bir fonksiyon taslağı alıp değişken adlarını değiştirebilir, mimariyi baştan kurabilir ve testleri kendisi yazabilir. Ortaya çıkan kodun ne kadarının modele ait olduğunu tek bir teknik işaret söyleyemez. Buna rağmen işaretleme, süreç kaydının yerini tutmasa da bir başlangıç sinyali sağlayabilir. Bana kalırsa ekiplerin ihtiyacı da tam olarak “bu kod AI mı?” etiketi değil, hangi dosyaya hangi araçla dokunulduğunu gösteren daha sıradan bir kayıt sistemi.

## Tartışma 14 Ağustos’ta neden büyüdü?

Konunun büyümesinde Anthropic’in açıklamasının zamanlaması etkili oldu. 13 ve 14 Ağustos’ta Reddit’teki Claude topluluklarında kullanıcılar, işaretlemenin API ve Claude Code çıktıları için geçerli olup olmadığını, eski modellerin ne zaman kapsama alınacağını ve kalite üzerinde etkisi bulunup bulunmadığını tartıştı. Bazı kullanıcılar bunun AB düzenlemelerine uyum için gerekli olduğunu savundu. Bazıları ise modelin bir sonraki kelime seçimlerine ek bir kısıt gelmesinin kaliteyi etkileyebileceğini öne sürdü.

Anthropic ise işaretlemenin anlamı, kaliteyi ve okunabilirliği değiştirmediğini söylüyor. Bu iddianın pratikte nasıl doğrulanacağını bilmiyoruz. Şirket yöntemin bütün ayrıntılarını yayımlamadığı için bağımsız bir geliştiricinin kendi testini kurması kolay görünmüyor. Ben burada temkinliyim. Bir sistemin kaliteyi etkilemediğini söylemek, farklı dillerde, farklı sıcaklık ayarlarında ve özellikle kod üretiminde aynı sonucu verdiğini göstermekle aynı şey değil.

Hacker News’te daha önce Google’ın SynthID çalışması üzerinden metin işaretleme tartışılmıştı. GitHub Trending’de de Claude Code ve ajan iş akışları çevresindeki projelerin görünürlüğü, bu konunun artık yalnızca model araştırmacılarının gündeminde kalmadığını gösteriyor. Yine de bu haftaki haber trafiğinde en doğrudan belgelenmiş kaynak Anthropic’in 14 Ağustos tarihli açıklaması oldu. Büyük teknoloji yayınlarında aynı hafta içinde bu duyuruyu ayrıntılı biçimde ele alan doğrulanabilir bir yazıya rastlamadım.

## Ürün ekipleri için gerçek soru kayıt tutmak

Bir ürün geliştiriyorsam ilk işim çıktıyı “AI üretimi” diye damgalamak olmazdı. İstek kimden geldi, hangi model sürümü kullanıldı, çıktı hangi dosyaya girdi, insan neyi değiştirdi ve hangi testler çalıştı, bunları kaydederdim. Anthropic’in işareti bu bilgilerin hiçbirini tek başına vermiyor.

Bu yüzden açıklamanın yazılım ekipleri açısından etkisi bence daha çok yönetişim tarafında. Model çıktısı artık bir API yanıtı gibi ele alınamayacak kadar süreç bilgisi taşıyor. Üretimde kullanılan bir kod parçasının kaynağını açıklamak gerektiğinde, sağlayıcının görünmez işaretine güvenmek yerine kendi kayıtlarınıza bakmanız gerekecek.

Bir de ters ihtimal var. Şirketler bu işaretleri otomatik denetim için kullanmaya başlarsa, yanlış pozitifler ortaya çıkabilir. Claude’dan yalnızca bir fonksiyonun dokümantasyonunu düzelttiren geliştirici ile bütün modülü Claude’a yazdıran geliştirici aynı işaretle karşılaşabilir. Bu iki durumu aynı kurala bağlamak adil olmaz.

Benim vardığım yer şu: Anthropic’in açıklaması, AI çıktılarının kaynağı hakkında daha fazla konuşmamız gerektiğini gösteriyor. Fakat görünmez bir işaret, yazılım tedarik zincirindeki insan kararlarının yerini tutmaz. Claude’un kod yazmasıyla ilgili kayıt tutacaksam bunu modelin bıraktığı sinyale emanet etmem. Kendi git geçmişimi, pull request açıklamalarımı ve test sonuçlarımı düzenli tutarım. Bu yöntem daha sıkıcı, ama neyi kanıtladığı daha açık.
