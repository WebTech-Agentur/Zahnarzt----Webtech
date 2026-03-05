document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      // Toggle icon (optional, assuming we have an icon element inside)
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (mainNav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 2. Sticky Header on Scroll
  const header = document.querySelector('.site-header');

  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Check initial state
  checkScroll();

  // Update on scroll
  window.addEventListener('scroll', checkScroll);

  // 3. Scroll Animations (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  fadeElements.forEach(element => {
    appearOnScroll.observe(element);
  });

  // 4. Set active navigation link based on current page
  const setNavigationActiveState = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      // Check if current path ends with link path or if both are root/index
      if (currentPath.endsWith(linkPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  setNavigationActiveState();

  // 6. Service Box Active State Toggle
  const boxes = document.querySelectorAll('.service-box');
  boxes.forEach(box => {
    box.addEventListener('click', (e) => {
      // Don't trigger if clicking the button (let accordion handle that)
      if (e.target.classList.contains('service-btn')) return;

      // Toggle active logic
      boxes.forEach(b => b.classList.remove('active'));
      box.classList.add('active');
    });
  });
});

// 5. Services Toggle Info Logic
function toggleInfo(button) {
  const currentCard = button.closest(".service-box");
  const currentInfo = currentCard.querySelector(".extra-info");

  if (!currentInfo) return;

  // Close all other open cards
  document.querySelectorAll(".extra-info").forEach(info => {
    if (info !== currentInfo && info.classList.contains("active")) {
      info.classList.remove("active");
      const otherButton = info.closest(".service-box").querySelector(".service-btn");
      if (otherButton) {
        otherButton.innerText = "Mehr erfahren";
      }
    }
  });

  currentInfo.classList.toggle("active");

  if (currentInfo.classList.contains("active")) {
    button.innerText = "Weniger anzeigen";
  } else {
    button.innerText = "Mehr erfahren";
  }
}
