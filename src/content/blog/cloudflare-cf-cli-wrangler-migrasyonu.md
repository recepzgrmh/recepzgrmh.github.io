---
title: "Cloudflare cf ile Wrangler’ın yerini ajanlara göre yeniden çiziyor"
description: "Cloudflare, Wrangler’ın yerine ajan odaklı cf CLI’ı koyuyor. Değişiklik, komut satırını insanlardan çok kod ajanlarının okuyacağı bir arayüze çeviriyor."
slug: "cloudflare-cf-cli-wrangler-migrasyonu"
publishedAt: 2026-10-08
tags: ["Cloudflare","cf CLI","Wrangler","AI ajanları","TypeScript","Vite"]
category: "DevOps ve Tedarik Zinciri"
heroImage: "/blog/cloudflare-cf-cli-wrangler-migrasyonu.jpg"
heroAlt: "Cloudflare’ın cf CLI duyurusunda kullanılan, kod ve yapay zekâ ajanlarını simgeleyen mor zeminli illüstrasyon"
featured: false
draft: false
sources:
  - label: "Cloudflare resmi duyurusu: Introducing cf: the agentic CLI for the entire Cloudflare API"
    url: "https://blog.cloudflare.com/cloudflare-cf-cli-launch/"
    note: "28 Eylül 2026 tarihli birinci taraf duyuru. cf’nin amacı, JSON varsayılanı, OpenAPI tabanlı Forge üretim hattı, Wrangler geçişi ve 18 aylık bakım planı burada açıklanıyor."
  - label: "Cloudflare cf GitHub deposu"
    url: "https://github.com/cloudflare/cf"
    note: "Açık beta deposu. Kurulum, Apache-2.0 ve MIT lisansları, JSON varsayılanı, cloudflare.config.ts ve Vite bilgileri yer alıyor."
  - label: "InfoQ: Cloudflare Introduces CLI for AI Agents, Sunsetting Wrangler"
    url: "https://www.infoq.com/news/2026/10/cloudflare-cf-cli/"
    note: "6 Ekim 2026 tarihli haber. Wrangler’ın yaklaşık 280 komut yolu, cf’nin 3.000’den fazla API operasyonu ve Hacker News tartışmasındaki TypeScript itirazları aktarılıyor."
  - label: "Hacker News: Cf: The Agentic CLI for the Cloudflare API"
    url: "https://news.ycombinator.com/item?id=49879577"
    note: "Aynı hafta içindeki topluluk tartışması. TypeScript, başlangıç süresi, taşınabilirlik, Wrangler deneyimi ve Terraform beklentileri konuşuluyor."
  - label: "GitHub Trending"
    url: "https://github.com/trending"
    note: "Araştırma sırasında kontrol edildi. cf deposunun o günkü genel Trending sıralamasında yer aldığına dair güvenilir, tarihsel bir kayıt kullanmadım; bu nedenle yazıda Trending’e dayalı sayı veya sıralama iddiası yok."
  - label: "Reddit r/CloudFlare: Introducing cf: the agentic CLI for the entire Cloudflare API"
    url: "https://www.reddit.com/r/CloudFlare/comments/1wshgtc/introducing_cf_the_agentic_cli_for_the_entire/"
    note: "Aynı hafta içinde Cloudflare topluluğundaki tartışma. r/programming ve r/ExperiencedDevs içinde aynı gelişmeye dair doğrulanabilir, aynı hafta tarihli bir gönderi bulamadım."
---

Cloudflare’ın 28 Eylül 2026’da duyurduğu `cf` CLI, ilk bakışta yeni bir komut satırı aracı gibi görünüyor. Birkaç gün içinde konu büyüdü çünkü şirket, açık betanın ardından Wrangler’ı emekliye ayıracağını da açıkça yazdı. Son büyük Wrangler sürümü kullanıcıları `cf` yönlendirecek ve Wrangler için 18 aylık bakım dönemi verilecek.

Bu haberi seçmemin nedeni yalnızca Cloudflare’ın yeni bir CLI yayımlaması değil. Aynı hafta şirketin blogunda, GitHub deposunda, Hacker News’te ve InfoQ’da aynı kararın farklı tarafları konuşuldu. Hacker News tartışması özellikle `cf`’nin TypeScript ile yazılmasına takıldı. Benim dikkatimi çeken yer de burası oldu. Cloudflare, ajanlara daha uygun bir arayüz kurmak isterken geliştiricilerin yıllardır tartıştığı CLI tercihlerini yeniden masaya koyuyor.

## Cloudflare neden Wrangler’ın üstüne ekleme yapmadı?

Cloudflare’ın kendi açıklamasına göre Wrangler, farklı ürün ekiplerinin zaman içinde eklediği yaklaşık 280 komut yolundan oluşuyor. Ekipler aynı işi farklı adlandırmış. Blog yazısında `d1 info`, `hyperdrive get` ve `workflows describe` komutları bu tutarsızlığa örnek veriliyor. Bu yapı insan kullanıcı için zaten zaman zaman yorucuysa, komutları önceden öğrenmemiş bir kod ajanı için daha da zor.

Şirket bu yüzden Wrangler’a binlerce yeni komut eklemek yerine yeni bir araç başlatmış. `cf`, Cloudflare’ın OpenAPI şemalarını kaynak olarak kullanan Forge adlı üretim hattıyla oluşturuluyor. Cloudflare, `cf` için 3.000’den fazla API operasyonunu kapsadığını söylüyor. Wrangler tarafındaki yaklaşık 280 operasyonla karşılaştırınca farkın büyüklüğü anlaşılabiliyor.

Buradaki fikir bana mantıklı geliyor. Eski bir CLI’ın komutlarını ajanların ezberinden silmek kolay değil. Yeni bir araç, komut isimlerini, çıktı biçimini ve yapılandırma modelini baştan belirleme şansı veriyor. Yine de “yeni araç açmak, eski aracın tasarım borcunu çözmenin en iyi yoludur” iddiasına tam ikna olmuş değilim. Kullanıcılar açısından bu karar yeni bir geçiş maliyeti yaratıyor.

## JSON varsayılanı geliştiricinin alışkanlığını değiştiriyor

`cf` için JSON varsayılan çıktı biçimi. Cloudflare’ın gerekçesi açık: tablolar insan gözü için, JSON ise ayrıştırıcılar için daha uygun. Bir ajan komut çıktısını okuyup başka bir komuta aktaracaksa, terminal tablosunu anlamaya çalışmaması daha iyi. İnsanlar isterse tablo görünümünü ayrıca isteyebiliyor.

Bu küçük gibi duran tercih aslında CLI’ın kimin için tasarlandığını söylüyor. Wrangler’ın varsayılanı, terminalde çalışan geliştiriciyi merkeze alıyordu. `cf` ise komutları çağıran, çıktıyı filtreleyen ve sonraki adımı seçen bir aracıyı merkeze alıyor. Benim için haberin en somut tarafı bu.

Cloudflare ayrıca `cloudflare.config.ts` dosyasını yeni yapılandırma biçimi olarak konumlandırıyor. Şirket, TypeScript’in tip güvenliği ve LSP desteği sayesinde insanların ve ajanların yapılandırmayı daha doğru değiştirebileceğini savunuyor. Vite da varsayılan geliştirme ortamı oluyor.

Burada tereddüdüm daha büyük. Bir CLI için TypeScript kullanmak, özellikle Node.js kurulu olmayan bir makinede, paketleme ve başlangıç süresi gibi sorunları beraberinde getirebilir. Hacker News’teki tartışmanın önemli bölümü de bu noktaya kaydı. Cloudflare’ın cevabı ise performanstan çok yapılandırmanın ajanlar tarafından anlaşılabilir olmasına dayanıyor. Bu cevap teknik olarak tutarlı, fakat üretim ortamlarında CLI’ın ne kadar hızlı açıldığı da gerçek bir kullanıcı deneyimi konusu.

## Wrangler’dan geçiş kolay görünse de karar henüz bitmedi

Cloudflare, mevcut Worker projeleri için `cf migrate` komutunu öneriyor. Vite ile çalışan projelerin `cloudflare.config.ts` dosyasına dönüştürülebileceği, esbuild için Wrangler’a bağlı projelerde ise `cf`’nin Wrangler’ı kullanmaya devam edebileceği belirtiliyor. Yeni projelerde `cf init` ve `cf deploy` akışı öne çıkıyor.

Bu ayrıntı, değişimin hemen yarın gerçekleşmeyeceğini gösteriyor. `cf` şu an açık beta. Wrangler’ın ne zaman sonlandırılacağı, bakım süresinin hangi tarihte başlayacağı ve bütün mevcut proje türlerinin ne kadar sorunsuz taşınacağı henüz uygulamada görülmüş değil. Cloudflare’ın 18 aylık destek sözü geçiş için zaman bırakıyor, fakat bu sürenin kurumsal ekipler için yeterli olup olmadığını şimdiden söylemek mümkün değil.

Bana kalırsa Cloudflare’ın asıl hamlesi yeni bir komut satırı aracı çıkarmak değil, API tasarımını ajanların çalışma biçimine göre yeniden düzenlemek. Komut keşfi, yapılandırılmış çıktı ve API şemasından üretilen komutlar bu yaklaşımın parçaları. Bu model işe yararsa başka platformların CLI’larında da benzer bir ayrım görebiliriz: insanlar için okunabilir komutlar ve ajanlar için güvenilir, makinece tüketilebilir arayüzler.

Fakat `cf`’nin gerçekten daha iyi olup olmadığını şu aşamada söylemek için erken. Açık beta duyurusu, tasarım yönünü gösteriyor; günlük kullanımda kurulum, hata mesajları, kimlik doğrulama ve geriye dönük uyumluluk tarafını henüz kanıtlamıyor. Ben olsam mevcut üretim projelerimi hemen taşımak yerine yeni CLI’ı küçük bir Worker’da dener, `cf migrate` çıktısını elle inceler ve Wrangler tabanlı CI akışını bir süre daha korurdum.
