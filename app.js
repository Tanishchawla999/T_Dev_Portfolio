// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});
function animTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.transform = `translate(${tx - 16}px, ${ty - 16}px)`;
  requestAnimationFrame(animTrail);
}
animTrail();
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(2)'; trail.style.opacity = '0.8'; });
  el.addEventListener('mouseleave', () => { trail.style.opacity = '0.5'; });
});

// ===== CANVAS PARTICLES =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.life = 0;
    this.maxLife = Math.random() * 300 + 200;
    const colors = ['#00ffe0', '#7b2fff', '#ff2f7b'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.life++;
    if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + Math.round(alpha * 255).toString(16).padStart(2,'0');
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

// Draw grid
function drawGrid() {
  ctx.strokeStyle = 'rgba(0,255,224,0.03)';
  ctx.lineWidth = 1;
  const step = 80;
  for (let x = 0; x < W; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function animCanvas() {
  ctx.clearRect(0, 0, W, H);
  drawGrid();
  particles.forEach(p => { p.update(); p.draw(); });

  // connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,255,224,${0.08 * (1 - dist/100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animCanvas);
}
animCanvas();

// ===== SKILLS DATA =====
const skills = [
  { icon: '🌐', name: 'HTML5', desc: 'Semantic markup, accessibility, SEO best practices', badge: 'Frontend' },
  { icon: '🎨', name: 'CSS3', desc: 'Flexbox, Grid, animations, responsive design', badge: 'Frontend' },
  { icon: '⚡', name: 'JavaScript', desc: 'DOM manipulation, async programming', badge: 'Language' },
  { icon: '🟢', name: 'Node.js', desc: 'Express, REST APIs, backend development', badge: 'Backend' },
  { icon: '🚂', name: 'ExpressJS', desc: 'Middleware, routing, API endpoints', badge: 'Backend' },
  { icon: '🗄️', name: 'SQL', desc: 'Queries, joins, database design, indexing', badge: 'Database' },
  { icon: '🔄', name: 'N8N', desc: 'Workflow automation, API integrations', badge: 'Automation' },
  { icon: '🐳', name: 'Docker', desc: 'Containerization, images, Docker Compose', badge: 'DevOps' },
  { icon: '🎨', name: 'Gsap', desc: 'CSS Animation', badge: 'Frontend' },
  { icon: '🎨', name: 'Locomotive Scroll', desc: 'Scrolling Animation', badge: 'Frontend' },
  { icon: '📱', name: 'React Native', desc: 'Mobile apps, component architecture, hooks', badge: 'Mobile' },
  { icon: '☕', name: 'Java', desc: 'OOP, multithreading, JDBC', badge: 'Language' },
  { icon: '⚙️', name: 'C', desc: 'Memory management, pointers, system programming', badge: 'Language' },
  { icon: '🔷', name: 'C# / .NET', desc: 'ASP.NET, Entity Framework', badge: 'Backend' },
  { icon: '🐍', name: 'Python', desc: 'Data analysis, automation', badge: 'Language' },
  { icon: '📝', name: 'WordPress', desc: 'Custom themes, plugins, WooCommerce', badge: 'CMS' },
  { icon: '📋', name: 'Jira', desc: 'Agile workflows, sprint planning, issue tracking', badge: 'Tools' },
  { icon: '💬', name: 'Slack', desc: 'Team collaboration, bot integration, channels', badge: 'Tools' },
  { icon: '🔗', name: 'Git & GitHub', desc: 'Version control, branching, pull requests', badge: 'DevOps' },
];

const skillsGrid = document.getElementById('skillsGrid');
skills.forEach((s, i) => {
  const card = document.createElement('div');
  card.className = 'skill-card';
  card.style.transitionDelay = `${i * 0.05}s`;
  card.innerHTML = `
    <div class="skill-icon">${s.icon}</div>
    <div class="skill-name">${s.name}</div>
    <div class="skill-desc">${s.desc}</div>
    <span class="skill-badge">${s.badge}</span>
  `;
  skillsGrid.appendChild(card);
});

// ===== PROJECTS DATA =====
const projects = [
  {
    name: 'PrepIQ — AI Mock Interview Platform ',
    desc: 'Developed an AI mock interview platform with secure authentication, company-specific question banks, and real-time performance tracking.',
    tags: ['React','TypeScript', 'Supabase', 'TanStack Query'],
    url: 'https://github.com/Tanishchawla999/prepiq-your-ai-interview-coach',
    demo:'https://prep-iq-dev-buddy.lovable.app',
    glow: '#00ffe0'
  },
  {
    name: 'WebCritic — AI Website Analysis Tool',
    desc: 'Built an AI-powered website audit tool analyzing SEO, performance, accessibility, and generating downloadable reports.',
    tags: ['React','TypeScript', 'Supabase', 'TanStack Query'],
    url: 'https://github.com/Tanishchawla999/WebCritic-scan',
    demo:'https://site-aura-scan.lovable.app',
    glow: '#00ffe0'
  },
  {
    name: 'WhatsApp Bot',
    desc: 'A smart WhatsApp bot using N8N that mimics a real person\'s chatting style with contextual and natural responses — just like chatting with a real person.',
    tags: ['N8N', 'Google Sheets', 'Google Gemini', 'WhatsApp APIs'],
    url: 'https://github.com/Tanishchawla999/WhatsApp_BOT',
    // demo:'Pull it from Github and Use it locally & Sorry for the inconvenience.',
    glow: '#25d366'
  },
  {
    name: 'brahmacharya_webApp',
    desc: 'A mobile-first spiritual web application designed to help individuals fight lust, build self-discipline, and deepen their spiritual practice through the wisdom of the Bhagavad Gita, Premanand Maharaj Ji, and Osho.',
    tags: ['REACT','HTML5', 'CSS', 'JavaScript'],
    url: 'https://github.com/Tanishchawla999/brahmacharya_webApp',
    demo:'https://tanishchawla999.github.io/brahmacharya_webApp/',
    glow: '#00ffe0'
  },
  {
    name: 'Simon Game',
    desc: 'The Simon Game is a classic electronic memory game that challenges players to remember and reproduce an increasingly long sequence of lights and sounds.',
    tags: ['HTML5', 'CSS', 'JavaScript'],
    url: 'https://github.com/Tanishchawla999/SimonSays-Game.git',
    demo:'https://tanishchawla999.github.io/SimonSays-Game/',
    glow: '#00ffe0'
  },
  {
    name: 'E-Portfolio',
    desc: 'E-Portfolio is a web-based portfolio platform designed for developers to create and manage their professional profiles. Developers can sign up, showcase their skills, add projects, share experience, and link their GitHub and LinkedIn profiles — all in one place.',
    tags: ['PHP','HTML5', 'CSS', 'JavaScript'],
    url: 'https://github.com/Tanishchawla999/Devs_Portfolio',
    // demo:'Pull it from Github and Use it locally & Sorry for the inconvenience.',
    glow: '#00ffe0'
  },
  {
    name: 'Expense-Tracker',
    desc: 'A daily Expense Tracker with a built-in Journal feature to manage expenses, track spending habits, and record daily thoughts. Built using HTML, CSS, and JavaScript, with data stored locally in the browser using LocalStorage.',
    tags: ['HTML5', 'CSS', 'JavaScript'],
    url: 'https://github.com/Tanishchawla999/Expense-Tracker',
    demo:'https://tanishchawla999.github.io/Expense-Tracker/',
    glow: '#ff2f7b'
  },
  {
    name: 'Portfolio- Had some amazing Animations',
    desc: 'Built a Portfolio websites which has some amazing animations in it.',
    tags: ['HTML5','CSS','GSAP','LOCOMOTIVE SCROLL','JS'],
    url: 'https://github.com/Tanishchawla999/PortFolio_With_Animation',
    demo:'https://tanishchawla999.github.io/PortFolio_With_Animation/',
    glow: '#00ffe0'
  },
 
  {
    name: 'Quora',
    desc: 'A web application that allows users to post questions, write answers, and comment, similar to Quora. Features user authentication, CRUD operations, and interactive voting.',
    tags: ['EJS', 'JavaScript', 'CSS'],
    url: 'https://github.com/Tanishchawla999/Quora_Blog',
    // demo:'Pull it from Github and Use it locally & Sorry for the inconvenience.',
    glow: '#7b2fff'
  },
 
  {
    name: 'BookMyRoom',
    desc: 'Book your room or rent PGs/flats without any brokerage fees. Especially designed for students who find it hard to secure good PG accommodations.',
    tags: ['HTML5', 'CSS', 'JavaScript'],
    url: 'https://github.com/Tanishchawla999/BOOKMYROOM.git',
    // demo:'Pull it from Github and Use it locally & Sorry for the inconvenience.',
    glow: '#ff9f43'
  },
  {
    name: 'ThemeChanger',
    desc: 'A Chrome Extension that lets users switch between light, dark, or custom themes on websites — reducing eye strain and personalizing the browsing experience.',
    tags: ['HTML5', 'CSS', 'JavaScript'],
    url: 'https://github.com/Tanishchawla999/Theme-changer-chromeExtension',
    // demo:'Pull it from Github and Use it locally & Sorry for the inconvenience.',
    glow: '#ff2f7b'
  }
];

const projectsGrid = document.getElementById('projectsGrid');
projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.transitionDelay = `${i * 0.1}s`;
  card.innerHTML = `
    <div class="project-img">
      <div class="project-img-glow" style="background:radial-gradient(circle, ${p.glow}55, transparent 70%)"></div>
      <div class="project-img-label">${p.name}</div>
    </div>
    <div class="project-body">
      <div class="project-title">${p.name}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
      <a href="${p.url}" target="_blank" class="project-link">View Code</a>
      ${p.demo ? `<a href="${p.demo}" target="_blank" class="project-link">Live Demo</a>` : ''}
    </div>
  `;
  projectsGrid.appendChild(card);
});

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card').forEach(el => observer.observe(el));

// ===== CURRENTLY LEARNING =====
const learning = [
  { icon: '📈', name: 'Data Analysis', progress: 20 },
  { icon: '🗣️', name: 'Soft-Skills', progress:40}
];

const pillsContainer = document.getElementById('learningPills');
learning.forEach((item, i) => {
  const pill = document.createElement('div');
  pill.className = 'learning-pill';
  pill.style.animationDelay = `${i * 0.08}s`;
  pill.innerHTML = `
    <span class="pill-dot"></span>
    <span class="pill-icon">${item.icon}</span>
    <span>${item.name}</span>
    <div class="pill-progress" style="width:0%" data-width="${item.progress}%"></div>
  `;
  pillsContainer.appendChild(pill);
});

// Animate progress bars on scroll
const progressObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.pill-progress').forEach(bar => {
      setTimeout(() => { bar.style.width = bar.dataset.width; }, 300);
    });
    progressObserver.disconnect();
  }
}, { threshold: 0.5 });
progressObserver.observe(pillsContainer);

// ===== COUNTER ANIMATION =====
function animateCounter(el, target) {
  let start = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + (el.parentElement.querySelector('.stat-label').textContent === '% Passion' ? '%' : '+'); clearInterval(timer); }
    else el.textContent = Math.floor(start) + (el.parentElement.querySelector('.stat-label').textContent === '% Passion' ? '%' : '+');
  }, 20);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('[data-target]').forEach(el => {
        animateCounter(el, +el.dataset.target);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
statsObserver.observe(document.querySelector('.hero-stats'));

// ===== NEON SNAKE GAME =====
(function() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('scoreDisplay');
  const hiEl = document.getElementById('hiDisplay');
  const levelEl = document.getElementById('levelDisplay');
  const finalScoreEl = document.getElementById('finalScore');
  const overMsgEl = document.getElementById('overMsg');
  const startScreen = document.getElementById('startScreen');
  const gameOverScreen = document.getElementById('gameOverScreen');
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');

  // Responsive canvas size
  function resizeCanvas() {
    const maxW = Math.min(400, window.innerWidth - 60);
    const size = Math.floor(maxW / 20) * 20;
    canvas.width = size; canvas.height = size;
    GRID = canvas.width / 20;
  }

  let GRID = 20;
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); if (!running) drawIdleFrame(); });

  let snake, dir, nextDir, food, special, score, hiScore, running, paused, gameLoop, level, speedMs, particles, glowParticles;
  hiScore = 0;

  const COLORS = {
    bg: '#030306',
    grid: 'rgba(0,255,224,0.025)',
    snake_head: '#00ffe0',
    snake_body: '#00ccb4',
    snake_tail: '#007a6b',
    food: '#ff2f7b',
    special: '#7b2fff',
    text: '#e8e8f0',
  };

  function initGame() {
    const mid = 10;
    snake = [
      {x: mid, y: mid},
      {x: mid-1, y: mid},
      {x: mid-2, y: mid},
    ];
    dir = {x: 1, y: 0};
    nextDir = {x: 1, y: 0};
    score = 0; level = 1; speedMs = 170;
    particles = []; glowParticles = [];
    special = null;
    spawnFood();
    updateUI();
  }

  function spawnFood() {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;

    // Chance to spawn special golden orb
    if (Math.random() < 0.2 && !special) {
      let sp;
      do {
        sp = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
      } while (snake.some(s => s.x === sp.x && s.y === sp.y) || (sp.x === food.x && sp.y === food.y));
      special = { ...sp, timer: 120 };
    }
  }

  function updateUI() {
    scoreEl.textContent = score;
    hiEl.textContent = hiScore;
    levelEl.textContent = level;
    finalScoreEl.textContent = score;
  }

  // Particle burst
  function burst(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
      const speed = 1.5 + Math.random() * 2.5;
      particles.push({
        x: x * GRID + GRID/2,
        y: y * GRID + GRID/2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.04 + Math.random() * 0.03,
        size: 2 + Math.random() * 2,
        color
      });
    }
  }

  // Glow trail particle
  function addTrail(x, y) {
    glowParticles.push({
      x: x * GRID + GRID/2, y: y * GRID + GRID/2,
      life: 1, size: GRID * 0.4
    });
  }

  function step() {
    if (!running || paused) return;

    dir = { ...nextDir };
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Wall collision
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) { endGame(); return; }
    // Self collision
    if (snake.some(s => s.x === head.x && s.y === head.y)) { endGame(); return; }

    snake.unshift(head);
    addTrail(head.x, head.y);

    let ate = false;
    if (head.x === food.x && head.y === food.y) {
      score += level;
      burst(food.x, food.y, COLORS.food, 14);
      spawnFood();
      ate = true;
      // Level up every 5 points
      const newLevel = Math.floor(score / 5) + 1;
      if (newLevel > level) { level = newLevel; speedMs = Math.max(60, 130 - (level - 1) * 10); restartLoop(); }
    }
    if (special && head.x === special.x && head.y === special.y) {
      score += level * 3;
      burst(special.x, special.y, COLORS.special, 20);
      special = null;
      ate = true;
    }
    if (!ate) snake.pop();
    if (score > hiScore) hiScore = score;
    if (special) { special.timer--; if (special.timer <= 0) special = null; }
    updateUI();
  }

  function restartLoop() {
    clearInterval(gameLoop);
    gameLoop = setInterval(step, speedMs);
  }

  function endGame() {
    running = false;
    clearInterval(gameLoop);
    burst(snake[0].x, snake[0].y, '#ff2f7b', 20);
    draw();
    const msgs = [
      "Keep going — you'll beat it!",
      "So close! Try again 🔥",
      "The snake demands a rematch.",
      "Feed the snake... it's still hungry.",
    ];
    overMsgEl.textContent = score >= 20 ? "🔥 Impressive run! Can you top it?" : msgs[Math.floor(Math.random() * msgs.length)];
    updateUI();
    setTimeout(() => gameOverScreen.classList.remove('hidden'), 400);
  }

  // ===== DRAW =====
  function draw() {
    const S = GRID;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 20; i++) {
      ctx.beginPath(); ctx.moveTo(i * S, 0); ctx.lineTo(i * S, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * S); ctx.lineTo(canvas.width, i * S); ctx.stroke();
    }

    // Glow trail
    glowParticles.forEach((p, i) => {
      p.life -= 0.08;
      if (p.life <= 0) { glowParticles.splice(i, 1); return; }
      ctx.save();
      ctx.globalAlpha = p.life * 0.25;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 1.5);
      grad.addColorStop(0, '#00ffe0');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });

    // Burst particles
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.08;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); return; }
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });

    // Special orb
    if (special) {
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 180);
      const sx = special.x * S + S/2, sy = special.y * S + S/2;
      ctx.save();
      const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, S * 0.8);
      sg.addColorStop(0, 'rgba(123,47,255,0.4)'); sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, S * 0.8, 0, Math.PI * 2); ctx.fill();
      ctx.shadowColor = COLORS.special; ctx.shadowBlur = 12 + 8 * pulse;
      ctx.fillStyle = COLORS.special;
      ctx.beginPath(); ctx.arc(sx, sy, S * 0.3 + 1 * pulse, 0, Math.PI * 2); ctx.fill();
      // Star shape
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.beginPath(); ctx.arc(sx - 3, sy - 3, 1.5, 0, Math.PI * 2); ctx.fill();
      // Timer ring
      ctx.strokeStyle = 'rgba(123,47,255,0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(sx, sy, S * 0.42, -Math.PI/2, -Math.PI/2 + (Math.PI*2) * (special.timer / 120));
      ctx.stroke();
      ctx.restore();
    }

    // Food
    const fx = food.x * S + S/2, fy = food.y * S + S/2;
    const fpulse = 0.5 + 0.5 * Math.sin(Date.now() / 200);
    ctx.save();
    const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, S * 0.7);
    fg.addColorStop(0, 'rgba(255,47,123,0.35)'); fg.addColorStop(1, 'transparent');
    ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(fx, fy, S * 0.7, 0, Math.PI * 2); ctx.fill();
    ctx.shadowColor = COLORS.food; ctx.shadowBlur = 14 + 6 * fpulse;
    ctx.fillStyle = COLORS.food;
    ctx.beginPath(); ctx.arc(fx, fy, S * 0.28 + 1.5 * fpulse, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,200,220,0.9)';
    ctx.beginPath(); ctx.arc(fx - 2.5, fy - 2.5, 2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Snake body
    snake.forEach((seg, i) => {
      const ratio = i / snake.length;
      const x = seg.x * S, y = seg.y * S;
      const cx = x + S/2, cy = y + S/2;
      const r = Math.max(2, S * 0.38 * (1 - ratio * 0.4));

      ctx.save();
      if (i === 0) {
        ctx.shadowColor = COLORS.snake_head; ctx.shadowBlur = 18;
        const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.5);
        hg.addColorStop(0, 'rgba(0,255,224,0.2)'); hg.addColorStop(1, 'transparent');
        ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = COLORS.snake_head;
      } else {
        const lerpColor = ratio < 0.5 ? COLORS.snake_body : COLORS.snake_tail;
        ctx.fillStyle = lerpColor;
        ctx.shadowColor = COLORS.snake_body; ctx.shadowBlur = 8 * (1 - ratio);
      }
      // Rounded segment
      const pad = S * 0.08;
      ctx.beginPath();
      ctx.roundRect(x + pad, y + pad, S - pad*2, S - pad*2, r * 0.6);
      ctx.fill();

      // Head eyes
      if (i === 0) {
        ctx.fillStyle = COLORS.bg;
        ctx.shadowBlur = 0;
        const eyeOff = S * 0.2;
        const eyeR = S * 0.1;
        let ex1, ey1, ex2, ey2;
        if (dir.x === 1) { ex1 = cx + eyeOff; ey1 = cy - eyeOff; ex2 = cx + eyeOff; ey2 = cy + eyeOff; }
        else if (dir.x === -1) { ex1 = cx - eyeOff; ey1 = cy - eyeOff; ex2 = cx - eyeOff; ey2 = cy + eyeOff; }
        else if (dir.y === -1) { ex1 = cx - eyeOff; ey1 = cy - eyeOff; ex2 = cx + eyeOff; ey2 = cy - eyeOff; }
        else { ex1 = cx - eyeOff; ey1 = cy + eyeOff; ex2 = cx + eyeOff; ey2 = cy + eyeOff; }
        ctx.beginPath(); ctx.arc(ex1, ey1, eyeR, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(ex2, ey2, eyeR, 0, Math.PI*2); ctx.fill();
      }
      ctx.restore();
    });
  }

  // Animation loop
  let animId;
  function animFrame() {
    draw();
    animId = requestAnimationFrame(animFrame);
  }

  function drawIdleFrame() {
    const S = GRID;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = COLORS.bg; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = COLORS.grid; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 20; i++) {
      ctx.beginPath(); ctx.moveTo(i*S, 0); ctx.lineTo(i*S, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i*S); ctx.lineTo(canvas.width, i*S); ctx.stroke();
    }
  }
  drawIdleFrame();

  function startGame() {
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    initGame();
    running = true;
    cancelAnimationFrame(animId);
    animFrame();
    restartLoop();
  }

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', startGame);

  // Keyboard
  const KEY_MAP = {
    ArrowUp: {x:0,y:-1}, ArrowDown: {x:0,y:1},
    ArrowLeft: {x:-1,y:0}, ArrowRight: {x:1,y:0},
    w: {x:0,y:-1}, s: {x:0,y:1}, a: {x:-1,y:0}, d: {x:1,y:0},
    W: {x:0,y:-1}, S: {x:0,y:1}, A: {x:-1,y:0}, D: {x:1,y:0},
  };
  document.addEventListener('keydown', e => {
    if (KEY_MAP[e.key]) {
      const nd = KEY_MAP[e.key];
      if (nd.x !== -dir.x || nd.y !== -dir.y) nextDir = nd;
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
    }
    if (e.key === 'Escape' && running) { paused = !paused; }
  });

  // Touch controls
  const touchMap = {
    'btn-up': {x:0,y:-1}, 'btn-down': {x:0,y:1},
    'btn-left': {x:-1,y:0}, 'btn-right': {x:1,y:0}
  };
  Object.entries(touchMap).forEach(([id, d]) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const move = () => { if (d.x !== -dir.x || d.y !== -dir.y) nextDir = d; };
    btn.addEventListener('touchstart', e => { e.preventDefault(); move(); }, { passive: false });
    btn.addEventListener('mousedown', move);
  });

  // Swipe support on canvas
  let touchStartX, touchStartY;
  canvas.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  canvas.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
      const nd = dx > 0 ? {x:1,y:0} : {x:-1,y:0};
      if (nd.x !== -dir.x) nextDir = nd;
    } else {
      const nd = dy > 0 ? {x:0,y:1} : {x:0,y:-1};
      if (nd.y !== -dir.y) nextDir = nd;
    }
  }, { passive: true });
})();


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});