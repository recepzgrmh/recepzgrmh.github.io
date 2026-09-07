---
title: "Rust’ta 86 Dakikalık Saldırı, Derleme Adımını Hedef Aldı"
description: "arrayref 0.3.10 saldırısı, Rust projelerinde uygulama çalışmadan önce build script’lerinin neden güvenlik sınırı sayılması gerektiğini gösterdi."
slug: "rust-arrayref-build-saldirisi"
publishedAt: 2026-08-27
tags: ["Rust", "Cargo", "yazılım güvenliği", "tedarik zinciri", "açık kaynak", "CI/CD"]
category: "DevOps ve Tedarik Zinciri"
heroImage: "/blog/rust-arrayref-build-saldirisi.png"
heroAlt: "Zararlı bağımlılığın build script ile derleme anında çalışması."
featured: false
draft: false
sources:
  - label: "Rust Blog, resmi güvenlik açıklaması"
    url: "https://blog.rust-lang.org/2026/08/20/supply-chain-attack-on-arrayref/"
    note: "Olayın zaman çizelgesi, etkilenen paketler ve resmi kontrol komutu."
  - label: "RustSec Advisory RUSTSEC-2026-0260"
    url: "https://rustsec.org/advisories/RUSTSEC-2026-0260"
    note: "Etkilenen arrayref sürümü, indirme sayısı ve etkilenmemiş sürümler."
  - label: "Hacker News, 20 Ağustos 2026 ön sayfası"
    url: "https://news.ycombinator.com/front?day=2026-08-20"
    note: "arrayref haberi 500’den fazla yorumla aynı hafta içinde geniş teknik tartışma aldı."
  - label: "Reddit r/programming tartışması"
    url: "https://www.reddit.com/r/programming/comments/1vtm22r/supply_chain_attack_on_arrayref/"
    note: "Cargo build script’leri, lockfile ve bağımlılık denetimi üzerine geliştirici tartışması."
  - label: "GitHub Advisory Database"
    url: "https://github.com/advisories/GHSA-jvc2-9prg-ffvc"
    note: "arrayref 0.3.10 için yayımlanan güvenlik kaydı ve CVSS bilgisi."
  - label: "RustSec Advisory Database issue #3161"
    url: "https://github.com/rustsec/advisory-db/issues/3161"
    note: "İlk teknik bildirim, proc-macro1 bağımlılığı ve build-time payload ayrıntıları."
  - label: "StepSecurity teknik analiz"
    url: "https://www.stepsecurity.io/blog/arrayref-rust-crate-supply-chain-attack"
    note: "CI gözlemleri ve saldırının bağımlılık manifestosu üzerinden nasıl ilerlediğine dair ikincil analiz."
  - label: "GitHub Trending, Rust filtreli görünüm"
    url: "https://github.com/trending/rust"
    note: "Aynı hafta için ilgili proje veya advisory’nin belirgin bir trending kaydı doğrulanamadı."
  - label: "TechCrunch, 21 Ağustos 2026 arşivi"
    url: "https://techcrunch.com/2026/08/21/"
    note: "Aynı hafta incelendi; arrayref olayıyla ilgili eşleşen haber bulunamadı."
  - label: "Ars Technica, yazılım geliştirme etiketi"
    url: "https://arstechnica.com/tag/software-development/"
    note: "Aynı hafta incelendi; arrayref olayıyla ilgili eşleşen haber bulunamadı."
---

Bir Rust projesini derlemek, 20 Ağustos 2026’da bazı geliştiriciler için uygulamayı çalıştırmaktan daha riskli hale geldi. `arrayref` paketinin 0.3.10 sürümü, geliştiricilerin çoğunun kodunu çağırmadan önce çalışan bir bağımlılık taşıyordu. Cargo bu bağımlılığı derlerken, saldırganın build script’i uzaktaki bir yükü indirmeye çalışıyordu.

Bu olayı seçmemin nedeni yalnızca Rust ekosistemini ilgilendirmesi değil. Hacker News’te ilgili gönderi 500’den fazla yorum aldı. r/programming’deki tartışmada geliştiriciler Cargo’nun build script davranışını, sürüm sabitlemeyi ve bağımlılık incelemesini tartıştı. Rust’ın güvenlik ekibi de aynı gün resmi açıklama yayımladı. RustSec kaydı ve GitHub Advisory Database girdisi, olayın hafta boyunca bağımsız kanallarda izlenebildiğini doğruluyor. ([news.ycombinator.com](https://news.ycombinator.com/front?day=2026-08-20))

## Saldırı uygulamanın içine değil, derleme zincirine girdi

Rust Security Response Team’in açıklamasına göre olay 20 Ağustos 2026 saat 07:15 UTC’de `proc-macro1` adlı paketin kötü amaçlı olduğunun bildirilmesiyle başladı. Paket, derleme sırasında bir payload indiren build script içeriyordu. Ardından popüler `arrayref` paketinin yeni yayımlandığı ve bu pakete bağımlılık eklediği fark edildi. Aynı bakım hesabına ait `internment` ve `append-only-vec` paketleri de etkilenmişti. ([blog.rust-lang.org](https://blog.rust-lang.org/2026/08/20/supply-chain-attack-on-arrayref/))

Etkilenen sürümler kısa süre çevrimiçi kaldı. `arrayref@0.3.10` 86 dakika sonra silindi. `internment@0.8.7` 90 dakika, `append-only-vec@0.1.9` ise 107 dakika sonra kaldırıldı. RustSec kaydında `arrayref@0.3.10` için 2.285 indirme göründüğü ve bilinen gerçek kullanım kanıtı bulunmadığı yazıyor. Bu bilgi rahatlatıcı, fakat tek başına yeterli değil. Silinen bir paketin hangi geliştirici makinesinde veya CI işinde derlendiğini merkezi bir kayıtla eksiksiz bilmek mümkün değil. ([blog.rust-lang.org](https://blog.rust-lang.org/2026/08/20/supply-chain-attack-on-arrayref/))

Buradaki yöntem basit ama etkili. Saldırgan, gerçek `proc-macro2` paketinin adına benzeyen `proc-macro1` adını kullandı. İlk sürüm temiz bir kopya gibi görünürken sonraki sürümde kötü amaçlı `build.rs` devreye girdi. `arrayref` paketinin kendisindeki makro kodu değişmemişti. Değişiklik bağımlılık bildirimindeydi. Bu yüzden kaynak koduna hızlıca bakan bir geliştirici, asıl farkı göremeyebilirdi. ([github.com](https://github.com/rustsec/advisory-db/issues/3161))

Bana kalırsa olayın en rahatsız edici kısmı burada. Rust’ın bellek güvenliği, derleme sırasında çalıştırılan her şeyin güvenli olduğu anlamına gelmiyor. `build.rs`, proc-macro ve benzeri mekanizmalar geliştirici makinesinin veya CI runner’ın yetkileriyle çalışabiliyor. Uygulama daha ayağa kalkmadan dış ağa bağlantı kurulabiliyor.

Hacker News ve Reddit tartışmalarında geliştiricilerin bir bölümü bu davranışın Cargo’ya özgü olmadığını, paket yöneticilerinin çoğunda benzer riskler bulunduğunu hatırlattı. Karşı argüman da makul: Rust ekosisteminde `cargo-vet`, `cargo-crev`, lockfile kullanımı ve RustSec gibi inceleme araçları mevcut. Yine de araçların varlığı, derleme sırasında ağ erişimi olan bir script’in güvenli bir varsayılan olduğu anlamına gelmiyor. Bu noktada kendi görüşüm net: build script’leri uygulama kodundan ayrı bir hazırlık adımı gibi değil, doğrudan çalıştırılabilir üçüncü taraf kod gibi değerlendirmek gerekiyor. ([reddit.com](https://www.reddit.com/r/programming/comments/1vtm22r/supply_chain_attack_on_arrayref/))

## İlk kontrol lockfile ve Cargo önbelleği olmalı

Rust ekibinin önerisi, yerel Cargo önbelleğinde silinmiş paketlerin kalıp kalmadığını kontrol etmek. Resmi açıklamadaki komut şu dosya adlarını arıyor:

```bash
find ~/.cargo/registry/cache -type f \( \\
  -name 'append-only-vec-0.1.9.crate' -o \\
  -name 'arrayref-0.3.10.crate' -o \\
  -name 'internment-0.8.7.crate' -o \\
  -name 'proc-macro1-*.crate' -o \\
  -name 'proc-macro-en-*.crate' -o \\
  -name 'aovine-*.crate' -o \\
  -name 'arone-*.crate' -o \\
  -name 'aronenao-*.crate' -o \\
  -name 'tinymember-*.crate' \\
\) -print
```

Bunu yalnızca ana makinede çalıştırmak yetmez. CI önbellekleri, self-hosted runner’lar, hazırlanan container imajları ve `vendor` dizinleri de kontrol edilmeli. Rust ekibinin listesine göre `arrayref` için güvenli sürüm `0.3.9` ve öncesi. `internment` için `0.8.6`, `append-only-vec` için `0.1.8` ve öncesi etkilenmemiş sürümler olarak belirtiliyor. `proc-macro1`, `proc-macro-en`, `aovine`, `arone`, `aronenao` ve `tinymember` için ise paket adına rastlamak başlı başına inceleme nedeni. ([blog.rust-lang.org](https://blog.rust-lang.org/2026/08/20/supply-chain-attack-on-arrayref/))

Burada emin olmadığım bir nokta var. Silinen paketlerin gerçek erişim kapsamını ve ikinci aşama payload’ın ne yaptığını açık kaynak kayıtlarından tam olarak çıkarmak mümkün görünmüyor. Bazı teknik analizler dosya yolları, ağ adresleri ve kalıcılık izleri paylaşıyor; bunların bir bölümü üçüncü taraf gözlemlerine dayanıyor. Rust’ın resmi duyurusu ise daha temkinli bir çerçevede kalıyor. Bu yüzden bir makinede etkilenen paket bulunursa, “testler geçti, sorun yok” demek yerine makineyi etkilenmiş kabul edip erişebildiği kimlik bilgilerini döndürmek daha doğru yaklaşım.

Bu olaydan benim çıkardığım ders, yeni bir güvenlik ürünü satın almakla ilgili değil. CI’da lockfile olmadan güncelleme yapılmaması, bağımlılık diff’lerinin incelenmesi ve derleme işlerinin gereksiz ağ erişiminin kapatılmasıyla ilgili. Bir paket 86 dakika sonra silinmiş olabilir. O 86 dakika, çalışan bir geliştirici makinesi veya geniş yetkili bir runner için yeterli olabilir.
