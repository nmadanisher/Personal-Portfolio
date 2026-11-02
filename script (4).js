// Footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// Typing effect for roles
(function () {
  var roles = ['Web Developer', 'BS IT Student', 'Front-end Learner', 'Creative Coder'];
  var el = document.getElementById('role');
  var i = 0, j = 0, deleting = false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function tick() {
    var word = roles[i];
    el.textContent = word.slice(0, j);
    if (!deleting && j < word.length) { j++; setTimeout(tick, 90); }
    else if (!deleting) { deleting = true; setTimeout(tick, 1500); }
    else if (j > 0) { j--; setTimeout(tick, 45); }
    else { deleting = false; i = (i + 1) % roles.length; setTimeout(tick, 250); }
  }
  tick();
})();

// Scroll reveal, skill bars and counters
(function () {
  var reveals = document.querySelectorAll('.reveal');
  var bars = document.querySelectorAll('[data-w]');
  var counters = document.querySelectorAll('[data-count]');

  function countUp(el) {
    var target = +el.dataset.count, n = 0;
    var step = setInterval(function () {
      n++; el.textContent = n + '+';
      if (n >= target) clearInterval(step);
    }, 180);
  }

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (r) { r.classList.add('in'); });
    bars.forEach(function (b) { b.style.width = b.dataset.w + '%'; });
    counters.forEach(function (c) { c.textContent = c.dataset.count + '+'; });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-w]').forEach(function (b) { b.style.width = b.dataset.w + '%'; });
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  reveals.forEach(function (r) { io.observe(r); });
})();

// Mouse glow (desktop only)
(function () {
  var glow = document.getElementById('glow');
  if (!window.matchMedia('(hover: hover)').matches) return;
  window.addEventListener('mousemove', function (e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

// Back to top button
(function () {
  var btn = document.getElementById('totop');
  window.addEventListener('scroll', function () {
    btn.classList.toggle('show', window.scrollY > 500);
  });
})();

// Light / dark theme button
(function () {
  var root = document.documentElement;
  document.getElementById('theme').addEventListener('click', function () {
    var light = root.dataset.theme
      ? root.dataset.theme === 'light'
      : window.matchMedia('(prefers-color-scheme: light)').matches;
    root.dataset.theme = light ? 'dark' : 'light';
  });
})();
