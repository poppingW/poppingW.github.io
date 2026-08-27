(function () {
  'use strict';

  // ===== 每日二次元壁纸 =====
  const dateSeed = new Date().toISOString().slice(0, 10);
  const cached = localStorage.getItem('anime_bg_' + dateSeed);

  function setBackground(url) {
    const div = document.createElement('div');
    div.id = 'anime-bg-layer';
    div.style.cssText = 'position:fixed;inset:0;z-index:-2;background:center/cover no-repeat;transition:opacity 1s;opacity:0;';
    div.style.backgroundImage = 'url(' + url + ')';
    document.body.appendChild(div);
    requestAnimationFrame(() => div.style.opacity = '1');
    localStorage.setItem('anime_bg_' + dateSeed, url);
  }

  if (cached) {
    setBackground(cached);
  } else {
    const tags = ['waifu', 'maid', 'marin-kitagawa', 'mori-calliope', 'raiden-shogun', 'oppai', 'selfies', 'uniform'];
    const tag = tags[dateSeed.split('-').reduce((a, b) => a + parseInt(b), 0) % tags.length];
    const url = 'https://api.waifu.im/search?is_nsfw=false&orientation=LANDSCAPE&many=false&info=false';
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.images && data.images[0] && data.images[0].url) {
          setBackground(data.images[0].url);
        }
      })
      .catch(() => {
        // fallback: gradient
      });
  }

  // ===== 花瓣/粒子飘落特效 =====
  const canvas = document.createElement('canvas');
  canvas.id = 'anime-canvas';
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;';
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
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = -10;
      this.size = Math.random() * 4 + 2;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.color = ['#ffb7c5', '#b5e7ff', '#e0bbff', '#c7ffd8'][Math.floor(Math.random() * 4)];
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      if (this.y > height) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 45; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // ===== 鼠标霓虹轨迹 =====
  let mouseX = 0, mouseY = 0, lastX = 0, lastY = 0;
  const trail = [];
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawTrail() {
    const dx = mouseX - lastX;
    const dy = mouseY - lastY;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      trail.push({ x: mouseX, y: mouseY, life: 1 });
      lastX = mouseX;
      lastY = mouseY;
    }
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].life -= 0.03;
      if (trail[i].life <= 0) trail.splice(i, 1);
    }
    setTimeout(drawTrail, 16);
  }
  drawTrail();
})();
