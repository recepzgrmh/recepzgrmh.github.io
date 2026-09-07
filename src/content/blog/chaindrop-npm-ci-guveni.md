---
title: "ChainDrop, npm güvenini CI hattına kadar taşıdı"
description: "4 Ağustos 2026'da konuşulmaya başlayan ChainDrop, npm bağımlılıklarına güvenmenin CI/CD sırlarını korumaya yetmediğini gösterdi."
slug: "chaindrop-npm-ci-guveni"
publishedAt: 2026-08-11
tags: ["npm", "ChainDrop", "yazılım tedarik zinciri", "CI/CD", "açık kaynak güvenliği", "JavaScript"]
category: "DevOps ve Tedarik Zinciri"
heroImage: "/blog/chaindrop-npm-ci-guveni.png"
heroAlt: "Çalınan token'ın paketleri otomatik yeniden yayınlaması."
featured: false
draft: false
sources:
  - label: "Microsoft Security Blog, software supply-chain attack coverage"
    url: "https://www.microsoft.com/en-us/security/blog/threat-intelligence/supply-chain-attacks/"
    note: "Birinci taraf kaynak olarak Microsoft'un güncel yazılım tedarik zinciri saldırıları sayfası incelendi. ChainDrop için doğrudan bir olay raporu bulunamadı."
  - label: "r/devops ChainDrop npm supply-chain compromise discussion"
    url: "https://www.reddit.com/r/devops/comments/1vhv5tm/npm_supply_chain_compromise_chaindrop/"
    note: "7 Ağustos 2026 tarihli tartışmada ChainDrop, 400'den fazla npm paketi ve npm kurulum kancalarıyla ilişkilendiriliyor."
  - label: "r/pwnhub ChainDrop npm supply-chain attack discussion"
    url: "https://www.reddit.com/r/pwnhub/comments/1vffibe/massive_npm_supplychain_attack_chaindrop/"
    note: "4 Ağustos 2026 tarihli paylaşımda ChainDrop'ın geliştirici ve CI/CD kimlik bilgilerini hedeflediği iddia ediliyor."
  - label: "r/SecOpsDaily ChainDrop npm worm discussion"
    url: "https://www.reddit.com/r/SecOpsDaily/comments/1vhn6j/chaindrop_inside_a_selfpropagating_npm_worm/"
    note: "6 Ağustos 2026 tarihli paylaşımda yayılma, GitHub Actions sırları ve Ethereum tabanlı C2 hakkında teknik iddialar yer alıyor; bunların tümü bağımsız birincil kaynakta doğrulanamadı."
  - label: "r/SecOpsDaily ChainDrop megathread"
    url: "https://www.reddit.com/r/blueteamsec/comments/1vfaziw/megathread_chaindrop_npm_worm/"
    note: "4 Ağustos 2026 tarihli güvenlik tartışması; olayın aynı hafta içinde güvenlik topluluklarında konuşulduğunu doğrulamak için kullanıldı."
---

4 Ağustos 2026'da Reddit'te görünür hâle gelen ChainDrop haberleri, birkaç gün içinde npm tedarik zinciri tartışmasına dönüştü. Paylaşımlarda, kötü amaçlı kodun `keyv` ve `cacheable` ad alanlarıyla ilişkili paketlerden yayıldığı, `preinstall` veya `postinstall` kancalarıyla çalıştığı ve CI/CD kimlik bilgilerini hedeflediği anlatıldı. Bazı başlıklarda 400'den fazla paketten söz edildi. Bu sayıyı bağımsız birincil kaynakta doğrulayamadım; bu yüzden burada kesinleşmiş bir kapsam gibi yazmayacağım.

Benim için haberin dikkat çekici tarafı saldırının adından çok, saldırının çalıştığı katman. Bir geliştirici paketi doğrudan çağırmasa bile, bağımlılık ağacındaki bir güncelleme o paketi makineye getirebilir. Kurulum sırasında çalışan betik de uygulamanın iş mantığından önce devreye girer. CI ortamında bu betik, yerel makineden daha geniş bir erişim alanına sahip olabilir.

Reddit'teki r/devops tartışmasında geliştiriciler, ChainDrop'ın npm paketlerini ve GitHub Actions sırlarını hedeflediğini yazdı. Başka bir başlıkta saldırının Ethereum üzerinde tutulan bir adres üzerinden komuta ve kontrol bilgisi aldığı iddia edildi. Bu teknik ayrıntıların tümünü bağımsız bir resmi olay raporunda görmedim. Bu nedenle, saldırının kesin çalışma biçimi hakkında temkinli kalıyorum. Doğrulanabilen daha genel gerçek şu: npm paketleri kurulum anında kod çalıştırabiliyor ve CI/CD ortamları çoğu zaman yayınlama, bulut ve depo erişimleri taşıyor.

## Bir lockfile neyi çözer, neyi çözmez?

Lockfile kullanmak hâlâ gerekli. `package-lock.json`, `pnpm-lock.yaml` veya `yarn.lock` bağımlılık ağacını belirli sürümlere sabitler ve beklenmedik güncellemeleri azaltır. ChainDrop tartışması ise başka bir varsayımı açığa çıkarıyor: Sabitlenmiş sürüm otomatik olarak güvenilir sürüm anlamına gelmiyor.

Bir paket kötü amaçlı hâle geldikten sonra lockfile onu daha uzun süre sistemde tutabilir. Bu yüzden lockfile'ın varlığı ile lockfile'daki içeriğin incelenmesi ayrı kontroller. Ben bir projeye bakarken artık yalnızca doğrudan bağımlılıkları değil, güncellenme zamanını, kurulum betiklerini ve paketin yayınlama geçmişini de kontrol ederdim. Bu, her paketi elle denetlemek anlamına gelmiyor. Şüpheli değişiklikleri hızlı görebilecek bir süreç kurmak anlamına geliyor.

npm'in lifecycle script davranışı burada hâlâ belirleyici. `npm install` sırasında çalışan bir script, geliştiricinin açıkça çağırmadığı bir kod yolunu devreye sokabiliyor. CI içinde `npm ci` kullanmak sürüm çözümlemesini daha öngörülebilir yapar, fakat kurulum scriptlerini kendiliğinden etkisizleştirmez. Projenin bu scriptlere ihtiyacı yoksa `ignore-scripts` gibi seçenekler değerlendirilebilir. Bu tercihin paketlerin gerçekten çalışması için gereken adımları bozup bozmadığını test etmek gerekir.

```bash
npm ci --ignore-scripts
```

Bu komut her proje için güvenli bir varsayılan değildir. Bazı paketler yerel binary üretmek veya platforma özel hazırlık yapmak için lifecycle scriptlerine ihtiyaç duyabilir. Bana kalırsa önemli olan tek bir komutu ezberlemek değil, CI ortamının neden kurulum sırasında script çalıştırdığını bilmek.

## CI sırları bağımlılık kurulumuna neden açık?

CI/CD hattı bir uygulamayı derlemek için çalışırken çoğu zaman npm token'ı, GitHub token'ı, bulut sağlayıcı kimlik bilgileri veya yayınlama anahtarları da ortam değişkenlerinde bulunuyor. Kötü amaçlı bir bağımlılık bu değerleri okuyabiliyorsa, saldırı uygulamanın açığı olmadan da tedarik zincirinden ilerleyebilir.

Bu yüzden sırları job'un tamamına vermek yerine ihtiyaç duyulan adıma daraltmak mantıklı. Yayınlama yapmayan test job'unun npm yayınlama token'ına ihtiyacı yok. Buluta dağıtım yapmayan bir kontrol job'unun AWS veya Azure yetkisi taşımaması gerekir. OIDC gibi kısa ömürlü kimlik doğrulama seçenekleri de uzun süre geçerli sırların değerini azaltabilir, fakat bunların yanlış yetkilendirilmesini önlemek gerekir.

ChainDrop haberinde beni en çok düşündüren nokta bu. Paket yöneticisi bir geliştirici aracıdır, CI ise üretim sistemine yakın bir otomasyon katmanıdır. İkisi aynı komutla çalıştığında güvenlik varsayımları da birbirine karışıyor. Yerelde zararlı bir kurulum betiği bir geliştiricinin dosyalarını etkileyebilir. CI'da aynı betik yayınlama yetkisine kadar ulaşabilir.

Burada karşı argüman da var. Her yeni tedarik zinciri olayından sonra tüm lifecycle scriptlerini kapatmak, JavaScript projelerinde pratikte ciddi uyumluluk sorunları yaratabilir. Her paketi kurum içinde yeniden paketlemek de küçük ekipler için gerçekçi olmayabilir. Bu nedenle tek bir sert politika yerine, kurulum katmanı, token kapsamı ve ağ çıkışı birlikte düşünülmeli.

Benim görüşüm şu: npm güvenliği artık geliştiricinin bilgisayarında başlayan bir hijyen konusu olarak ele alınamaz. Bağımlılık kurulumunun gerçekleştiği ortamın hangi yetkilere sahip olduğu, paketin kendisi kadar önemli. Bir paket güvenilir görünse bile onu kuran job gereğinden fazla yetkiliyse saldırının maliyeti büyüyor.

ChainDrop'ın ayrıntılarının birincil kaynaklarda ne kadarının doğrulanacağını bu yazı hazırlanırken bilmiyorum. Reddit tartışmalarında farklı kapsam ve teknik ayrıntılar dolaşıyor. İnsanların kontrol etmesi gereken ilk şey, 4-8 Ağustos 2026 arasında kullanılan paket sürümleri, CI logları, npm token kullanımı ve yayınlanan artefaktların bütünlüğü. Olayın adı değişebilir. Bu kontrol listesi değişmez.
