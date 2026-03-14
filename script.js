// ─── Navigation ───────────────────────────────────────────────

function goTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Drawer menu ──────────────────────────────────────────────

function openDrawer() {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeDrawer();
});

// ─── Resource tabs ────────────────────────────────────────────

function switchTab(btn, name) {
  document.querySelectorAll('.res-tab').forEach(function(t) {
    t.classList.remove('active');
  });
  document.querySelectorAll('.res-panel').forEach(function(p) {
    p.classList.remove('active');
  });
  btn.classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
}

// ─── Custom cursor ────────────────────────────────────────────

var cursor = document.getElementById('cursor');
var ring   = document.getElementById('cursor-ring');
var mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cursor.style.transform = 'translate(' + mx + 'px, ' + my + 'px) translate(-50%, -50%)';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = 'translate(' + rx + 'px, ' + ry + 'px) translate(-50%, -50%)';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-tag').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursor.style.transform += ' scale(0)';
    ring.style.transform   += ' scale(1.6)';
    ring.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', function() {
    ring.style.opacity = '0.4';
  });
});

// ─── Scroll reveal ────────────────────────────────────────────

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(e, i) {
    if (e.isIntersecting) {
      setTimeout(function() {
        e.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) {
  observer.observe(el);
});
