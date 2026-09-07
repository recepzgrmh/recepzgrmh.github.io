---
title: "MCP Sunucusunda Güven Sınırı Nerede Başlar?"
description: "MCP sunucuları AI ajanlarını araçlara bağlarken yeni bir güven alanı oluşturuyor. Güvenli yetkilendirme ve araç tasarımı için temel kontroller."
slug: "mcp-sunucu-guvenlik-siniri"
publishedAt: 2026-07-23
tags: ["MCP", "Model Context Protocol", "AI güvenliği", "OAuth", "ajan güvenliği", "backend"]
category: "Güvenlik"
heroImage: "/blog/mcp-sunucu-guvenlik-siniri.png"
heroAlt: "MCP sunucusunun ajan ile araçlar arasındaki güven sınırı."
featured: false
draft: false
sources:
  - label: "Model Context Protocol — Authorization Specification"
    url: "https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization"
    note: "HTTP tabanlı MCP yetkilendirmesi, OAuth uyumu, token audience doğrulaması, PKCE ve token passthrough yasağı."
  - label: "Model Context Protocol — Understanding Authorization in MCP"
    url: "https://modelcontextprotocol.io/docs/tutorials/security/authorization"
    note: "MCP sunucularında OAuth 2.1 tabanlı yetkilendirme için resmi uygulama rehberi."
  - label: "OWASP MCP Security Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html"
    note: "Araç zehirleme, rug pull, confused deputy, aşırı yetki, SSRF, sandbox ve denetim kontrolleri."
  - label: "OWASP MCP Top 10"
    url: "https://owasp.org/www-project-mcp-top-10/"
    note: "MCP’ye özgü token yönetimi, yetki kapsamı, kimlik doğrulama, telemetri ve context injection riskleri."
  - label: "OWASP MCP Tool Poisoning"
    url: "https://owasp.org/www-community/attacks/MCP_Tool_Poisoning"
    note: "Araç tanımları ve çıktıları üzerinden dolaylı prompt injection saldırısının açıklaması."
  - label: "OWASP — A Practical Guide for Secure MCP Server Development"
    url: "https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/"
    note: "16 Şubat 2026 tarihli güvenli MCP sunucusu geliştirme rehberi; kimlik, yetkilendirme, doğrulama, oturum izolasyonu ve dağıtım kontrolleri."
---

Bir AI uygulamasına MCP sunucusu bağladığınızda genellikle ilk soru şudur: “Bu araç çalışıyor mu?” Üretim ortamında daha önemli soru ise şudur: **Bu araç hangi kimlikle, hangi veriye, hangi koşullarda erişebiliyor?**

Model Context Protocol, AI uygulamalarının veri kaynaklarına ve araçlara bağlanması için ortak bir iletişim katmanı sunuyor. Bu, her entegrasyon için ayrı bir bağlayıcı yazma ihtiyacını azaltıyor. Fakat standartlaşma, güven sınırını ortadan kaldırmıyor. Sadece bu sınırın daha görünür ve tekrar kullanılabilir bir biçimde tasarlanmasını gerektiriyor.

MCP sunucusu bir API gateway değildir. Bir modelin doğal dilden ürettiği niyet, araç çağrısına dönüşür. Bu çağrı da e-posta gönderme, kayıt değiştirme, dosya okuma veya başka bir servise istek atma gibi sonuçlar doğurabilir. Bu nedenle MCP güvenliği, yalnızca HTTP endpoint’ini korumaktan ibaret değildir.

## Bağlantı kurmak yetki vermek değildir

MCP’nin HTTP tabanlı yetkilendirme modeli OAuth 2.1, Protected Resource Metadata ve Authorization Server Metadata gibi standartlara dayanır. Bu modelde MCP sunucusu korunan kaynak, MCP istemcisi ise kaynak sahibi adına istek yapan istemci rolünü üstlenir.

Buradaki ayrıntılar uygulamanın güvenlik seviyesini doğrudan etkiler:

- Erişim belirteci her HTTP isteğinde `Authorization` başlığıyla gönderilmelidir.
- Belirteçler URL sorgu parametresine konulmamalıdır.
- MCP sunucusu, belirtecin kendisi için üretildiğini doğrulamalıdır.
- Başka bir servise verilmiş belirteç MCP sunucusuna aktarılmamalıdır.
- Yetkilendirme kodu akışında PKCE kullanılmalıdır.
- Geçersiz veya süresi dolmuş belirteçler reddedilmelidir.

Özellikle hedef kitle doğrulaması gözden kaçırılabiliyor. Bir istemci elinde geçerli görünen bir token taşıyor diye bu token her MCP sunucusuna gönderilemez. Token’ın geçerli olması ile **bu kaynak için verilmiş olması** aynı şey değildir.

Bu ayrım, MCP sunucusunu başka bir servisin önünde duran basit bir proxy olmaktan çıkarır. Sunucu, aldığı belirteci doğrulamalı ve isteğin gerçekten kendi kaynağına yönelik olup olmadığını kontrol etmelidir.

```http
POST /mcp HTTP/1.1
Host: tools.example.com
Authorization: Bearer <access-token>
Content-Type: application/json

{"jsonrpc":"2.0","method":"tools/call","params":{"name":"create_invoice"}}
```

Bu örnekte sunucunun yalnızca token’ın imzasına bakması yeterli değildir. Token’ın issuer, audience, süre ve kapsam bilgileri de kontrol edilmelidir. Aracın kendisi ayrıca kullanıcının bu işlemi yapmaya yetkili olup olmadığını değerlendirmelidir.

## Araç açıklaması da saldırı yüzeyidir

Klasik bir API’de geliştirici endpoint’i çağırır ve aldığı veriyi uygulama mantığı içinde işler. MCP’de ise araç isimleri, açıklamaları, parametre şemaları ve araç çıktıları modelin kararlarını etkileyebilir.

Bu yüzden araç tanımı yalnızca dokümantasyon değildir. Modelin davranışını biçimlendiren girdilerden biridir.

Kötü niyetli veya ele geçirilmiş bir sunucu, makul görünen bir araç açıklamasına modelin başka bir aracı çağırmasını isteyen talimatlar ekleyebilir. Daha sonra araç çıktısına da benzer yönergeler yerleştirebilir. Bu, dolaylı prompt injection biçimlerinden biridir. Model, dış sistemden gelen veriyi veri olarak değil talimat olarak yorumlarsa, yetkili araçları yanlış amaçla kullanabilir.

OWASP’ın MCP güvenlik çalışmalarında bu riskler araç zehirleme, araç tanımlarının sonradan değiştirilmesi, yetki kapsamının genişlemesi ve araçlar arası gölgelenme gibi başlıklarla ele alınıyor.

![MCP araç tanımı ve araç çıktısının model bağlamına girdiği akış.](/blog/mcp-sunucu-guvenlik-siniri-inline-1.svg)

*Araç çıktısı bağlama girerken*

Bunun pratik sonucu basit ama önemlidir: Bir aracı ilk kurulum sırasında incelemek, onu sonsuza kadar güvenilir yapmaz. Üretim sistemleri şu değişiklikleri izlemelidir:

- Araç adı ve açıklaması
- Parametre şeması
- Gerekli yetki kapsamları
- Dönen veri biçimi
- Sunucu paketi ve bağımlılıkları

Araç tanımlarını sürümlemek veya değişikliklerini imzalı bir manifest ile doğrulamak, “dün onaylanan araç bugün aynı araç mı?” sorusuna cevap verebilir. Bu kontrol her sistem için aynı biçimde uygulanmayabilir; ancak özellikle yazma, silme ve dış sisteme veri gönderme yetkisi olan araçlarda değişiklik görünürlüğü zorunlu hale gelir.

## Modelin erişimi ile kullanıcının yetkisi aynı değildir

Bir MCP sunucusu kendi servis hesabıyla geniş yetkilere sahip olabilir. Model de bu sunucu üzerinden işlem yaptığında, modelin kararları servis hesabının gücüyle birleşir. Burada bir confused deputy problemi oluşabilir: İstek kullanıcıdan geliyor gibi görünür, fakat işlemi daha geniş yetkiye sahip sunucu gerçekleştirir.

Örneğin bir kullanıcı yalnızca kendi siparişlerini görmeye yetkili olabilir. MCP sunucusu ise tüm siparişleri okuyabilen bir veritabanı hesabı kullanıyorsa, `get_order` aracı kullanıcı kimliğini gerçekten filtrelemiyorsa model yanlış kaydı okuyabilir.

Bu nedenle her araç çağrısında en az şu bağlamın açıkça taşınması gerekir:

| Kontrol | Sorulması gereken soru |
|---|---|
| Kimlik | İşlemi isteyen kullanıcı kim? |
| Kaynak | Hangi tenant, hesap veya proje kapsamındayız? |
| Araç | Bu kullanıcı bu aracı çağırabilir mi? |
| Parametre | İstenen kayıt bu kullanıcının kapsamına giriyor mu? |
| Etki | İşlem okuma mı, yazma mı, geri döndürülemez bir değişiklik mi? |

Modelin “bu kullanıcı adına” işlem yapması, sunucunun kullanıcı kimliğini tahmin etmesiyle sağlanamaz. Kimlik ve kapsam, doğrulanmış oturumdan veya yetkilendirilmiş token’dan gelmelidir. Modelin ürettiği metin bu bilgilerin kaynağı olamaz.

> MCP sunucusu modelin kararlarını güvenli hale getirmez; o kararların hangi yetkiyle gerçek dünyaya dokunacağını belirler.

## Güvenli bir üretim sınırı nasıl çizilir?

MCP sunucusunu güvenli tasarlamak için bütün riski modele bırakmamak gerekir. Model yalnızca aday bir araç çağrısı üretir. Son kararı sunucu tarafındaki yetkilendirme ve doğrulama katmanı vermelidir.

Üretim ortamında aşağıdaki yaklaşım daha sağlamdır:

1. **Her aracı ayrı bir yetki birimi olarak değerlendirin.** Sunucunun sahip olduğu geniş servis hesabını bütün araçlara açmayın.
2. **Okuma ve yazma işlemlerini ayırın.** Dosya silme, para transferi veya e-posta gönderme gibi etkili araçlar daha sıkı onay ve izleme gerektirir.
3. **Model kaynaklı parametreleri doğrulayın.** Dosya yolları, URL’ler, sorgular ve alıcı bilgileri doğrudan işletilmemelidir.
4. **Araç çıktısını güvenilmeyen veri kabul edin.** Çıktı modele geri verildiği için, içindeki metin yeni bir talimat gibi değerlendirilmemelidir.
5. **Oturum ve tenant sınırlarını koruyun.** Bir kullanıcının bağlamı başka bir kullanıcıya veya aracıya sızmamalıdır.
6. **Her çağrıyı denetlenebilir biçimde kaydedin.** Kullanıcı, araç, parametre özeti, karar ve sonuç birlikte izlenebilmelidir.
7. **Yerel sunucuları sınırlandırın.** Dosya sistemi, ağ ve işletim sistemi yetkileri varsayılan olarak geniş bırakılmamalıdır.

Kayıt sistemi de yalnızca hata ayıklama amacıyla düşünülmemeli. Bir MCP aracı beklenmedik sıklıkta çağrılıyorsa, daha önce görülmeyen parametrelerle çalışıyorsa veya yetki kapsamı değiştiyse bunu fark edebilmek gerekir. Bununla birlikte log’lara token, kişisel veri ve ham model bağlamı yazmak yeni bir sır sızıntısı oluşturabilir.

![Kimlik, token audience, kapsam ve kaynak sahipliği kontrolleri.](/blog/mcp-sunucu-guvenlik-siniri-inline-2.svg)

*MCP isteğinde kontroller*

MCP’nin önemli avantajı, araç entegrasyonlarını ortak bir protokol altında toplamasıdır. Fakat ortak protokol, ortak güvenlik varsayımları anlamına gelmez. Her sunucu kendi verisini, kendi araçlarını ve kendi yetki sınırlarını açıkça tanımlamalıdır.

Bir MCP sunucusunu üretime almadan önce şu sorular cevaplanamıyorsa entegrasyon henüz hazır değildir:

- Bu sunucu hangi kaynak adına işlem yapıyor?
- Her araç için gerekli en dar yetki kapsamı nedir?
- Araç tanımı değişirse bunu kim fark edecek?
- Araç çıktısı talimat içerirse model bunu nasıl ayırt edecek?
- Kullanıcı yetkisi ile servis hesabı yetkisi nerede kesişiyor?
- Bir çağrının hangi kullanıcı ve hangi veri kapsamıyla yapıldığını sonradan gösterebilir miyiz?

MCP, AI uygulamalarını dış sistemlere bağlamayı kolaylaştırıyor. **Güvenli ürün tasarımı ise bağlantıyı değil, bağlantının sınırlarını görünür kılmakla başlıyor.**
