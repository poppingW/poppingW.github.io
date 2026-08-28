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

  const layer = document.createElement('div');
  layer.id = 'anime-bg-layer';
  layer.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-9999;background:center/cover no-repeat #030308;transition:opacity 1.2s ease;opacity:0;';
  document.documentElement.insertBefore(layer, document.documentElement.firstChild);

  const img = new Image();
  img.onload = function () {
    layer.style.backgroundImage = 'url(' + todayBg + ')';
    layer.style.opacity = '1';
  };
  img.onerror = function () {
    layer.style.background = 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #0f172a 100%)';
    layer.style.opacity = '1';
  };
  img.src = todayBg;

  // 防止其他脚本移除或覆盖壁纸层
  setInterval(function () {
    const current = document.getElementById('anime-bg-layer');
    if (!current) {
      document.documentElement.insertBefore(layer, document.documentElement.firstChild);
      return;
    }
    if (current.style.backgroundImage !== 'url("' + todayBg + '")' && current.style.backgroundImage !== 'url(' + todayBg + ')') {
      current.style.backgroundImage = 'url(' + todayBg + ')';
    }
    if (current.style.opacity !== '1') current.style.opacity = '1';
    if (document.body.style.backgroundImage && document.body.style.backgroundImage !== 'none') {
      document.body.style.backgroundImage = 'none';
    }
  }, 2000);

  // ===== 工具函数 =====
  function createCanvas(id, zIndex) {
    const c = document.createElement('canvas');
    c.id = id;
    c.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:' + zIndex + ';';
    document.documentElement.appendChild(c);
    return c;
  }

  function resizeCanvas(c) {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }

  // ===== 代码雨特效 =====
  const matrixCanvas = createCanvas('matrix-canvas', -2);
  const mCtx = matrixCanvas.getContext('2d');
  resizeCanvas(matrixCanvas);
  window.addEventListener('resize', () => resizeCanvas(matrixCanvas));

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charArr = chars.split('');
  const fontSize = 14;
  let columns = Math.floor(matrixCanvas.width / fontSize);
  const drops = [];
  for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

  function drawMatrix() {
    mCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    mCtx.fillStyle = 'rgba(0, 240, 255, 0.75)';
    mCtx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = charArr[Math.floor(Math.random() * charArr.length)];
      mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
  }
  drawMatrix();

  // ===== 花瓣飘落特效 =====
  const animeCanvas = createCanvas('anime-canvas', -1);
  const aCtx = animeCanvas.getContext('2d');
  resizeCanvas(animeCanvas);
  window.addEventListener('resize', () => resizeCanvas(animeCanvas));

  const petals = [];
  class Petal {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * animeCanvas.width;
      this.y = -15;
      this.size = Math.random() * 4 + 2;
      this.speedY = Math.random() * 1 + 0.3;
      this.speedX = Math.random() * 1 - 0.5;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.opacity = Math.random() * 0.3 + 0.15;
      this.color = ['#ffb7c5', '#b5e7ff', '#e0bbff', '#c7ffd8'][Math.floor(Math.random() * 4)];
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y / 80) * 0.2;
      this.rotation += this.rotationSpeed;
      if (this.y > animeCanvas.height + 15) this.reset();
    }
    draw() {
      aCtx.save();
      aCtx.translate(this.x, this.y);
      aCtx.rotate(this.rotation);
      aCtx.globalAlpha = this.opacity;
      aCtx.fillStyle = this.color;
      aCtx.beginPath();
      aCtx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
      aCtx.fill();
      aCtx.restore();
    }
  }
  for (let i = 0; i < 35; i++) petals.push(new Petal());
  function animatePetals() {
    aCtx.clearRect(0, 0, animeCanvas.width, animeCanvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animatePetals);
  }
  animatePetals();

  // ===== 光标能量环 =====
  const ringCanvas = createCanvas('cursor-ring-canvas', 9998);
  const rCtx = ringCanvas.getContext('2d');
  resizeCanvas(ringCanvas);
  window.addEventListener('resize', () => resizeCanvas(ringCanvas));

  let mouseX = -100;
  let mouseY = -100;
  let ringAngle = 0;
  let mouseActive = false;
  let mouseTimeout = null;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;
    if (mouseTimeout) clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => { mouseActive = false; }, 1500);
  });

  document.addEventListener('mouseleave', () => {
    mouseActive = false;
  });

  function drawCursorRing() {
    rCtx.clearRect(0, 0, ringCanvas.width, ringCanvas.height);

    if (mouseActive) {
      ringAngle += 0.03;

      // 外环
      rCtx.save();
      rCtx.translate(mouseX, mouseY);
      rCtx.rotate(ringAngle);
      rCtx.beginPath();
      rCtx.arc(0, 0, 28, 0, Math.PI * 1.5);
      rCtx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      rCtx.lineWidth = 2;
      rCtx.shadowColor = '#00f0ff';
      rCtx.shadowBlur = 15;
      rCtx.stroke();
      rCtx.restore();

      // 内环（反向）
      rCtx.save();
      rCtx.translate(mouseX, mouseY);
      rCtx.rotate(-ringAngle * 1.5);
      rCtx.beginPath();
      rCtx.arc(0, 0, 18, 0.5, Math.PI * 1.8);
      rCtx.strokeStyle = 'rgba(255, 42, 127, 0.5)';
      rCtx.lineWidth = 2;
      rCtx.shadowColor = '#ff2a7f';
      rCtx.shadowBlur = 12;
      rCtx.stroke();
      rCtx.restore();

      // 中心点
      rCtx.beginPath();
      rCtx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
      rCtx.fillStyle = '#00f0ff';
      rCtx.shadowColor = '#00f0ff';
      rCtx.shadowBlur = 10;
      rCtx.fill();
    }

    requestAnimationFrame(drawCursorRing);
  }
  drawCursorRing();

  // ===== 点击爆炸粒子 =====
  const expCanvas = createCanvas('explosion-canvas', 9997);
  const eCtx = expCanvas.getContext('2d');
  resizeCanvas(expCanvas);
  window.addEventListener('resize', () => resizeCanvas(expCanvas));

  const explosions = [];
  class Explosion {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.particles = [];
      const colors = ['#00f0ff', '#ff2a7f', '#b967ff', '#39ff14', '#ffffff'];
      for (let i = 0; i < 28; i++) {
        const angle = (Math.PI * 2 / 28) * i + Math.random() * 0.3;
        const speed = Math.random() * 4 + 2;
        this.particles.push({
          x: x, y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: Math.random() * 0.02 + 0.015,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1
        });
      }
    }
    update() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.decay;
        if (p.life <= 0) this.particles.splice(i, 1);
      }
    }
    draw() {
      this.particles.forEach(p => {
        eCtx.globalAlpha = p.life;
        eCtx.fillStyle = p.color;
        eCtx.shadowColor = p.color;
        eCtx.shadowBlur = 10;
        eCtx.beginPath();
        eCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        eCtx.fill();
      });
      eCtx.globalAlpha = 1;
      eCtx.shadowBlur = 0;
    }
  }

  document.addEventListener('click', e => {
    explosions.push(new Explosion(e.clientX, e.clientY));
  });

  function animateExplosions() {
    eCtx.clearRect(0, 0, expCanvas.width, expCanvas.height);
    for (let i = explosions.length - 1; i >= 0; i--) {
      explosions[i].update();
      explosions[i].draw();
      if (explosions[i].particles.length === 0) explosions.splice(i, 1);
    }
    requestAnimationFrame(animateExplosions);
  }
  animateExplosions();
})();
