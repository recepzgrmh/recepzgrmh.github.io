// ===== Lightbox Functionality =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(img) {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on background click
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards and sections
document.querySelectorAll('.feature-card, .change-section, .version-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// CSS class for animation
document.head.insertAdjacentHTML('beforeend', `
<style>
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
</style>
`);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// ===== Image Loading Optimization =====
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// ===== Version Card Hover Effect =====
document.querySelectorAll('.version-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ===== Copy Code Functionality (for code blocks if needed) =====
document.querySelectorAll('code').forEach(code => {
    code.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(this.textContent);
            
            const originalText = this.textContent;
            this.textContent = 'Kopyalandı!';
            this.style.background = 'rgba(34, 197, 94, 0.3)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1500);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    });
    
    code.style.cursor = 'pointer';
    code.title = 'Kopyalamak için tıklayın';
});

// ===== Initialize Page =====
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
    
    // Log that the page is ready
    console.log('Changelog page loaded successfully!');
});

// ===== Parallax Effect for Background Orbs =====
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});
