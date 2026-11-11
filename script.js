// ---------- Rain ----------
// Canvas rain: one node, one loop. Slower + longer than the div version.
(function initRain() {
  const canvas = document.getElementById('rain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let drops = [];
  let raf = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createDrops();
  }

  function createDrops() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Fewer drops on small screens so phones don't cook.
    const density = w > 1200 ? 30000 : 10000;
    const count = Math.floor((w * h) / density);
    drops = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      length: Math.random() * 30 + 15,   // 15–45px, longer streaks
      speed: Math.random() * 1.5 + 0.8,  // 0.8–2.3 px/frame, slower
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }

  let last = performance.now();

  function draw(now) {
    // Time-based so 60Hz and 120Hz screens fall at the same speed.
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';

    for (const d of drops) {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.length);
      ctx.strokeStyle = `rgba(100, 140, 200, ${d.opacity * 1.5})`;
      ctx.stroke();

      d.y += d.speed * dt * 60; // speed means "px per 1/60s"
      if (d.y > h) {
        d.y = -d.length;
        d.x = Math.random() * w;
      }
    }

    raf = requestAnimationFrame(draw);
  }

  function start() {
    if (reduceMotion.matches) {
      // Draw one static frame so the background isn't empty.
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.length);
        ctx.strokeStyle = `rgba(100, 140, 200, ${d.opacity * 1.5})`;
        ctx.stroke();
      }
      return;
    }
    last = performance.now();
    raf = requestAnimationFrame(draw);
  }

  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  function onResize() {
    stop();
    resize();
    start();
  }

  function onMotionChange() {
    stop();
    start();
  }

  window.addEventListener('resize', onResize);
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', onMotionChange);
  }

  resize();
  start();
})();

// ---------- Menu ----------
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const menuLinks = document.querySelectorAll('.menu-item');

  function toggleMenu() {
    if (!mobileMenu || !menuIcon) return;
    const open = mobileMenu.classList.toggle('open');
    menuIcon.classList.toggle('fa-bars', !open);
    menuIcon.classList.toggle('fa-xmark', open);
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
});
