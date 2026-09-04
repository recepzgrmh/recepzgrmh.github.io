---
title: "ShieldBreak, Defender yamasının sınırını açığa çıkardı"
description: "13 Ağustos’ta yayımlanan ShieldBreak, Windows Defender’daki RoguePlanet yamasının gerçekten neyi kapattığı sorusunu yeniden gündeme getirdi."
slug: "shieldbreak-defender-yama-acigi"
publishedAt: 2026-08-18
tags: ["Windows Defender", "ShieldBreak", "sıfırıncı gün", "Microsoft", "güvenlik yamaları"]
category: "Siber güvenlik"
heroImage: "/blog/shieldbreak-defender-yama-acigi.png"
heroAlt: "RoguePlanet yamasının kapattığı yol ile ShieldBreak'in ayrımı."
featured: false
draft: false
sources:
  - label: "ShieldBreak GitHub deposu"
    url: "https://github.com/MSNightmare/ShieldBreak"
    note: "Araştırmacının PoC deposu; ShieldBreak’i RoguePlanet yamasını aşan Windows Defender açığı olarak tanımlıyor."
  - label: "Tom’s Hardware, ShieldBreak haberi"
    url: "https://www.tomshardware.com/tech-industry/cyber-security/microsofts-nemesis-drops-new-zero-day-privilege-escalation-vulnerability-attack-grants-system-level-privileges-but-it-could-already-be-patched"
    note: "13 Ağustos 2026 tarihli haber; bağımsız testte PoC’nin çalışmadığını ve ağustos güncellemesinin etkili olmuş olabileceğini aktarıyor."
  - label: "TechRadar, ShieldBreak haberi"
    url: "https://www.techradar.com/pro/security/microsofts-nemesis-returns-nightmare-eclipse-is-back-with-a-new-zero-day-which-could-be-bad-news-for-windows-users"
    note: "13 Ağustos 2026 tarihli haber; ShieldBreak’in RoguePlanet düzeltmesini aştığı iddiasını ve Microsoft’un soruşturma açıklamasını aktarıyor."
  - label: "Reddit r/CyberNews tartışması"
    url: "https://www.reddit.com/r/CyberNews/comments/1vmb2z4/a_new_github_repo_leaks_shieldbreak_a_windows/"
    note: "12 Ağustos 2026 tarihli tartışma; ShieldBreak GitHub deposu ve PoC hakkında topluluk tepkilerini gösteriyor."
  - label: "Reddit r/sysadmin Patch Tuesday başlığı"
    url: "https://www.reddit.com/r/sysadmin/comments/1vliawb/patch_tuesday_megathread_august_11_2026/"
    note: "11 Ağustos 2026 tarihli başlık; ağustos güncellemesi ve ShieldBreak deposu çevresindeki tartışmaya bağlantı veriyor."
---

13 Ağustos 2026’da Windows Defender için yayımlanan ShieldBreak adlı PoC’yi okudum. İlk haberlerde anlatılan şey, yeni bir Windows güvenlik açığından çok daha dar ve daha rahatsız edici: Araştırmacı Nightmare Eclipse, Microsoft’un temmuz ayında RoguePlanet için yayımladığı düzeltmenin etrafından dolaştığını iddia ediyor. PoC’nin amacı düşük ayrıcalıklı bir kullanıcıdan `SYSTEM` seviyesine çıkmak. Bu iddianın aynı hafta içinde GitHub deposunda, Tom’s Hardware ve TechRadar haberlerinde, Reddit’teki güvenlik tartışmalarında tekrar tekrar gündeme gelmesi konuyu haftanın en çok konuşulan yazılım güvenliği gelişmelerinden biri yaptı. ([github.com](https://github.com/MSNightmare/ShieldBreak))

Burada dikkat edilmesi gereken kelime “iddia”. ShieldBreak deposu, bunu Microsoft Defender’daki RoguePlanet düzeltmesini aşan bir PoC olarak tanımlıyor. TechRadar, araştırmacının PoC’yi Windows 11 25H2 ve Windows Server 2025 üzerinde test ettiğini ve yüzde 100 başarı oranı iddia ettiğini aktarıyor. Aynı haberde Microsoft’un açığı incelediği, fakat henüz geçerli olup olmadığının doğrulanmadığı belirtiliyor. Microsoft adına yapılan açıklamada şirketin bildirilen güvenlik açığının geçerliliğini ve etkisini araştırdığı söyleniyor. ([github.com](https://github.com/MSNightmare/ShieldBreak))

Tom’s Hardware tarafında tablo daha karışık. Yayın, ShieldBreak’in teorik olarak `SYSTEM` yetkili bir komut istemi açması gerektiğini yazıyor. Haberin kendi testinde ise güncel Windows 11 sanal makinesinde PoC çalışmamış. Araştırmacılar Kevin Beaumont ve Will Dormann’ın çalıştırmayı başardığı aktarılırken, Microsoft’un 11 Ağustos’taki toplu güncellemesinin kullanılan yolu kapatmış olabileceği de not ediliyor. Bu iki gözlem birbirini bozmuyor. Bir PoC’nin çalışmaması, açığın yok olduğunu kanıtlamıyor. Çalıştığına dair tekil bir rapor da bütün güncel sürümlerin savunmasız olduğunu kanıtlamıyor. ([tomshardware.com](https://www.tomshardware.com/tech-industry/cyber-security/microsofts-nemesis-drops-new-zero-day-privilege-escalation-vulnerability-attack-grants-system-level-privileges-but-it-could-already-be-patched))

## Bir yama neyi kapatmış oluyor?

RoguePlanet’in Microsoft tarafından temmuz ayında düzeltildiği, ShieldBreak’in ise bu düzeltmeyi atladığını iddia ettiği yazılıyor. Bu yüzden tartışma “Windows’ta yine açık çıktı” cümlesinden ibaret değil. Daha somut soru şu: Microsoft, belirli bir saldırı yolunu mu kapattı, yoksa saldırının dayandığı ayrıcalık sınırını mı ortadan kaldırdı?

TechRadar, ShieldBreak’in RoguePlanet için tam bir yama atlatma yöntemi olarak sunulduğunu aktarıyor. Kevin Beaumont’ın değerlendirmesi ise iki tekniğin aynı olmadığını söylüyor. Ona göre RoguePlanet dosya sistemi yarış koşuluna ve sanal disk işlemlerine dayanırken, ShieldBreak Defender’ın bulut taraması sırasında kullanılan Cloud Filter API akışına müdahale eden bir kullanıcı alanı kancası kullanıyor. Bu ayrım benim için yazının en teknik ve en belirsiz kısmı. Çünkü kamuya açık PoC’nin gerçekten hangi Windows bileşenleri üzerinde etkili olduğu, Microsoft’un ağustos güncellemesiyle neyin değiştiği ve hangi sürümlerin hâlâ açık olduğu bağımsız testlerle netleşmiş değil. ([techradar.com](https://www.techradar.com/pro/security/microsofts-nemesis-returns-nightmare-eclipse-is-back-with-a-new-zero-day-which-could-be-bad-news-for-windows-users))

Geliştirici tarafında bunun pratik karşılığı basit: “Güncel” etiketi, tek başına güvenlik durumunu anlatmıyor. Bir makinede Windows güncellemesi kurulmuş olabilir, Defender imzaları güncel olabilir ve yine de belirli bir saldırı yolu için ek doğrulama gerekebilir. Bu, her Windows makinesinin şu anda ShieldBreak ile ele geçirilebildiği anlamına gelmiyor. Böyle bir sonucu destekleyen bir kanıt görmedim.

## PoC’nin çalışıp çalışmamasından önce bakılacak yer

Benim görüşüm, bu olayın en öğretici tarafının PoC’nin gösterişli sonucu değil, yama doğrulama süreci olması. Ekipler genelde sürüm numarasını, KB paketini ve Defender güncellemesini kontrol ediyor. Bunlar gerekli kontroller. ShieldBreak gibi iddialarda saldırı yolunun hangi bileşenleri kullandığını ve aynı yolu ölçen bir testin gerçekten yapılıp yapılmadığını da bilmek gerekiyor.

Bu yüzden güvenlik ekipleri için ilk adım, ShieldBreak deposundaki çalıştırma talimatlarını üretim makinelerinde denemek olmamalı. PoC’yi izole bir sanal makinede, ağ erişimi sınırlı bir test ortamında incelemek ve Defender’ın olayı nasıl kaydettiğine bakmak daha makul. Tom’s Hardware’in aktardığı Defender uyarısında dosyanın tehdit olarak engellendiği görülüyor. Bu, algılamanın her ortamda aynı olacağı anlamına gelmez, ama saldırı araştırılırken dosya imzası kadar süreç davranışının da izlenmesi gerektiğini gösterir. ([cdn.mos.cms.futurecdn.net](https://cdn.mos.cms.futurecdn.net/iA84GombBvogaz5XrSKteB.png))

Burada karşı argüman da var. Eğer Microsoft’un ağustos güncellemesi gerçekten ShieldBreak’in kullandığı yolu kapattıysa, 13 Ağustos’taki haberler teknik olarak güncel olmayan bir PoC’yi büyütüyor olabilir. Tom’s Hardware’in sanal makine testi bu ihtimali destekliyor. Ben bu ihtimali göz ardı etmem, fakat tek bir başarısız testle konuyu kapatmak da doğru gelmiyor. Microsoft’un resmi açıklamasında henüz net bir doğrulama veya düzeltme kapsamı paylaşılmış değil. ([tomshardware.com](https://www.tomshardware.com/tech-industry/cyber-security/microsofts-nemesis-drops-new-zero-day-privilege-escalation-vulnerability-attack-grants-system-level-privileges-but-it-could-already-be-patched))

ShieldBreak’i bu hafta konuşulur yapan şey, yeni bir açık adının ortaya çıkması değil. Aynı araştırmacının Microsoft ürünlerinde art arda yayımladığı PoC’ler, her ay çıkan güvenlik güncellemelerinin nasıl doğrulandığı sorusunu canlı tutuyor. Bir yamanın yayımlanması ile saldırı sınıfının ortadan kalkması arasında fark var. Bu olayda o farkı kapatacak teknik ayrıntılar henüz elimizde yok.
