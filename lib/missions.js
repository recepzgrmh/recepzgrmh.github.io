/**
 * Missions Manager
 * Handles tracking, persistence, and events for user missions.
 */
class MissionManager {
    constructor() {
        this.missions = {
            long_press: { id: 'long_press', tr: 'Arka plandaki halkaya 8 saniye basılı tut', en: 'Long press the background for 8 seconds', completed: false },
            visit_apps_blog: { id: 'visit_apps_blog', tr: 'Apps ve Blog sayfalarına git', en: 'Visit Apps and Blog pages', completed: false, state: { apps: false, blog: false } },
            send_message: { id: 'send_message', tr: 'Contact sayfasından bir mesaj gönder', en: 'Send a message from Contact page', completed: false },
            toggle_theme: { id: 'toggle_theme', tr: 'Dark mode / Light mode geçişi yap', en: 'Toggle dark / light mode', completed: false },
            scroll_bottom: { id: 'scroll_bottom', tr: 'Ana sayfanın en sonuna kadar git', en: 'Scroll to the very bottom of home page', completed: false },
            click_social: { id: 'click_social', tr: 'Linkedin ya da Github linklerinden birine tıkla', en: 'Click LinkedIn or GitHub links', completed: false }
        };

        this.storageKey = 'portfolio_missions';
        this.loadState();
        this.initEventListeners();
    }

    loadState() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                Object.keys(this.missions).forEach(key => {
                    if (parsed[key]) {
                        this.missions[key].completed = parsed[key].completed;
                        if (parsed[key].state) {
                            this.missions[key].state = { ...this.missions[key].state, ...parsed[key].state };
                        }
                    }
                });
            } catch (e) {
                console.error('Error loading missions state:', e);
            }
        }
    }

    saveState() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.missions));
        window.dispatchEvent(new CustomEvent('missions_updated', { detail: this.missions }));
    }

    completeMission(id) {
        if (this.missions[id] && !this.missions[id].completed) {
            this.missions[id].completed = true;
            this.saveState();
            this.showToast(id);
        }
    }

    updateMissionState(id, subKey, value) {
        if (this.missions[id] && !this.missions[id].completed && this.missions[id].state) {
            this.missions[id].state[subKey] = value;
            const allDone = Object.values(this.missions[id].state).every(v => v === true);
            if (allDone) {
                this.completeMission(id);
            } else {
                this.saveState();
            }
        }
    }

    initEventListeners() {
        // 1. Long Press Logic (8s)
        let pressTimer;
        const startPress = () => {
            if (this.missions.long_press.completed) return;
            pressTimer = setTimeout(() => {
                this.completeMission('long_press');
            }, 8000);
        };
        const endPress = () => {
            clearTimeout(pressTimer);
        };

        document.addEventListener('mousedown', (e) => {
            const tag = e.target.tagName;
            const isInteractive = (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA');
            if (!isInteractive) startPress();
        });
        document.addEventListener('mouseup', endPress);
        document.addEventListener('mouseleave', endPress);

        // 2. Navigation Tracking
        const checkPath = (url = window.location.pathname) => {
            if (url.includes('/apps/')) this.updateMissionState('visit_apps_blog', 'apps', true);
            if (url.includes('/blog/')) this.updateMissionState('visit_apps_blog', 'blog', true);
        };
        checkPath();
        window.addEventListener('route_changed', (e) => checkPath(e.detail.url));

        // 3. Theme Toggle
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                this.completeMission('toggle_theme');
            });
        }

        // 4. Scroll Bottom
        window.addEventListener('scroll', () => {
            if (this.missions.scroll_bottom.completed) return;
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                this.completeMission('scroll_bottom');
            }
        });

        // 5. Social Links
        document.querySelectorAll('a[href*="github.com"], a[href*="linkedin.com"]').forEach(link => {
            link.addEventListener('click', () => {
                this.completeMission('click_social');
            });
        });

        // 6. Contact Form Success
        window.addEventListener('message_sent', () => {
            console.log('[Missions] Message sent event received');
            this.completeMission('send_message');
        });
    }

    showToast(id) {
        const lang = localStorage.getItem('portfolio-lang') || 'tr';
        const mission = this.missions[id];
        const text = lang === 'tr' ? 'Görev Tamamlandı!' : 'Mission Completed!';

        console.log(`%c ${text} %c ${mission[lang]}`,
            'background: #06b6d4; color: #fff; font-weight: bold; padding: 10px; border-radius: 5px 0 0 5px;',
            'background: #1e293b; color: #fff; padding: 10px; border-radius: 0 5px 5px 0;'
        );
    }
}

// Global instance
window.missionManager = new MissionManager();
