/**
 * MissionsPanel Component
 * Renders the interactive mission list.
 */
(function () {
    class MissionsPanel {
        constructor() {
            this.container = null;
            this.isCollapsed = false; // Default: Open
            this.init();
        }

        init() {
            this.setupContainer();

            // Re-check and re-inject on route change
            window.addEventListener('route_changed', () => {
                this.setupContainer();
                this.render();
            });

            window.addEventListener('missions_updated', (e) => {
                this.render(e.detail);
            });

            // Language change listener
            const langToggle = document.getElementById('lang-toggle');
            if (langToggle) {
                langToggle.addEventListener('click', () => {
                    setTimeout(() => this.render(), 150);
                });
            }
        }

        setupContainer() {
            // Enhanced Home detection
            const path = window.location.pathname.toLowerCase();
            const isHome = path === '/' ||
                path.endsWith('/tr/') ||
                path.endsWith('/en/') ||
                path.endsWith('/tr/index.html') ||
                path.endsWith('/en/index.html') ||
                path.endsWith('/index.html') ||
                path.includes('/tr/?') ||
                path.includes('/en/?');

            // Explicitly search for it in DOM to avoid detached element bugs
            this.container = document.getElementById('missions-container');

            if (!isHome) {
                if (this.container) this.container.style.display = 'none';
                return;
            }

            // If container doesn't exist OR is detached from DOM
            if (!this.container || !document.body.contains(this.container)) {
                if (!this.container) {
                    this.container = document.createElement('div');
                    this.container.id = 'missions-container';
                }
                const hero = document.getElementById('home');
                if (hero) {
                    hero.appendChild(this.container);
                } else {
                    document.body.appendChild(this.container);
                }
            }

            this.container.style.display = 'block';
            this.container.style.zIndex = '45';
            this.container.className = 'missions-panel-wrapper visible-home';

            this.render();
        }

        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
            this.render();
        }

        render(missions = null) {
            if (!missions && window.missionManager) missions = window.missionManager.missions;
            if (!missions || !this.container || this.container.style.display === 'none') return;

            const lang = localStorage.getItem('portfolio-lang') || 'tr';
            const title = lang === 'tr' ? 'Görevler' : 'Missions';

            const missionItems = Object.values(missions);
            const completedCount = missionItems.filter(m => m.completed).length;

            let html = `
                <div class="missions-island ${this.isCollapsed ? 'collapsed' : ''}">
                    <div class="island-header" id="mission-toggle-btn" style="cursor: pointer;">
                        <div class="island-status-pill">
                            <span class="status-dot"></span>
                            <span class="status-count">${completedCount}/${missionItems.length}</span>
                        </div>
                        <h4 class="island-title">${title}</h4>
                        <div class="island-toggle-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                ${this.isCollapsed ? '<polyline points="18 15 12 9 6 15"></polyline>' : '<polyline points="6 9 12 15 18 9"></polyline>'}
                            </svg>
                        </div>
                    </div>
                    <div class="island-content">
                        <ul class="island-list">
            `;

            missionItems.forEach(m => {
                const isCompleted = m.completed;
                html += `
                    <li class="island-item ${isCompleted ? 'completed' : ''}">
                        <div class="island-marker">
                            ${isCompleted ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
                        </div>
                        <span class="island-text">${m[lang]}</span>
                    </li>
                `;
            });

            html += `
                        </ul>
                    </div>
                </div>
            `;

            this.container.innerHTML = html;

            // Trigger completion pulse if missions were just updated
            if (missions && this.container.querySelector('.island-status-pill')) {
                const pill = this.container.querySelector('.island-status-pill');
                pill.style.animation = 'none';
                void pill.offsetWidth;
                pill.style.animation = 'pillPulse 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }

            // Add click listener for toggle
            const btn = this.container.querySelector('#mission-toggle-btn');
            if (btn) {
                btn.onclick = () => this.toggleCollapse();
            }
        }
    }

    // Initialize when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new MissionsPanel());
    } else {
        new MissionsPanel();
    }
})();
