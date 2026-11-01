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
  const emailField = contactForm.elements.namedItem('email');
  const phoneField = contactForm.elements.namedItem('phone');
  const bestTimeFields = contactForm.querySelectorAll('input[name="bestTime"]');

  if (emailField instanceof HTMLInputElement && phoneField instanceof HTMLInputElement) {
    const updateContactRequirement = () => {
      const email = emailField.value.trim();
      const phone = phoneField.value.trim();
      const hasContactMethod = Boolean(email || phone);
      const requirementMessage = hasContactMethod ? '' : 'Please provide an email address or phone number.';
      const phoneIsValid = /^[+()0-9.\-\s]{7,30}$/.test(phone) && phone.replace(/\D/g, '').length >= 7;

      emailField.setCustomValidity(requirementMessage);
      phoneField.setCustomValidity(
        requirementMessage || (phone && !phoneIsValid ? 'Please enter a valid phone number.' : '')
      );
    };

    emailField.addEventListener('input', updateContactRequirement);
    phoneField.addEventListener('input', updateContactRequirement);
    updateContactRequirement();
  }

  if (bestTimeFields.length > 0) {
    const anytimeField = [...bestTimeFields].find((field) => field.value === 'Anytime');
    const updateBestTimeRequirement = () => {
      const hasSelection = [...bestTimeFields].some((field) => field.checked);
      bestTimeFields[0].setCustomValidity(hasSelection ? '' : 'Select at least one time that works for you.');
    };

    bestTimeFields.forEach((field) => {
      field.addEventListener('change', () => {
        if (field === anytimeField && field.checked) {
          bestTimeFields.forEach((otherField) => {
            if (otherField !== anytimeField) {
              otherField.checked = false;
            }
          });
        } else if (field.checked && anytimeField) {
          anytimeField.checked = false;
        }

        updateBestTimeRequirement();
      });
    });

    updateBestTimeRequirement();
  }

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
