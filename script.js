const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
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
