import type { Lang, StatTone } from "./content";

export interface AcademicMilestone {
  period: string;
  title: string;
  copy: string;
  tags: string[];
}

export interface AcademicContent {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  lead: string;
  facts: { value: string; label: string; tone: StatTone }[];
  story: {
    kicker: string;
    title: string;
    note: string;
    items: {
      year: string;
      title: string;
      copy: string;
      chips: string[];
      mascot: string;
      pose: "wave" | "point" | "think" | "talk" | "serious";
    }[];
  };
  timeline: {
    kicker: string;
    title: string;
    note: string;
    items: AcademicMilestone[];
  };
  themes: {
    kicker: string;
    title: string;
    note: string;
    items: { no: string; title: string; copy: string; courses: string[] }[];
  };
  dormify: {
    kicker: string;
    title: string;
    subtitle: string;
    summary: string;
    role: string;
    metrics: { value: string; label: string }[];
    steps: { no: string; title: string; copy: string }[];
    stack: string[];
    visual: {
      title: string;
      credit: string;
      criteria: string[];
      result: string;
    };
  };
  community: {
    kicker: string;
    title: string;
    role: string;
    copy: string;
    tags: string[];
  };
  closing: {
    kicker: string;
    title: string;
    copy: string;
    work: string;
    contact: string;
  };
}

const en: AcademicContent = {
  metaTitle: "Academic Life — Recep Özgür Mıh",
  metaDescription:
    "Recep Özgür Mıh's computer science journey at Dokuz Eylül University, the TÜBİTAK 2209-A Dormify project and student community work.",
  kicker: "Academic journey",
  title: "Academic life",
  lead:
    "What I learned beyond school while shipping products and building communities.",
  facts: [
    { value: "2020", label: "university start", tone: "amber" },
    { value: "1 year", label: "English preparation", tone: "white" },
    { value: "2209-A", label: "TÜBİTAK research project", tone: "blue" },
    { value: "Founding", label: "student community member", tone: "lime" },
  ],
  story: {
    kicker: "Scroll through the story",
    title: "School was the starting point, not the whole story.",
    note: "Six stops where theory, people and production gradually came together.",
    items: [
      {
        year: "2021",
        title: "Computer Science began",
        copy:
          "I laid the foundation at Dokuz Eylül University; this is where my interest in algorithms, software engineering and product development became clear.",
        chips: ["CS", "DEU", "İzmir"],
        mascot: "This was mostly the ‘what am I actually going to do?’ era.",
        pose: "think",
      },
      {
        year: "2023",
        title: "I stepped into community work",
        copy:
          "I learned that technical growth does not happen through classes alone; bringing people together makes everyone grow much faster.",
        chips: ["Community", "Events", "Network"],
        mascot: "I learned to manage people here, not just code.",
        pose: "talk",
      },
      {
        year: "2023–2024",
        title: "DEU CS AI",
        copy:
          "In president and corporate relations roles, I managed partner relationships, sponsorships and career events.",
        chips: ["AI", "Sponsorship", "Leadership"],
        mascot: "This is where we learned to email, talk and persuade.",
        pose: "point",
      },
      {
        year: "2023–2025",
        title: "BBT İzmir",
        copy:
          "As a co-founder, I was part of 60+ technology events that reached more than 2,500 participants.",
        chips: ["60+ events", "2,500+ people", "Blockchain", "Entrepreneurship"],
        mascot: "This became a second school next to the actual one.",
        pose: "wave",
      },
      {
        year: "2025",
        title: "Production products",
        copy:
          "With Sano AI, Revna and chat.sanoapp.ai, the work left localhost and reached real users.",
        chips: ["Flutter", "Backend", "Billing", "AI"],
        mascot: "‘It works’ stopped being enough. ‘It runs reliably in production’ began.",
        pose: "serious",
      },
      {
        year: "2026",
        title: "Keep going",
        copy:
          "I keep combining mobile, backend, billing infrastructure and AI in one product mind.",
        chips: ["Product", "Fintech", "AI"],
        mascot: "Now the goal is better products and fewer words.",
        pose: "point",
      },
    ],
  },
  timeline: {
    kicker: "The trail",
    title: "One step kept opening the next.",
    note: "A concise view of the journey — focused on direction and output, not grades.",
    items: [
      {
        period: "2020 — 2021",
        title: "Preparation and a new language",
        copy:
          "I started university in 2020 and spent the first year in English preparation. It became a practical foundation for reading technical documentation, research and international engineering material.",
        tags: ["English prep", "Technical reading", "University start"],
      },
      {
        period: "2021 — 2023",
        title: "Computer science foundations",
        copy:
          "Algorithms, data structures, discrete mathematics, object-oriented programming, databases and operating systems shaped the way I break down problems before reaching for a framework.",
        tags: ["Algorithms", "Data structures", "OOP", "Databases"],
      },
      {
        period: "2023 — 2024",
        title: "Building a student community",
        copy:
          "I became a founding member of the DEU Computer Science & AI Community, then took responsibility for leadership, corporate relations, partnerships and career events.",
        tags: ["Founding member", "Leadership", "Partnerships"],
      },
      {
        period: "2023/2 — 2025",
        title: "TÜBİTAK 2209-A: Dormify",
        copy:
          "With a four-person team and an academic advisor, we turned a student housing problem into a research-backed mobile decision support system.",
        tags: ["Research", "Decision support", "Mobile product"],
      },
      {
        period: "2024 — 2026",
        title: "From theory to engineering practice",
        copy:
          "Mobile and web programming, networks, distributed algorithms, embedded systems, data security, software testing, an internship and a graduation project connected the curriculum to production thinking.",
        tags: ["Mobile", "Distributed systems", "Security", "Testing"],
      },
    ],
  },
  themes: {
    kicker: "Academic focus",
    title: "The subjects that stayed with me.",
    note:
      "Instead of publishing every course on a transcript, I group the curriculum into the three areas that most shaped how I build.",
    items: [
      {
        no: "01",
        title: "Computer science foundations",
        copy:
          "Breaking complex systems into structures, constraints and algorithms before implementation.",
        courses: [
          "Algorithms & Data Structures",
          "Graph Theory",
          "Operating Systems",
          "Computer Networks",
          "Distributed Algorithms",
        ],
      },
      {
        no: "02",
        title: "Data & decision systems",
        copy:
          "Working with uncertain, multi-variable problems through statistics, optimisation and scoring methods.",
        courses: [
          "Data Mining",
          "Multivariate Data Analysis",
          "Combinatorial Optimisation",
          "Fuzzy Logic",
          "Game Theory",
        ],
      },
      {
        no: "03",
        title: "Applied software engineering",
        copy:
          "Turning theory into interfaces, services and reliable systems that can be tested and operated.",
        courses: [
          "Object-Oriented Design",
          "Mobile Programming",
          "Web Programming",
          "Embedded Systems",
          "Software Testing & Verification",
        ],
      },
    ],
  },
  dormify: {
    kicker: "TÜBİTAK 2209-A · 2023/2",
    title: "Dormify",
    subtitle: "A personalised student dormitory decision support system",
    summary:
      "Students were losing time across outdated websites, conflicting comments and choices that were difficult to compare. As a team, we built a mobile product that ranks dormitories according to each student's priorities instead of presenting the same list to everyone.",
    role: "Four-person research and product team · Academic advisor: Prof. Dr. Efendi Nasiboğlu",
    metrics: [
      { value: "~200", label: "students surveyed" },
      { value: "21", label: "data variables" },
      { value: "4", label: "core criteria" },
      { value: "iOS + Android", label: "single codebase" },
    ],
    steps: [
      {
        no: "01",
        title: "Research",
        copy:
          "We surveyed nearly 200 university students to understand the factors that most influence dormitory choice.",
      },
      {
        no: "02",
        title: "Data collection",
        copy:
          "We combined web scraping with direct research and calls to fill gaps and structure a 21-variable dataset.",
      },
      {
        no: "03",
        title: "Decision model",
        copy:
          "Haversine distance, min-max normalisation and the Simple Additive Weighting method produced a personalised score.",
      },
      {
        no: "04",
        title: "Mobile product",
        copy:
          "We brought the model into a cross-platform flow with preferences, ranked results, maps, favourites and dormitory details.",
      },
    ],
    stack: ["React Native", "Firebase", "Firestore", "Figma", "Haversine", "SAW"],
    visual: {
      title: "Your dorm priorities",
      credit: "5 credits left",
      criteria: ["Price", "Room capacity", "Amenities", "Distance to campus"],
      result: "See personalised results",
    },
  },
  community: {
    kicker: "Beyond the classroom",
    title: "DEU Computer Science & AI Community",
    role: "Founding member · President / Corporate Relations",
    copy:
      "I helped establish the community and worked on the less visible infrastructure that keeps one alive: partner relationships, sponsorship conversations, career events and bringing students together around technology.",
    tags: ["Community building", "Events", "Corporate relations", "Student leadership"],
  },
  closing: {
    kicker: "What it became",
    title: "The theory matters most when it survives contact with a real product.",
    copy:
      "That academic foundation now shows up in how I design mobile products, model backend flows and make technical decisions.",
    work: "See the products",
    contact: "Get in touch",
  },
};

const tr: AcademicContent = {
  metaTitle: "Akademik Hayatım — Recep Özgür Mıh",
  metaDescription:
    "Recep Özgür Mıh'ın Dokuz Eylül Üniversitesi Bilgisayar Bilimleri yolculuğu, TÜBİTAK 2209-A Dormify projesi ve öğrenci topluluğu çalışmaları.",
  kicker: "Akademik yolculuk",
  title: "Akademik hayatım",
  lead:
    "Okuldan çok, ürün çıkarma ve topluluk kurma tarafında öğrendiklerim.",
  facts: [
    { value: "2020", label: "üniversite başlangıcı", tone: "amber" },
    { value: "1 yıl", label: "İngilizce hazırlık", tone: "white" },
    { value: "2209-A", label: "TÜBİTAK araştırma projesi", tone: "blue" },
    { value: "Kurucu", label: "öğrenci topluluğu üyesi", tone: "lime" },
  ],
  story: {
    kicker: "Hikâyeyi kaydır",
    title: "Okul başlangıçtı, hikâyenin tamamı değil.",
    note: "Teorinin, insanların ve production deneyiminin yavaş yavaş birleştiği altı durak.",
    items: [
      {
        year: "2021",
        title: "Bilgisayar Bilimleri başladı",
        copy:
          "Dokuz Eylül Üniversitesi'nde temeli attım; algoritma, yazılım mühendisliği ve ürün geliştirme tarafına ilgim burada netleşti.",
        chips: ["CS", "DEÜ", "İzmir"],
        mascot: "Burada daha çok ‘ben ne yapacağım ya’ modu vardı.",
        pose: "think",
      },
      {
        year: "2023",
        title: "Topluluk tarafına girdim",
        copy:
          "Teknik öğrenmenin sadece dersle olmadığını, insanları bir araya getirince çok daha hızlı büyüdüğünü gördüm.",
        chips: ["Community", "Events", "Network"],
        mascot: "Kod kadar insan yönetmeyi de burada öğrendim.",
        pose: "talk",
      },
      {
        year: "2023–2024",
        title: "DEU CS AI",
        copy:
          "Başkan / kurumsal ilişkiler rolünde partner ilişkileri, sponsorluklar ve kariyer etkinlikleri yönettim.",
        chips: ["AI", "Sponsorship", "Leadership"],
        mascot: "Mail atmayı, konuşmayı, ikna etmeyi burada öğrendik.",
        pose: "point",
      },
      {
        year: "2023–2025",
        title: "BBT İzmir",
        copy:
          "Kurucu ortak olarak 2.500+ katılımcıya ulaşan 60+ teknoloji etkinliğinin parçası oldum.",
        chips: ["60+ etkinlik", "2.500+ katılımcı", "Blockchain", "Girişimcilik"],
        mascot: "Burası bayağı okulun yanına ikinci okul gibi oldu.",
        pose: "wave",
      },
      {
        year: "2025",
        title: "Production ürünler",
        copy:
          "Sano AI, Revna ve chat.sanoapp.ai ile iş artık localhost'tan çıkıp gerçek kullanıcıya gitti.",
        chips: ["Flutter", "Backend", "Billing", "AI"],
        mascot: "Burada artık ‘çalışıyor’ yetmedi, ‘yayında sorunsuz çalışıyor’ başladı.",
        pose: "serious",
      },
      {
        year: "2026",
        title: "Devam",
        copy:
          "Mobil, backend, ödeme altyapısı ve AI tarafını tek ürün aklında birleştirmeye devam.",
        chips: ["Product", "Fintech", "AI"],
        mascot: "Şimdi hedef daha iyi ürünler, daha az laf.",
        pose: "point",
      },
    ],
  },
  timeline: {
    kicker: "Yolun izi",
    title: "Her adım bir sonrakini açtı.",
    note: "Notlara değil; yönelime, üretime ve yol boyunca üstlendiğim sorumluluklara odaklanan kısa bir özet.",
    items: [
      {
        period: "2020 — 2021",
        title: "Hazırlık ve yeni bir dil",
        copy:
          "2020'de üniversiteye başladım ve ilk yılımı İngilizce hazırlıkta geçirdim. Teknik dokümantasyon, araştırma ve uluslararası mühendislik kaynaklarını takip etmek için pratik bir temel oldu.",
        tags: ["İngilizce hazırlık", "Teknik okuma", "Üniversite başlangıcı"],
      },
      {
        period: "2021 — 2023",
        title: "Bilgisayar biliminin temelleri",
        copy:
          "Algoritmalar, veri yapıları, ayrık matematik, nesneye yönelik programlama, veritabanları ve işletim sistemleri; bir framework'e uzanmadan önce problemi parçalama biçimimi şekillendirdi.",
        tags: ["Algoritmalar", "Veri yapıları", "OOP", "Veritabanı"],
      },
      {
        period: "2023 — 2024",
        title: "Bir öğrenci topluluğu kurmak",
        copy:
          "DEÜ Bilgisayar Bilimleri ve Yapay Zeka Topluluğu'nun kurucu üyelerinden biri oldum; ardından başkanlık, kurumsal ilişkiler, partnerlikler ve kariyer etkinliklerinde sorumluluk aldım.",
        tags: ["Kurucu üye", "Liderlik", "Partnerlikler"],
      },
      {
        period: "2023/2 — 2025",
        title: "TÜBİTAK 2209-A: Dormify",
        copy:
          "Dört kişilik ekip ve akademik danışmanımızla, öğrencilerin yurt seçimi problemini araştırma temelli bir mobil karar destek sistemine dönüştürdük.",
        tags: ["Araştırma", "Karar destek", "Mobil ürün"],
      },
      {
        period: "2024 — 2026",
        title: "Teoriden mühendislik pratiğine",
        copy:
          "Mobil ve web programlama, ağlar, dağıtık algoritmalar, gömülü sistemler, veri güvenliği, yazılım testleri, staj ve bitirme projesi; müfredatı production düşüncesiyle buluşturdu.",
        tags: ["Mobil", "Dağıtık sistemler", "Güvenlik", "Test"],
      },
    ],
  },
  themes: {
    kicker: "Akademik odak",
    title: "Bende kalan çalışma alanları.",
    note:
      "Transkriptteki her dersi sıralamak yerine, bugün nasıl ürün geliştirdiğimi en çok şekillendiren müfredatı üç eksende topladım.",
    items: [
      {
        no: "01",
        title: "Bilgisayar bilimi temelleri",
        copy:
          "Karmaşık sistemleri uygulamaya geçmeden önce yapılar, kısıtlar ve algoritmalar üzerinden parçalamak.",
        courses: [
          "Algoritmalar ve Veri Yapıları",
          "Çizge Kuramı",
          "İşletim Sistemleri",
          "Bilgisayar Ağları",
          "Dağıtık Algoritmalar",
        ],
      },
      {
        no: "02",
        title: "Veri ve karar sistemleri",
        copy:
          "Belirsiz ve çok değişkenli problemleri istatistik, optimizasyon ve skorlama yöntemleriyle ele almak.",
        courses: [
          "Veri Madenciliği",
          "Çok Değişkenli Veri Analizi",
          "Kombinatoryal Optimizasyon",
          "Bulanık Mantık",
          "Oyun Teorisi",
        ],
      },
      {
        no: "03",
        title: "Uygulamalı yazılım mühendisliği",
        copy:
          "Teoriyi test edilebilir ve işletilebilir arayüzlere, servislere ve güvenilir sistemlere dönüştürmek.",
        courses: [
          "Nesneye Yönelik Tasarım",
          "Mobil Programlama",
          "Web Programlama",
          "Gömülü Sistemler",
          "Yazılım Sınama ve Doğrulama",
        ],
      },
    ],
  },
  dormify: {
    kicker: "TÜBİTAK 2209-A · 2023/2",
    title: "Dormify",
    subtitle: "Kişiselleştirilmiş yurt karar destek sistemi",
    summary:
      "Öğrenciler güncel olmayan siteler, çelişkili yorumlar ve karşılaştırması zor seçenekler arasında zaman kaybediyordu. Ekip olarak herkese aynı listeyi göstermek yerine, her öğrencinin önceliklerine göre yurtları sıralayan bir mobil ürün geliştirdik.",
    role: "4 kişilik araştırma ve ürün ekibi · Akademik danışman: Prof. Dr. Efendi Nasiboğlu",
    metrics: [
      { value: "~200", label: "anket katılımcısı" },
      { value: "21", label: "veri değişkeni" },
      { value: "4", label: "temel kriter" },
      { value: "iOS + Android", label: "tek kod tabanı" },
    ],
    steps: [
      {
        no: "01",
        title: "Araştırma",
        copy:
          "Yaklaşık 200 üniversite öğrencisiyle anket yaparak yurt seçiminde en belirleyici faktörleri çıkardık.",
      },
      {
        no: "02",
        title: "Veri toplama",
        copy:
          "Web scraping'i doğrudan araştırma ve telefon görüşmeleriyle tamamlayarak 21 değişkenli bir veri seti oluşturduk.",
      },
      {
        no: "03",
        title: "Karar modeli",
        copy:
          "Haversine mesafesi, min-max normalizasyon ve Basit Ağırlıklı Toplam yöntemiyle kişiselleştirilmiş skor ürettik.",
      },
      {
        no: "04",
        title: "Mobil ürün",
        copy:
          "Modeli; tercihler, sıralı sonuçlar, harita, favoriler ve yurt detaylarından oluşan cross-platform bir akışa taşıdık.",
      },
    ],
    stack: ["React Native", "Firebase", "Firestore", "Figma", "Haversine", "SAW"],
    visual: {
      title: "Yurt tercihlerin",
      credit: "5 kalan kredi",
      criteria: ["Fiyat", "Oda kapasitesi", "Yurt olanakları", "Okula uzaklık"],
      result: "Sana uygun sonuçları gör",
    },
  },
  community: {
    kicker: "Dersliğin ötesi",
    title: "DEÜ Bilgisayar Bilimleri ve Yapay Zeka Topluluğu",
    role: "Kurucu üye · Başkan / Kurumsal İlişkiler",
    copy:
      "Topluluğun kuruluşunda yer aldım; sonrasında bir topluluğu ayakta tutan görünmez altyapıyla ilgilendim: partner ilişkileri, sponsorluk görüşmeleri, kariyer etkinlikleri ve öğrencileri teknoloji etrafında bir araya getirmek.",
    tags: ["Topluluk kurma", "Etkinlik", "Kurumsal ilişkiler", "Öğrenci liderliği"],
  },
  closing: {
    kicker: "Neye dönüştü",
    title: "Teori, gerçek bir ürüne temas ettiğinde değer kazanıyor.",
    copy:
      "Bu akademik temel bugün mobil ürünleri tasarlama, backend akışlarını modelleme ve teknik karar verme biçimimde yaşamaya devam ediyor.",
    work: "Ürünleri gör",
    contact: "İletişime geç",
  },
};

export const ACADEMIC: Record<Lang, AcademicContent> = { en, tr };
