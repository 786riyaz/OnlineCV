document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animations
  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out',
    });
  }

  // Smooth scroll for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Theme toggle and persistence
  const THEME_KEY = 'theme';
  const themeToggleBtn = document.getElementById('themeToggle');
  const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      themeToggleBtn.classList.toggle('btn-outline-light', theme === 'dark');
      themeToggleBtn.classList.toggle('btn-outline-secondary', theme !== 'dark');
    }
  };
  let storedTheme = localStorage.getItem(THEME_KEY);
  if (!storedTheme) storedTheme = 'light';
  applyTheme(storedTheme);
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }
});