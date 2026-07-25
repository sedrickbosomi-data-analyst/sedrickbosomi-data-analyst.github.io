(() => {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const progressBar = document.getElementById('progress-bar');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Overlay for mobile nav --- */
  const overlay = document.createElement('div');
  overlay.className = 'nav-open-overlay';
  document.body.appendChild(overlay);

  function closeNav() {
    mainNav.classList.remove('open');
    overlay.classList.remove('visible');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('active');
  }

  function toggleNav() {
    const isOpen = mainNav.classList.toggle('open');
    overlay.classList.toggle('visible', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.classList.toggle('active', isOpen);
  }

  navToggle.addEventListener('click', toggleNav);
  overlay.addEventListener('click', closeNav);
  navLinks.forEach(link => link.addEventListener('click', closeNav));

  /* --- Header background + scroll progress --- */
  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    header.classList.toggle('scrolled', scrollTop > 30);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Active nav link on scroll (IntersectionObserver) --- */
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(section => navObserver.observe(section));

  /* --- Reveal on scroll animations --- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();
