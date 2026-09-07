---
title: "Güvenilir AI Ürünü İçin Trace Yetmez, Sözleşme Gerekir"
description: "AI özelliklerinde model çağrısını izlemek yetmez. Standart trace alanları, maliyet ve hata analizini nasıl güvenilir hale getiriyor?"
slug: "ai-trace-semantic-conventions"
publishedAt: 2026-07-30
updatedAt: 2026-09-07
tags: ["AI ürünleri", "OpenTelemetry", "observability", "GenAI", "güvenilirlik"]
category: "Yapay Zekâ"
heroImage: "/blog/ai-trace-semantic-conventions.png"
heroAlt: "Standart trace alanlarının maliyet ve hata analizini mümkün kılması."
featured: false
draft: false
sources:
  - label: "OpenTelemetry GenAI Metrics Semantic Conventions"
    url: "https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-metrics/"
    note: "GenAI istemci ve sunucu metrikleri; token kullanımı, operasyon süresi ve streaming gecikmesi alanlarını açıklar."
  - label: "OpenTelemetry GenAI Spans Semantic Conventions"
    url: "https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/"
    note: "Model, retrieval, agent ve tool işlemleri için span türlerini ve ilişkili alanları tanımlar."
  - label: "OpenTelemetry GenAI Semantic Conventions Repository"
    url: "https://github.com/open-telemetry/semantic-conventions-genai"
    note: "GenAI semantic conventions projesinin güncel şema, dokümantasyon ve sürüm durumunu içerir."
  - label: "OpenTelemetry Semantic Conventions Releases"
    url: "https://github.com/open-telemetry/semantic-conventions/releases"
    note: "Semantic convention sürümlerindeki değişiklikleri ve GenAI alanındaki breaking change kayıtlarını gösterir."
  - label: "OpenTelemetry Specification Overview"
    url: "https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/overview.md"
    note: "OpenTelemetry specification ve semantic convention yaklaşımının genel çerçevesini açıklar."
---

Bir AI özelliği yanlış cevap verdiğinde ekiplerin ilk refleksi genellikle promptu kaydetmek oluyor. Kullanıcı ne sordu, modele ne gönderdik, model ne döndürdü? Bunlar elbette önemli. Fakat üretimdeki sorun çoğu zaman tek bir model çağrısından çıkmıyor.

İstek önce bir sınıflandırıcıya gidiyor, ardından bir arama servisi çalışıyor, sonra bir araç çağrısı yapılıyor ve en sonunda cevap üretiliyor. Aynı kullanıcı isteği farklı model sürümlerine, farklı veri kaynaklarına veya farklı araç sonuçlarına maruz kalabiliyor.

Bu yüzden **AI izlenebilirliği, yalnızca prompt ve cevabı saklama işi değil**. Sistem içindeki adımları ortak bir sözleşmeyle ilişkilendirme işi.

## Log satırlarından çalışma izi çıkarmak

Klasik backend gözlemlenebilirliğinde bir HTTP isteğinin hangi servislere uğradığını trace üzerinden görebiliriz. Her span, işlemin bir parçasını temsil eder. GenAI uygulamalarında da benzer bir yapı gerekiyor; ancak burada model, token, retrieval, agent ve tool çağrıları gibi yeni kavramlar var.

OpenTelemetry’nin GenAI semantic conventions çalışması bu kavramları ortak alan adlarıyla tarif ediyor. Örneğin bir model çağrısında sağlayıcı, istenen model, operasyon adı, cevap modeli ve token kullanımı gibi bilgiler standartlaştırılabiliyor. Retrieval işlemleri için veri kaynağı ve sorgu gibi alanlar; agent işlemleri için de agent adı ve sürümü gibi bilgiler tanımlanıyor. ([github.com](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/gen-ai/gen-ai-metrics.md))

Bu standardizasyon, farklı kütüphanelerden gelen veriyi aynı sorguda incelemeyi mümkün kılar. Uygulama bugün bir sağlayıcıyı, yarın başka bir sağlayıcıyı kullansa bile dashboard’un her sağlayıcı için ayrı bir alan adı ezberlemesi gerekmez.

İyi bir trace şu sorulara cevap verebilmelidir:

- Bu istek hangi AI sağlayıcısına ve hangi modele gitti?
- Kullanıcı isteği retrieval adımından geçti mi?
- Hangi veri kaynağı kullanıldı?
- Hangi araçlar çağrıldı ve hangileri hata verdi?
- Gecikmenin ne kadarı modelden, ne kadarı uygulamadaki diğer adımlardan kaynaklandı?
- Token kullanımı ve dolayısıyla maliyet hangi işlemle ilişkili?

Bu soruların her biri için ekip içinde farklı isimler kullanılırsa sistem büyüdükçe izleri birleştirmek zorlaşır.

![İsteğin model, retrieval ve araç çağrısı adımlarından geçişi.](/blog/ai-trace-semantic-conventions-inline-1.svg)

*Bir AI isteğinin trace'i*

## Her şeyi kaydetmek güvenilirlik sağlamaz

AI trace’lerinin önemli bir riski var: İçerik verisi çok hassas olabilir. Kullanıcı mesajları, sistem talimatları, arama sonuçları ve araç çıktıları kişisel veya ticari bilgi içerebilir.

OpenTelemetry dokümantasyonu da giriş ve çıkış mesajı alanlarının hassas veri içerebileceğini açıkça belirtiyor. Bu nedenle içerik kaydı varsayılan bir refleks haline gelmemeli; hangi ortamda, hangi kullanıcı grubunda ve hangi maskeleme kurallarıyla veri tutulacağı tasarlanmalı. ([github.com](https://github.com/open-telemetry/opentelemetry-python/blob/main/opentelemetry-semantic-conventions/src/opentelemetry/semconv/_incubating/attributes/gen_ai_attributes.py))

Burada iki uç yaklaşım da sorunlu:

- Hiç içerik kaydetmemek, hatayı yeniden üretmeyi ve kalite incelemesini zorlaştırır.
- Her şeyi ham haliyle kaydetmek, gözlemlenebilirlik sorununu veri sızıntısı sorununa dönüştürebilir.

Daha sağlıklı bir tasarım, metadata ile içeriği ayırır. Üretimde model, sağlayıcı, operasyon, gecikme, token ve hata türü gibi alanlar tutulabilir. Mesaj içeriği ise seçili ortamlarda, kısa süreyle veya redakte edilmiş biçimde kaydedilebilir.

*Semantic convention kullanmak, veri saklama politikasının yerine geçmez.* Standart alan adları size neyi kaydedebileceğinizi anlatır; neyi kaydetmenizin uygun olduğunu ayrıca değerlendirmeniz gerekir.

![Teknik metadata görünürken hassas içeriğin maskelenmesi.](/blog/ai-trace-semantic-conventions-inline-2.svg)

*Telemetride maskeleme*

## Ölçüm alanları tasarım kararlarını etkiler

Bir trace yalnızca hata ayıklama aracı değildir. Ürün kararlarını da besler. Örneğin toplam gecikmenin yüksek olduğunu görebilirsiniz. Fakat tek bir süre metriği, problemin nerede olduğunu söylemez.

OpenTelemetry GenAI metrikleri arasında token kullanımı, operasyon süresi, ilk çıktı parçasına kadar geçen süre ve çıktı parçaları arasındaki süre gibi ölçümler bulunuyor. Bu alanlar hâlâ gelişim aşamasında; dokümantasyon da mevcut instrumentasyonların semantik convention sürümlerini kontrollü biçimde değiştirmesi gerektiğini belirtiyor. ([github.com](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/gen-ai/gen-ai-metrics.md))

Örneğin bir sohbet ekranında kullanıcı ilk token’ı hızlı görüyorsa toplam cevap süresi biraz daha uzun olsa bile deneyim kabul edilebilir olabilir. Buna karşılık ilk token’a kadar bekleme uzunsa, modelin toplam üretim süresi aynı kalsa bile kullanıcı ürünü yavaş hissedebilir.

Benzer şekilde token maliyetini yalnızca günlük toplam olarak izlemek de yetersizdir. Maliyeti operasyon adı, model, özellik ve tenant gibi düşük kardinaliteli alanlarla ilişkilendirmek gerekir. Aksi halde “en pahalı model hangisi?” sorusuna cevap verirken “hangi ürün akışı bu maliyeti üretiyor?” sorusu cevapsız kalır.

## Trace sözleşmesi nasıl kurulmalı?

Standart alanları doğrudan uygulamaya eklemek başlangıç için yararlı olabilir. Fakat ekip kendi uygulama alanlarını da dikkatle belirlemeli. Bu alanlar, OpenTelemetry’nin tanımladığı alanlarla karıştırılmamalı ve yüksek çeşitlilik üreten değerler kontrol altında tutulmalı.

Basit bir trace sözleşmesinde şu katmanlar bulunabilir:

| Katman | Örnek bilgi | Kullanım amacı |
|---|---|---|
| İstek | conversation ID, ürün özelliği, tenant | Aynı kullanıcı akışını ilişkilendirmek |
| Model | sağlayıcı, istenen model, cevap modeli | Model davranışını ve değişiklikleri karşılaştırmak |
| Retrieval | veri kaynağı, sorgu, sonuç sayısı | Grounding sorunlarını incelemek |
| Tool | araç adı, sonuç durumu, hata türü | Harici bağımlılıkları ayırmak |
| Ölçüm | token, süre, ilk çıktı zamanı | Maliyet ve performans analizi |

Conversation ID gibi ilişkilendirme alanları faydalıdır; ancak kullanıcı kimliğini doğrudan trace içine koymak zorunda değilsiniz. İç sistemde güvenli bir korelasyon anahtarı üretmek, hem inceleme hem de veri minimizasyonu açısından daha uygun olabilir.

Araç çağrılarında yalnızca “tool başladı” ve “tool bitti” bilgisi de yetmez. Araç adı, çağrının başarılı olup olmadığı, hata türü ve gerekiyorsa sonuç boyutu izlenebilir. Bununla birlikte araç parametrelerini ham haliyle saklamak yerine alan bazlı maskeleme uygulanmalıdır.

## Sürüm değişince trace de değişir

GenAI semantic conventions henüz tamamen sabitlenmiş bir alan değil. Sürümler arasında alan adları değişebiliyor; örneğin sağlayıcı bilgisinin adlandırılması ve mesaj geçmişinin temsil biçimi yeniden düzenlenmiş durumda. Bu, standardın işe yaramadığı anlamına gelmiyor. Tam tersine, gelişen bir alanı kullanırken şema sürümünü görünür tutmanın önemini gösteriyor. ([github.com](https://github.com/open-telemetry/semantic-conventions/releases))

Uygulama şu üç bilgiyi birlikte yönetmeli:

1. Telemetriyi üreten instrumentasyon sürümü.
2. Kullanılan semantic convention şema sürümü.
3. Uygulamanın kendi trace sözleşmesi sürümü.

Bunlar ayrılmazsa bir dashboard’daki boşluk, gerçekten veri gelmediği için mi yoksa alan adı değiştiği için mi oluştuğunu anlamak zorlaşır.

> Güvenilir AI ürünlerinde gözlemlenebilirlik, daha fazla veri toplamakla değil, aynı olayı her katmanda aynı şekilde tarif etmekle başlar.

## Üretimde işe yarayan minimum set

Her AI akışında bütün mesajları, bütün tool parametrelerini ve bütün retrieval belgelerini saklamak gerekmiyor. Başlangıçta şu minimum set çoğu ekip için daha yönetilebilir olabilir:

- İstek ve cevap için ortak trace ID.
- AI sağlayıcısı, istenen model ve operasyon adı.
- Model gecikmesi, toplam akış gecikmesi ve ilk çıktı zamanı.
- Giriş ve çıkış token sayısı, mümkünse billable token bilgisi.
- Retrieval kullanıldıysa veri kaynağı kimliği ve sonuç sayısı.
- Tool çağrılarında araç adı, durum ve hata türü.
- İçerik kaydı için açık bir opt-in, maskeleme ve saklama süresi.
- Şema sürümünü belirten telemetri metadata’sı.

Bu alanlar tek başına cevap kalitesini ölçmez. Faithfulness, doğruluk veya görev başarısı için ayrıca değerlendirme sistemleri gerekir. Fakat bu ölçümler olmadan kalite düşüşünün hangi değişiklikten sonra başladığını bulmak çok daha zor olur.

AI özellikleri üretim sistemlerine yerleştikçe “model ne cevap verdi?” sorusu tek başına yetersiz kalacak. Ürünün hangi yolu izlediğini, hangi veriye dayandığını, ne kadar beklediğini ve hangi maliyeti oluşturduğunu da görebilmek gerekecek.

Bu nedenle trace tasarımını sonradan eklenecek bir debug katmanı gibi değil, ürünün çalışma sözleşmesinin bir parçası olarak ele almak daha doğru. Standartlar değişebilir; fakat ortak, sürümlenebilir ve kontrollü bir iz bırakma fikri kalıcı olacak.
