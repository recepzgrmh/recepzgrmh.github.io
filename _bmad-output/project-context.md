---
project_name: 'recepzgrmh.github.io'
user_name: 'Recepzgrmh'
date: '2026-03-08T13:02:00+03:00'
sections_completed: ['technology_stack', 'project_scope', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality', 'workflow_rules', 'critical_rules']
existing_patterns_found: { 'number_of_patterns_discovered': 12 }
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **HTML5:** Semantic structure and layout.
- **CSS3:** Vanilla CSS + **Tailwind CSS v3.4.1** (Configured in `tailwind.config.js`).
- **JavaScript:** ES6 Vanilla JS (No modern frameworks like React/Vue).
- **Three.js (r128):** Particle networks and 3D background effects.
- **GSAP (v3.12.2):** Advanced scroll and kinetic hover animations.

## Project Scope & Boundaries

- **Main Focus:** `index.html`, `apps.html`, `blog.html`, `contact.html` and their associated logic (`app.js`, `projects.js`, `router.js`).
- **Out of Scope (Do Not Modify):** Independent sub-projects like `Background-color`, `car`, `changelog`, `Ferrari`, `Dilan-polat`, `Predict-number`, etc. These are separate isolated experiments.

## Critical Implementation Rules

### Language-Specific Rules (JavaScript)

- **DOM Checks:** Always verify element existence before access or adding listeners (e.g., `if (el) { ... }`).
- **Global Objects:** `gsap` and `THREE` are provided via CDN. Do not attempt to import them as modules.
- **Dynamic Re-init:** Trigger `window.reinitDynamicContent()` after any JS-driven content/route changes to re-bind observers and animations.
- **i18n System:** Use `data-i18n` in HTML and update the `translations` object in `app.js`. Call `setLanguage(currentLang)` after updates.
- **Event Listeners:** Define listeners within `DOMContentLoaded` or init functions. Ensure no "dead" listeners remain after router transitions.

### Framework-Specific Rules (CSS & Tailwind)

- **Utility-First:** Prefer Tailwind classes for new elements. High-priority brand colors: `cyan-400` (#06b6d4) and `purple-400` (#a855f7).
- **Glassmorphism:** Use `.bento-card` or `.premium-card` to maintain the project's blur/transparency aesthetic.
- **Scroll Effects:** Use `.fade-up` class for elements that should animate into view via JS IntersectionObserver.
- **Z-Index Hierarchy:** `z-50` for Nav/Header, `z-10` for Content, negative for Background Canvas.

### Testing & Quality Rules

- **Manual Verification:** Always test Language (TR/EN) and Font (Aa) toggles after UI changes.
- **Console Monitoring:** Check for Three.js/GSAP warnings (e.g., missing targets) in the browser console.
- **Responsive Design:** Validate changes on mobile and desktop viewports using Tailwind's responsive prefixes.
- **Naming:** use `camelCase` for functions and `kebab-case` for CSS classes/IDs.

### Development Workflow & "Don't-Miss" Rules

- **Asset Paths:** Always use relative paths (e.g., `assets/logo.png`) instead of absolute paths (`/assets/...`) to avoid breaking GitHub Pages sub-directory staging.
- **Framework Constraint:** **STRICTLY Vanilla JS only.** Do not suggest React/Vue components or build-step dependencies.
- **Environment Isolation:** Do not pollute the main site's CSS/JS with code from sub-projects (and vice versa).
- **Dependency Order:** Ensure scripts utilizing `THREE` or `GSAP` are loaded *after* the library scripts in the HTML.
