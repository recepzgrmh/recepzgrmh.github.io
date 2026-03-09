/**
 * cursor.js — Optimized Premium Custom Cursor
 * Dot + Ring + Magnetic + Cyan Trail
 */

(function () {
  'use strict';

  if (window.matchMedia('(pointer: coarse)').matches) return;

  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { cursor: none !important; }

    #c-dot {
      position: fixed;
      top: 0; left: 0;
      width: 6px; height: 6px;
      background: #fff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483647;
      box-shadow: 0 0 10px #06b6d4, 0 0 20px rgba(6,182,212,0.8);
      will-change: transform;
      mix-blend-mode: difference;
      transition: width .2s, height .2s, opacity .15s, background .2s;
    }

    #c-ring {
      position: fixed;
      top: 0; left: 0;
      width: 40px; height: 40px;
      border: 1px solid rgba(6,182,212,0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483646;
      background: rgba(6,182,212,0.05);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      will-change: transform;
      transition: width .2s, height .2s, border-color .2s, background .2s, opacity .15s;
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
      box-shadow: 0 0 20px rgba(168,85,247,0.3);
    }

    #c-dot.is-clicking {
      width: 4px; height: 4px;
      box-shadow: 0 0 15px #a855f7;
    }

    #c-ring.is-clicking {
      width: 35px; height: 35px;
      border-color: #a855f7;
      border-width: 3px;
      background: rgba(168,85,247,0.2);
    }

    .c-trail {
      position: fixed;
      top: 0; left: 0;
      width: 5px; height: 5px;
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

  const dot = document.createElement('div'); dot.id = 'c-dot';
  const ring = document.createElement('div'); ring.id = 'c-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let dotX = -100, dotY = -100;
  let trailTimer = 0;
  let trailIndex = 0;

  const TRAIL_COLORS = ['#06b6d4', '#22d3ee', '#67e8f9', '#a855f7', '#c084fc', '#06b6d4'];

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function spawnTrail(x, y) {
    const t = document.createElement('div');
    t.className = 'c-trail';
    const color = TRAIL_COLORS[trailIndex % TRAIL_COLORS.length];
    trailIndex++;
    t.style.backgroundColor = color;
    t.style.boxShadow = `0 0 6px ${color}`;
    const size = 3 + Math.random() * 4;
    t.style.width = size + 'px';
    t.style.height = size + 'px';
    t.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 600);
  }

  function animate() {
    dotX += (mouseX - dotX) * 0.8;
    dotY += (mouseY - dotY) * 0.8;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate3d(-50%, -50%, 0)`;

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;

    trailTimer++;
    if (trailTimer % 4 === 0 && mouseX > 0) {
      spawnTrail(mouseX, mouseY);
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

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
