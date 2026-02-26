document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════
    // i18n TRANSLATION SYSTEM
    // ═══════════════════════════════════════
    const translations = {
        tr: {
            'nav.vision': 'VİZYON',
            'nav.apps': 'APPS',
            'nav.blog': 'BLOG',
            'nav.contact': 'İLETİŞİM',
            'hero.available': 'Tam Zamanlı Çalışmaya Açık',
            'hero.subtitle': 'Mobil Geliştirici & Ürün Odaklı Mühendis',
            'hero.desc': 'Fikirleri uçtan uca ölçeklenebilir ürünlere dönüştürüyorum. Otonom problem çözme becerisi ve <span class="text-white font-medium">AI destekli modern mühendislik iş akışlarıyla</span> tam donanımlı mobil deneyimler inşa ediyorum.',
            'hero.cta': 'Hikayemi Keşfet',
            'philosophy.intro': 'Modern ve ölçeklenebilir mobil geliştirme.',
            'philosophy.title': 'AI-Augmented<br>üretkenlik ve ölçeklenebilir<br>mimari.',
            'philosophy.p1.title': 'Uçtan Uca Sahiplik',
            'philosophy.p1.desc': 'Sano AI projesini tek başıma sıfırdan canlıya aldım. Firebase, GCP, IAP entegrasyonlarını ve backend ihtiyaçlarını kusursuzca yönettim.',
            'philosophy.p2.title': 'Yüksek Stabilite & Kalite Güvencesi',
            'philosophy.p2.desc': 'Crashlytics ile %99.9 çökmesiz (crash-free) deneyim. Kapsamlı birim testleri ile hataya yer bırakmayan sürüm teslimatları.',
            'philosophy.p3.title': 'Hızlı Prototipleme (MVP)',
            'philosophy.p3.desc': 'Fikirleri hızla doğrulamak için Python, React ve Swift ile AI araçlarını entegre ederek çevik ve işlevsel MVP süreçleri yürütme.',
            'vision.title': 'Kariyer Hedefi &<br>Teknolojik Vizyon.',
            'vision.scroll': 'Kaydırmaya devam et',
            'vision.p1.tag': '1. Otonom Üretim',
            'vision.p1.title': 'Sıfırdan Canlıya<br><span class="text-cyan-400">Ürün Sahipliği</span>',
            'vision.p1.desc': 'Mevcut işimde tek mobil geliştirici olarak tüm ürün sorumluluğunu taşıyorum. Sano AI\'ı Flutter ile sıfırdan yazdım; Firebase, GCP ve abonelik (IAP) altyapısını araştırma ve "problem çözme" yaklaşımımla bağımsız olarak ayağa kaldırdım.',
            'vision.p2.tag': '2. Çevik Geliştirme',
            'vision.p2.title': 'Çevik ve AI Destekli<br><span class="text-blue-400">MVP Geliştirme</span>',
            'vision.p2.desc': 'Mobil ile yetinmiyorum. Fikirleri hızla test etmek için AI-Augmented üretkenlik araçlarını kullanıyorum. Python, React Vite ve Swift kullanarak çok kısa sürelerde çalışan tam donanımlı prototipler (MVP) oluşturabiliyorum.',
            'vision.p3.tag': '3. Ar-Ge & Derin Öğrenme',
            'vision.p3.title': 'Lokal LLM &<br><span class="text-purple-400">Quantization</span>',
            'vision.p3.desc': 'Modern mühendislik sadece API bağlamak değildir. Büyük Dil Modellerinin (LLM) çalışma mantığını kavramak adına lokal ortamımda Mistral ve Qwen gibi modellerle <strong class="text-white">4-bit quantization</strong> modellemeleri ve performans testleri gerçekleştiriyorum.',
            'vision.p4.tag': '4. Kariyer Hedefi',
            'vision.p4.title': 'Büyük Bir Ekibe<br><span class="text-white">Değer Katmaya Hazırım</span>',
            'vision.p4.desc': 'Amacım; yüksek kod standartlarına sahip büyük ölçekli bir ekibe dahil olmak, deneyimli mühendislerle çalışmak ve sağlam bir mimari vizyon geliştirmek. <strong class="text-white">Esnek akademik programım sayesinde tam zamanlı pozisyonlar için tamamen müsaitim.</strong>',
            'bento.title': 'Akademik &<br>Teknik Ekosistem.',
            'bento.bbt.role': 'Kurucu Ortak & Lider',
            'bento.bbt.desc': 'Teknoloji Topluluğu Yönetimi',
            'bento.bbt.stat': 'Etkinlik Katılımcısı',
            'bento.bbt.org': '60+ Organizasyon',
            'bento.bbt.event': 'İzmir Blockchain Zirvesi',
            'bento.edu.label': 'Akademik',
            'bento.edu.title': 'Bilgisayar Mühendisliği (B.Sc.)',
            'bento.edu.school': 'Dokuz Eylül Üniversitesi, İzmir',
            'bento.edu.status': 'Esnek Program (Tam Zamanlıya Uygun)',
            'bento.tech.label': 'Gelişmiş Teknoloji Yığını',
            'projects.title': 'Ürünler &<br>Çözümler.',
            'projects.sano.subtitle': 'Sağlık Asistanı',
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
            'blog.badge': 'Yakında',
            'blog.title': 'Teknik Yazılar &<br>Derinlemesine Analizler.',
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
            'cta.title': 'Mimari vizyonunuzu<br>birlikte kodlayalım.',
            'cta.desc': 'Büyük ölçekli ekiplere değer katmaya, tecrübelerden öğrenmeye ve en iyisini inşa etmeye hazırım.',
            'cta.button': 'Ekibe Katılmaya Hazırım →',
            'footer.text': 'Tasarlayan ve Geliştiren: Recep Özgür Mih © 2026',
            // Apps page
            'apps.subtitle': 'Yayındaki Uygulamalar',
            'apps.title': 'Apps.',
            'apps.desc': 'Sıfırdan geliştirdiğim, canlıda olan uygulamalar. Her biri bir problemi çözmek için tasarlandı.',
            'apps.sano.tag': 'AI-Powered Sağlık Asistanı',
            'apps.sano.live': 'Yayında',
            'apps.sano.desc': 'Flutter ile sıfırdan geliştirdiğim, Firebase ve GCP altyapısı üzerine kurulu AI sağlık asistanı. 16+ dilde yerelleştirilmiş, IAP/abonelik sistemi, AI analiz ve soru-cevap özellikleri barındırıyor.',
            'apps.sano.screens': 'Ekran Görüntüleri',
            'apps.sano.stat1': 'Aktif Kullanıcı',
            'apps.sano.stat3': 'Dil Desteği',
            'apps.sano.stat4': 'App Store Gösterim',
            'apps.sano.tech': 'Teknoloji',
            'apps.sano.website': 'Web Sitesi',
            'apps.other.title': 'Diğer Projeler',
            'apps.tubitak.title': 'Akıllı Yurt Bulma Sistemi',
            'apps.tubitak.desc': 'Öğrenciler için yurt arama ve filtreleme MVP\'si. Haversine mesafesi ve ağırlıklı puanlama ile öneri motoru.',
            'apps.astro.label': 'Kişisel Proje (2023)',
            'apps.astro.title': 'Astroloji Uygulaması',
            'apps.astro.desc': 'Günlük, haftalık burç yorumları sunan uygulama. Firebase Auth ile yönetim.',
            // Blog page
            'blog.page.title': 'Blog.',
            'blog.page.desc': 'LLM Quantization, Flutter mimari kalıpları, AI-Augmented geliştirme iş akışları ve daha fazlası hakkında teknik derinlemesine analizler.',
            'blog.topic4.tag': 'Yakında',
            'blog.topic4.title': 'IAP & Abonelik Sistemleri',
            'blog.topic4.desc': 'Google Play RTDN ve App Store Server Notifications ile güvenli abonelik yönetimi.',
            'blog.notify.title': 'Yazılar yayınlandığında haber al',
            'blog.notify.desc': 'İlk teknik yazılarım çok yakında burada olacak. Takipte kal!',
            // Web Experiments section
            'exp.title': 'Web Deneyimleri',
            'exp.desc': 'Öğrenme sürecimde geliştirdiğim, GitHub Pages üzerinde barındırılan mini HTML/CSS/JS projeleri.',
            'exp.tictactoe.title': 'Tic-Tac-Toe',
            'exp.tictactoe.desc': 'Klasik X-O-X oyunu. JavaScript ile DOM manipülasyonu ve oyun mantığı pratiği.',
            'exp.pomodoro.title': 'Pomodoro Timer',
            'exp.pomodoro.desc': 'Zaman yönetimi için geliştirilmiş fonksiyonel bir Pomodoro saati.',
            'exp.drum.title': 'Drum Kit',
            'exp.drum.desc': 'Klavye tuşlarıyla etkileşimli çalışan web tabanlı bateri seti.',
            'exp.dicee.title': 'Dicee Game',
            'exp.dicee.desc': 'Rastgele zar atma mantığına dayalı, iki oyunculu basit ve eğlenceli bir oyun.',
            'exp.todo.title': 'To-Do App',
            'exp.todo.desc': 'Günlük görevlerinizi takip edebileceğiniz, JavaScript tabanlı yapılacaklar listesi.',
            'exp.tindog.title': 'TinDog',
            'exp.tindog.desc': 'Köpekler için Tinder. Bootstrap kullanılarak geliştirilmiş modern bir landing page tasarımı.',
            'exp.view': 'Projeyi İncele',
        },
        en: {
            'nav.vision': 'VISION',
            'nav.apps': 'APPS',
            'nav.blog': 'BLOG',
            'nav.contact': 'CONTACT',
            'hero.available': 'Available for Full-Time Roles',
            'hero.subtitle': 'Mobile Developer & Product Builder',
            'hero.desc': 'I transform ideas into scalable end-to-end products. I build fully-equipped mobile experiences by leveraging autonomous problem-solving and <span class="text-white font-medium">AI-augmented modern engineering workflows</span>.',
            'hero.cta': 'Discover My Story',
            'philosophy.intro': 'Modern and scalable mobile development.',
            'philosophy.title': 'AI-Augmented<br>productivity and scalable<br>architecture.',
            'philosophy.p1.title': 'End-to-End Ownership',
            'philosophy.p1.desc': 'I single-handedly took the Sano AI project from zero to production. Seamlessly managed Firebase, GCP, IAP integrations and backend needs.',
            'philosophy.p2.title': 'High Stability & Quality Assurance',
            'philosophy.p2.desc': '99.9% crash-free experience with Crashlytics. Comprehensive unit tests ensuring fault-free release deliveries.',
            'philosophy.p3.title': 'Rapid Prototyping (MVP)',
            'philosophy.p3.desc': 'Executing agile and functional MVP processes by integrating Python, React, and Swift with AI tools to rapidly validate ideas.',
            'vision.title': 'Career Goal &<br>Tech Vision.',
            'vision.scroll': 'Keep scrolling',
            'vision.p1.tag': '1. Autonomous Production',
            'vision.p1.title': 'Zero to Production<br><span class="text-cyan-400">Product Ownership</span>',
            'vision.p1.desc': 'As the sole mobile developer in my current role, I own the entire product responsibility. I built Sano AI from scratch with Flutter; independently set up Firebase, GCP, and subscription (IAP) infrastructure through research and a "problem-solving" approach.',
            'vision.p2.tag': '2. Agile Development',
            'vision.p2.title': 'Agile & AI-Powered<br><span class="text-blue-400">MVP Development</span>',
            'vision.p2.desc': 'I don\'t limit myself to mobile. I use AI-Augmented productivity tools to rapidly test ideas. I can build fully-equipped prototypes (MVPs) in record time using Python, React Vite, and Swift.',
            'vision.p3.tag': '3. R&D & Deep Learning',
            'vision.p3.title': 'Local LLM &<br><span class="text-purple-400">Quantization</span>',
            'vision.p3.desc': 'Modern engineering is more than just connecting APIs. To understand how Large Language Models (LLMs) work, I perform <strong class="text-white">4-bit quantization</strong> experiments and benchmark tests with models like Mistral and Qwen in my local environment.',
            'vision.p4.tag': '4. Career Goal',
            'vision.p4.title': 'Ready to Add Value<br><span class="text-white">to a Great Team</span>',
            'vision.p4.desc': 'My goal is to join a large-scale team with high code standards, collaborate with experienced engineers, and develop a solid architectural vision. <strong class="text-white">With a flexible academic schedule, I am fully available for full-time roles.</strong>',
            'bento.title': 'Academic &<br>Tech Ecosystem.',
            'bento.bbt.role': 'Co-Founder & Lead',
            'bento.bbt.desc': 'Tech Community Management',
            'bento.bbt.stat': 'Event Participants',
            'bento.bbt.org': '60+ Events Organized',
            'bento.bbt.event': 'Izmir Blockchain Summit',
            'bento.edu.label': 'Academic',
            'bento.edu.title': 'Computer Engineering (B.Sc.)',
            'bento.edu.school': 'Dokuz Eylul University, Izmir',
            'bento.edu.status': 'Flexible Schedule (Full-Time Ready)',
            'bento.tech.label': 'Advanced Tech Stack',
            'projects.title': 'Products &<br>Solutions.',
            'projects.sano.subtitle': 'Health Assistant',
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
            'blog.badge': 'Coming Soon',
            'blog.title': 'Technical Articles &<br>Deep Dive Analyses.',
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
            'cta.title': 'Let\'s code your<br>architectural vision together.',
            'cta.desc': 'Ready to add value to large-scale teams, learn from experience, and build the best.',
            'cta.button': 'Ready to Join the Team →',
            'footer.text': 'Designed & Developed by Recep Özgür Mih © 2026',
            // Apps page
            'apps.subtitle': 'Published Apps',
            'apps.title': 'Apps.',
            'apps.desc': 'Applications I built from scratch that are live in production. Each one designed to solve a real problem.',
            'apps.sano.tag': 'AI-Powered Health Assistant',
            'apps.sano.live': 'Live',
            'apps.sano.desc': 'An AI health assistant built from scratch with Flutter, powered by Firebase and GCP infrastructure. Localized in 16+ languages with IAP/subscription systems, AI analysis and Q&A features.',
            'apps.sano.screens': 'Screenshots',
            'apps.sano.stat1': 'Active Users',
            'apps.sano.stat3': 'Languages',
            'apps.sano.stat4': 'App Store Impressions',
            'apps.sano.tech': 'Technology',
            'apps.sano.website': 'Website',
            'apps.other.title': 'Other Projects',
            'apps.tubitak.title': 'Smart Dorm Finder System',
            'apps.tubitak.desc': 'A dorm search and filtering MVP for students. Custom recommendation engine with Haversine distance and weighted scoring.',
            'apps.astro.label': 'Personal Project (2023)',
            'apps.astro.title': 'Astrology App',
            'apps.astro.desc': 'An app offering daily and weekly horoscope readings. Managed with Firebase Auth.',
            // Blog page
            'blog.page.title': 'Blog.',
            'blog.page.desc': 'Technical deep-dive analyses on LLM Quantization, Flutter architecture patterns, AI-Augmented development workflows and more.',
            'blog.topic4.tag': 'Coming Soon',
            'blog.topic4.title': 'IAP & Subscription Systems',
            'blog.topic4.desc': 'Secure subscription management with Google Play RTDN and App Store Server Notifications.',
            'blog.notify.title': 'Get notified when posts are published',
            'blog.notify.desc': 'My first technical articles are coming very soon. Stay tuned!',
            // Web Experiments section
            'exp.title': 'Web Experiments',
            'exp.desc': 'Mini HTML/CSS/JS projects built during my learning journey, hosted on GitHub Pages.',
            'exp.tictactoe.title': 'Tic-Tac-Toe',
            'exp.tictactoe.desc': 'The classic game. Practice with DOM manipulation and game logic using JavaScript.',
            'exp.pomodoro.title': 'Pomodoro Timer',
            'exp.pomodoro.desc': 'A functional Pomodoro clock built for time management.',
            'exp.drum.title': 'Drum Kit',
            'exp.drum.desc': 'An interactive web-based drum kit that responds to keyboard presses.',
            'exp.dicee.title': 'Dicee Game',
            'exp.dicee.desc': 'A simple, fun two-player game based on random dice roll logic.',
            'exp.todo.title': 'To-Do App',
            'exp.todo.desc': 'A JavaScript-based to-do list to keep track of your daily tasks.',
            'exp.tindog.title': 'TinDog',
            'exp.tindog.desc': 'Tinder for dogs. A modern landing page design created using Bootstrap.',
            'exp.view': 'View Project',
        }
    };

    let currentLang = localStorage.getItem('portfolio-lang') || 'tr';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('portfolio-lang', lang);

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update toggle button text
        const toggleBtn = document.getElementById('lang-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
        }

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // Language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'tr' ? 'en' : 'tr');
        });
    }

    // Apply saved language
    setLanguage(currentLang);


    // ═══════════════════════════════════════
    // 0. GLOBAL CONFIG & STATE
    // ═══════════════════════════════════════
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 250 : 500;
    const CONNECTION_DISTANCE = isMobile ? 120 : 150;
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

    // 1. UI Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 2. HORIZONTAL SCROLL LOGIC + SCROLL STATE
    const horizontalSection = document.getElementById('vision');
    const horizontalContainer = document.getElementById('horizontal-container');

    let scrollDepth = 0;
    let horizontalActive = false;
    let horizontalProgress = 0;
    let prevScrollY = 0;
    let scrollVelocity = 0;

    window.addEventListener('scroll', () => {
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
            const maxTranslateX = horizontalContainer.scrollWidth - window.innerWidth + 150;
            horizontalContainer.style.transform = `translateX(-${sp * maxTranslateX}px)`;
        }
    });

    // 2.6 MAGNETIC BUTTONS
    function initMagneticButtons() {
        if (typeof gsap === 'undefined') return; // Gsap check
        const buttons = document.querySelectorAll('a, button');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });
    }
    initMagneticButtons();

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
    window.addEventListener('mousemove', (e) => {
        if (typeof gsap === 'undefined') return;
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
    });

    // 3. THREE.JS NETWORK MESH — ENHANCED ENERGY SYSTEM
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return; // Canvas check
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 700;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    renderer.setClearColor(0x0f0f0f, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
            uColor: { value: new THREE.Color(0xcccccc) },
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
        blending: THREE.AdditiveBlending,
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
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
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

    document.addEventListener('mousedown', (e) => {
        const tag = e.target.tagName;
        const isInteractive = (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA');
        if (!isInteractive && mouseActive) {
            mouseHeld = true;
            mouseHoldTime = performance.now();
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
    });

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

            const warpBoost = warp * pd.vx * WARP_SPEED_MULT;
            positions[i3] += pd.vx + warpBoost;
            positions[i3 + 1] += pd.vy;
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
        rebuildGrid();

        let lineIdx = 0;
        let vertexCount = 0;
        const connDist2 = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
        const glowRad2 = MOUSE_GLOW_RADIUS * MOUSE_GLOW_RADIUS;
        const cyanR = 6 / 255, cyanG = 182 / 255, cyanB = 212 / 255;

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
});