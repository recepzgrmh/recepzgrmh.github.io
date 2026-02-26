// ═══════════════════════════════════════
// TUBITAK MODAL COMPONENT — Pure Inline CSS
// Tailwind JIT class'ları dinamik inject edilen
// HTML'de derlenmediği için tüm stiller inline.
// ═══════════════════════════════════════

function injectTubitakModal() {
    if (document.getElementById('tubitak-modal')) return;

    // ── Container (tam ekran kaplayan wrapper) ──
    const modal = document.createElement('div');
    modal.id = 'tubitak-modal';
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '99999',
        display: 'none',            // başlangıçta gizli
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    });

    // ── Backdrop ──
    const backdrop = document.createElement('div');
    backdrop.id = 'tubitak-backdrop';
    Object.assign(backdrop.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        zIndex: '1',
    });
    backdrop.addEventListener('click', () => window.closeTubitakModal());
    modal.appendChild(backdrop);

    // ── Content Card ──
    const content = document.createElement('div');
    content.id = 'tubitak-content';
    Object.assign(content.style, {
        position: 'relative',
        zIndex: '2',
        width: '100%',
        maxWidth: '960px',
        maxHeight: '90vh',
        backgroundColor: 'rgba(10,10,10,0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        boxShadow: '0 0 80px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: '0',
        transform: 'scale(0.95) translateY(16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
    });

    // ── Header ──
    const header = document.createElement('div');
    Object.assign(header.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
        flexShrink: '0',
    });

    const headerLeft = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = 'Akıllı Yurt Bulma Sistemi';
    title.setAttribute('data-i18n', 'apps.tubitak.title');
    Object.assign(title.style, {
        fontSize: '1.75rem',
        fontWeight: '900',
        color: '#ffffff',
        margin: '0',
        letterSpacing: '-0.02em',
    });

    const badge = document.createElement('span');
    badge.textContent = 'TÜBİTAK 2209-A (2024)';
    Object.assign(badge.style, {
        display: 'inline-block',
        marginTop: '8px',
        padding: '4px 12px',
        fontSize: '0.65rem',
        fontWeight: '700',
        color: '#06b6d4',
        backgroundColor: 'rgba(6,182,212,0.1)',
        border: '1px solid rgba(6,182,212,0.2)',
        borderRadius: '6px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    });

    headerLeft.appendChild(title);
    headerLeft.appendChild(badge);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    Object.assign(closeBtn.style, {
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)',
        color: '#9ca3af',
        fontSize: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        flexShrink: '0',
        marginLeft: '16px',
        lineHeight: '1',
    });
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.1)';
        closeBtn.style.color = '#ffffff';
        closeBtn.style.transform = 'rotate(90deg)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.05)';
        closeBtn.style.color = '#9ca3af';
        closeBtn.style.transform = 'rotate(0deg)';
    });
    closeBtn.addEventListener('click', () => window.closeTubitakModal());

    header.appendChild(headerLeft);
    header.appendChild(closeBtn);
    content.appendChild(header);

    // ── Scrollable Body ──
    const body = document.createElement('div');
    Object.assign(body.style, {
        overflowY: 'auto',
        padding: '24px 32px 32px',
    });

    // Image Gallery
    const gallery = document.createElement('div');
    Object.assign(gallery.style, {
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '24px',
        scrollBehavior: 'smooth',
        scrollSnapType: 'x mandatory',
    });

    const imageUrls = [
        'https://media.licdn.com/dms/image/v2/D4D2DAQF9hwywInbw9w/profile-treasury-image-shrink_800_800/B4DZd.b.ixHkAc-/0/1750172954795?e=1772719200&v=beta&t=iIn7jJf3V8CIX6PHAO6pEJoNjQCLLlm8VWl_FodLl2M',
        'https://media.licdn.com/dms/image/v2/D4D2DAQEDVNLaCoue0w/profile-treasury-image-shrink_800_800/B4DZd.cEEyGkAY-/0/1750172976929?e=1772719200&v=beta&t=U5y5zmbL3jgdLLzV404CW_LGD5JCpot9gpweIihDCQA',
        'https://media.licdn.com/dms/image/v2/D4D2DAQGExsXh3NAkfw/profile-treasury-image-shrink_800_800/B4DZd.cIP9GsAg-/0/1750172993889?e=1772719200&v=beta&t=4VkPBH8tboBi1y8t9nS8dellHB_9e40Hwsn1x7LlL2E',
    ];
    imageUrls.forEach((url, i) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `TÜBİTAK Ekran ${i + 1}`;
        Object.assign(img.style, {
            flexShrink: '0',
            scrollSnapAlign: 'center',
            width: '320px',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'transform 0.3s ease',
        });
        img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.02)');
        img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
        gallery.appendChild(img);
    });
    body.appendChild(gallery);

    // Description
    const desc = document.createElement('p');
    desc.textContent = 'Üniversite öğrencilerinin barınma problemine akıllı bir çözüm getirmeyi hedefleyen bu MVP, öğrencilerin kriterlerine en uygun yurtları ağırlıklı puanlama ve Haversine formülüyle hesaplanan mesafe algoritması sayesinde saniyeler içinde önermektedir.';
    Object.assign(desc.style, {
        color: '#d1d5db',
        fontWeight: '300',
        fontSize: '1rem',
        lineHeight: '1.75',
        marginBottom: '32px',
    });
    body.appendChild(desc);

    // Tech Stack
    const techSection = document.createElement('div');
    techSection.style.marginBottom = '32px';

    const techLabel = document.createElement('div');
    techLabel.textContent = 'Kullanılan Teknolojiler';
    Object.assign(techLabel.style, {
        fontSize: '0.7rem',
        fontWeight: '700',
        color: '#9ca3af',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    });
    techSection.appendChild(techLabel);

    const techList = document.createElement('div');
    Object.assign(techList.style, {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    });

    const techs = [
        { name: 'React Native', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)' },
        { name: 'Node.js', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
        { name: 'Firebase', color: '#eab308', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.2)' },
        { name: 'Firestore', color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)' },
        { name: 'TypeScript', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)' },
    ];
    techs.forEach(t => {
        const chip = document.createElement('span');
        chip.textContent = t.name;
        Object.assign(chip.style, {
            padding: '6px 14px',
            fontSize: '0.8rem',
            fontWeight: '600',
            color: t.color,
            backgroundColor: t.bg,
            border: `1px solid ${t.border}`,
            borderRadius: '9999px',
        });
        techList.appendChild(chip);
    });
    techSection.appendChild(techList);
    body.appendChild(techSection);

    // LinkedIn Button
    const actionDiv = document.createElement('div');
    Object.assign(actionDiv.style, {
        paddingTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
    });

    const linkedInBtn = document.createElement('a');
    linkedInBtn.href = 'https://www.linkedin.com/posts/recepozgurmih_dokuz-eyl%C3%BCl-%C3%BCniversitesi-bilgisayar-bilimleri-activity-7339369307300081665-EkjX?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADgF4_0B5b3bVm1hzC7HK8Ng4cMTag3D_yg';
    linkedInBtn.target = '_blank';
    linkedInBtn.rel = 'noopener noreferrer';
    linkedInBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="width:20px;height:20px;fill:currentColor;flex-shrink:0" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        <span>LinkedIn Üzerinden İncele</span>
    `;
    Object.assign(linkedInBtn.style, {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '14px 28px',
        backgroundColor: '#0A66C2',
        color: '#ffffff',
        fontWeight: '700',
        fontSize: '0.9rem',
        borderRadius: '12px',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        boxShadow: '0 0 20px rgba(10,102,194,0.4)',
    });
    linkedInBtn.addEventListener('mouseenter', () => {
        linkedInBtn.style.backgroundColor = '#084e96';
        linkedInBtn.style.transform = 'translateY(-2px)';
        linkedInBtn.style.boxShadow = '0 0 30px rgba(10,102,194,0.6)';
    });
    linkedInBtn.addEventListener('mouseleave', () => {
        linkedInBtn.style.backgroundColor = '#0A66C2';
        linkedInBtn.style.transform = 'translateY(0)';
        linkedInBtn.style.boxShadow = '0 0 20px rgba(10,102,194,0.4)';
    });
    actionDiv.appendChild(linkedInBtn);
    body.appendChild(actionDiv);

    content.appendChild(body);
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// ── Global open/close functions ──
window.openTubitakModal = function () {
    injectTubitakModal();
    const modal = document.getElementById('tubitak-modal');
    const backdrop = document.getElementById('tubitak-backdrop');
    const content = document.getElementById('tubitak-content');

    // Show modal (flex layout for centering)
    modal.style.display = 'flex';

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Force reflow so transition works
    void modal.offsetWidth;

    // Animate in
    backdrop.style.opacity = '1';
    content.style.opacity = '1';
    content.style.transform = 'scale(1) translateY(0)';
};

window.closeTubitakModal = function () {
    const modal = document.getElementById('tubitak-modal');
    const backdrop = document.getElementById('tubitak-backdrop');
    const content = document.getElementById('tubitak-content');
    if (!modal) return;

    // Animate out
    backdrop.style.opacity = '0';
    content.style.opacity = '0';
    content.style.transform = 'scale(0.95) translateY(16px)';

    // Restore scrolling
    document.body.style.overflow = '';

    // Completely hide after animation
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
};

// Close on Escape key — handles all modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const tubitakModal = document.getElementById('tubitak-modal');
        if (tubitakModal && tubitakModal.style.display !== 'none') {
            window.closeTubitakModal();
        }
        const moneoModal = document.getElementById('moneo-modal');
        if (moneoModal && moneoModal.style.display !== 'none') {
            window.closeMoneoModal();
        }
    }
});


// ═══════════════════════════════════════
// MONEO MODAL COMPONENT — Pure Inline CSS
// ═══════════════════════════════════════

function injectMoneoModal() {
    if (document.getElementById('moneo-modal')) return;

    // ── Container ──
    const modal = document.createElement('div');
    modal.id = 'moneo-modal';
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '99999',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    });

    // ── Backdrop ──
    const backdrop = document.createElement('div');
    backdrop.id = 'moneo-backdrop';
    Object.assign(backdrop.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        zIndex: '1',
    });
    backdrop.addEventListener('click', () => window.closeMoneoModal());
    modal.appendChild(backdrop);

    // ── Content Card ──
    const content = document.createElement('div');
    content.id = 'moneo-content';
    Object.assign(content.style, {
        position: 'relative',
        zIndex: '2',
        width: '100%',
        maxWidth: '960px',
        maxHeight: '90vh',
        backgroundColor: 'rgba(10,10,10,0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        boxShadow: '0 0 80px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: '0',
        transform: 'scale(0.95) translateY(16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
    });

    // ── Header ──
    const header = document.createElement('div');
    Object.assign(header.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
        flexShrink: '0',
    });

    const headerLeft = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = 'Moneo';
    Object.assign(title.style, {
        fontSize: '1.75rem',
        fontWeight: '900',
        color: '#ffffff',
        margin: '0',
        letterSpacing: '-0.02em',
    });

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Privacy-First Personal Finance Dashboard';
    Object.assign(subtitle.style, {
        fontSize: '0.85rem',
        fontWeight: '400',
        color: '#9ca3af',
        margin: '4px 0 8px 0',
    });

    const badge = document.createElement('span');
    badge.textContent = 'Open Source · Vibe Coded (2025)';
    Object.assign(badge.style, {
        display: 'inline-block',
        padding: '4px 12px',
        fontSize: '0.65rem',
        fontWeight: '700',
        color: '#a78bfa',
        backgroundColor: 'rgba(167,139,250,0.1)',
        border: '1px solid rgba(167,139,250,0.2)',
        borderRadius: '6px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    });

    headerLeft.appendChild(title);
    headerLeft.appendChild(subtitle);
    headerLeft.appendChild(badge);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    Object.assign(closeBtn.style, {
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)',
        color: '#9ca3af',
        fontSize: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        flexShrink: '0',
        marginLeft: '16px',
        lineHeight: '1',
    });
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.1)';
        closeBtn.style.color = '#ffffff';
        closeBtn.style.transform = 'rotate(90deg)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.05)';
        closeBtn.style.color = '#9ca3af';
        closeBtn.style.transform = 'rotate(0deg)';
    });
    closeBtn.addEventListener('click', () => window.closeMoneoModal());

    header.appendChild(headerLeft);
    header.appendChild(closeBtn);
    content.appendChild(header);

    // ── Scrollable Body ──
    const body = document.createElement('div');
    Object.assign(body.style, {
        overflowY: 'auto',
        padding: '24px 32px 32px',
    });

    // Image Gallery
    const gallery = document.createElement('div');
    Object.assign(gallery.style, {
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '24px',
        scrollBehavior: 'smooth',
        scrollSnapType: 'x mandatory',
    });

    const imageUrls = [
        'https://media.licdn.com/dms/image/v2/D4D1FAQGdDdYw8aj_pQ/feedshare-document-images_1280/B4DZwt2RojHwA4-/1/1770295735687?e=1773273600&v=beta&t=S4FRlhWwJxWHuYMUzAr8t3BdoaJE4Js7oHgNMN11ueE',
        'https://media.licdn.com/dms/image/v2/D4D1FAQGdDdYw8aj_pQ/feedshare-document-images_1280/B4DZwt2RojHwA4-/2/1770295735687?e=1773273600&v=beta&t=4uw54gtrA8y0nZ7eqXI0Nla_bkyUuK3b8-FwToIn1dk',
        'https://media.licdn.com/dms/image/v2/D4D1FAQGdDdYw8aj_pQ/feedshare-document-images_1280/B4DZwt2RojHwA4-/3/1770295735687?e=1773273600&v=beta&t=oabyylf0W068wI24vzIg6LjCfCQd9teDQeIJhlDgha0',
        'https://media.licdn.com/dms/image/v2/D4D1FAQGdDdYw8aj_pQ/feedshare-document-images_1280/B4DZwt2RojHwA4-/4/1770295735687?e=1773273600&v=beta&t=qnCRoATcb8dr9eeB2B3aKCcncyT7FrJN0XiyNXaWIOI',
        'https://media.licdn.com/dms/image/v2/D4D1FAQGdDdYw8aj_pQ/feedshare-document-images_1280/B4DZwt2RojHwA4-/5/1770295735687?e=1773273600&v=beta&t=q1hrR09cOfcoiQTP5sMlOntWKH-4JwRBNgXnTzT3gpA',
        'https://media.licdn.com/dms/image/v2/D4D1FAQGdDdYw8aj_pQ/feedshare-document-images_1280/B4DZwt2RojHwA4-/6/1770295735687?e=1773273600&v=beta&t=xLECVVCgaD8856GMQSgPtO651Jr12NcxiPnw3HbE4ts',
    ];
    imageUrls.forEach((url, i) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Moneo UI ${i + 1}`;
        Object.assign(img.style, {
            flexShrink: '0',
            scrollSnapAlign: 'center',
            width: '420px',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'transform 0.3s ease',
        });
        img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.02)');
        img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
        gallery.appendChild(img);
    });
    body.appendChild(gallery);

    // Description
    const desc = document.createElement('p');
    desc.textContent = 'Hiç React bilmeden, "sadece prompt" ile tek gecede oluşturulmuş privacy-first kişisel finans dashboard\'u. Bankanın ekstre PDF\'ini sürükle-bırak ile işlemleri çıkarıp kategorize ediyor, 18 farklı grafikle detaylı harcama/gelir analizi sunuyor ve AI asistan ile finansal durumun hakkında sohbet/analiz yapılabiliyor. Veriler sadece tarayıcıda — server yok, tracking yok. 19 farklı tema/layout ile özelleştirilebilir.';
    Object.assign(desc.style, {
        color: '#d1d5db',
        fontWeight: '300',
        fontSize: '1rem',
        lineHeight: '1.75',
        marginBottom: '32px',
    });
    body.appendChild(desc);

    // Features
    const featSection = document.createElement('div');
    featSection.style.marginBottom = '32px';

    const featLabel = document.createElement('div');
    featLabel.textContent = 'Öne Çıkan Özellikler';
    Object.assign(featLabel.style, {
        fontSize: '0.7rem',
        fontWeight: '700',
        color: '#9ca3af',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    });
    featSection.appendChild(featLabel);

    const features = [
        '📄 PDF Ekstre Parsing — Sürükle & Bırak',
        '📊 18 Farklı Grafik ile Analiz',
        '🤖 AI Asistan ile Finansal Sohbet',
        '🔒 Privacy-First — Sadece Tarayıcıda',
        '🎨 19 Farklı Tema & Layout',
    ];
    features.forEach(f => {
        const item = document.createElement('div');
        item.textContent = f;
        Object.assign(item.style, {
            padding: '8px 0',
            color: '#e5e7eb',
            fontSize: '0.9rem',
            borderBottom: '1px solid rgba(255,255,255,0.03)',
        });
        featSection.appendChild(item);
    });
    body.appendChild(featSection);

    // Tech Stack
    const techSection = document.createElement('div');
    techSection.style.marginBottom = '32px';

    const techLabel = document.createElement('div');
    techLabel.textContent = 'Kullanılan Teknolojiler';
    Object.assign(techLabel.style, {
        fontSize: '0.7rem',
        fontWeight: '700',
        color: '#9ca3af',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    });
    techSection.appendChild(techLabel);

    const techList = document.createElement('div');
    Object.assign(techList.style, {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    });

    const techs = [
        { name: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.1)', border: 'rgba(97,218,251,0.2)' },
        { name: 'Vite', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
        { name: 'AI-Powered', color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.2)' },
        { name: 'LocalStorage', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
        { name: 'Chart.js', color: '#eab308', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.2)' },
    ];
    techs.forEach(t => {
        const chip = document.createElement('span');
        chip.textContent = t.name;
        Object.assign(chip.style, {
            padding: '6px 14px',
            fontSize: '0.8rem',
            fontWeight: '600',
            color: t.color,
            backgroundColor: t.bg,
            border: `1px solid ${t.border}`,
            borderRadius: '9999px',
        });
        techList.appendChild(chip);
    });
    techSection.appendChild(techList);
    body.appendChild(techSection);

    // Action Buttons
    const actionDiv = document.createElement('div');
    Object.assign(actionDiv.style, {
        paddingTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
    });

    // Demo Button
    const demoBtn = document.createElement('a');
    demoBtn.href = 'https://moneo-finance-dashboard.vercel.app/';
    demoBtn.target = '_blank';
    demoBtn.rel = 'noopener noreferrer';
    demoBtn.innerHTML = '<span>🌐</span><span>Canlı Demo</span>';
    Object.assign(demoBtn.style, {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 24px',
        backgroundColor: 'rgba(167,139,250,0.15)',
        color: '#a78bfa',
        fontWeight: '700',
        fontSize: '0.9rem',
        borderRadius: '12px',
        textDecoration: 'none',
        border: '1px solid rgba(167,139,250,0.3)',
        transition: 'all 0.3s ease',
        boxShadow: '0 0 20px rgba(167,139,250,0.2)',
    });
    demoBtn.addEventListener('mouseenter', () => {
        demoBtn.style.backgroundColor = 'rgba(167,139,250,0.25)';
        demoBtn.style.transform = 'translateY(-2px)';
    });
    demoBtn.addEventListener('mouseleave', () => {
        demoBtn.style.backgroundColor = 'rgba(167,139,250,0.15)';
        demoBtn.style.transform = 'translateY(0)';
    });
    actionDiv.appendChild(demoBtn);

    // GitHub Button
    const ghBtn = document.createElement('a');
    ghBtn.href = 'https://github.com/recepzgrmh/moneo-finance-dashboard';
    ghBtn.target = '_blank';
    ghBtn.rel = 'noopener noreferrer';
    ghBtn.innerHTML = '<span>💻</span><span>GitHub Repo</span>';
    Object.assign(ghBtn.style, {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 24px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: '#e5e7eb',
        fontWeight: '700',
        fontSize: '0.9rem',
        borderRadius: '12px',
        textDecoration: 'none',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease',
    });
    ghBtn.addEventListener('mouseenter', () => {
        ghBtn.style.backgroundColor = 'rgba(255,255,255,0.1)';
        ghBtn.style.transform = 'translateY(-2px)';
    });
    ghBtn.addEventListener('mouseleave', () => {
        ghBtn.style.backgroundColor = 'rgba(255,255,255,0.05)';
        ghBtn.style.transform = 'translateY(0)';
    });
    actionDiv.appendChild(ghBtn);

    // LinkedIn Button
    const linkedInBtn = document.createElement('a');
    linkedInBtn.href = 'https://www.linkedin.com/feed/update/urn:li:activity:7425161403206057984/';
    linkedInBtn.target = '_blank';
    linkedInBtn.rel = 'noopener noreferrer';
    linkedInBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;fill:currentColor;flex-shrink:0" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        <span>LinkedIn</span>
    `;
    Object.assign(linkedInBtn.style, {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 24px',
        backgroundColor: '#0A66C2',
        color: '#ffffff',
        fontWeight: '700',
        fontSize: '0.9rem',
        borderRadius: '12px',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        boxShadow: '0 0 20px rgba(10,102,194,0.4)',
    });
    linkedInBtn.addEventListener('mouseenter', () => {
        linkedInBtn.style.backgroundColor = '#084e96';
        linkedInBtn.style.transform = 'translateY(-2px)';
    });
    linkedInBtn.addEventListener('mouseleave', () => {
        linkedInBtn.style.backgroundColor = '#0A66C2';
        linkedInBtn.style.transform = 'translateY(0)';
    });
    actionDiv.appendChild(linkedInBtn);

    body.appendChild(actionDiv);
    content.appendChild(body);
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// ── Global open/close for Moneo ──
window.openMoneoModal = function () {
    injectMoneoModal();
    const modal = document.getElementById('moneo-modal');
    const backdrop = document.getElementById('moneo-backdrop');
    const content = document.getElementById('moneo-content');

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    void modal.offsetWidth;

    backdrop.style.opacity = '1';
    content.style.opacity = '1';
    content.style.transform = 'scale(1) translateY(0)';
};

window.closeMoneoModal = function () {
    const modal = document.getElementById('moneo-modal');
    const backdrop = document.getElementById('moneo-backdrop');
    const content = document.getElementById('moneo-content');
    if (!modal) return;

    backdrop.style.opacity = '0';
    content.style.opacity = '0';
    content.style.transform = 'scale(0.95) translateY(16px)';
    document.body.style.overflow = '';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
};
