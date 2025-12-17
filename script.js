// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active nav link based on scroll position
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const headerHeight = document.querySelector(".header").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 50;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${section.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // WhatsApp booking form submission
  const whatsappForm = document.getElementById("whatsapp-booking-form");
  if (whatsappForm) {
    whatsappForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const pickupDate = document.getElementById("pickup-date").value;
      const carSelection = document.getElementById("car-selection").value;
      const pickupLocation = "Lucknow";

      // Basic validation
      if (!pickupDate || !carSelection) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      // Date validation
      const selectedDate = new Date(pickupDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        showNotification("Pickup date must be today or in the future", "error");
        return;
      }

      // Format the date for WhatsApp message
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Create WhatsApp message
      const message = `Hi! I'd like to book a car rental.

 Car: ${carSelection}
 Pickup Location: ${pickupLocation}
 Date: ${formattedDate}

Please confirm availability and share the booking details. Looking forward to your response!

Thank you!`;

      // Phone number (remove spaces and special characters, keep only digits)
      const phoneNumber = "919919544949"; // +91-9919544949

      // Generate WhatsApp URL
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      // Show success message and redirect
      showNotification("Redirecting to WhatsApp...", "success");

      // Open WhatsApp in a new tab after a brief delay
      window.location.href = whatsappURL;

    });
  }

  // Contact form validation and submission
  const contactForm = document.getElementById("contact-booking-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const pickupDate = document.getElementById("contact-pickup-date").value;
      const carSelection = document.getElementById(
        "contact-car-selection"
      ).value;
      const pickupLocation = "Lucknow";

      // Basic validation
      if (!pickupDate || !carSelection) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      // Date validation
      const selectedDate = new Date(pickupDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        showNotification("Pickup date must be today or in the future", "error");
        return;
      }

      // Format the date for WhatsApp message
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Create WhatsApp message
      const message = `Hi! I'd like to book a car rental.

 Car: ${carSelection}
 Pickup Location: ${pickupLocation}
 Date: ${formattedDate}

Please confirm availability and share the booking details. Looking forward to your response!

Thank you!`;

      // Phone number (remove spaces and special characters, keep only digits)
      const phoneNumber = "919919544949"; // +91-9919544949

      // Generate WhatsApp URL
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      // Show success message and redirect
      showNotification("Redirecting to WhatsApp...", "success");

      // Open WhatsApp in a new tab after a brief delay
      window.location.href = whatsappURL;

    });
  }

  // Car booking buttons with auto-fill functionality
  const bookButtons = document.querySelectorAll(".car-card .btn");
  bookButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const carCard = this.closest(".car-card");
      const carName = carCard.querySelector("h4").textContent;
      const carPrice = carCard
        .querySelector(".car-price")
        .textContent.split("₹")[1]
        .split("/")[0];

      // Create the car selection value that matches dropdown options
      const carSelection = `${carName} - ₹${carPrice}/day`;

      // Auto-fill the contact form with selected car
      const contactCarSelect = document.getElementById("contact-car-selection");
      if (contactCarSelect) {
        // Find matching option value
        const options = contactCarSelect.options;
        for (let i = 0; i < options.length; i++) {
          if (options[i].value.includes(carName)) {
            contactCarSelect.value = options[i].value;
            break;
          }
        }
      }

      // Show success message
      showNotification(
        `${carName} selected! Complete your booking below.`,
        "success"
      );

      // Scroll to contact section
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = contactSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Focus on date input after scroll
          setTimeout(() => {
            const dateInput = document.getElementById("contact-pickup-date");
            if (dateInput) {
              dateInput.focus();
            }
          }, 500);
        }
      }, 1000);
    });
  });

  // Header "Book Now" button
  const headerBookButton = document.querySelector(".nav-right .btn");
  if (headerBookButton) {
    headerBookButton.addEventListener("click", function (e) {
      e.preventDefault();

      const heroSection = document.getElementById("home");
      if (heroSection) {
        const bookingForm = heroSection.querySelector(".booking-form");
        if (bookingForm) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = bookingForm.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Focus on first input
          setTimeout(() => {
            const firstInput = bookingForm.querySelector("input");
            if (firstInput) {
              firstInput.focus();
            }
          }, 500);
        }
      }
    });
  }

  // WhatsApp and Phone call functionality
  const phoneButtons = document.querySelectorAll(".contact-item");
  phoneButtons.forEach((item) => {
    item.addEventListener("click", function () {
      const text = this.querySelector("span").textContent;

      if (text.includes("WhatsApp")) {
        const phoneNumber = text.split(":")[1].trim().replace(/\D/g, "");
        window.open(`https://wa.me/${phoneNumber}`, "_blank");
      } else if (text.includes("Call")) {
        const phoneNumber = text.split(":")[1].trim().replace(/\D/g, "");
        window.open(`tel:${phoneNumber}`, "_self");
      }
    });
  });

  // Initialize date inputs with today's date
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  // Setup date inputs for both forms
  const dateInputs = ["pickup-date", "contact-pickup-date"];

  dateInputs.forEach((inputId) => {
    const dateInput = document.getElementById(inputId);
    if (dateInput) {
      dateInput.setAttribute("min", todayString);
      dateInput.value = todayString;
    }
  });
});

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: inherit;
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeButton = notification.querySelector(".notification-close");
  closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
    `;

  closeButton.addEventListener("click", () => {
    removeNotification(notification);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

function removeNotification(notification) {
  if (notification && notification.parentNode) {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }
}

// Smooth scroll to top functionality (can be added to footer)
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Loading animation for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // Check if image is already loaded (cached)
    if (img.complete && img.naturalHeight !== 0) {
      // Image is already loaded, show it immediately
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
      img.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    } else {
      // Image not loaded yet, apply loading animation
      img.addEventListener("load", function () {
        this.style.opacity = "1";
        this.style.transform = "scale(1)";
      });

      // Set initial styles for loading animation
      img.style.opacity = "0";
      img.style.transform = "scale(0.95)";
      img.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    }
  });
});

// Add subtle parallax effect to hero section
window.addEventListener("scroll", function () {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (scrolled < hero.offsetHeight) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  }
});

// Scroll Animation System using Intersection Observer
function initScrollAnimations() {
  // Create Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        // Optional: Stop observing after animation triggers once
        // scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add scroll animations to elements when DOM loads
  function setupScrollAnimations() {
    // Section titles with fade up animation
    const sectionTitles = document.querySelectorAll(".section-title");
    sectionTitles.forEach((title) => {
      title.classList.add("scroll-animate", "fade-up");
      scrollObserver.observe(title);
    });

    // Feature cards with staggered animation
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card, index) => {
      card.classList.add(
        "scroll-animate",
        "fade-up",
        `stagger-${(index % 4) + 1}`
      );
      scrollObserver.observe(card);
    });

    // Car cards with alternating left/right animations
    const carCards = document.querySelectorAll(".car-card");
    carCards.forEach((card, index) => {
      const animationType = index % 2 === 0 ? "fade-left" : "fade-right";
      card.classList.add(
        "scroll-animate",
        animationType,
        `stagger-${(index % 3) + 1}`
      );
      scrollObserver.observe(card);
    });

    // Category titles with scale-in animation
    const categoryTitles = document.querySelectorAll(".category-title");
    categoryTitles.forEach((title) => {
      title.classList.add("scroll-animate", "scale-in");
      scrollObserver.observe(title);
    });

    // Contact section elements
    const contactItems = document.querySelectorAll(".contact-item");
    contactItems.forEach((item, index) => {
      item.classList.add("scroll-animate", "fade-up", `stagger-${index + 1}`);
      scrollObserver.observe(item);
    });

    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
      contactForm.classList.add("scroll-animate", "fade-right");
      scrollObserver.observe(contactForm);
    }

    // Additional elements
    const offerBanner = document.querySelector(".offer-banner");
    if (offerBanner) {
      offerBanner.classList.add("scroll-animate", "scale-in");
      scrollObserver.observe(offerBanner);
    }

    const trustIndicators = document.querySelectorAll(".trust-item");
    trustIndicators.forEach((item, index) => {
      item.classList.add("scroll-animate", "fade-up", `stagger-${index + 1}`);
      scrollObserver.observe(item);
    });

    const heroForm = document.querySelector(".booking-form-compact");
    if (heroForm) {
      heroForm.classList.add("scroll-animate", "fade-up");
      scrollObserver.observe(heroForm);
    }
  }

  // Run setup when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupScrollAnimations);
  } else {
    setupScrollAnimations();
  }
}

// Performance: Debounce scroll events for other functionality
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize scroll animations
initScrollAnimations();
