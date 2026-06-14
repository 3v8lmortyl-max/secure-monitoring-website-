// ════════ Secure Monitoring — Static Site JS ════════

// Auto-hide header: hides on scroll-down, reveals on scroll-up (rAF-throttled)
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var lastY = window.scrollY || 0;
  var ticking = false;
  var REVEAL_AT_TOP = 60;   // always show within this many px of the top
  var DELTA = 4;            // ignore tiny scroll jitter (responsive)

  function apply() {
    var y = window.scrollY || 0;

    // Solid-shadow state once scrolled past the hero top
    if (y > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    // Near the very top: always visible
    if (y <= REVEAL_AT_TOP) {
      nav.classList.remove('nav-hidden');
      lastY = y;
      ticking = false;
      return;
    }

    var diff = y - lastY;
    if (Math.abs(diff) > DELTA) {
      if (diff > 0) {
        nav.classList.add('nav-hidden');   // scrolling down → hide
      } else {
        nav.classList.remove('nav-hidden'); // scrolling up → show
      }
      lastY = y;
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) { window.requestAnimationFrame(apply); ticking = true; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  apply(); // correct state on first paint
})();

// Mobile menu toggle
(function () {
  var btn = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  var open = false;
  var nav = document.getElementById('nav');
  function set(state) {
    open = state;
    menu.classList.toggle('open', open);
    if (open && nav) nav.classList.remove('nav-hidden'); // never hide header while menu open
    btn.innerHTML = open
      ? '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  btn.addEventListener('click', function () { set(!open); });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { set(false); });
  });
})();

// Reveal on scroll
(function () {
  var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .zoom-in');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { obs.observe(el); });
})();

// Animated stat counters
(function () {
  var nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  function animate(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 2000, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if (!('IntersectionObserver' in window)) { nums.forEach(animate); return; }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  nums.forEach(function (el) { obs.observe(el); });
})();

// Testimonials carousel
(function () {
  var root = document.getElementById('testi');
  if (!root) return;
  var data = [
    { name: 'John Anderson', role: 'Property Manager · Anderson Real Estate', content: 'Secure Monitoring has been absolutely essential for our commercial properties. The professional operators caught a break-in attempt within minutes. Outstanding service!' },
    { name: 'Sarah Mitchell', role: 'Security Director · Tech Innovation Corp', content: "We switched from automated systems to human monitoring and it's been a game-changer. The attention to detail from your operators is incredible." },
    { name: 'David Chen', role: 'Warehouse Owner · Chen Distribution', content: "The 24/7 human monitoring gave us peace of mind we didn't have before. Their response time is phenomenal and the team is professional." },
    { name: 'Michelle Rodriguez', role: 'Retail Manager · Metro Retail Group', content: "Best security investment we've made. The operators caught suspicious activity that a system would have missed. Highly recommend!" },
    { name: 'Robert Thompson', role: 'Facility Manager · Global Manufacturing', content: 'Professional, reliable, and always there when we need them. Secure Monitoring has exceeded our expectations in every way.' }
  ];
  var current = 0, auto = true, timer = null;
  var quoteEl = root.querySelector('.testi-quote');
  var nameEl = root.querySelector('.testi-name');
  var roleEl = root.querySelector('.testi-role');
  var avatarEl = root.querySelector('.testi-avatar');
  var dotsWrap = root.querySelector('.testi-dots');

  data.forEach(function (_, i) {
    var b = document.createElement('button');
    b.className = 'testi-dot' + (i === 0 ? ' active' : '');
    b.setAttribute('aria-label', 'Testimonial ' + (i + 1));
    b.addEventListener('click', function () { go(i); auto = false; });
    dotsWrap.appendChild(b);
  });
  var dots = dotsWrap.querySelectorAll('.testi-dot');

  function render() {
    var t = data[current];
    quoteEl.style.opacity = 0;
    setTimeout(function () {
      quoteEl.textContent = '"' + t.content + '"';
      nameEl.textContent = t.name;
      roleEl.textContent = t.role;
      avatarEl.textContent = t.name.charAt(0);
      quoteEl.style.opacity = 1;
    }, 150);
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }
  function go(i) { current = (i + data.length) % data.length; render(); }
  root.querySelector('.testi-prev').addEventListener('click', function () { go(current - 1); auto = false; });
  root.querySelector('.testi-next').addEventListener('click', function () { go(current + 1); auto = false; });
  quoteEl.style.transition = 'opacity 0.3s ease';
  function tick() { if (auto) go(current + 1); }
  timer = setInterval(tick, 6000);
  render();
})();

// Contact form → WhatsApp
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.querySelector('[name=name]').value.trim();
    var phone = form.querySelector('[name=phone]').value.trim();
    var email = form.querySelector('[name=email]').value.trim();
    var message = form.querySelector('[name=message]').value.trim();
    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending…</span>';
    var text = encodeURIComponent(
      'Hi Secure Monitoring,\n\nName: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email + '\n\nMessage: ' + message
    );
    window.open('https://wa.me/919392525869?text=' + text, '_blank');
    setTimeout(function () {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }, 800);
  });
})();

// Footer year
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Smooth image fade-in (handles cached images too)
(function () {
  function reveal(img) { img.classList.add('loaded'); }
  var imgs = document.querySelectorAll('img.img-fade');
  imgs.forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) {
      // already loaded (cached) — reveal immediately, no flash
      reveal(img);
    } else {
      img.addEventListener('load', function () { reveal(img); }, { once: true });
      img.addEventListener('error', function () { reveal(img); }, { once: true }); // never leave invisible
    }
  });
})();
