const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const dropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
  });
}

if (dropdown && dropdownToggle) {
  dropdownToggle.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      dropdown.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
      if (window.matchMedia('(max-width: 980px)').matches && navToggle && nav) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      } else {
        dropdownToggle.focus();
      }
    }
  });
}

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm instanceof HTMLFormElement) {
  const endpoint = contactForm.dataset.contactEndpoint;
  const status = contactForm.querySelector('[data-form-status]');

  if (endpoint) {
    contactForm.action = endpoint;
  } else {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (status) {
        status.textContent = 'The contact form is not set up yet. Please email beth@udtherapy.com directly.';
      }
    });
  }
}
