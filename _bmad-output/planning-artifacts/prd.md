---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['_bmad-output/project-context.md']
workflowType: 'prd'
documentCounts:
  briefCount: 0
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 1
classification:
  projectType: 'web_app'
  domain: 'general'
  complexity: 'low'
  projectContext: 'brownfield'
---

# Product Requirements Document - recepzgrmh.github.io

**Author:** Recepzgrmh
**Date:** 2026-03-08

## Executive Summary

`recepzgrmh.github.io` projesi, yüksek kaliteli görsel estetik ile teknik performansı birleştiren modern bir kişisel portfolyo ve teknoloji vitrinidir. Temel amaç, mevcut Three.js ve GSAP animasyonlarını bozmadan; kullanıcı deneyimini iyileştirmek (header görünürlüğü), teknik performansı optimize etmek ve içerikleri (blog/app) interaktif bir "teknoloji sergisi" olarak sunmaktır.

### Core Differentiators
- **Görsel Bütünlük:** Manuel optimize edilmiş, hassas parametreli Three.js sahnelerinin stabilizasyonu.
- **Dynamic Blur Elevation:** Sayfa derinliğini bozmadan navigasyon netliği sağlayan gelişmiş glassmorphism.
- **Entegre Deneyim:** Blog ve uygulamaların 3D ortamla etkileşime giren (Web Workers/Shaders koordinasyonlu) sunumu.

## Success Criteria

### Measurable Outcomes
- **Header Clarity:** Kullanıcı şikayetlerini (navigasyonun içerikle karışması) %100 gidermek.
- **Performance:** Three.js sahnelerine zarar vermeden Lighthouse LCP ve FID skorlarında %20 iyileşme.
- **Brand Authority:** Teknik derinliği yansıtan "FPS Monitor" ve "Spotify Entegrasyonu" ile etkileşim artışı.
- **SEO Score:** Google Lighthouse SEO skorunda 90+ başarı puanı.

## Product Scope & Phased Roadmap

### Phase 1: MVP (Foundation & UX)
- **Header Refactor:** Dynamic Blur Elevation ve Glassmorphism ile içerikten ayrışan navigasyon.
- **Performance Guard:** Three.js sahnelerinin Web Workers/Shader izolasyonu ile korunması.
- **SPA Continuity:** Kesintisiz 3D akışı için sarsıntısız sayfa ve bölüm geçişleri.
- **Technical Baseline:** Sadece modern tarayıcı desteği ve SEO pre-rendering kurulumu.

### Phase 2: Growth (Interaction & Aesthetics)
- **Interactive Exhibition:** Blog/Proje listelerinin 3D sahne ile etkileşime giren kristal/kart formatına dönüşümü.
- **Real-time Context:** Spotify "Listening Now" API entegrasyonu ve sese duyarlı 3D tepkiler.
- **Dynamic Atmosphere:** Saat ve hava durumuna göre otomatik renk paleti değiştiren tema motoru.

### Phase 3: Vision (Future)
- **AI-Dynamic UI:** Ziyaretçi davranışına göre gerçek zamanlı şekillenen 3D mimari deneyimi.

## User Journeys

### Selin - The Recruiter (Efficiency)
Selin, kısıtlı zamanda adayın yeteneklerini anlamaya çalışır. Modern tarayıcısında siteyi açtığında 3D derinlikten etkilenir. Sayfayı kaydırdığında header'ın netliği ona güven verir. Tek tıkla "Uygulamalar"a geçer; geçişin sarsıntısızlığı profesyonellik algısını pekiştirir.

### Kerem - The Tech Enthusiast (Validation)
Kerem, teknik derinliği sorgular. FPS monitörünü açarak optimizasyonu test eder. Web Worker izolasyonu sayesinde UI etkileşimlerinin 60 FPS'te kaldığını gördüğünde teknik beceriyi takdir eder.

### Can - The Student Reader (Inspiration)
Can, teknik blog yazısını bir "deneyim" olarak tüketir. İçeriğin 3D sahne ile uyumlu renk değişimleri (Theme Engine) okuma sürecini bir yolculuğa dönüştürür.

## Technical Requirements

### Architecture & Performance
- **SPA Architecture:** Sayfa geçişlerinde 3D state korunumu için Single Page Application mimarisi.
- **Thread Isolation:** Three.js render döngülerinin Web Workers ile ana thread'den ayrılması.
- **Modern Browser Policy:** Sadece en güncel (Chrome, Safari, Firefox, Edge) tarayıcıların desteklenmesi.

### SEO & Visibility
- **Pre-rendering:** Dinamik içeriklerin arama motorları için statik olarak ön-işlenmesi.
- **Dynamic Meta:** Her içerik için otomatik OpenGraph ve Meta keşfi.

## Functional Requirements

### Navigasyon ve UI
- **FR1:** Ziyaretçiler, sayfanın her noktasında net ve erişilebilir bir navigasyon menüsü görmeli.
- **FR2:** Ziyaretçiler, bölümler arasında 3D sahneyi resetlemeden sarsıntısız geçiş yapabilmeli.
- **FR3:** Ziyaretçiler, her an görünür bir "İletişim" aksiyonuna erişebilmeli.

### 3D Ortam ve Etkileşim
- **FR4:** Sistem, 3D hesaplamaları izole ederek akıcı (60 FPS) bir kullanıcı deneyimi sunmalı.
- **FR5:** Sistem, Three.js sahnelerini orijinal görsel parametrelerini bozmadan optimize etmeli.
- **FR6:** Sistem, Spotify API aracılığıyla anlık müzik bilgisini 3D sahneye görsel tepki olarak yansıtmalı.

### İçerik Yönetimi
- **FR7:** Ziyaretçiler, blog ve projeleri 3D ortamla etkileşimli özel kartlar/kristaller içinde görebilmeli.
- **FR8:** Arama motorları, sitenin tüm dinamik içeriklerini teknik engellere takılmadan tarayabilmeli.

## Non-Functional Requirements

### Quality & Performance Metrics
- **Response Time:** Ana sahneler ve arayüz etkileşimleri 200ms altında tepki vermeli.
- **Load Speed:** İlk anlamlı içerik (LCP) 2.5 saniye altında yüklenmeli.
- **Reliability:** Three.js sahneleri hiçbir tarayıcı yeniden yüklemesi gerektirmeden kararlı çalışmalı.
- **Accessibility:** Kritik navigasyon ve butonlar klavye (Tab) ile kontrol edilebilir olmalı.
