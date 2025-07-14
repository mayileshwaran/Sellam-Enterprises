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