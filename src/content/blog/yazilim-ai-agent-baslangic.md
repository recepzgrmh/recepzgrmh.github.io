---
title: "Yazılımın Yeni Başlangıç Noktası: Kod Yazmaktan Sistemi Yönlendirmeye"
description: "Yapay zekâ yazılım üretimini hızlandırırken yeni başlayanlardan beklenen becerileri değiştiriyor. Kod, test ve ürün kararları arasındaki sınır yeniden çiziliyor."
slug: "yazilim-ai-agent-baslangic"
publishedAt: 2026-09-21
tags: ["yapay zeka","yazılım geliştirme","AI coding agents","product engineer","kariyer"]
category: "Yazılım"
heroImage: "/blog/yazilim-ai-agent-baslangic.jpg"
heroAlt: "Yapay zekâ çağında junior yazılımcılığın değişimini anlatan editoryal illüstrasyon"
featured: false
draft: false
sources:
  - label: "OpenAI — Codex in ChatGPT"
    url: "https://openai.com/codex/"
    note: "Coding agent’ların repository inceleme, araç kullanma, test çalıştırma ve uzun süren yazılım görevlerindeki kullanımını açıklar."
  - label: "Anthropic — Agentic coding and persistent returns to expertise"
    url: "https://www.anthropic.com/research/claude-code-expertise"
    note: "Yaklaşık 400 bin Claude Code oturumuna dayanan, insan planlaması ve ajan uygulaması arasındaki ilişkiyi inceleyen 16 Haziran 2026 tarihli araştırma."
  - label: "OpenAI — Harness engineering"
    url: "https://openai.com/index/harness-engineering/"
    note: "Ajanlarla çalışan ekiplerde niyet tanımlama, çalışma ortamı ve geri bildirim döngülerinin rolünü anlatan engineering yazısı."
  - label: "OpenAI — GPT-5.6 Sol model dokümantasyonu"
    url: "https://developers.openai.com/api/docs/models/gpt-5.6-sol"
    note: "GPT-5.6 Sol’un resmi API model sayfası."
  - label: "OpenAI — Previewing GPT-5.6 Sol"
    url: "https://openai.com/index/previewing-gpt-5-6-sol/"
    note: "GPT-5.6 Sol’un kodlama, terminal ve araç koordinasyonu bağlamındaki resmi tanıtımı."
  - label: "Anthropic — Claude Fable 5 ve Claude Mythos 5 dokümantasyonu"
    url: "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5"
    note: "Claude Fable 5 için effort control ve fallback gibi resmi platform bilgileri."
  - label: "OpenAI — Introducing the Codex app"
    url: "https://openai.com/index/introducing-the-codex-app/"
    note: "Birden fazla ajanın paralel görevlerde çalıştırılması ve değişikliklerin incelenmesi üzerine resmi ürün yazısı."
  - label: "Anthropic — 2026 Agentic Coding Trends Report"
    url: "https://resources.anthropic.com/2026-agentic-coding-trends-report"
    note: "Çoklu ajan koordinasyonu, insan denetimi, otomatik inceleme ve güvenlik başlıklarını ele alan 2026 raporu."
---

Yapay zekâ yazılım geliştirmede önce küçük bir yardımcıydı. Bir fonksiyonun iskeletini çıkarıyor, hata mesajını açıklıyor, eksik testi tamamlıyordu. Şimdi araçlar bir repository’yi inceleyebiliyor, terminal komutları çalıştırabiliyor, dosyalar arasında değişiklik yapabiliyor, test koşturabiliyor ve insanın incelemesi için bir pull request hazırlayabiliyor. OpenAI, Codex’i bu tür uzun süren yazılım görevlerini yürüten bir coding agent olarak konumlandırıyor. Anthropic’in 2026 araştırması da kullanımın yalnızca kod yazmaktan; deploy etme, veri inceleme ve dokümantasyon gibi uçtan uca işlere doğru kaydığını gösteriyor. ([openai.com](https://openai.com/codex/?utm_source=openai))

Bu değişim, “yazılımcıya artık gerek var mı?” sorusundan daha somut bir soruyu gündeme getiriyor: Yazılımcının günlük işi hangi parçalardan oluşacak?

## Kod yazmak ucuzluyor, doğru sınırı çizmek zorlaşıyor

Bir mobil uygulamada üyelik ekranı yaptığınızı düşünelim. Eskiden yeni başlayan bir yazılımcı; ekranı, API çağrısını, loading durumunu ve hata mesajlarını tek tek yazardı. Bugün bir ajan bunların önemli bölümünü kısa sürede üretebilir. Fakat şu sorular hâlâ ürün ve mühendislik kararı ister:

- Kullanıcı ödeme yaptıktan sonra yetki hangi servisten doğrulanacak?
- İnternet bağlantısı kesilirse uygulama ne gösterecek?
- Aynı istek iki kez gönderilirse abonelik iki kez mi işlenecek?
- Backend ile mobil istemci arasındaki sözleşme nasıl geriye dönük uyumlu kalacak?
- Başarısız ödeme, deneme süresi ve iptal durumları nasıl test edilecek?

Ajanın ürettiği kod bu soruların cevabını kendiliğinden bulmaz. Bulsa bile, cevabın ürün gereksinimine uyup uymadığını insanın kontrol etmesi gerekir. OpenAI’nin “harness engineering” yazısı da benzer bir dönüşümü anlatıyor: Ekiplerin işi yalnızca kod yazmak olmaktan çıkıp niyeti tanımlamaya, çalışma ortamını hazırlamaya ve güvenilir geri bildirim döngüleri kurmaya kayıyor. ([openai.com](https://openai.com/index/harness-engineering/?utm_source=openai))

Bu yüzden yeni başlayan bir yazılımcının değeri sadece hızlı kod üretmekle ölçülmez. Kodun hangi koşullarda çalışacağını, nerede kırılacağını ve kullanıcıya nasıl görüneceğini anlayabilmesi gerekir.

## Yeni başlayanları ilk olarak daha geniş bir yüzey bekliyor

Kariyerin başında insanlar genellikle tek bir katmanda güçlenir. Bir süre yalnızca mobil arayüzle, yalnızca backend endpoint’leriyle veya yalnızca frontend state yönetimiyle uğraşabilirler. AI coding agent’lar bu katmanlar arasındaki geçişi hızlandırıyor.

Bir Product Engineer için bu, aynı iş içinde mobil ekranı, API sözleşmesini, veritabanı değişikliğini ve analitik olaylarını birlikte düşünmek anlamına geliyor. Bir ajan her parçaya dokunabilir; fakat parçaların birbirini nasıl etkilediğini bilmek hâlâ mühendisin sorumluluğunda.

Örneğin bir backend endpoint’ine yeni bir `status` değeri eklemek kolay görünebilir. Ancak mobil uygulamanın eski sürümleri bu değeri tanımıyorsa ne olur? JSON decoder bilinmeyen alanlarda hata veriyor mu? Cache temizlenmediğinde kullanıcı eski durumu görür mü? Analitik sisteminde yeni durum ayrı bir olay olarak izlenmeli mi?

Bu soruların hiçbiri yalnızca kod tamamlama problemi değildir. Ürün davranışı, veri modeli ve geriye dönük uyumluluk birlikte ele alınır. AI, uygulama alanını genişletebilir; ama bu genişlik yeni başlayan kişinin her şeyi yüzeysel bilmesi gerektiği anlamına gelmez. Temel protokolleri ve sistem sınırlarını gerçekten anlaması gerekir.

## “Çalışıyor” ile “güvenilir” aynı şey değil

Ajanların ürettiği kod çoğu zaman ilk bakışta ikna edici görünür. Derlenir, testlerden geçer ve beklenen örnekte doğru sonucu verir. Sorun, üretim ortamının örneklerden daha geniş olmasıdır.

Bir mobil uygulamada bağlantı kopabilir, kullanıcı işlemi yarıda bırakabilir, işletim sistemi uygulamayı arka planda kapatabilir. Backend’de zaman aşımı, tekrar deneme, yarış koşulu veya üçüncü taraf servis hatası yaşanabilir. Ajan bu durumları ancak bağlamda açıkça tarif edilmişse veya testler bunları kapsıyorsa değerlendirebilir.

Bu nedenle yeni başlayanların öğrenmesi gereken önemli becerilerden biri test yazmak değil, **hangi davranışların test edilmesi gerektiğini bulmak** olacak. Bir testin yeşil olması, sistemin doğru tasarlandığını kanıtlamaz. Test kapsamı dar olabilir; assertion yanlış kurulmuş olabilir; gerçek kullanıcı akışı hiç denenmemiş olabilir.

Anthropic’in 2026 raporunda insanın planlama kararlarını, Claude’un ise çoğunlukla uygulama kararlarını üstlendiği görülüyor. Aynı araştırma, alan bilgisi arttıkça tek bir talimatla daha fazla iş yapılabildiğini; fakat insan denetiminin ortadan kalkmadığını belirtiyor. ([anthropic.com](https://www.anthropic.com/research/claude-code-expertise?medium=mob&utm_source=openai))

Yeni başlayan için bunun karşılığı basit: Ajanın yazdığı değişikliği okuyamıyorsanız, henüz o değişikliği güvenle teslim edebilecek durumda değilsiniz.

## Model seçmekten çok çalışma biçimini kurmak önemli

Claude Fable 5 ve GPT-5.6 Sol’u kullanıp karşılaştırdığımda, tek bir modelin her görevde otomatik olarak en iyi sonucu verdiğini düşünmedim. Bazı görevlerde uzun bağlamı koruma ve mevcut kodun niyetini takip etme daha önemliydi. Bazılarında terminal kullanımı, hızlı yineleme veya test çıktısını yorumlama öne çıktı. Aynı modelin sonucu da prompt’un açıklığına, repository’nin düzenine ve geri bildirim döngüsüne göre değişebiliyor.

OpenAI, GPT-5.6 Sol’u karmaşık kodlama, araç kullanımı ve uzun süren işler için konumlandırıyor; Anthropic ise Claude Fable 5 için effort control ve fallback gibi çalışma seçeneklerini dokümante ediyor. Bu özellikler model seçimini etkileyebilir, ancak sonuç yalnızca modelin ham yeteneğine bağlı değildir. ([developers.openai.com](https://developers.openai.com/api/docs/models/gpt-5.6-sol?utm_source=openai))

Pratikte daha anlamlı bir değerlendirme şu sorularla yapılır:

1. Model mevcut mimariyi doğru okuyabiliyor mu?
2. Değişiklikten önce planını ve varsayımlarını açık ediyor mu?
3. Test başarısız olduğunda hatayı gerçekten araştırıyor mu?
4. Gereksiz dosyalara dokunmadan küçük bir diff üretebiliyor mu?
5. Maliyet ve çalışma süresi, görevin değerine uyuyor mu?

Yeni başlayan bir yazılımcı için burada önemli olan, her modelin özelliklerini ezberlemek değil; işi küçük parçalara ayırmayı, kabul ölçütlerini yazmayı ve çıktıyı incelemeyi öğrenmek.

## Eğitimde ezberin payı azalırken temel bilgiler daha önemli hale geliyor

Yapay zekâ temel kodu üretebildiği için programlama temelleri gereksizleşmiyor. Tam tersine, üretilen kodu değerlendirmek için bu temellere daha çok ihtiyaç duyuluyor.

Bir fonksiyonun karmaşıklığını, transaction sınırını, HTTP durum kodunu, concurrency sorununu veya cache tutarsızlığını bilmiyorsanız, ajan hatalı bir çözümü ikna edici biçimde sunabilir. Yeni başlayan kişi de bunu doğru sanabilir.

Bu yüzden öğrenme sırası yalnızca framework değiştirerek ilerlememeli. Veri yapıları, hata yönetimi, ağ iletişimi, veritabanı modelleme, test tasarımı, gözlemlenebilirlik ve güvenlik hâlâ doğrudan işin içinde. Fakat bunların öğrenilme biçimi değişiyor. Küçük örnekler yazmak yerine bir ajanın ürettiği çözümü parçalara ayırmak, neden doğru veya yanlış olduğunu açıklamak daha sık kullanılan bir çalışma olabilir.

Bir başka değişim de dokümantasyonun rolünde ortaya çıkıyor. Ajanın iyi çalışması için repository’de açık sınırlar, çalıştırma talimatları, test komutları ve mimari kararlar bulunmalı. Dağınık bir proje, deneyimli mühendisin bile zamanını alır; ajan içinse yanlış varsayımların kaynağı olur.

## Yazılım dünyası nereye gidiyor?

Yazılım geliştirme, tek tek dosyalara komut verilen bir süreçten, hedeflerin tanımlandığı ve birden fazla ajanın işi parçalara ayırdığı bir sürece doğru ilerliyor. Codex’in masaüstü uygulaması gibi araçlar aynı repository üzerinde farklı görevleri paralel yürütmeyi, değişiklikleri incelemeyi ve uzun süren işleri takip etmeyi hedefliyor. Anthropic de çoklu ajan koordinasyonu, otomatik gözden geçirme ve güvenliği tasarımın erken aşamasına alma başlıklarını 2026 için öne çıkarıyor. ([openai.com](https://openai.com/index/introducing-the-codex-app/?utm_source=openai))

Bu, her yazılımcının ajan yöneticisi olacağı anlamına gelmiyor. Daha gerçekçi tablo şu: Mühendisler daha az mekanik kod yazacak; daha fazla bağlam sağlayacak, riskleri belirleyecek, sınırları tarif edecek ve sonucu doğrulayacak.

Kariyerinin başındaki bir Product Engineer için işin mobil, backend ve ürün tarafını birlikte görebilmek değerli hale geliyor. Çünkü ajanlar katmanlar arasında geçiş yapabiliyor; insanın görevi ise bu geçişlerin ürün davranışını bozmadığından emin olmak.

Sonuçta yeni başlangıç noktası “kaç satır kod yazabiliyorum?” sorusu olmayacak. “Bir problemi doğru parçalara ayırıp, çalışan ve güvenilir bir ürüne dönüştürebiliyor muyum?” sorusu daha belirleyici olacak. Yapay zekâ üretimi hızlandırıyor. Sorumluluğu ise ortadan kaldırmıyor.

Daha ayrıntılı okuma: https://recepozgur.com/blog/yazilim-ai-agent-baslangic/

Yeni başlayan bir yazılımcı için önce model kalitesini mi, yoksa üretilen kodu denetleme becerisini mi geliştirmek daha önemli?
