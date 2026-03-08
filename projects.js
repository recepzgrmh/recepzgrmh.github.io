function renderFeaturedProject(containerId, isAppPage = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // SVG Logos for Apple and Google
    const appleLogo = `<svg viewBox="0 0 384 512" width="16" height="16" fill="currentColor" class="mr-2"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>`;
    const googlePlayLogo = `<svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor" class="mr-2"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>`;

    const titleClass = isAppPage ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl";

    const content = `
    <!-- ═══ SANO AI — Featured Project Card ═══ -->
    <div class="bento-card p-8 md:p-12 fade-up group mb-12">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h3 class="${titleClass} font-bold text-white mb-2">Sano AI${isAppPage ? '' : ': <span data-i18n="projects.sano.subtitle">Sağlık Asistanı</span>'}</h3>
                <p class="text-cyan-400 font-semibold tracking-wide" ${isAppPage ? 'data-i18n="apps.sano.tag"': ''}>
                    ${isAppPage ? 'AI-Powered Sağlık Asistanı' : 'MaviPiksel | App Store & Google Play'}
                </p>
            </div>
            
            <div class="${isAppPage ? 'flex gap-3' : 'px-4 py-2 bg-white/5 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wider border border-white/10 shrink-0'}">
                ${isAppPage ? `
                <span class="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider">
                    <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block mr-2"></span>
                    <span data-i18n="apps.sano.live">Yayında</span>
                </span>` : '<span data-i18n="projects.sano.date">Oca 2024 - Devam</span>'}
            </div>
        </div>

        ${isAppPage ? `
        <p class="text-gray-200 font-light text-lg leading-relaxed mb-10 max-w-3xl" data-i18n="apps.sano.desc">
            Flutter ile sıfırdan geliştirdiğim, Firebase ve GCP altyapısı üzerine kurulu AI sağlık asistanı. 16+ dilde yerelleştirilmiş, IAP/abonelik sistemi, AI analiz ve soru-cevap özellikleri barındırıyor.
        </p>
        ` : `
        <div class="space-y-5 text-gray-200 font-light leading-relaxed mb-10">
            <p class="flex items-start gap-4">
                <span class="text-cyan-400 mt-1">✦</span>
                <span data-i18n="projects.sano.feat1">Projeyi Flutter, Firebase ve GCP kullanarak <strong>uçtan uca tek geliştirici</strong> olarak canlıya aldım. 16+ dil yerelleştirmesi, AI Soru-Cevap ve analiz özelliklerini geliştirdim.</span>
            </p>
            <p class="flex items-start gap-4">
                <span class="text-cyan-400 mt-1">✦</span>
                <span data-i18n="projects.sano.feat2">Google Play RTDN ve App Store Server Notifications entegrasyonu ile <strong>IAP/Abonelik sistemlerini</strong> sıfırdan güvenli bir mimariyle (Node.js Cloud Functions) kurdum.</span>
            </p>
            <p class="flex items-start gap-4">
                <span class="text-cyan-400 mt-1">✦</span>
                <span data-i18n="projects.sano.feat3">Firebase Crashlytics ile <strong>%99.9+ crash-free</strong> oranını yakalayarak 1000+ aktif kullanıcı ve 18B+ App Store gösterimi sağladım.</span>
            </p>
        </div>`}

        <!-- ═══ SANO AI — Screenshot Gallery ═══ -->
        <div class="mb-10">
            <div class="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest" data-i18n="${isAppPage ? 'apps.sano.screens' : 'projects.sano.screens'}">
                ${isAppPage ? 'Ekran Görüntüleri' : 'Uygulama Ekran Görüntüleri'}
            </div>
            <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
                ${[1,2,3,4,5,6].map(i => `
                <div class="flex-shrink-0 snap-center">
                    <img src="assets/sano-${i}.png" alt="Sano AI Ekran ${i}" class="w-[140px] md:w-[${isAppPage ? '200' : '180'}px] h-auto rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all hover:scale-105 duration-300 shadow-lg">
                </div>`).join('')}
            </div>
        </div>

        ${isAppPage ? `
        <!-- Key Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div class="text-center">
                <div class="text-3xl font-black text-white cyan-glow">1000+</div>
                <p class="text-gray-400 text-sm mt-1" data-i18n="apps.sano.stat1">Aktif Kullanıcı</p>
            </div>
            <div class="text-center">
                <div class="text-3xl font-black text-white cyan-glow">99.9%</div>
                <p class="text-gray-400 text-sm mt-1">Crash-Free</p>
            </div>
            <div class="text-center">
                <div class="text-3xl font-black text-white cyan-glow">16+</div>
                <p class="text-gray-400 text-sm mt-1" data-i18n="apps.sano.stat3">Dil Desteği</p>
            </div>
            <div class="text-center">
                <div class="text-3xl font-black text-white cyan-glow">18B+</div>
                <p class="text-gray-400 text-sm mt-1" data-i18n="apps.sano.stat4">App Store Gösterim</p>
            </div>
        </div>
        
        <!-- Tech Stack -->
        <div class="mb-10">
            <div class="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest" data-i18n="apps.sano.tech">Teknoloji</div>
            <div class="flex flex-wrap gap-2">
                ${['Flutter', 'Dart', 'Node.js', 'Firebase', 'Functions', 'Storage', 'Hosting', 'Realtime Database', 'Messaging (FCM)', 'App Check', 'Remote Config', 'Pub/Sub', 'Crashlytics', 'Analytics Dashboard', 'Realtime Analytics', 'Events', 'DebugView', 'Clarity (Microsoft)', 'GitHub Actions', 'Play Dev API', 'ASSN v2'].map(tech => `
                <span class="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-gray-200 text-xs">${tech}</span>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <!-- Store Links -->
        <div class="flex flex-wrap items-center gap-4">
            <a href="https://sanoapp.ai" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-bold hover:bg-cyan-500/20 transition-all" aria-label="Sano AI web sitesini ziyaret et">
                🌐 <span data-i18n="${isAppPage ? 'apps' : 'projects'}.sano.website">Web Sitesi</span>
            </a>
            <a href="https://apps.apple.com/app/id6751110925" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-gray-200 text-sm font-bold hover:bg-white/10 transition-all" aria-label="App Store'da görüntüle">
                ${appleLogo} App Store
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.mavipiksel.sanoai" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-gray-200 text-sm font-bold hover:bg-white/10 transition-all" aria-label="Google Play'de görüntüle">
                ${googlePlayLogo} Google Play
            </a>
        </div>
    </div>`;

    container.innerHTML = content;
}

function renderOtherProjects(containerId, isAppPage = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const projects = [
        {
            id: 'tubitak',
            title: 'Akıllı Yurt Bulma Sistemi',
            label: 'TÜBİTAK 2209-A (2024)',
            desc: 'Öğrenciler için yurt arama ve filtreleme MVP\'si. Haversine mesafesi ve ağırlıklı puanlama ile öneri motoru.',
            img: 'https://media.licdn.com/dms/image/v2/D4D2DAQF9hwywInbw9w/profile-treasury-image-shrink_800_800/B4DZd.b.ixHkAc-/0/1750172954795?e=1772719200&v=beta&t=iIn7jJf3V8CIX6PHAO6pEJoNjQCLLlm8VWl_FodLl2M',
            fallback: 'https://picsum.photos/seed/tubitak/600/340',
            tech: ['React Native', 'Node.js', 'Firebase', 'Firestore', 'TypeScript', 'Storage'],
            onclick: 'openTubitakModal()'
        },
        {
            id: 'moneo',
            title: 'Moneo',
            label: 'Open Source · Vibe Coded (2025)',
            desc: 'Privacy-first kişisel finans dashboard\'u. Ekstre PDF parse, 18 grafik, AI asistan, 19 tema.',
            img: 'https://media.licdn.com/dms/image/v2/D4D1FAQGdDdYw8aj_pQ/feedshare-document-images_1280/B4DZwt2RojHwA4-/1/1770295735687?e=1773273600&v=beta&t=S4FRlhWwJxWHuYMUzAr8t3BdoaJE4Js7oHgNMN11ueE',
            fallback: 'https://picsum.photos/seed/moneo/600/340',
            tech: ['React', 'Vite', 'AI-Powered', 'Chart.js'],
            onclick: 'openMoneoModal()'
        },
        {
            id: 'astro',
            title: 'Astroloji Uygulaması',
            label: 'Kişisel Proje (2023)',
            desc: 'Günlük, haftalık burç yorumları sunan uygulama. Firebase Auth ile yönetim, Crashlytics ile kalite güvencesi sağlandı.',
            img: 'https://picsum.photos/seed/astro/600/340',
            fallback: 'https://picsum.photos/seed/astro/600/340',
            tech: ['Flutter', 'Firebase'],
            onclick: ''
        }
    ];

    let content = isAppPage ? `<h3 class="text-2xl font-bold text-gray-300 mb-8 fade-up" data-i18n="apps.other.title">Diğer Projeler</h3>` : '';
    
    content += `<div class="grid md:grid-cols-2 gap-8">`;

    projects.forEach(p => {
        const interactiveClass = p.onclick ? 'cursor-pointer hover:border-cyan-500/40 transition-colors group relative' : 'group relative';
        
        content += `
        <div class="bento-card p-8 fade-up ${interactiveClass}" ${p.onclick ? `onclick="${p.onclick}"` : ''}>
            <div class="flex justify-between items-start mb-3">
                <div class="text-xs font-bold text-gray-500 uppercase tracking-widest" ${p.id === 'astro' ? `data-i18n="projects.astro.label"` : ''}>
                    ${p.label}
                </div>
                ${p.onclick ? `
                <span class="text-white/30 group-hover:text-cyan-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </span>` : ''}
            </div>

            <h3 class="text-xl font-bold text-white mb-4 ${p.onclick ? 'group-hover:text-cyan-400 transition-colors' : ''}" data-i18n="projects.${p.id}.title">${p.title}</h3>

            <div class="mb-5 overflow-hidden rounded-xl border border-white/10 w-full relative">
                <img src="${p.img}" alt="${p.title}" class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='${p.fallback}'">
                ${p.onclick ? `
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span class="bg-cyan-500 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Detayları Gör</span>
                </div>` : ''}
            </div>

            <p class="text-gray-300 font-light text-sm leading-relaxed mb-6 ${p.onclick ? 'line-clamp-2' : ''}" data-i18n="projects.${p.id}.desc">
                ${p.desc}
            </p>

            <div class="flex flex-wrap gap-2 text-xs text-cyan-400 font-semibold mb-4">
                ${p.tech.map(t => `<span>${t}</span>`).join(' • ')}
            </div>

            ${p.onclick ? `
            <!-- Mini indicator -->
            <div class="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 text-sm font-semibold flex items-center gap-1">
                İncele &rarr;
            </div>` : ''}
        </div>`;
    });

    content += `</div>`;
    container.innerHTML = content;
}
