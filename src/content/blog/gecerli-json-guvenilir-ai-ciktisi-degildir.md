---
title: "Geçerli JSON, güvenilir AI çıktısı değildir"
description: "Structured output biçimi düzeltir; gerçeği garanti etmez. AI çıktısını üretimde güvenle kullanmak için şema, alan doğrulama ve insan onayını ayırmak gerekir."
slug: "gecerli-json-guvenilir-ai-ciktisi-degildir"
publishedAt: 2026-07-14
tags: ["yapay-zeka", "backend", "otomasyon"]
category: "Yapay Zekâ"
heroImage: "/blog/ai-json-dogrulama.png"
heroAlt: "JSON şemasından geçen ancak anlam kontrolü ve insan onayı bekleyen AI çıktısını gösteren katmanlı diyagram"
featured: false
draft: false
sources:
  - label: "OpenAI — Structured model outputs"
    url: "https://developers.openai.com/api/docs/guides/structured-outputs"
    note: "JSON Schema ile şemaya uyan çıktı üretimini, sınırlamaları ve güvenlik reddi durumlarını açıklıyor."
  - label: "Google Gemini API — Structured outputs"
    url: "https://ai.google.dev/gemini-api/docs/structured-output"
    note: "Gemini modellerinde JSON Schema tabanlı yapılandırılmış çıktı kullanımını ve uygulama tarafı doğrulama ihtiyacını anlatıyor."
  - label: "JSON Schema — What is JSON Schema?"
    url: "https://json-schema.org/overview/what-is-jsonschema"
    note: "JSON verisinin yapısını ve kısıtlarını tanımlayan standarda genel bakış sunuyor."
---

Bir AI çağrısından parse edilebilir JSON dönmesi rahatlatıcıdır. En azından kapanmayan tırnak, eksik virgül ve beklenmedik serbest metin sorunları azalır.

Ama burada tehlikeli bir zihinsel kısa yol var: **çıktı şemaya uyuyorsa doğru olduğunu varsaymak.**

```json
{
  "sourceUrl": "https://example.com/arastirma",
  "claim": "Araştırmaya göre dönüşüm yüzde 42 arttı.",
  "confidence": 0.97
}
```

Bu cevap kusursuz JSON olabilir. `confidence` sayı, `sourceUrl` URL ve `claim` metin olabilir. Buna rağmen kaynak var olmayabilir, yüzde kaynakta geçmeyebilir ve güven puanı hiçbir gerçek ölçüme dayanmayabilir.

Structured output sözdizimini kontrol eder. **Anlamı, doğruluğu ve iş kuralını ayrıca kontrol etmek gerekir.**

## Üç farklı doğrulama katmanı var

AI çıktısını tek bir “valid / invalid” kontrolüne sıkıştırmak yerine üç katmana ayırmak işleri netleştirir.

### 1. Yapısal doğrulama

Beklenen alanlar mevcut mu? Türler doğru mu? Enum dışına çıkılmış mı? Tarih biçimi ve dizi uzunluğu kurala uyuyor mu?

JSON Schema ve structured output özellikleri bu katmanda çok değerlidir. OpenAI ve Gemini dokümantasyonları, modellerin tanımlanan şemaya uygun yanıt üretmesini destekleyen mekanizmalar sunuyor. Bu sayede serbest metni kırılgan yöntemlerle ayıklamak yerine tipli bir sözleşmeyle çalışabiliriz.

Fakat “`publish: true` alanı boolean geldi” demek, yayının gerçekten güvenli olduğu anlamına gelmez.

### 2. Alansal ve anlamsal doğrulama

Değerler iş kurallarına uyuyor mu? Birbirleriyle çelişiyor mu? Dış dünyaya dair iddialar kaynakta gerçekten var mı?

Örneğin içerik otomasyonunda şu kontroller gerekir:

- Kaynak URL açılıyor mu ve güvenilir bir yayıncıya mı ait?
- Yazıdaki sayı, tarih ve alıntılar kaynak metinle eşleşiyor mu?
- Blog slug’ı daha önce kullanılmış mı?
- Görselin alt metni görseli gerçekten tarif ediyor mu?
- LinkedIn özeti blogdaki ana fikirle çelişiyor mu?
- “Gerçek kullanıcı deneyimim” gibi bir ifade, elimizde olmayan bir deneyimi uyduruyor mu?

Bunların çoğu JSON Schema ile ifade edilemez. Kod, veri tabanı sorgusu, kaynak çözümleme veya ikinci bir değerlendirme adımı gerekir.

### 3. Yayın ve risk doğrulaması

Çıktı doğru görünse bile otomatik olarak dış dünyaya gönderilmeli mi?

Bir taslağın marka tonu, mahremiyet, telif, bağlam ve itibar riski vardır. Özellikle kişinin kendi adıyla yayınlanan içerikte son kararın insanda olması en güvenli modeldir.

Bu yüzden içerik sisteminde “üretildi” ile “onaylandı” aynı durum olmamalı. Ben şu akışı tercih ederim:

```text
araştırma → taslak → otomatik kontroller → insan incelemesi → zamanlama → yayın
```

Her geçiş kayıt altına alınır; başarısız kontrol taslağı silmez, nedenini gösterir.

## Confidence alanına neden temkinli yaklaşırım?

Modelden `confidence: 0.94` istemek kolaydır. Fakat bu sayının nasıl kalibre edildiği belli değilse arayüze bilimsel bir kesinlik hissi verirken gerçekte yalnızca modelin ürettiği başka bir token olur.

Daha kullanışlı bir yaklaşım, güveni gözlenebilir sinyallerden hesaplamaktır:

- Kaç iddia birincil kaynakla eşleşti?
- Zorunlu alanların kaçı doğrulandı?
- Kaynak tarihi güncel mi?
- Çelişen kaynak var mı?
- İçerik benzerlik veya intihal eşiğini aşıyor mu?
- İnsan daha önce benzer uyarıları ne sıklıkla reddetti?

Böylece tek bir gizemli puan yerine açıklanabilir bir kontrol raporu oluşur.

## Retry her problemi çözmez

Şema doğrulaması başarısız olduğunda aynı isteği düzeltilmiş hata mesajıyla yeniden göndermek mantıklı olabilir. Fakat anlamsal hata için körlemesine retry yapmak, aynı yanlışın farklı kelimelerle tekrar üretilmesine yol açabilir.

Retry stratejisini hata sınıfına göre ayırmak gerekir:

- Parse veya şema hatası: sınırlı ve yönlendirilmiş yeniden deneme.
- Rate limit veya geçici servis hatası: backoff ile yeniden deneme.
- Kaynak doğrulanamadı: yeni kaynak bulma ya da insan incelemesi.
- Güvenlik reddi: akışı durdurma ve nedeni gösterme.
- Çelişkili iddia: otomatik yayın yasağı.

Bu ayrım hem maliyeti hem de sessizce yanlış içerik üretme riskini azaltır.

## İçerik otomasyonuna uygulanmış örnek

Bir blog ve LinkedIn otomasyonunda modelden tek seferde nihai yazı istemek yerine aşamalı sözleşmeler kullanılabilir.

İlk çağrı araştırma paketi üretir: konu, arama niyeti, birincil kaynaklar ve doğrulanması gereken iddialar. İkinci çağrı yalnızca onaylanan paketten taslak çıkarır. Kod tarafı bağlantıları ve metadata’yı kontrol eder. Son ekranda insan; blog yazısını, kısa LinkedIn versiyonunu ve görseli aynı paket içinde görür.

Onay verilmeden yayın anahtarına erişilmez. Böylece model üretim yapabilir ama karar yetkisi kazanmaz.

## Sonuç: biçim güvenilirliğin başlangıcıdır

Structured output önemli bir araç. Tip güvenliği sağlar, entegrasyonu sadeleştirir ve hataların büyük bir sınıfını ortadan kaldırır. Fakat güvenilir AI ürünü yalnızca düzgün JSON üreten ürün değildir.

Güvenilirlik; şemanın ardından gelen alan kontrolleri, kaynak doğrulaması, gözlemlenebilirlik, güvenli fallback ve riskli adımlarda insan onayıyla oluşur.

Kısacası JSON’ın parse edilmesi, cevabın doğru olduğu an değil; asıl doğrulamanın başlayabildiği andır.
