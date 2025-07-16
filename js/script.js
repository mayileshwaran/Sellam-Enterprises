// Smooth scroll on nav clicks (optional)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Message sent successfully!");
    this.reset();
  });
}

// Counter animation function
function animateCounter(counter) {
  const target = +counter.getAttribute('data-count');
  let count = 0;
  const increment = Math.ceil(target / 100);

  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      counter.innerText = target + "+";
      clearInterval(interval);
    } else {
      counter.innerText = count;
    }
  }, 20);
}

// Observe #know-us section for counter animation
function animateCounter(counter) {
  const target = +counter.getAttribute('data-count');
  const duration = 700; 
  const frameRate = 30; // how many ms between updates
  const totalSteps = Math.ceil(duration / frameRate);
  let currentStep = 0;

  const update = () => {
    currentStep++;
    const progress = Math.min(currentStep / totalSteps, 1);
    const value = Math.floor(progress * target);
    counter.innerText = value;

    if (progress < 1) {
      setTimeout(update, frameRate);
    } else {
      counter.innerText = target + "+"; // Final value with +
    }
  };

  update();
}

// Scroll trigger
const knowUsSection = document.getElementById('know-us');
if (knowUsSection) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => animateCounter(counter));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(knowUsSection);
}


// Parallax fade-in effect on scroll
const fadeElements = document.querySelectorAll('.fade-parallax');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.3
});

fadeElements.forEach(el => fadeObserver.observe(el));

const form = document.getElementById('contactForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');

  const namePattern = /^[a-zA-Z ]{2,}$/;
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const phonePattern = /^[6-9][0-9]{9}$/;
  const messagePattern = /^[a-zA-Z0-9 .,]{10,}$/;

  document.querySelectorAll('.text-danger[data-error]').forEach(el => el.remove());

  let isValid = true;

  const showError = (input, message, pattern) => {
    const value = input.value.trim();
    const existingError = input.parentNode.querySelector('[data-error]');
    if (!pattern.test(value)) {
      if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-danger mt-1';
        errorDiv.textContent = message;
        errorDiv.setAttribute('data-error', 'true');
        input.parentNode.appendChild(errorDiv);
      }
      isValid = false;
    } else {
      if (existingError) existingError.remove();
    }
  };

  showError(nameInput, 'Name must be at least 2 characters and only letters/spaces.', namePattern);
  showError(emailInput, 'Enter a valid email address.', emailPattern);
  showError(phoneInput, 'Enter a 10-digit number starting with 6–9.', phonePattern);
  showError(messageInput, 'Min 10 characters. Only letters, numbers, ., , allowed.', messagePattern);

  if (isValid) {
    const alertBox = document.getElementById('alertBox');
    alertBox.innerHTML = '<div class="alert alert-success mt-4">✅ Form submitted successfully (front-end only).</div>';
    form.reset();
  }
});

// Live validation: show/remove errors as user types
const liveFields = [
  { id: 'name', pattern: /^[a-zA-Z ]{2,}$/, message: 'Name must be at least 2 characters and only letters/spaces.' },
  { id: 'email', pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Enter a valid email address.' },
  { id: 'phone', pattern: /^[6-9][0-9]{9}$/, message: 'Enter a 10-digit number starting with 6–9.' },
  { id: 'message', pattern: /^[a-zA-Z0-9 .,]{10,}$/, message: 'Min 10 characters. Only letters, numbers, ., , allowed.' }
];

liveFields.forEach(({ id, pattern, message }) => {
  const input = document.getElementById(id);
  input.addEventListener('input', () => {
    const value = input.value.trim();
    const existingError = input.parentNode.querySelector('[data-error]');
    if (!pattern.test(value)) {
      if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-danger mt-1';
        errorDiv.textContent = message;
        errorDiv.setAttribute('data-error', 'true');
        input.parentNode.appendChild(errorDiv);
      }
    } else {
      if (existingError) existingError.remove();
    }
  });
});
