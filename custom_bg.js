(function () {
  'use strict';

  // ===== 每日二次元壁纸（本地轮换）=====
  const bgs = [
    '/anime-bg/bg1.jpg',
    '/anime-bg/bg2.jpg',
    '/anime-bg/bg3.jpg',
    '/anime-bg/bg4.jpg'
  ];
  const dateSeed = new Date().toISOString().slice(0, 10);
  const idx = dateSeed.split('-').reduce((a, b) => a + parseInt(b), 0) % bgs.length;
  const todayBg = bgs[idx];

  function setBackground(url) {
    const layer = document.createElement('div');
    layer.id = 'anime-bg-layer';
    layer.style.cssText = 'position:fixed;inset:0;z-index:-3;background:center/cover no-repeat;transition:opacity 1.2s ease;opacity:0;';
    layer.style.backgroundImage = 'url(' + url + ')';
    document.body.appendChild(layer);

    const img = new Image();
    img.onload = function () {
      layer.style.opacity = '1';
    };
    img.onerror = function () {
      layer.style.background = 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #0f172a 100%)';
      layer.style.opacity = '1';
    };
    img.src = url;
  }

  setBackground(todayBg);

  // ===== 花瓣/粒子飘落特效 =====
  const canvas = document.createElement('canvas');
  canvas.id = 'anime-canvas';
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:-1;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  const particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width;
      this.y = -15;
      this.size = Math.random() * 5 + 3;
      this.speedY = Math.random() * 1.2 + 0.4;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.04;
      this.opacity = Math.random() * 0.45 + 0.25;
      this.color = ['#ffb7c5', '#b5e7ff', '#e0bbff', '#c7ffd8', '#ffd1a9'][Math.floor(Math.random() * 5)];
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y / 80) * 0.3;
      this.rotation += this.rotationSpeed;
      if (this.y > height + 15) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 55; i++) particles.push(new Particle());
  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // ===== 鼠标霓虹轨迹 =====
  const trailCanvas = document.createElement('canvas');
  trailCanvas.id = 'mouse-trail';
  trailCanvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:-1;';
  document.body.appendChild(trailCanvas);
  const tCtx = trailCanvas.getContext('2d');
  let tw, th;
  function resizeTrail() {
    tw = trailCanvas.width = window.innerWidth;
    th = trailCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeTrail);
  resizeTrail();

  const trail = [];
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    trail.push({ x: mx, y: my, life: 1 });
  });

  function drawTrail() {
    tCtx.clearRect(0, 0, tw, th);
    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i];
      p.life -= 0.025;
      if (p.life <= 0) {
        trail.splice(i, 1);
        continue;
      }
      tCtx.beginPath();
      tCtx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
      tCtx.fillStyle = 'rgba(0, 240, 255, ' + (p.life * 0.6) + ')';
      tCtx.fill();
      tCtx.beginPath();
      tCtx.arc(p.x, p.y, 8 * p.life, 0, Math.PI * 2);
      tCtx.fillStyle = 'rgba(0, 240, 255, ' + (p.life * 0.15) + ')';
      tCtx.fill();
    }
    requestAnimationFrame(drawTrail);
  }
  drawTrail();
})();
