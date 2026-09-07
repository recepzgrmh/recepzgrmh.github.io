---
title: "GitHub Actions kesintisi CI hattının nereye bağlı olduğunu gösterdi"
description: "6 Ağustos 2026’daki GitHub Actions kesintisi, self-hosted runner kullanan ekiplerin bile neden GitHub’ın kontrol düzlemine bağlı kaldığını gösterdi."
slug: "github-actions-kesintisi-ci-bagimliligi"
publishedAt: 2026-08-13
tags: ["GitHub Actions", "CI/CD", "DevOps", "self-hosted runner", "outage", "yazılım altyapısı"]
category: "DevOps ve Tedarik Zinciri"
heroImage: "/blog/github-actions-kesintisi-ci-bagimliligi.png"
heroAlt: "Self-hosted runner'ların da kesintiden etkilenmesi."
featured: false
draft: false
sources:
  - label: "GitHub Status, Incident with Actions"
    url: "https://www.githubstatus.com/incidents/qcvjkzcs7j74"
    note: "6 Ağustos 2026’da başlayan GitHub Actions kesintisinin zaman çizelgesi, etki oranları, kök neden açıklaması ve toparlanma adımları."
  - label: "GitHub Status ana olay geçmişi"
    url: "https://www.githubstatus.com/"
    note: "Olay kaydının GitHub Status üzerindeki resmi geçmişi; Actions, Pages, webhook, Copilot ve runner etkilerini içeriyor."
  - label: "Reddit r/github, Thoughts and Prayers for GH right now"
    url: "https://www.reddit.com/r/github/comments/1vhazzv/thoughts_and_prayers_for_gh_right_now/"
    note: "6 Ağustos 2026’da self-hosted runner kullananların da kesintiden etkilendiğini gösteren topluluk tartışması."
  - label: "Reddit r/github, GitHub owes us all an apology and an explanation"
    url: "https://www.reddit.com/r/github/comments/1vhnhf8/github-owes-us-all-an-apology-and-an-explanation/"
    note: "Kesinti süresinin ve GitHub Actions bağımlılığının geliştiriciler tarafından tartışıldığı aynı hafta içi başlık."
  - label: "Reddit r/AI_Agents, Yesterday’s GitHub outage is a preview of the agentic future’s biggest bottleneck"
    url: "https://www.reddit.com/r/AI_Agents/comments/1vhv5ha/yesterdays-github-outage-is-a-preview-of-the/"
    note: "7 Ağustos 2026’da GitHub’ın Actions orkestrasyon katmanının ajan tabanlı iş akışları için merkezi bağımlılık oluşturduğu yönündeki tartışma."
  - label: "Reddit r/Tidra, Weekly Maintenance Radar for the Week ending August 7, 2026"
    url: "https://www.reddit.com/r/Tidra/comments/1vk9wfu/weekly-maintenance-radar-for-the-week-ending/"
    note: "GitHub Actions olayını aynı hafta içindeki yazılım altyapısı gelişmeleri arasında belgeleyen haftalık derleme."
  - label: "GitHub Mark görseli"
    url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    note: "Hero görseli olarak kullanılan doğrudan GitHub varlık bağlantısı."
---

6 Ağustos 2026’da GitHub Actions kullanarak çalışan bir işin neden başlamadığını anlamak için önce kendi runner’ına bakmak artık yeterli değildi. GitHub Actions, GitHub Pages, webhook tetiklemeleri, Copilot code review ve Copilot coding agent aynı olayın farklı yerlerinde etkilendi. GitHub’ın olay kaydına göre kesinti 15:05 UTC ile 7 Ağustos 00:14 UTC arasında sürdü. En yoğun aşamada workflow çalıştırmalarının yüzde 71’i altyapı hatası yaşadı, kalanların yüzde 75’i de beş dakikadan uzun gecikti. ([githubstatus.com](https://www.githubstatus.com/))

Bu haftanın konuşulan gelişmesi olarak bunu seçmemin nedeni sürenin uzunluğu kadar arızanın nerede ortaya çıktığı. GitHub’ın açıklamasına göre olay, Actions işleri üreten ve olayları işleyen dahili bir servise yapılan rutin dağıtımla başladı. Dağıtım sırasında mevcut kapasite ve eşzamanlılık zayıflığı görünür hâle geldi. Pod’lar yenilenirken kalan kapasite doldu, servisler çöktü ve sorun birden fazla kümeye yayıldı. Sonra iş atama servisindeki başka bir hata devreye girdi. Runner’lara artık geçerli olmayan işler atandı ve bu runner’lar aynı işleri tekrar tekrar almaya çalışarak geçerli işlerin önünü kapattı. ([githubstatus.com](https://www.githubstatus.com/))

Buradaki ayrıntı bence olayın en öğretici kısmı. Self-hosted runner kullanmak, GitHub Actions’tan bağımsız bir CI sistemi kurmak anlamına gelmiyor. Makineyi siz çalıştırıyor olabilirsiniz, fakat webhook teslimi, iş kuyruğu, iş atama, durum kaydı ve yeniden deneme mantığı GitHub’ın servislerinde kalıyor. 6 Ağustos’taki Reddit tartışmalarında self-hosted runner kullananların da iş alamadığı özellikle konuşuldu. Bir kullanıcı, sorunun kendi donanımında olmadığını ancak olayın daha yüksek bir katmanda yaşandığını belirtti. ([reddit.com](https://www.reddit.com/r/github/comments/1vhazzv/thoughts_and_prayers_for_gh_right_now/))

## Kesinti sırasında kırılan şey runner değildi

Benim için bu olayın pratik karşılığı şu: CI sisteminde “çalıştırıcı nerede?” sorusu tek başına bağımlılığı anlatmıyor. “İş çalıştırıcıya hangi sistem tarafından ulaştırılıyor?” sorusu daha açıklayıcı. GitHub’ın olay kaydında webhook’ların toparlanma sırasında yaklaşık yüzde 15 kapasiteyle işlendiği, bazı push ve pull request olaylarının workflow başlatmadığı yazıyor. Bu olayların otomatik olarak yeniden oynatılmayabileceği de açıkça belirtilmiş. Yani kuyrukların sonradan boşalması, kaçırılan her tetiklemenin kendiliğinden geri geleceği anlamına gelmiyor. ([githubstatus.com](https://www.githubstatus.com/))

Bu yüzden bir sonraki iş gününde kontrol edilmesi gereken şey yalnızca kırmızı görünen job’lar değil. Kesinti penceresinde merge edilen pull request’leri, yayınlanması gereken paketleri ve deploy olması beklenen commit’leri Actions geçmişiyle karşılaştırmak gerekiyor. GitHub’ın paylaştığı çözüm tartışmasında takılı kalan veya yeniden çalıştırılamayan bazı işlerle ilgili komut satırı ve arayüz adımları da yer aldı. Bu, olay sonrası kontrolün kullanıcıya kaldığını gösteriyor. ([githubstatus.com](https://www.githubstatus.com/))

Burada net görüşüm şu: Üretim yayınını tek bir GitHub Actions akışına bağlamak, küçük ekiplerde bile artık basit bir kolaylık kararı olarak görülemez. Her ekip ikinci bir CI sağlayıcısına tam geçiş yapmak zorunda değil. Böyle bir geçişin maliyeti, sırların taşınması, artifact uyumluluğu ve izin modelinin yeniden kurulması yüzünden beklenenden büyük olabilir. Yine de acil durum yolunun gerçekten çalıştığını bilmek gerekiyor. Bir workflow’u yerel olarak çalıştırabilmek, GitHub’ın iş kimliği ve webhook sistemi yokken üretim sürecini sürdürebildiğiniz anlamına gelmiyor.

## Benim çıkardığım küçük ama can sıkıcı ders

Bu hafta kendi projelerimde bakacağım ilk şey, CI tanımını başka bir yerde çalıştırıp çalıştıramadığım değil. Bir commit’in hangi koşullarda test edildiğini, o testin kanıtını nasıl sakladığımı ve GitHub’a erişim geri geldiğinde sonucu nasıl uzlaştıracağımı kontrol edeceğim. Actions işlerinin yerel bir alternatifi olabilir, fakat GitHub’ın tuttuğu kuyruk ve durum kayıtlarının yerel kopyası yoksa bu alternatif yalnızca çalıştırma katmanını yedekliyor.

Bir karşı argüman da var. GitHub Actions’ın bu ölçekteki kesintileri çoğu kişisel proje için kabul edilebilir bir maliyet olabilir. Her küçük uygulama için iki CI sistemi, ayrı artifact deposu ve manuel uzlaştırma prosedürü kurmak gereksizdir. Buna katılıyorum. Benim tereddüdüm, ekiplerin bu kararı bilinçli verdiğinden emin olmamam. “Self-hosted runner kullanıyoruz, demek ki bağımsızız” varsayımı 6 Ağustos’ta doğrudan yanlış çıktı.

GitHub, olay sonrasında dağıtım ve kapasite kontrollerini, kuyruk kurtarma mekanizmalarını, runner atama mantığını ve Actions Runner Controller için otomatik toparlanmayı iyileştireceğini söyledi. Bu çalışmaların ne zaman tamamlanacağı ve benzer bir durumda hangi garantilerin ölçüleceği henüz net değil. ([githubstatus.com](https://www.githubstatus.com/))

Ben bugün için GitHub’dan çıkma kararı almazdım. Fakat CI hattının nerede yaşadığını yeniden çizerdim. Runner benim sunucumda olabilir. Kuyruk, tetikleyici ve iş kimliği başka bir şirketteyse, sistemin sahibi hâlâ tek bir kontrol düzlemine bağlıdır.

LinkedIn’de bu kesintinin tartışılmasının nedeni de burada yatıyor. Aynı hafta içinde GitHub’ın resmi olay kaydı, r/github topluluğu ve r/AI_Agents tartışmaları self-hosted runner’ların bile GitHub’ın orkestrasyon katmanına bağlı kaldığını farklı açılardan gündeme getirdi. Hacker News, r/programming ve r/ExperiencedDevs aramalarında bu olayla doğrudan eşleşen, aynı hafta yayımlanmış bir tartışmayı doğrulayamadım. Bu yüzden onların konuşmayı taşıdığı izlenimini yazıya eklemedim. ([githubstatus.com](https://www.githubstatus.com/))
