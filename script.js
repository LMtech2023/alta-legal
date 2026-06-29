const header = document.getElementById('header');
const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
const mobileNavQuery = window.matchMedia('(max-width: 760px)');

function isMobileNav() {
  return mobileNavQuery.matches;
}

function setMenuOpen(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('nav-open', open);

  if (!open) {
    menu.querySelectorAll('.has.open').forEach((item) => item.classList.remove('open'));
    menu.querySelectorAll('.has > a[aria-expanded]').forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
    });
  }
}

function initMobileMenu() {
  burger.addEventListener('click', () => {
    setMenuOpen(!menu.classList.contains('open'));
  });

  menu.querySelectorAll('.has > a').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      if (!isMobileNav()) return;

      event.preventDefault();
      const item = trigger.parentElement;
      const willOpen = !item.classList.contains('open');

      menu.querySelectorAll('.has.open').forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove('open');
      });

      item.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!isMobileNav()) return;
      if (link.parentElement.classList.contains('has') && link.parentElement.querySelector(':scope > a') === link) {
        return;
      }
      setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      setMenuOpen(false);
    }
  });

  mobileNavQuery.addEventListener('change', (event) => {
    if (!event.matches) setMenuOpen(false);
  });
}

function initStickyHeader() {
  const onScroll = () => header.classList.toggle('solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('in'));
  });
}

function formatCount(value, prefix, suffix) {
  const n = value >= 100 ? Math.round(value).toLocaleString() : value.toFixed(1);
  return `${prefix}${n}${suffix}`;
}

function initCountUp() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        let start = null;

        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = formatCount(target * eased, prefix, suffix);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = formatCount(target, prefix, suffix);
        };

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.amt[data-count]').forEach((el) => observer.observe(el));
}

function initConsultForm() {
  const form = document.getElementById('consult-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('This is a design rendition — form is illustrative.');
  });
}

initStickyHeader();
initMobileMenu();
initReveal();
initCountUp();
initConsultForm();
