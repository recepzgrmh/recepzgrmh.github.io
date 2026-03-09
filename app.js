/**
 * RECEP OZGUR MIH - Portfolio Core Engine
 * --------------------------------------
 * Architecture: Event-driven initialization with spatial-grid optimized particles.
 * Performance: O(n) proximity calculation using uniform grid partitioning.
 * Stack: Three.js, GSAP, Custom i18n, Vanilla JS.
 */

// --- DEVELOPER EASTER EGG ---
console.log(
    "%c  RECEP OZGUR MIH  ",
    "background: #06b6d4; color: #fff; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 5px;"
);
console.log(
    "%cAI-Driven Mobil Mühendis. Kodlarımı incelediğin için teşekkürler! 🚀",
    "color: #06b6d4; font-size: 14px;"
);
console.log(
    "%cTech Stack: Flutter / Firebase / Node.js / Python / Three.js / GSAP",
    "color: #9ca3af; font-size: 12px;"
);
console.log(
    "%c github.com/recepzgrmh",
    "color: #9ca3af; font-size: 11px; text-decoration: underline;"
);

document.addEventListener('DOMContentLoaded', () => {

    window.reinitDynamicContent = function () {
        const isAppPage = window.location.pathname.includes('apps.html') || window.location.pathname.includes('/apps/');
        if (typeof renderFeaturedProject === 'function') {
            const container = document.getElementById('featured-project-container');
            if (container) { container.innerHTML = ''; renderFeaturedProject('featured-project-container', isAppPage); }
        }
        if (typeof renderOtherProjects === 'function') {
            const container = document.getElementById('other-projects-container');
            if (container) { container.innerHTML = ''; renderOtherProjects('other-projects-container', isAppPage); }
        }

        // Initialize Spotify Card
        window.App = window.App || {};

        window.App.initSpotifyCard = function () {
            // Pre-emptively check for anchor
            const anchor = document.getElementById('spotify-card-anchor');
            if (!anchor) return;

            // Prevent duplicate mounting
            if (document.getElementById('spotify-live-card')) return;

            if (typeof window.App.createSpotifyLiveCard === 'function') {
                const spotifyCard = window.App.createSpotifyLiveCard();
                anchor.appendChild(spotifyCard);
                console.log('[App] Spotify card mounted.');
            }
        };

        window.App.initWeatherCard = function () {
            const anchor = document.getElementById('weather-card-anchor');
            if (!anchor) return;

            if (document.getElementById('weather-live-card')) return;

            if (typeof window.App.createWeatherCard === 'function') {
                const weatherCard = window.App.createWeatherCard();
                anchor.appendChild(weatherCard);
                console.log('[App] Weather card mounted.');
            }
        };

        // Call them
        window.App.initSpotifyCard();
        window.App.initWeatherCard();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

        if (typeof gsap !== 'undefined') {
            const buttons = document.querySelectorAll('a, button');
            buttons.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
                });
                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                });
            });
        }
    };

    // run initially with a slight defer for performance
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => window.reinitDynamicContent());
    } else {
        setTimeout(() => window.reinitDynamicContent(), 100);
    }

    // --- DYNAMIC HEADER SCROLL EFFECT ---
    const nav = document.querySelector('nav.fixed');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------
    // i18n TRANSLATION SYSTEM
    // Light-weight dictionary-based mapping with 
    // real-time DOM hydration.
    // ----------------------------------------------------
    const translations = {
        tr: {
            'meta.title': 'Recep OZGUR MIH | AI-Driven Mobil Mühendis',
            'meta.desc': 'AI destekli üretkenlik ve ölçeklenebilir mimari ile ürünler inşa eden yazılım mühendisi.',
            'contact.meta.title': 'İletişim',
            'contact.meta.desc': 'Recep OZGUR MIH ile iletişime geçin.',
            'apps.meta.title': 'Uygulamalar | Recep OZGUR MIH',
            'apps.meta.desc': 'Recep OZGUR MIH tarafından geliştirilen mobil uygulamalar.',
            'blog.meta.title': 'Blog | Recep OZGUR MIH',
            'blog.meta.desc': 'Teknik blog yazıları ve derinlemesine analizler.',

            'nav.vision': 'VİZYON',
            'nav.apps': 'APPS',
            'nav.blog': 'BLOG',
            'nav.contact': 'İLETİŞİM',

            'hero.available': 'Tam Zamanlı Çalışmaya Açık',
            'hero.subtitle': 'Mobil Geliştirici & Ürün Odaklı Mühendis',
            'hero.name': 'RECEP<br>OZGUR.',
            'hero.desc': 'Fikirleri uçtan uca ölçeklenebilir ürünlere dönüştürüyorum. Otonom problem çözme becerisi ve <span class="text-white font-medium">AI destekli modern mühendislik iş akışlarıyla</span> tam donanımlı mobil deneyimler inşa ediyorum.',
            'hero.cta': 'Hikayemi Keşfet',

            'philosophy.intro': 'Ölçeklenebilir mobil geliştirme.',
            'philosophy.title': 'AI-Augmented<br>üretkenlik ve mimari.',
            'philosophy.p1.title': 'Uçtan Uca Sahiplik',
            'philosophy.p1.desc': 'Sano AI projesini tek başıma sıfırdan canlıya aldım.',
            'philosophy.p2.title': 'Yüksek Stabilite',
            'philosophy.p2.desc': '%99.9 çökmesiz deneyim ve kapsamlı testler.',
            'philosophy.p3.title': 'Hızlı MVP',
            'philosophy.p3.desc': 'AI araçlarıyla çevik prototipleme.',

            'vision.title': 'Kariyer Hedefi &<br>Vizyon.',
            'vision.scroll': 'Kaydırmaya devam et',
            'vision.p1.tag': '1. Otonom Üretim',
            'vision.p1.title': 'Sıfırdan Canlıya Ürün',
            'vision.p1.desc': 'Firebase, GCP ve IAP altyapısını bağımsız kurdum.',
            'vision.p2.tag': '2. Çevik Geliştirme',
            'vision.p2.title': 'AI Destekli MVP',
            'vision.p2.desc': 'Python, React ve Swift ile hızlı prototipler.',
            'vision.p3.tag': '3. Ar-Ge',
            'vision.p3.title': 'Lokal LLM & Quantization',
            'vision.p3.desc': 'Mistral ve Qwen modelleriyle performans testleri.',
            'vision.p4.tag': '4. Hedef',
            'vision.p4.title': 'Büyük Ekiplere Hazırım',
            'vision.p4.desc': 'Esnek akademik programla tam zamanlı müsaitim.',

            'bento.title': 'Akademik & Teknik.',
            'bento.bbt.role': 'Kurucu & Lider',
            'bento.bbt.desc': 'Teknoloji Topluluğu Yönetimi',
            'bento.bbt.stat': 'Etkinlik Katılımcısı',
            'bento.bbt.org': '60+ Organizasyon',
            'bento.bbt.event': 'İzmir Blockchain Zirvesi',
            'bento.edu.label': 'Akademik',
            'bento.edu.title': 'Bilgisayar Mühendisi',
            'bento.edu.school': 'Dokuz Eylül Üniversitesi',
            'bento.edu.status': 'Esnek Program (Tam Zamanlıya Uygun)',
            'bento.work.label': 'Profesyonel Deneyim',
            'bento.work.title': 'MaviPiksel İnternet Çözümleri',
            'bento.work.role': 'Mobile Software Developer',
            'bento.work.desc': 'Şub 2025\'te stajyer olarak başlayıp Temmuz\'dan itibaren tam zamanlı devam ediyorum. Sano AI projesini uçtan uca (Flutter/Firebase/GCP) canlıya aldım, %99.9+ crash-free oranını yakaladım.',
            'bento.work.duration': 'Şub 2025 — Halen',
            'bento.tech.label': 'Gelişmiş Teknoloji Yığını',

            'projects.title': 'Ürünler &<br>Çözümler.',
            'projects.sano.subtitle': 'Sağlık Asistanı',
            'projects.sano.subtitle_alt': 'MaviPiksel | App Store & Google Play',
            'projects.sano.date': 'Oca 2024 - Devam',
            'projects.sano.feat1': 'Projeyi Flutter, Firebase ve GCP kullanarak <strong>uçtan uca tek geliştirici</strong> olarak canlıya aldım. 16+ dil yerelleştirmesi, AI Soru-Cevap ve analiz özelliklerini geliştirdim.',
            'projects.sano.feat2': 'Google Play RTDN ve App Store Server Notifications entegrasyonu ile <strong>IAP/Abonelik sistemlerini</strong> sıfırdan güvenli bir mimariyle (Node.js Cloud Functions) kurdum.',
            'projects.sano.feat3': 'Firebase Crashlytics ile <strong>%99.9+ crash-free</strong> oranını yakalayarak 1000+ aktif kullanıcı ve 18B+ App Store gösterimi sağladım.',
            'projects.sano.screens': 'Uygulama Ekran Görüntüleri',
            'projects.sano.website': 'Web Sitesi',

            'projects.tubitak.title': 'Akıllı Yurt Bulma Sistemi',
            'projects.tubitak.desc': 'Öğrenciler için yurt arama ve filtreleme MVP\'si. Haversine mesafesi ve ağırlıklı puanlama kullanılarak özel bir öneri motoru geliştirildi.',
            'projects.astro.label': 'Kişisel Proje (2023)',
            'projects.astro.title': 'Astroloji Uygulaması',
            'projects.astro.desc': 'Günlük, haftalık burç yorumları sunan uygulama. Firebase Auth ile yönetim, Crashlytics ile kalite güvencesi sağlandı.',
            'projects.moneo.title': 'Moneo',
            'projects.moneo.desc': 'Privacy-first kişisel finans dashboard\'u. Ekstre PDF parse, 18 grafik, AI asistan, 19 tema.',
            'projects.details': 'Detayları Gör',
            'projects.inspect': 'İncele &rarr;',

            'blog.badge': 'Yakında',
            'blog.title': 'Teknik Yazılar.',
            'blog.desc': 'LLM Quantization, Flutter mimari kalıpları, AI-Augmented geliştirme iş akışları ve daha fazlası hakkında teknik blog yazılarım çok yakında burada olacak.',
            'blog.topic1.tag': 'Yakında',
            'blog.topic1.title': 'Lokal LLM Quantization Rehberi',
            'blog.topic1.desc': 'Mistral & Qwen modelleriyle 4-bit quantization deneyimleri.',
            'blog.topic2.tag': 'Yakında',
            'blog.topic2.title': 'Flutter\'da Clean Architecture',
            'blog.topic2.desc': 'Büyük ölçekli uygulamalarda katmanlı mimari stratejileri.',
            'blog.topic3.tag': 'Yakında',
            'blog.topic3.title': 'AI İş Akışlarıyla Üretkenliği Katlamak',
            'blog.topic3.desc': 'Modern yazılım süreçlerinde yapay zeka araçlarını entegre etme rehberi.',
            'blog.cta': 'İletişime Geç &rarr;',

            'cta.title': 'Birlikte kodlayalım.',
            'cta.desc': 'Büyük ölçekli ekiplere değer katmaya, tecrübelerden öğrenmeye ve en iyisini inşa etmeye hazırım.',
            'cta.button': 'Ekibe Hazırım →',

            'footer.text': 'Recep OZGUR MIH &copy; 2026',

            'apps.subtitle': 'Yayındaki Uygulamalar',
            'apps.title': 'Apps.',
            'apps.desc': 'Sıfırdan geliştirdiğim, canlıda olan uygulamalar. Her biri bir problemi çözmek için tasarlandı.',
            'apps.sano.tag': 'AI-Powered Sağlık Asistanı',
            'apps.sano.live': 'Yayında',
            'apps.sano.desc': 'Flutter ile sıfırdan geliştirdiğim, Firebase ve GCP altyapısı üzerine kurulu AI sağlık asistanı. 16+ dilde yerelleştirilmiş, IAP/abonelik sistemi, AI analiz ve soru-cevap özellikleri barındırıyor.',
            'apps.sano.screens': 'Ekran Görüntüleri',
            'apps.sano.stat1': 'Aktif Kullanıcı',
            'apps.sano.stat2': 'Crash-Free',
            'apps.sano.stat3': 'Dil Desteği',
            'apps.sano.stat4': 'App Store Gösterim',
            'apps.sano.tech': 'Teknoloji',
            'apps.sano.website': 'Web Sitesi',
            'apps.other.title': 'Diğer Projeler',

            'blog.page.title': 'Blog.',
            'blog.page.desc': 'LLM Quantization, Flutter mimari kalıpları, AI-Augmented geliştirme iş akışları ve daha fazlası hakkında teknik derinlemesine analizler.',
            'blog.topic4.tag': 'Yakında',
            'blog.topic4.title': 'IAP & Abonelik Sistemleri',
            'blog.topic4.desc': 'Google Play RTDN ve App Store Server Notifications ile güvenli abonelik yönetimi.',
            'blog.notify.title': 'Yazılar yayınlandığında haber al',
            'blog.notify.desc': 'İlk teknik yazılarım çok yakında burada olacak. Takipte kal!',

            'exp.title': 'Web Deneyimleri',
            'exp.desc': 'Öğrenme sürecimde geliştirdiğim, GitHub Pages üzerinde barındırılan mini HTML/CSS/JS projeleri.',

            'contact.form.title': 'Mesaj Gönder',
            'contact.form.label.name': 'Adın',
            'contact.form.label.email': 'E-posta',
            'contact.form.label.subject': 'Konu',
            'contact.form.label.message': 'Mesajın',
            'contact.form.placeholder.name': 'Recep',
            'contact.form.placeholder.email': 'recep@u.com',
            'contact.form.placeholder.subject': 'İş Teklifi / Proje / Merhaba',
            'contact.form.placeholder.message': 'Projen, pozisyon veya işbirliği hakkında birkaç satır yaz...',
            'contact.form.info.direct': 'Direkt İletişim',
            'contact.form.info.stack': 'Çalıştığım Teknolojiler',
            'contact.form.cta.bottom.label': 'Hadi başlayalım',
            'contact.form.cta.bottom.title': 'Birlikte bir<br><span class="text-cyan-400 cyan-glow">şeyler üretelim.</span>',
            'contact.form.cta.bottom.desc': 'İster iş teklifi, ister proje fikri olsun — seninle konuşmaktan mutluluk duyarım.',

            'toast.loading': 'Gönderiliyor...',
            'toast.success': '✅ Mesajın ulaştı!',
            'toast.error': '❌ Hata oluştu.',
            'toast.validation.fields': '⚠️ Lütfen zorunlu alanları doldurun.',
            'toast.validation.email': '⚠️ Geçerli bir e-posta adresi girin.',

            '404.title': '404',
            '404.desc': 'Aradığın sayfa dijital evrende kaybolmuş gibi görünüyor.',
            '404.button': 'Ana Sayfaya Dön &rarr;'
        },
        en: {
            'meta.title': 'Recep OZGUR MIH | AI-Driven Mobile Engineer',
            'meta.desc': 'Software engineer building products with AI.',
            'contact.meta.title': 'Contact',
            'contact.meta.desc': 'Get in touch with Recep OZGUR MIH.',
            'apps.meta.title': 'Apps | Recep OZGUR MIH',
            'apps.meta.desc': 'Mobile applications by Recep OZGUR MIH.',
            'blog.meta.title': 'Blog | Recep OZGUR MIH',
            'blog.meta.desc': 'Technical blog posts.',

            'nav.vision': 'VISION',
            'nav.apps': 'APPS',
            'nav.blog': 'BLOG',
            'nav.contact': 'CONTACT',

            'hero.available': 'Available for Full-Time',
            'hero.subtitle': 'Mobile Developer & Builder',
            'hero.name': 'RECEP<br>OZGUR.',
            'hero.desc': 'I build scalable mobile experiences with <span class="text-white font-medium">AI-augmented workflows</span>.',
            'hero.cta': 'Discover My Story',

            'philosophy.intro': 'Scalable mobile development.',
            'philosophy.title': 'AI-Augmented architecture.',
            'philosophy.p1.title': 'End-to-End Ownership',
            'philosophy.p1.desc': 'I took Sano AI from zero to production.',
            'philosophy.p2.title': 'High Stability',
            'philosophy.p2.desc': '99.9% crash-free and tested.',
            'philosophy.p3.title': 'Rapid MVP',
            'philosophy.p3.desc': 'Agile processes with AI tools.',

            'vision.title': 'Career Goal & Vision.',
            'vision.scroll': 'Keep scrolling',
            'vision.p1.tag': '1. Ownership',
            'vision.p1.title': 'Zero to Production',
            'vision.p1.desc': 'Independently built Firebase and GCP infra.',
            'vision.p2.tag': '2. Agile',
            'vision.p2.title': 'AI-Powered MVP',
            'vision.p2.desc': 'Fast prototypes in Python, React, Swift.',
            'vision.p3.tag': '3. R&D',
            'vision.p3.title': 'Local LLM & Quantization',
            'vision.p3.desc': 'Quantization tests with Mistral & Qwen.',
            'vision.p4.tag': '4. Goal',
            'vision.p4.title': 'Ready for Great Teams',
            'vision.p4.desc': 'Fully available with flexible schedule.',

            'bento.title': 'Academic & Tech.',
            'bento.bbt.role': 'Co-Founder & Lead',
            'bento.bbt.desc': 'Tech Community Management',
            'bento.bbt.stat': 'Event Participants',
            'bento.bbt.org': '60+ Events Organized',
            'bento.bbt.event': 'Izmir Blockchain Summit',
            'bento.edu.label': 'Academic',
            'bento.edu.title': 'Computer Engineer',
            'bento.edu.school': 'Dokuz Eylul University',
            'bento.edu.status': 'Flexible Schedule (Full-Time Ready)',
            'bento.work.label': 'Professional Experience',
            'bento.work.title': 'MaviPiksel Internet Solutions',
            'bento.work.role': 'Mobile Software Developer',
            'bento.work.desc': 'Started as an intern in Feb 2025, continuing full-time since July. Shipped Sano AI end-to-end (Flutter/Firebase/GCP) and maintained a 99.9%+ crash-free rate.',
            'bento.work.duration': 'Feb 2025 — Present',
            'bento.tech.label': 'Advanced Tech Stack',

            'projects.title': 'Products & Solutions.',
            'projects.sano.subtitle': 'Health Assistant',
            'projects.sano.subtitle_alt': 'MaviPiksel | App Store & Google Play',
            'projects.sano.date': 'Jan 2024 - Present',
            'projects.sano.feat1': 'Took the project live as the <strong>sole end-to-end developer</strong> using Flutter, Firebase, and GCP. Developed 16+ language localizations, AI Q&A, and analysis features.',
            'projects.sano.feat2': 'Built <strong>IAP/Subscription systems</strong> from scratch with a secure architecture (Node.js Cloud Functions) integrating Google Play RTDN and App Store Server Notifications.',
            'projects.sano.feat3': 'Achieved <strong>99.9%+ crash-free</strong> rate with Firebase Crashlytics, reaching 1000+ active users and 18B+ App Store impressions.',
            'projects.sano.screens': 'App Screenshots',
            'projects.sano.website': 'Website',

            'projects.tubitak.title': 'Smart Dorm Finder System',
            'projects.tubitak.desc': 'A dorm search and filtering MVP for students. A custom recommendation engine was developed using Haversine distance and weighted scoring.',
            'projects.astro.label': 'Personal Project (2023)',
            'projects.astro.title': 'Astrology App',
            'projects.astro.desc': 'An app offering daily and weekly horoscope readings. Managed with Firebase Auth, quality assured with Crashlytics.',
            'projects.moneo.title': 'Moneo',
            'projects.moneo.desc': 'Privacy-first personal finance dashboard. Parse PDF statements, 18 charts, AI assistant, 19 themes.',
            'projects.details': 'See Details',
            'projects.inspect': 'Inspect &rarr;',

            'blog.badge': 'Soon',
            'blog.title': 'Technical Articles.',
            'blog.desc': 'Technical blog posts on LLM Quantization, Flutter architecture patterns, AI-Augmented development workflows and more are coming here very soon.',
            'blog.topic1.tag': 'Coming Soon',
            'blog.topic1.title': 'Local LLM Quantization Guide',
            'blog.topic1.desc': '4-bit quantization experiments with Mistral & Qwen models.',
            'blog.topic2.tag': 'Coming Soon',
            'blog.topic2.title': 'Clean Architecture in Flutter',
            'blog.topic2.desc': 'Layered architecture strategies for large-scale applications.',
            'blog.topic3.tag': 'Coming Soon',
            'blog.topic3.title': 'Maximizing Productivity with AI Workflows',
            'blog.topic3.desc': 'A guide to integrating AI tools into modern software development processes.',
            'blog.cta': 'Get in Touch &rarr;',

            'cta.title': 'Let\'s code together.',
            'cta.desc': 'Ready to add value to large-scale teams, learn from experience, and build the best.',
            'cta.button': 'Ready to Join →',

            'footer.text': 'Recep OZGUR MIH &copy; 2026',

            'apps.subtitle': 'Published Apps',
            'apps.title': 'Apps.',
            'apps.desc': 'Applications I built from scratch that are live in production. Each one designed to solve a real problem.',
            'apps.sano.tag': 'AI-Powered Health Assistant',
            'apps.sano.live': 'Live',
            'apps.sano.desc': 'An AI health assistant built from scratch with Flutter, powered by Firebase and GCP infrastructure. Localized in 16+ languages with IAP/subscription systems, AI analysis and Q&A features.',
            'apps.sano.screens': 'Screenshots',
            'apps.sano.stat1': 'Active Users',
            'apps.sano.stat2': 'Crash-Free',
            'apps.sano.stat3': 'Languages',
            'apps.sano.stat4': 'App Store Impressions',
            'apps.sano.tech': 'Technology',
            'apps.sano.website': 'Website',
            'apps.other.title': 'Other Projects',

            'blog.page.title': 'Blog.',
            'blog.page.desc': 'Technical deep-dive analyses on LLM Quantization, Flutter architecture patterns, AI-Augmented development workflows and more.',
            'blog.topic4.tag': 'Coming Soon',
            'blog.topic4.title': 'IAP & Subscription Systems',
            'blog.topic4.desc': 'Secure subscription management with Google Play RTDN and App Store Server Notifications.',
            'blog.notify.title': 'Get notified when posts are published',
            'blog.notify.desc': 'My first technical articles are coming very soon. Stay tuned!',

            'exp.title': 'Web Experiences',
            'exp.desc': 'Mini HTML/CSS/JS projects built during my learning journey, hosted on GitHub Pages.',

            'contact.form.title': 'Send Message',
            'contact.form.label.name': 'Name',
            'contact.form.label.email': 'Email',
            'contact.form.label.subject': 'Subject',
            'contact.form.label.message': 'Your Message',
            'contact.form.placeholder.name': 'John',
            'contact.form.placeholder.email': 'john@c.com',
            'contact.form.placeholder.subject': 'Job Offer / Project / Hello',
            'contact.form.placeholder.message': 'Write a few lines about your project, position or collaboration...',
            'contact.form.info.direct': 'Direct Contact',
            'contact.form.info.stack': 'Tech I Work With',
            'contact.form.cta.bottom.label': 'Let\'s get started',
            'contact.form.cta.bottom.title': 'Let\'s build<br><span class="text-cyan-400 cyan-glow">something together.</span>',
            'contact.form.cta.bottom.desc': 'Whether it\'s a job offer or a project idea — I\'d be happy to talk to you.',

            'toast.loading': 'Sending...',
            'toast.success': '✅ Message sent!',
            'toast.error': '❌ Error occurred.',
            'toast.validation.fields': '⚠️ Please fill in required fields.',
            'toast.validation.email': '⚠️ Please enter a valid email address.',

            '404.title': '404',
            '404.desc': 'It seems the page you are looking for has vanished into the digital void.',
            '404.button': 'Return to Home &rarr;'
        }
    };

    // ----------------------------------------------------
    // THEME MANAGEMENT SYSTEM
    // ----------------------------------------------------
    let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';

    function updateThemeUI(theme) {
        const isLight = theme === 'light';
        const sunIcon = document.getElementById('theme-icon-sun');
        const moonIcon = document.getElementById('theme-icon-moon');

        if (isLight) {
            document.documentElement.classList.add('light-mode');
            if (sunIcon) sunIcon.classList.remove('hidden');
            if (moonIcon) moonIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('light-mode');
            if (sunIcon) sunIcon.classList.add('hidden');
            if (moonIcon) moonIcon.classList.remove('hidden');
        }

        // Update Three.js if initialized
        if (window.App && window.App.updateBackground) {
            window.App.updateBackground(theme);
        } else {
            // If Three.js is not yet ready, it will pick up currentTheme on init
            console.log("Three.js not ready, will init with:", theme);
        }
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('portfolio-theme', currentTheme);
            // Force reload to pick up all theme changes perfectly
            window.location.reload();
        });
    }

    // Initialize theme based on saved preference
    updateThemeUI(currentTheme);

    // --- i18n INIT ---
    const pathSegments = window.location.pathname.split('/');
    let pathLang = pathSegments[1];
    
    // Validate pathLang
    if (pathLang !== 'tr' && pathLang !== 'en') {
        pathLang = null;
    }

    // Determine initial language: URL takes precedence, then Storage, then default 'tr'
    let currentLang = pathLang || localStorage.getItem('portfolio-lang') || 'tr';

    // Ensure storage is in sync with our choice
    localStorage.setItem('portfolio-lang', currentLang);

    // If we are on a language-specific path but it's different from currentLang, 
    // it means the user manually changed URL or we need to align.
    // However, pathLang being present should usually dictate the language.
    if (pathLang && pathLang !== currentLang) {
        currentLang = pathLang;
        localStorage.setItem('portfolio-lang', currentLang);
    }

    // --- i18n HELPERS ---
    window.getTranslation = function (key) {
        return (translations[currentLang] && translations[currentLang][key]) || key;
    };

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('portfolio-lang', lang);
        document.documentElement.lang = lang;

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update input placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Update metadata and toggle button
        const toggleBtn = document.getElementById('lang-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
        }
    }

    // Language toggle button listener
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const nextLang = currentLang === 'tr' ? 'en' : 'tr';
            const currentPath = window.location.pathname;

            let nextPath;
            if (currentPath.includes(`/${currentLang}/`)) {
                nextPath = currentPath.replace(`/${currentLang}/`, `/${nextLang}/`);
            } else if (currentPath.endsWith(`/${currentLang}`)) {
                nextPath = currentPath.replace(`/${currentLang}`, `/${nextLang}/`);
            } else {
                nextPath = `/${nextLang}/`;
            }

            localStorage.setItem('portfolio-lang', nextLang);
            window.location.href = nextPath;
        });
    }

    window.reapplyLanguage = function () {
        setLanguage(currentLang);
    };

    // Apply saved language initially
    setLanguage(currentLang);


    // ═══════════════════════════════════════
    // 0. GLOBAL CONFIG & STATE
    // ═══════════════════════════════════════
    const initBackground = () => {
        const bgCanvas = document.getElementById('bg-canvas');
        if (!bgCanvas) return;

        const isMobile = window.innerWidth < 768;
        const PARTICLE_COUNT = isMobile ? 80 : 490;
        const CONNECTION_DISTANCE = isMobile ? 80 : 150;
        const MAX_CONNECTIONS = PARTICLE_COUNT * 60;
        const DRIFT_SPEED = 0.12;
        const BOUNDS = { x: 900, y: 500, z: 400 };

        const MOUSE_RADIUS = isMobile ? 200 : 300;
        const MOUSE_FORCE = 2.5;
        const MOUSE_GLOW_RADIUS = isMobile ? 250 : 400;
        const EASE_BACK = 0.015;

        const PULSE_INTERVAL = 2500;
        const PULSE_RADIUS = 200;
        const SHOOT_INTERVAL = 6500;
        const SHOOT_DURATION = 400;
        const MAX_SHOOTS = 4;
        const RADIAL_DRIFT_FORCE = 0.005;

        const WARP_SPEED_MULT = 8;
        const SCROLL_COLOR_CYAN = { r: 6 / 255, g: 182 / 255, b: 212 / 255 };
        const SCROLL_COLOR_PURPLE = { r: 168 / 255, g: 85 / 255, b: 247 / 255 };
        const SCROLL_SHOCKWAVE_FORCE = 0.3;

        const particlesData = [];
        const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
        const particleSizes = new Float32Array(PARTICLE_COUNT);
        const homePositions = new Float32Array(PARTICLE_COUNT * 3);

        // ═══════════════════════════════════════
        // SPATIAL GRID (for O(n) connection checks)
        // ═══════════════════════════════════════
        const GRID_CELL_SIZE = CONNECTION_DISTANCE;
        const GRID_W = Math.ceil(BOUNDS.x * 2 / GRID_CELL_SIZE) + 2;
        const GRID_H = Math.ceil(BOUNDS.y * 2 / GRID_CELL_SIZE) + 2;
        const GRID_D = Math.ceil(BOUNDS.z * 2 / GRID_CELL_SIZE) + 2;
        const grid = new Array(GRID_W * GRID_H * GRID_D);
        const gridCounts = new Int32Array(GRID_W * GRID_H * GRID_D);
        const MAX_PER_CELL = 20;

        // Pre-allocate grid cell arrays
        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Int32Array(MAX_PER_CELL);
        }

        function getGridIndex(x, y, z) {
            const gx = Math.max(0, Math.min(GRID_W - 1, Math.floor((x + BOUNDS.x) / GRID_CELL_SIZE)));
            const gy = Math.max(0, Math.min(GRID_H - 1, Math.floor((y + BOUNDS.y) / GRID_CELL_SIZE)));
            const gz = Math.max(0, Math.min(GRID_D - 1, Math.floor((z + BOUNDS.z) / GRID_CELL_SIZE)));
            return gx + gy * GRID_W + gz * GRID_W * GRID_H;
        }

        function rebuildGrid() {
            gridCounts.fill(0);
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const idx = getGridIndex(particlePositions[i3], particlePositions[i3 + 1], particlePositions[i3 + 2]);
                if (gridCounts[idx] < MAX_PER_CELL) {
                    grid[idx][gridCounts[idx]] = i;
                    gridCounts[idx]++;
                }
            }
        }


        // Layout target computation function
        function getLayoutTarget(i, layout) {
            if (layout === 'SPHERE') {
                const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
                const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
                const r = 350;
                return {
                    x: r * Math.cos(theta) * Math.sin(phi),
                    y: r * Math.sin(theta) * Math.sin(phi),
                    z: r * Math.cos(phi)
                };
            } else if (layout === 'SCATTER') {
                return null;
            } else { // VORTEX
                const angle = i * 0.15;
                const r = 30 + i * 1.2;
                return {
                    x: Math.cos(angle) * r,
                    y: Math.sin(angle) * r,
                    z: (i - PARTICLE_COUNT / 2) * 1.5
                };
            }
        }

        let currentLayout = 'SPHERE';
        let layoutBlend = 0;

        // 2. HORIZONTAL SCROLL LOGIC + SCROLL STATE
        let scrollDepth = 0;
        let horizontalActive = false;
        let horizontalProgress = 0;
        let prevScrollY = 0;
        let scrollVelocity = 0;

        window.addEventListener('scroll', () => {
            const horizontalSection = document.getElementById('vision');
            const horizontalContainer = document.getElementById('horizontal-container');

            const docH = document.documentElement.scrollHeight - window.innerHeight;
            scrollDepth = docH > 0 ? Math.max(0, Math.min(1, window.scrollY / docH)) : 0;
            scrollVelocity = Math.abs(window.scrollY - prevScrollY);
            prevScrollY = window.scrollY;

            if (horizontalSection && horizontalContainer) {
                const rect = horizontalSection.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const maxScrollDown = rect.height - viewportHeight;
                let sp = -rect.top / maxScrollDown;
                sp = Math.max(0, Math.min(1, sp));
                horizontalProgress = sp;
                horizontalActive = rect.top <= 0 && rect.bottom >= viewportHeight;

                // Kart Kart Kaydırma Animasyonu (Snap Mode)
                const cardsCount = horizontalContainer.children.length || 4;
                const steps = Math.max(1, cardsCount - 1);
                const snappedSp = Math.round(sp * steps) / steps;

                const maxTranslateX = horizontalContainer.scrollWidth - window.innerWidth + 150;
                horizontalContainer.style.transform = `translateX(-${snappedSp * maxTranslateX}px)`;
            }
        });

        // 2.7 MICRO-FEEDBACK (Ripples)
        window.addEventListener('mousedown', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX - 25}px`;
            ripple.style.top = `${e.clientY - 25}px`;
            ripple.style.width = '50px';
            ripple.style.height = '50px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
        });

        // 2.8 KINETIC HEADER & TEXT
        let mouseMoveTimeout;
        window.addEventListener('mousemove', (e) => {
            if (typeof gsap === 'undefined' || mouseMoveTimeout) return;

            mouseMoveTimeout = requestAnimationFrame(() => {
                const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
                const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

                const nav = document.querySelector('nav');
                if (nav) {
                    gsap.to(nav, {
                        x: xPercent * 10,
                        y: yPercent * 5,
                        rotationY: xPercent * 5,
                        rotationX: -yPercent * 5,
                        duration: 0.5
                    });
                }

                document.querySelectorAll('.cyan-glow').forEach(el => {
                    gsap.to(el, {
                        x: xPercent * 15,
                        y: yPercent * 10,
                        duration: 0.6
                    });
                });
                mouseMoveTimeout = null;
            });
        });

        // 3. THREE.JS NETWORK MESH — ENHANCED ENERGY SYSTEM
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return; // Canvas check
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 700;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
        renderer.setClearColor(currentTheme === 'light' ? 0xf1f5f9 : 0x0f0f0f, 1);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Expose update function will be defined later after materials are ready

        // ═══════════════════════════════════════
        // PARTICLES
        // ═══════════════════════════════════════

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * BOUNDS.x * 2;
            const y = (Math.random() - 0.5) * BOUNDS.y * 2;
            const z = (Math.random() - 0.5) * BOUNDS.z * 2;
            const i3 = i * 3;

            particlePositions[i3] = homePositions[i3] = x;
            particlePositions[i3 + 1] = homePositions[i3 + 1] = y;
            particlePositions[i3 + 2] = homePositions[i3 + 2] = z;
            particleSizes[i] = 1.0;

            particlesData.push({
                vx: (Math.random() - 0.5) * DRIFT_SPEED,
                vy: (Math.random() - 0.5) * DRIFT_SPEED,
                vz: (Math.random() - 0.5) * DRIFT_SPEED,
                activation: 0,
                displaced: false,
            });
        }

        // Custom shader for per-particle sizing & glow
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));
        particleGeometry.setAttribute('aSize', new THREE.BufferAttribute(particleSizes, 1).setUsage(THREE.DynamicDrawUsage));

        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(currentTheme === 'light' ? 0x475569 : 0xcccccc) },
                uGlowColor: { value: new THREE.Color(0x06b6d4) },
            },
            vertexShader: `
            attribute float aSize;
            varying float vSize;
            void main() {
                vSize = aSize;
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = aSize * (${isMobile ? '350.0' : '300.0'} / -mv.z);
                gl_Position = projectionMatrix * mv;
            }
        `,
            fragmentShader: `
            uniform vec3 uColor;
            uniform vec3 uGlowColor;
            varying float vSize;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                if (d > 0.5) discard;
                float glow = smoothstep(0.5, 0.0, d);
                float activation = clamp((vSize - 1.0) / 3.0, 0.0, 1.0);
                vec3 col = mix(uColor, uGlowColor, activation * 0.6);
                float alpha = glow * mix(0.6, 1.0, activation);
                gl_FragColor = vec4(col, alpha);
            }
        `,
            transparent: true,
            depthWrite: false,
            blending: currentTheme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
        });

        const pointCloud = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(pointCloud);

        // ═══════════════════════════════════════
        // CONNECTION LINES
        // ═══════════════════════════════════════
        const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
        const lineColors = new Float32Array(MAX_CONNECTIONS * 6);

        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));
        lineGeometry.setDrawRange(0, 0);

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: currentTheme === 'light' ? 0.2 : 0.7,
            blending: currentTheme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
            depthWrite: false,
        });

        const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(linesMesh);

        // ═══════════════════════════════════════
        // SHOOTING LINES (energy bolts)
        // ═══════════════════════════════════════
        const shootLines = [];

        function createShootLine() {
            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(6);
            const col = new Float32Array(6);
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
            const mat = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 1.0,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });
            const mesh = new THREE.LineSegments(geo, mat);
            scene.add(mesh);
            return { mesh, geo, pos, col, active: false, progress: 0, from: 0, to: 0, startTime: 0 };
        }

        for (let i = 0; i < MAX_SHOOTS; i++) {
            shootLines.push(createShootLine());
        }

        // Expose update function - defined here after materials are ready
        window.App = window.App || {};
        const tempColor = new THREE.Color();
        window.App.updateBackground = (theme) => {
            const isLight = theme === 'light';
            const targetColor = isLight ? 0xf1f5f9 : 0x0f0f0f;
            const particleColor = isLight ? 0x475569 : 0xcccccc;

            if (typeof gsap !== 'undefined') {
                renderer.getClearColor(tempColor);
                gsap.to(tempColor, {
                    r: (targetColor >> 16 & 255) / 255,
                    g: (targetColor >> 8 & 255) / 255,
                    b: (targetColor & 255) / 255,
                    duration: 0.8,
                    onUpdate: () => renderer.setClearColor(tempColor)
                });

                gsap.to(particleMaterial.uniforms.uColor.value, {
                    r: (particleColor >> 16 & 255) / 255,
                    g: (particleColor >> 8 & 255) / 255,
                    b: (particleColor & 255) / 255,
                    duration: 0.8
                });
            } else {
                renderer.setClearColor(targetColor);
                particleMaterial.uniforms.uColor.value.setHex(particleColor);
            }

            particleMaterial.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
            lineMaterial.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
            lineMaterial.opacity = isLight ? 0.2 : 0.7;

            particleMaterial.needsUpdate = true;
            lineMaterial.needsUpdate = true;
        };

        const syncTheme = () => {
            const isLight = document.documentElement.classList.contains('light-mode');
            const theme = isLight ? 'light' : 'dark';
            window.App.updateBackground(theme);
        };

        // ═══════════════════════════════════════
        // Final initialization check
        syncTheme();

        // ═══════════════════════════════════════
        // MOUSE TRACKING
        // ═══════════════════════════════════════
        const mouseNDC = new THREE.Vector2(9999, 9999);
        const mouseWorld = new THREE.Vector3(9999, 9999, 9999);
        const prevMouseWorld = new THREE.Vector3(9999, 9999, 9999);
        const raycaster = new THREE.Raycaster();
        const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        let mouseActive = false;
        let lastMouseMoveTime = 0;

        document.addEventListener('mousemove', (event) => {
            mouseNDC.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseNDC.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseNDC, camera);
            prevMouseWorld.copy(mouseWorld);
            raycaster.ray.intersectPlane(zPlane, mouseWorld);
            mouseActive = true;
            lastMouseMoveTime = performance.now();
        });

        document.addEventListener('mouseleave', () => {
            mouseNDC.set(9999, 9999);
            mouseWorld.set(9999, 9999, 9999);
            mouseActive = false;
        });

        // Click interaction state
        let mouseHeld = false;
        let mouseHoldTime = 0;
        let shockwaveActive = false;
        let shockwaveOrigin = { x: 0, y: 0 };
        let shockwaveTime = 0;

        // Easter Egg State
        let easterEggTimer = null;
        let isExploded = false;

        document.addEventListener('mousedown', (e) => {
            const tag = e.target.tagName;
            const isInteractive = (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA');
            if (!isInteractive && mouseActive) {
                mouseHeld = true;
                mouseHoldTime = performance.now();
                
                if (currentLayout === 'SPHERE' && !isExploded) {
                    easterEggTimer = setTimeout(() => {
                        triggerEasterEgg();
                    }, 8000);
                }
            }
        });

        document.addEventListener('mouseup', () => {
            if (mouseHeld) {
                shockwaveActive = true;
                shockwaveOrigin.x = mouseWorld.x;
                shockwaveOrigin.y = mouseWorld.y;
                shockwaveTime = performance.now();
            }
            mouseHeld = false;
            if (easterEggTimer) {
                clearTimeout(easterEggTimer);
                easterEggTimer = null;
            }
        });
        
        document.addEventListener('mouseleave', () => {
            if (easterEggTimer) {
                clearTimeout(easterEggTimer);
                easterEggTimer = null;
            }
        });

        function triggerEasterEgg() {
            isExploded = true;
            
            // Give particles huge outward velocity
            const positions = particleGeometry.attributes.position.array;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                const y = positions[i3 + 1];
                const z = positions[i3 + 2];
                const len = Math.sqrt(x*x + y*y + z*z) || 1;
                particlesData[i].vx = (x / len) * (Math.random() * 40 + 20);
                particlesData[i].vy = (y / len) * (Math.random() * 40 + 20);
                particlesData[i].vz = (z / len) * (Math.random() * 40 + 20);
            }
            
            triggerDOMGravity();
        }

        function triggerDOMGravity() {
            // Find all elements to drop, including cards and major containers
            const selectors = 'h1, h2, h3, p, span, a, button, img, .project-card, .glass-card, .card, .stat-card, .skill-tag';
            const elementsToDrop = Array.from(document.querySelectorAll(selectors)).filter(el => {
                const rect = el.getBoundingClientRect();
                const isNav = el.closest('nav');
                const isSpotify = el.closest('#spotify-live-card');
                const isCanvas = el.tagName === 'CANVAS';
                const isSmall = rect.width < 5 || rect.height < 5;
                
                // If it's a child of another falling element, don't drop it separately
                // to keep containers intact
                let parent = el.parentElement;
                while (parent) {
                    if (parent.matches && parent.matches(selectors) && !parent.closest('nav')) return false;
                    parent = parent.parentElement;
                }
                
                return !isSmall && !isNav && !isSpotify && !isCanvas;
            });
            
            const scrollY = window.scrollY;
            const physicsObjects = elementsToDrop.map(el => {
                const rect = el.getBoundingClientRect();
                return {
                    el: el,
                    x: rect.left,
                    y: rect.top + scrollY,
                    w: rect.width,
                    h: rect.height,
                    vx: (Math.random() - 0.5) * 15,
                    vy: (Math.random() - 1) * 20,
                    rotation: 0,
                    vr: (Math.random() - 0.5) * 20,
                    active: true
                };
            });
            
            physicsObjects.forEach(obj => {
                obj.el.style.position = 'absolute';
                obj.el.style.left = obj.x + 'px';
                obj.el.style.top = obj.y + 'px';
                obj.el.style.width = obj.w + 'px';
                obj.el.style.margin = '0';
                obj.el.style.zIndex = '10000';
                obj.el.style.transition = 'none'; // Stop CSS transitions
            });
            
            const gravity = 0.6;
            const bounce = 0.5;
            
            function physicsLoop() {
                let active = false;
                const ground = document.documentElement.scrollHeight;
                
                physicsObjects.forEach(obj => {
                    if (!obj.active) return;
                    
                    obj.vy += gravity;
                    obj.x += obj.vx;
                    obj.y += obj.vy;
                    obj.rotation += obj.vr;
                    
                    if (obj.y + obj.h > ground) {
                        obj.y = ground - obj.h;
                        obj.vy *= -bounce;
                        obj.vx *= 0.8;
                        obj.vr *= 0.8;
                        
                        if (Math.abs(obj.vy) < 1.5 && Math.abs(obj.vx) < 0.5) {
                            obj.active = false;
                        } else {
                            active = true;
                        }
                    } else {
                        active = true;
                    }
                    
                    obj.el.style.transform = `translate(${obj.x - parseFloat(obj.el.style.left)}px, ${obj.y - parseFloat(obj.el.style.top)}px) rotate(${obj.rotation}deg)`;
                });
                
                if (active) {
                    requestAnimationFrame(physicsLoop);
                }
            }
            requestAnimationFrame(physicsLoop);
        }

        // ═══════════════════════════════════════
        // IDLE ENERGY PULSES
        // ═══════════════════════════════════════
        let lastPulseTime = 0;
        let lastShootTime = 0;

        function triggerPulse(now) {
            const cx = (Math.random() - 0.5) * BOUNDS.x * 1.4;
            const cy = (Math.random() - 0.5) * BOUNDS.y * 1.4;
            const positions = particleGeometry.attributes.position.array;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const dx = positions[i3] - cx;
                const dy = positions[i3 + 1] - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < PULSE_RADIUS) {
                    const strength = 1.0 - (dist / PULSE_RADIUS);
                    particlesData[i].activation = Math.max(particlesData[i].activation, strength);
                }
            }
        }

        function triggerShoot(now) {
            const slot = shootLines.find(s => !s.active);
            if (!slot) return;

            let attempts = 0;
            let from, to;
            const positions = particleGeometry.attributes.position.array;
            do {
                from = Math.floor(Math.random() * PARTICLE_COUNT);
                to = Math.floor(Math.random() * PARTICLE_COUNT);
                const f3 = from * 3, t3 = to * 3;
                const dx = positions[f3] - positions[t3];
                const dy = positions[f3 + 1] - positions[t3 + 1];
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 100 && dist < 500) break;
                attempts++;
            } while (attempts < 20);

            slot.active = true;
            slot.from = from;
            slot.to = to;
            slot.startTime = now;
            slot.progress = 0;

            particlesData[from].activation = 1.0;
            particlesData[to].activation = 0.8;
        }

        // ═══════════════════════════════════════
        // RESIZE & VISIBILITY
        // ═══════════════════════════════════════
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        let isVisible = true;
        const visibilityObserver = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        visibilityObserver.observe(canvas);

        // ═══════════════════════════════════════
        // ANIMATION LOOP
        // ═══════════════════════════════════════
        function animate() {
            requestAnimationFrame(animate);
            if (!isVisible) return;

            const now = performance.now();
            const positions = particleGeometry.attributes.position.array;
            const sizes = particleGeometry.attributes.aSize.array;

            // --- Scroll-reactive state ---
            const sD = scrollDepth;
            const warp = horizontalActive ? 1.0 : 0.0;
            const cS = SCROLL_COLOR_CYAN, cP = SCROLL_COLOR_PURPLE;
            let scrollR, scrollG, scrollB;
            if (sD < 0.3) {
                const t = sD / 0.3;
                scrollR = 1.0 * (1 - t) + cS.r * t;
                scrollG = 1.0 * (1 - t) + cS.g * t;
                scrollB = 1.0 * (1 - t) + cS.b * t;
            } else if (sD < 0.7) {
                const t = (sD - 0.3) / 0.4;
                scrollR = cS.r * (1 - t) + cP.r * t;
                scrollG = cS.g * (1 - t) + cP.g * t;
                scrollB = cS.b * (1 - t) + cP.b * t;
            } else {
                const t = (sD - 0.7) / 0.3;
                scrollR = cP.r * (1 - t) + 0.8 * t;
                scrollG = cP.g * (1 - t) + 0.8 * t;
                scrollB = cP.b * (1 - t) + 0.85 * t;
            }
            const scrollColorMix = Math.min(sD * 2.5, 1.0);

            // --- Global Intensity ---
            let globalIntensity = 1.0;
            if (sD > 0.1 && sD < 0.9) {
                globalIntensity = 0.45 + (warp * 0.25);
                if (!horizontalActive && sD > 0.4) globalIntensity *= 0.8;
            } else if (sD >= 0.9) {
                globalIntensity = 0.6;
            }

            // --- Idle energy pulses ---
            const velFactor = Math.min(scrollVelocity * 0.2, 3.0);
            const pulseInterval = warp > 0 ? PULSE_INTERVAL / 3 : PULSE_INTERVAL / (1 + velFactor);
            const shootInterval = warp > 0 ? SHOOT_INTERVAL / 3 : SHOOT_INTERVAL / (1 + velFactor * 1.5);

            if (now - lastPulseTime > pulseInterval) {
                triggerPulse(now);
                lastPulseTime = now;
            }
            if (now - lastShootTime > shootInterval) {
                triggerShoot(now);
                lastShootTime = now;
            }

            // --- Determine current layout from scroll ---
            let targetLayout;
            if (sD < 0.15) targetLayout = 'SPHERE';
            else if (sD < 0.7) targetLayout = 'SCATTER';
            else targetLayout = 'VORTEX';

            if (targetLayout !== currentLayout) currentLayout = targetLayout;

            const isStructured = (currentLayout !== 'SCATTER');
            const targetBlend = isStructured ? 0.03 : 0;
            layoutBlend += (targetBlend - layoutBlend) * 0.05;

            // --- Update particles ---
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const pd = particlesData[i];

                if (isExploded) {
                    positions[i3] += pd.vx;
                    positions[i3 + 1] += pd.vy;
                    positions[i3 + 2] += pd.vz;
                    pd.vx *= 0.98;
                    pd.vy *= 0.98;
                    pd.vz *= 0.98;
                    sizes[i] = Math.max(0.1, sizes[i] * 0.95);
                    continue;
                }

                let shakeX = 0;
                let shakeY = 0;
                if (easterEggTimer && currentLayout === 'SPHERE') {
                    const progress = Math.min((now - mouseHoldTime) / 8000, 1.0);
                    const shakeAmount = progress * 15;
                    shakeX = (Math.random() - 0.5) * shakeAmount;
                    shakeY = (Math.random() - 0.5) * shakeAmount;
                    pd.activation = Math.max(pd.activation, progress);
                }

                const warpBoost = warp * pd.vx * WARP_SPEED_MULT;
                positions[i3] += pd.vx + warpBoost + shakeX;
                positions[i3 + 1] += pd.vy + shakeY;
                positions[i3 + 2] += pd.vz;

                let mouseProximity = 0;
                if (mouseActive && mouseWorld.x < 5000) {
                    const mDx = positions[i3] - mouseWorld.x;
                    const mDy = positions[i3 + 1] - mouseWorld.y;
                    const mDistSq = mDx * mDx + mDy * mDy;
                    const interactRadius = isStructured ? MOUSE_RADIUS * 1.5 : MOUSE_RADIUS;
                    if (mDistSq < interactRadius * interactRadius) {
                        mouseProximity = 1 - Math.sqrt(mDistSq) / interactRadius;
                    }
                }

                if (layoutBlend > 0.001) {
                    const target = getLayoutTarget(i, currentLayout);
                    if (target) {
                        const pullStrength = layoutBlend * (1 - mouseProximity * 0.95);
                        positions[i3] += (target.x - positions[i3]) * pullStrength;
                        positions[i3 + 1] += (target.y - positions[i3 + 1]) * pullStrength;
                        positions[i3 + 2] += (target.z - positions[i3 + 2]) * pullStrength;
                        homePositions[i3] += (target.x - homePositions[i3]) * pullStrength;
                        homePositions[i3 + 1] += (target.y - homePositions[i3 + 1]) * pullStrength;
                        homePositions[i3 + 2] += (target.z - homePositions[i3 + 2]) * pullStrength;
                    }
                }

                const rdX = -positions[i3] * 0.001 * RADIAL_DRIFT_FORCE;
                const rdY = -positions[i3 + 1] * 0.001 * RADIAL_DRIFT_FORCE;
                positions[i3] += rdX;
                positions[i3 + 1] += rdY;

                if (scrollVelocity > 3) {
                    const pushStr = Math.min(scrollVelocity * SCROLL_SHOCKWAVE_FORCE * 0.02, 1.2);
                    positions[i3 + 1] -= pushStr * (0.5 + Math.random() * 0.5);
                    pd.activation = Math.min(pd.activation + pushStr * 0.15, 1.0);
                }

                if (warp > 0) {
                    pd.activation = Math.max(pd.activation, 0.15 + Math.abs(pd.vx) * 2);
                }

                homePositions[i3] += pd.vx;
                homePositions[i3 + 1] += pd.vy;
                homePositions[i3 + 2] += pd.vz;

                // Mouse interaction
                if (mouseActive && mouseWorld.x < 5000) {
                    const dx = positions[i3] - mouseWorld.x;
                    const dy = positions[i3 + 1] - mouseWorld.y;
                    const distSq = dx * dx + dy * dy;
                    const rSq = MOUSE_RADIUS * MOUSE_RADIUS;

                    if (mouseHeld) {
                        const attractRadius = MOUSE_RADIUS * 2.5;
                        const attractRadSq = attractRadius * attractRadius;
                        if (distSq < attractRadSq && distSq > 4) {
                            const dist = Math.sqrt(distSq);
                            const t = 1 - dist / attractRadius;
                            const attractForce = t * t * 4.0;
                            positions[i3] -= (dx / dist) * attractForce;
                            positions[i3 + 1] -= (dy / dist) * attractForce;
                            pd.displaced = true;
                            pd.activation = Math.max(pd.activation, t * 1.0);
                        }
                    } else {
                        if (distSq < rSq && distSq > 1) {
                            const dist = Math.sqrt(distSq);
                            const t = 1 - dist / MOUSE_RADIUS;
                            const forceMult = isStructured ? 3.5 : 1.0;
                            const force = t * t * t * MOUSE_FORCE * forceMult;
                            positions[i3] += (dx / dist) * force;
                            positions[i3 + 1] += (dy / dist) * force;
                            pd.displaced = true;
                            pd.activation = Math.max(pd.activation, t * 0.8);
                        }
                    }
                }

                // Shockwave
                if (shockwaveActive) {
                    const elapsed = now - shockwaveTime;
                    if (elapsed < 600) {
                        const sdx = positions[i3] - shockwaveOrigin.x;
                        const sdy = positions[i3 + 1] - shockwaveOrigin.y;
                        const sDist = Math.sqrt(sdx * sdx + sdy * sdy);
                        const waveRadius = elapsed * 1.5;
                        const waveDelta = Math.abs(sDist - waveRadius);
                        if (waveDelta < 80 && sDist > 1) {
                            const blastForce = (1 - waveDelta / 80) * 8.0;
                            positions[i3] += (sdx / sDist) * blastForce;
                            positions[i3 + 1] += (sdy / sDist) * blastForce;
                            pd.displaced = true;
                            pd.activation = Math.min(pd.activation + 0.5, 1.0);
                        }
                    } else {
                        shockwaveActive = false;
                    }
                }

                // Ease back
                if (pd.displaced) {
                    const dx = homePositions[i3] - positions[i3];
                    const dy = homePositions[i3 + 1] - positions[i3 + 1];
                    if (dx * dx + dy * dy < 1) {
                        pd.displaced = false;
                    } else {
                        positions[i3] += dx * EASE_BACK;
                        positions[i3 + 1] += dy * EASE_BACK;
                    }
                }

                // Decay activation
                if (pd.activation > 0) {
                    pd.activation *= 0.96;
                    if (pd.activation < 0.01) pd.activation = 0;
                }

                sizes[i] = 1.0 + pd.activation * 3.0;

                // Boundary bounce
                if (positions[i3] > BOUNDS.x) { positions[i3] = homePositions[i3] = BOUNDS.x; pd.vx *= -1; }
                else if (positions[i3] < -BOUNDS.x) { positions[i3] = homePositions[i3] = -BOUNDS.x; pd.vx *= -1; }
                if (positions[i3 + 1] > BOUNDS.y) { positions[i3 + 1] = homePositions[i3 + 1] = BOUNDS.y; pd.vy *= -1; }
                else if (positions[i3 + 1] < -BOUNDS.y) { positions[i3 + 1] = homePositions[i3 + 1] = -BOUNDS.y; pd.vy *= -1; }
                if (positions[i3 + 2] > BOUNDS.z) { positions[i3 + 2] = homePositions[i3 + 2] = BOUNDS.z; pd.vz *= -1; }
                else if (positions[i3 + 2] < -BOUNDS.z) { positions[i3 + 2] = homePositions[i3 + 2] = -BOUNDS.z; pd.vz *= -1; }
            }

            particleGeometry.attributes.position.needsUpdate = true;
            particleGeometry.attributes.aSize.needsUpdate = true;

            // ═══════════════════════════════════════
            // CONNECTION LINES — SPATIAL GRID METHOD
            // ═══════════════════════════════════════
            let lineIdx = 0;
            let vertexCount = 0;
            const cyanR = 6 / 255, cyanG = 182 / 255, cyanB = 212 / 255;
            
            if (!isExploded) {
                rebuildGrid();

                const connDist2 = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
                const glowRad2 = MOUSE_GLOW_RADIUS * MOUSE_GLOW_RADIUS;

                // Track which pairs we've already checked to avoid duplicates
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    if (lineIdx >= MAX_CONNECTIONS) break;

                    const i3 = i * 3;
                    const px = positions[i3], py = positions[i3 + 1], pz = positions[i3 + 2];

                    // Get grid cell for this particle
                    const gx = Math.max(0, Math.min(GRID_W - 1, Math.floor((px + BOUNDS.x) / GRID_CELL_SIZE)));
                    const gy = Math.max(0, Math.min(GRID_H - 1, Math.floor((py + BOUNDS.y) / GRID_CELL_SIZE)));
                    const gz = Math.max(0, Math.min(GRID_D - 1, Math.floor((pz + BOUNDS.z) / GRID_CELL_SIZE)));

                    // Check 3x3x3 neighborhood
                    for (let dx = -1; dx <= 1; dx++) {
                        const ngx = gx + dx;
                        if (ngx < 0 || ngx >= GRID_W) continue;
                        for (let dy = -1; dy <= 1; dy++) {
                            const ngy = gy + dy;
                            if (ngy < 0 || ngy >= GRID_H) continue;
                            for (let dz = -1; dz <= 1; dz++) {
                                const ngz = gz + dz;
                                if (ngz < 0 || ngz >= GRID_D) continue;

                                const cellIdx = ngx + ngy * GRID_W + ngz * GRID_W * GRID_H;
                                const count = gridCounts[cellIdx];

                                for (let c = 0; c < count; c++) {
                                    const j = grid[cellIdx][c];
                                    if (j <= i) continue; // avoid duplicate pairs

                                    const j3 = j * 3;
                                    const ddx = px - positions[j3];
                                    const ddy = py - positions[j3 + 1];
                                    const ddz = pz - positions[j3 + 2];
                                    const distSq = ddx * ddx + ddy * ddy + ddz * ddz;

                                    if (distSq < connDist2) {
                                        if (lineIdx >= MAX_CONNECTIONS) break;

                                        const dist = Math.sqrt(distSq);
                                        let alpha = 1.0 - dist / CONNECTION_DISTANCE;

                                        const actBoost = Math.max(particlesData[i].activation, particlesData[j].activation);
                                        alpha = alpha * (0.3 + actBoost * 0.7);

                                        let glowFactor = 0;
                                        if (mouseActive && mouseWorld.x < 5000) {
                                            const mx = (px + positions[j3]) * 0.5;
                                            const my = (py + positions[j3 + 1]) * 0.5;
                                            const mdx = mx - mouseWorld.x;
                                            const mdy = my - mouseWorld.y;
                                            const mDistSq = mdx * mdx + mdy * mdy;
                                            if (mDistSq < glowRad2) {
                                                glowFactor = 1.0 - Math.sqrt(mDistSq) / MOUSE_GLOW_RADIUS;
                                                glowFactor = glowFactor * glowFactor;
                                                alpha = Math.min(alpha + glowFactor * 0.6, 1.0);
                                            }
                                        }

                                        const colorMix = Math.min(glowFactor * 0.8 + actBoost * 0.5, 1.0);
                                        const baseR = 1.0 * (1 - scrollColorMix) + scrollR * scrollColorMix;
                                        const baseG = 1.0 * (1 - scrollColorMix) + scrollG * scrollColorMix;
                                        const baseB = 1.0 * (1 - scrollColorMix) + scrollB * scrollColorMix;

                                        const finalAlpha = alpha * globalIntensity;
                                        const r = finalAlpha * (baseR * (1 - colorMix) + cyanR * colorMix);
                                        const g = finalAlpha * (baseG * (1 - colorMix) + cyanG * colorMix);
                                        const b = finalAlpha * (baseB * (1 - colorMix) + cyanB * colorMix);

                                        const li = lineIdx * 6;
                                        linePositions[li] = px;
                                        linePositions[li + 1] = py;
                                        linePositions[li + 2] = pz;
                                        linePositions[li + 3] = positions[j3];
                                        linePositions[li + 4] = positions[j3 + 1];
                                        linePositions[li + 5] = positions[j3 + 2];

                                        lineColors[li] = r;
                                        lineColors[li + 1] = g;
                                        lineColors[li + 2] = b;
                                        lineColors[li + 3] = r;
                                        lineColors[li + 4] = g;
                                        lineColors[li + 5] = b;

                                        lineIdx++;
                                        vertexCount += 2;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            lineGeometry.setDrawRange(0, vertexCount);
            lineGeometry.attributes.position.needsUpdate = true;
            lineGeometry.attributes.color.needsUpdate = true;

            // --- Update shooting lines ---
            for (const shot of shootLines) {
                if (!shot.active) {
                    shot.mesh.visible = false;
                    continue;
                }
                shot.mesh.visible = true;
                const elapsed = now - shot.startTime;
                const t = Math.min(elapsed / SHOOT_DURATION, 1.0);

                if (t >= 1.0) {
                    shot.active = false;
                    shot.mesh.visible = false;
                    continue;
                }

                const f3 = shot.from * 3, t3 = shot.to * 3;
                const fx = positions[f3], fy = positions[f3 + 1], fz = positions[f3 + 2];
                const tx = positions[t3], ty = positions[t3 + 1], tz = positions[t3 + 2];

                const head = t;
                const tail = Math.max(0, t - 0.35);

                const hx = fx + (tx - fx) * head;
                const hy = fy + (ty - fy) * head;
                const hz = fz + (tz - fz) * head;
                const tlx = fx + (tx - fx) * tail;
                const tly = fy + (ty - fy) * tail;
                const tlz = fz + (tz - fz) * tail;

                shot.pos[0] = tlx; shot.pos[1] = tly; shot.pos[2] = tlz;
                shot.pos[3] = hx; shot.pos[4] = hy; shot.pos[5] = hz;

                const fadeIn = Math.min(t / 0.15, 1.0);
                const fadeOut = 1.0 - Math.max((t - 0.7) / 0.3, 0.0);
                const brightness = fadeIn * fadeOut;

                shot.col[0] = cyanR * brightness; shot.col[1] = cyanG * brightness; shot.col[2] = cyanB * brightness;
                shot.col[3] = cyanR * brightness * 1.5; shot.col[4] = cyanG * brightness * 1.5; shot.col[5] = cyanB * brightness * 1.5;

                shot.geo.attributes.position.needsUpdate = true;
                shot.geo.attributes.color.needsUpdate = true;

                // Activate particles along path
                const midX = (hx + tlx) * 0.5, midY = (hy + tly) * 0.5;
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    const pi3 = i * 3;
                    const pdx = positions[pi3] - midX;
                    const pdy = positions[pi3 + 1] - midY;
                    const pdist = pdx * pdx + pdy * pdy;
                    if (pdist < 4000) {
                        particlesData[i].activation = Math.max(particlesData[i].activation, brightness * 0.4);
                    }
                }
            }

            // Subtle global rotation
            const rotSpeed = 0.0001 + warp * 0.0004;
            pointCloud.rotation.y += rotSpeed;
            linesMesh.rotation.y += rotSpeed;

            // Camera parallax
            const targetZ = 700 - sD * 150 + warp * 40;
            camera.position.z += (targetZ - camera.position.z) * 0.03;
            camera.position.y += (sD * -60 - camera.position.y) * 0.02;
            camera.lookAt(0, 0, 0);

            // Update particle base color with scroll
            particleMaterial.uniforms.uGlowColor.value.setRGB(scrollR, scrollG, scrollB);

            renderer.render(scene, camera);
        }



        animate();
    };

    // --- LAZY INITIALIZATION ---
    // Start background only when browser is idle or after a safe timeout
    if ('requestIdleCallback' in window) {
        let idleHandle = requestIdleCallback(() => {
            initBackground();
        }, { timeout: 1500 });
    } else {
        setTimeout(initBackground, 1000);
    }
});