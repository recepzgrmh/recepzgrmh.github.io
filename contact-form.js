/**
 * Contact Form Logic & EmailJS Integration
 */
window.initContactForm = function () {
    console.log('[Contact] Initializing form logic...');

    // ─── EmailJS Initialization ───────────────────────────────────────────
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: '6UsGL5jjdfUHsKChM' });
    }

    // ─── Character Counter ────────────────────────────────────────────────
    const textarea = document.getElementById('contact-message');
    const counter = document.getElementById('char-counter');

    if (textarea && counter) {
        textarea.addEventListener('input', () => {
            const len = textarea.value.length;
            counter.textContent = `${len} / 1000`;
            counter.classList.toggle('warn', len > 800);
        });
    }

    // ─── Toast Helper ─────────────────────────────────────────────────────
    window.showToast = function (msg, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = msg;
        toast.className = `toast ${type}`;
        void toast.offsetWidth; // reflow
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 4500);
    };

    // ─── Contact Form Submission ──────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const form = e.target;
            const btn = document.getElementById('submit-btn');
            const btnText = document.getElementById('btn-text');

            // Basic validation
            const name = form.from_name.value.trim();
            const email = form.reply_to.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !message) {
                if (typeof getTranslation === 'function') {
                    showToast(getTranslation('toast.validation.fields'), 'error');
                } else {
                    showToast('⚠️ Lütfen zorunlu alanları doldurun.', 'error');
                }
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (typeof getTranslation === 'function') {
                    showToast(getTranslation('toast.validation.email'), 'error');
                } else {
                    showToast('⚠️ Geçerli bir e-posta adresi girin.', 'error');
                }
                return;
            }

            // Loading state
            if (btn) btn.disabled = true;
            if (btnText) {
                if (typeof getTranslation === 'function') {
                    btnText.textContent = getTranslation('toast.loading');
                } else {
                    btnText.textContent = 'Gönderiliyor...';
                }
            }

            try {
                if (typeof emailjs !== 'undefined') {
                    await emailjs.sendForm('service_wo9fcpn', 'template_x8j4alq', form);
                    if (typeof getTranslation === 'function') {
                        showToast(getTranslation('toast.success'), 'success');
                    } else {
                        showToast('✅ Mesajın ulaştı!', 'success');
                    }
                    form.reset();
                    if (counter) counter.textContent = '0 / 1000';
                    // Trigger mission completion
                    window.dispatchEvent(new CustomEvent('message_sent'));
                }
            } catch (err) {
                console.error('EmailJS error:', err);
                if (typeof getTranslation === 'function') {
                    showToast(getTranslation('toast.error'), 'error');
                } else {
                    showToast('❌ Hata oluştu.', 'error');
                }
            } finally {
                if (btn) btn.disabled = false;
                if (btnText) {
                    if (typeof getTranslation === 'function') {
                        btnText.textContent = getTranslation('blog.cta').replace('&rarr;', '→');
                    } else {
                        btnText.textContent = 'İletişime Geç →';
                    }
                }
            }
        });
    }
};

// Also run once in case of direct load (if the script is loaded after the HTML is ready)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.initContactForm();
} else {
    document.addEventListener('DOMContentLoaded', window.initContactForm);
}
