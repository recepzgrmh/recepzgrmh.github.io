/**
 * cursor.js — Ultra-Optimized Custom Cursor
 * Dot + Ring + Magnetic + Trail
 */

(function () {
  'use strict';

  // 1. Mobile & Touch Device Prevention
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // 2. CSS Optimization (Using transform3d for hardware acceleration)
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { cursor: none !important; }

    #c-dot, #c-ring {
      position: fixed;
      top: 0; left: 0;
      pointer-events: none;
      will-change: transform;
      z-index: 2147483647;
    }

    #c-dot {
      width: 6px; height: 6px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0 10px #06b6d4, 0 0 20px rgba(6,182,212,0.8);
      mix-blend-mode: difference;
      transition: width .2s, height .2s, opacity .15s, background .2s;
    }

    #c-ring {
      width: 40px; height: 40px;
      border: 1px solid rgba(6,182,212,0.4);
      border-radius: 50%;
      background: rgba(6,182,212,0.05);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      transition: width .2s, height .2s, border-color .2s, background .2s, opacity .15s;
      z-index: 2147483646;
    }

    #c-dot.is-hovering {
      width: 12px; height: 12px;
      background: #a855f7;
      box-shadow: 0 0 15px #a855f7, 0 0 25px rgba(168,85,247,0.5);
      mix-blend-mode: normal;
    }

    #c-ring.is-hovering {
      width: 65px; height: 65px;
      border-color: #a855f7;
      background: rgba(168,85,247,0.15);
      border-width: 2px;
    }

    #c-dot.is-clicking { width: 4px; height: 4px; }
    #c-ring.is-clicking { width: 35px; height: 35px; border-width: 3px; }

    .c-trail {
      position: fixed;
      top: 0; left: 0;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99997;
      animation: trail-fade 0.6s ease-out forwards;
      will-change: transform, opacity;
    }

    @keyframes trail-fade {
      0%   { opacity: 0.7; transform: translate3d(-50%, -50%, 0) scale(1); }
      100% { opacity: 0; transform: translate3d(-50%, -50%, 0) scale(0.1); }
    }
  `;
  document.head.appendChild(style);

  // 3. Elements
  const dot = document.createElement('div'); dot.id = 'c-dot';
  const ring = document.createElement('div'); ring.id = 'c-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // 4. State & Caching
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let dotX = -100, dotY = -100;
  let trailTimer = 0;
  let trailIndex = 0;
  const TRAIL_COLORS = ['#06b6d4', '#22d3ee', '#67e8f9', '#a855f7', '#c084fc', '#06b6d4'];

  // 5. Mouse tracking (Passive listener for performance)
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // 6. Optimized Trail Spawn (called within rAF)
  function spawnTrail(x, y) {
    const t = document.createElement('div');
    t.className = 'c-trail';
    const color = TRAIL_COLORS[trailIndex % TRAIL_COLORS.length];
    trailIndex++;

    // Minimal style changes to avoid reflow
    const size = (3 + Math.random() * 4).toFixed(1);
    t.style.cssText = `
      background-color: ${color};
      box-shadow: 0 0 6px ${color};
      width: ${size}px; height: ${size}px;
      transform: translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0);
    `;

    document.body.appendChild(t);
    setTimeout(() => t.remove(), 600);
  }

  // 7. RequestAnimationFrame Animation Loop
  function animate() {
    // 5. Magnetic "Lean" Logic
    let targetX = mouseX;
    let targetY = mouseY;

    const hoverSelectors = 'a, button, [role="button"], input, textarea, select, label, .bento-card, .premium-card';
    const activeHover = document.querySelectorAll(hoverSelectors);

    activeHover.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(mouseX - centerX, mouseY - centerY);

      const threshold = 60; // Pulling radius
      if (dist < threshold) {
        // Calculate pull power (0 at threshold, 1 at center)
        const power = 1 - (dist / threshold);
        // Gravity effect: lean towards center but don't lose mouse completely
        targetX = mouseX + (centerX - mouseX) * (power * 0.8);
        targetY = mouseY + (centerY - mouseY) * (power * 0.8);
      }
    });

    // Smooth Lerp Calculations
    dotX += (targetX - dotX) * 0.45; // Follow target (snapped or mouse)
    dotY += (targetY - dotY) * 0.45;
    ringX += (targetX - ringX) * 0.15;
    ringY += (targetY - ringY) * 0.15;

    // Apply Styles (DOM Writes)
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate3d(-50%, -50%, 0)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;

    // Spawn trail with throttle
    trailTimer++;
    if (trailTimer % 5 === 0 && mouseX > 0) {
      spawnTrail(mouseX, mouseY);
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // 8. Hover Interaction
  const hoverSelectors = 'a, button, [role="button"], input, textarea, select, label, .bento-card, .premium-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelectors)) {
      dot.classList.add('is-hovering');
      ring.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelectors)) {
      dot.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
    }
  });

  // 9. Click & Visibility
  document.addEventListener('mousedown', () => {
    dot.classList.add('is-clicking');
    ring.classList.add('is-clicking');
  });

  document.addEventListener('mouseup', () => {
    dot.classList.remove('is-clicking');
    ring.classList.remove('is-clicking');
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

})();
