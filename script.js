const progress = document.querySelector('.progress');
const layers = document.querySelectorAll('.layer');
const reveals = document.querySelectorAll('.reveal');
const tiltElements = document.querySelectorAll('[data-tilt]');

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progress) progress.style.width = `${pct}%`;

  layers.forEach((el) => {
    const speed = parseFloat(el.dataset.speed || '0.1');
    const y = window.scrollY * speed;
    el.style.transform = `translate3d(0, ${y}px, 0)`;
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

reveals.forEach((el) => observer.observe(el));

if (window.matchMedia('(pointer: fine)').matches) {
  tiltElements.forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * 8;
      const ry = (x - 0.5) * 8;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('load', updateProgress);
