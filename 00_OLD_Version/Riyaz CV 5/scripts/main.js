// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navLinks = Array.from(document.querySelectorAll('.site-nav .nav-link[href^="#"]'));
  const backToTop = document.getElementById('backToTop');

  if (header) {
    const toggleHeaderState = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    toggleHeaderState();
    window.addEventListener('scroll', toggleHeaderState, { passive: true });
  }

  if (navLinks.length) {
    const sections = navLinks
      .map((link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('http')) return null;
        const section = document.querySelector(href);
        return section && section.id ? section : null;
      })
      .filter(Boolean);

    const activateLink = (id) => {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    if (sections.length) {
      activateLink(sections[0].id);

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length) {
            activateLink(visible[0].target.id);
          }
        },
        {
          rootMargin: '-45% 0px -55% 0px',
          threshold: [0.05, 0.2, 0.6]
        }
      );

      sections.forEach((section) => observer.observe(section));
    }
  }

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    };

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const contactForms = Array.from(document.querySelectorAll('form[action*="formspree"]'));
  if (contactForms.length) {
    contactForms.forEach((form) => {
      const status = document.createElement('div');
      status.className = 'form-status text-muted';
      status.setAttribute('role', 'status');
      form.appendChild(status);

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        status.textContent = 'Sending...';
        status.className = 'form-status text-muted';

        const formData = new FormData(form);

        try {
          const response = await fetch(form.getAttribute('action'), {
            method: form.getAttribute('method') || 'POST',
            headers: { Accept: 'application/json' },
            body: formData
          });

          if (response.ok) {
            status.textContent = 'Thanks! I will get back to you shortly.';
            status.className = 'form-status text-success';
            form.reset();
          } else {
            status.textContent = 'Oops, something went wrong. Please email me directly.';
            status.className = 'form-status text-danger';
          }
        } catch (error) {
          status.textContent = 'Network error. Please try again later.';
          status.className = 'form-status text-danger';
        }
      });
    });
  }
});
