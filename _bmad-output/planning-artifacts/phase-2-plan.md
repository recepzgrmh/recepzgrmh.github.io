# Phase 2 (Growth) Implementation Plan

Bu plan, `recepzgrmh.github.io` projesinin Phase 2 (Growth) özelliklerini hayata geçirmeyi amaçlar. Ana hedef, siteyi statik bir vitrinden yaşayan, veri-tepkili bir deneyime dönüştürmektir.

## Proposed Changes

### [3D Environment - Exhibition Layer]
- **Interactive Exhibition (3D Cards):** 
    - **Lock:** Sadece CSS 3D transforms ve light GSAP parallax kullanılacak. Tam WebGL mesh kart sistemi oluşturulmayacak.
    - Hover durumunda tilt, glow ve elevation efektleri.
    - Mevcut tipografi ve marka tonu korunarak refactor edilecek; sıfırdan redesign yapılmayacak.
- **Atmosphere Layer:** 
    - Sahne arkasında hafif atmosferik ışık ve yüzen geometriler.

### [API Integration - Live Status Layer]
- **Spotify "Listening Now" (Live Signal):**
    - Albüm kapağından alınan renkler **normalize/yumuşak** hale getirilecek; sadece accent katmanlarını etkileyecek ve okunabilirliği bozmayacak.
    - Polling (45s) ve hata payı yönetimi.
- **Dynamic Atmosphere Engine:**
    - **v1 (Öncelikli):** Sadece yerel saat tabanlı (Dawn, Day, GoldenHour, Night) mood motoru.
    - **v2 (Opsiyonel):** Hava durumu overlay'i (progressive enhancement olarak).

### [File & Module Deliverables]
- `content/projects.js` (Modüler içerik dökümü)
- `content/blog.js` (Modüler içerik dökümü)
- `lib/spotify.js` (API fetch & polling logic)
- `lib/theme-engine.js` (Local time & mood logic)
- `components/SpotifyLiveCard.*` (UI bileşeni)
- `components/CrystalCard.*` (UI bileşeni)
- `components/ExhibitionGrid.*` (Layout bileşeni)

## Verification Plan

### Manual Verification
- **Visual:** All-screen test (Desktop/Mobile) for crystal cards.
- **Dynamic:** System clock simulation for v1 time themes.
- **UI Safety:** Spotify renklerinin okunabilirliği bozmadığının (contrast check) doğrulanması.
- **Tech Lock:** WebGL overload yerine CSS 3D performansının kontrolü.
