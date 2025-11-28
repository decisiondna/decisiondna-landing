// DecisionDNA - Main JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav')) {
      navLinks?.classList.remove('active');
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        navLinks?.classList.remove('active');
      }
    });
  });
  
  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loading');
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections for fade-in animation
  document.querySelectorAll('.product-card, .dimension-card, .research-paper').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  // Navbar transparency on scroll
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.style.background = 'rgba(10, 14, 20, 0.95)';
    } else {
      nav.style.background = 'rgba(10, 14, 20, 0.9)';
    }
    
    lastScroll = currentScroll;
  });
});

// Form validation and submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Basic validation
  const email = formData.get('email');
  const message = formData.get('message');
  
  if (!email || !message) {
    alert('Please fill in all required fields.');
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  
  // In production, this would send to your backend
  console.log('Form submitted:', Object.fromEntries(formData));
  
  // Show success message
  alert('Thank you for your inquiry. We will be in touch shortly.');
  form.reset();
  
  return false;
}

// Event tracking helper
function trackEvent(category, action, label) {
  // Google Analytics or other analytics platform
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
  
  console.log('Event tracked:', category, action, label);
}

// CTA button tracking
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
      const label = this.textContent.trim();
      trackEvent('CTA', 'click', label);
    });
  });
  
  // Track product card clicks
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
      const productName = this.querySelector('h3')?.textContent || 'Unknown';
      trackEvent('Product', 'view', productName);
    });
  });
});

// ABRI Signup form handler
function handleABRISignup(event) {
  event.preventDefault();
  
  const form = event.target;
  const email = form.querySelector('input[name="email"]').value;
  
  if (!email) {
    alert('Please enter your email address.');
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  
  // Track signup
  trackEvent('ABRI', 'signup', email);
  
  // In production, send to your backend/mailing list
  console.log('ABRI signup:', email);
  
  // Show success
  alert('Thank you for signing up! You will receive ABRI updates at ' + email);
  form.reset();
  
  return false;
}

// Copy formula to clipboard
function copyFormula(button) {
  const formula = button.parentElement.querySelector('.formula').textContent;
  navigator.clipboard.writeText(formula).then(function() {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(function() {
      button.textContent = originalText;
    }, 2000);
  });
}