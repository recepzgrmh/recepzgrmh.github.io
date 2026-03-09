---
stepsCompleted: []
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/phase-2-plan.md', 'plan.md']
workflowType: 'architecture'
project_name: 'recepzgrmh.github.io'
user_name: 'Recepzgrmh'
date: '2026-03-09'
---

# Phase 2 Architecture Decision Document

Bu döküman, `plan.md` vizyonu ve kullanıcı geri bildirimleri doğrultusunda Phase 2 (Growth) teknik kararlarını detaylandırır.

## 1. Live Status Layer (Spotify & Atmosphere)
- **Spotify Integration:**
    - **Polling:** `visibilitychange` API ile sekmeye dönüldüğünde tetiklenen 45-60 saniyelik interval.
    - **Reactive 3D:** `extractDominantColor` çıktısı **normalize/yumuşak** hale getirilecek (WCAG contrast check). Sadece `THREE.PointLight` accent'lerini ve particle tint'lerini etkileyecek; ana temayı ezmeyecek.
- **Dynamic Atmosphere Engine:**
    - **v1 (Core):** `new Date()` tabanlı Yerel Saat temaları (Dawn, Day, GoldenHour, Night).
    - **v2 (Enhancement):** Weather API üzerinden gelen verilerle v1 üzerine binen opsiyonel overlay katmanı.

## 2. 3D Exhibition Layer (Crystal Cards)
- **Technology Choice:** **CSS 3D Transforms + GSAP Parallax.** 
    - **Kısıtlama:** Phase 2 kapsamında tam WebGL mesh tabanlı kart render'ı yapılmayacak. 
    - Performans için `backface-visibility: hidden` ve `transform-style: preserve-3d` optimizasyonları kullanılacak.
- **Content Source:** `content/projects.js` ve `content/blog.js` modülleri üzerinden data-driven rendering.

## 3. Performance & Design Integrity
- **Lazy Loading:** 3D efektleri ve API verileri `DOMContentLoaded` sonrası, idle zamanında yüklenir.
- **Brand Integrity:** Mevcut tipografi sistemi ve marka dili korunacak; görsel efektler içeriğin okunabilirliğinin önüne geçmeyecek.
