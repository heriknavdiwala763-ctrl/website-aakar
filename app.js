/**
 * AAKAR FILMS — Master Scroll Animations & Interactions
 * Powered by GSAP 3 & ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Initialize all interactive modules
  initCustomCursor();
  initNavbarScroll();
  initMobileMenu();
  initHeroAnimations();
  initThreeColumnScrollGallery();
  initSectionScrollReveals();
  initCounters();
  initTestimonials();
  initBookingForm();
  initLightbox();
});

/**
 * 1. Custom Smooth Mouse Cursor (Desktop)
 */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const follower = document.getElementById('customCursorFollower');
  if (!cursor || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
  });

  // Hover effect over clickable items
  const interactives = document.querySelectorAll('a, button, input, select, textarea, .gallery-card');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform += ' scale(1.6)';
      follower.style.borderColor = 'rgba(212, 175, 55, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.borderColor = 'rgba(255, 255, 255, 0.45)';
    });
  });
}

/**
 * 2. Sticky Glassmorphism Header on Scroll
 */
function initNavbarScroll() {
  const nav = document.getElementById('headerNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const links = document.querySelectorAll('.mobile-link');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/**
 * 4. Hero Entrance Animations
 */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-badge', { opacity: 0, y: -20, duration: 1, delay: 0.2 })
    .from('.hero-logo-box', { opacity: 0, scale: 0.9, duration: 1.4 }, '-=0.6')
    .from('.hero-subtitle', { opacity: 0, y: 25, duration: 1 }, '-=0.8')
    .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.9 }, '-=0.6')
    .from('.hero-scroll-indicator', { opacity: 0, duration: 1 }, '-=0.4');
}

/**
 * 5. THE MAIN 3-COLUMN IMAGE SCROLL ANIMATION
 * Recreating Jonas Arleth / Webflow's column-image-scroll-animation
 * - Columns are sticky within the section
 * - Column 1 (Left): Starts lower and moves upward
 * - Column 2 (Center): Starts higher and moves downward (Opposite direction)
 * - Column 3 (Right): Starts lower and moves upward (Synchronized with Col 1)
 * - Scrubbing is tied directly to real scroll progress via GSAP ScrollTrigger
 */
function initThreeColumnScrollGallery() {
  const section = document.querySelector('.gallery-scroll-section');
  const track1 = document.getElementById('track1');
  const track2 = document.getElementById('track2');
  const track3 = document.getElementById('track3');

  if (!section || !track1 || !track2 || !track3) return;

  // Measure track scroll distances
  // Compute how much the tracks need to translate based on their height vs viewport
  const viewportH = window.innerHeight;

  const setScrollAnimation = () => {
    // Kill existing ScrollTriggers on this section if resizing
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.id === '3column-scroll') st.kill();
    });

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: Smooth synchronized parallax for 2 visible columns
      gsap.fromTo(track1, 
        { y: '5%' },
        {
          y: '-45%',
          ease: 'none',
          scrollTrigger: {
            id: '3column-scroll',
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8
          }
        }
      );

      gsap.fromTo(track2, 
        { y: '-45%' },
        {
          y: '5%',
          ease: 'none',
          scrollTrigger: {
            id: '3column-scroll',
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8
          }
        }
      );
    } else {
      // Desktop: Full 3-Column Opposite Scroll Movement matching the reference

      // Track 1 (Left): Starts shifted DOWN (+30%), moves UP to (-50%)
      gsap.fromTo(track1,
        { yPercent: 20 },
        {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            id: '3column-scroll',
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2
          }
        }
      );

      // Track 2 (Center - OPPOSITE DIRECTION):
      // Starts shifted UP (-50%), moves DOWN to (+20%)
      gsap.fromTo(track2,
        { yPercent: -50 },
        {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            id: '3column-scroll',
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2
          }
        }
      );

      // Track 3 (Right): Starts shifted DOWN (+25%), moves UP to (-55%)
      gsap.fromTo(track3,
        { yPercent: 25 },
        {
          yPercent: -55,
          ease: 'none',
          scrollTrigger: {
            id: '3column-scroll',
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2
          }
        }
      );
    }
  };

  setScrollAnimation();
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}

/**
 * 6. Section Scroll Reveals & Card Animations
 */
function initSectionScrollReveals() {
  // Services Cards stagger
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.9,
    ease: 'power2.out'
  });

  // Featured Stories reveal
  const stories = document.querySelectorAll('.story-row');
  stories.forEach((story) => {
    gsap.from(story.querySelectorAll('.story-image-wrap, .story-text-wrap'), {
      scrollTrigger: {
        trigger: story,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 45,
      stagger: 0.2,
      duration: 1.1,
      ease: 'power3.out'
    });
  });

  // About Section reveal
  gsap.from('.about-frame, .about-content', {
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    stagger: 0.25,
    duration: 1.2,
    ease: 'power3.out'
  });
}

/**
 * 7. Animated Statistics Counters
 */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  ScrollTrigger.create({
    trigger: '.stats-section',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        let start = 0;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            counter.innerText = target;
            clearInterval(timer);
          } else {
            counter.innerText = Math.ceil(start);
          }
        }, stepTime);
      });
    }
  });
}

/**
 * 8. Testimonials Carousel
 */
function initTestimonials() {
  const slider = document.getElementById('testimonialSlider');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dots = document.querySelectorAll('.dot');
  if (!slider || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const totalSlides = dots.length;

  const updateSlide = (index) => {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentIndex = index;
  };

  prevBtn.addEventListener('click', () => {
    let next = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide(next);
  });

  nextBtn.addEventListener('click', () => {
    let next = (currentIndex + 1) % totalSlides;
    updateSlide(next);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = +dot.getAttribute('data-index');
      updateSlide(idx);
    });
  });

  // Autoplay rotation every 7 seconds
  setInterval(() => {
    let next = (currentIndex + 1) % totalSlides;
    updateSlide(next);
  }, 7000);
}

/**
 * 9. Inquiry Form Submission & Validation
 */
function initBookingForm() {
  const form = document.getElementById('inquiryForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.innerText = 'Transmitting Reservation...';
    submitBtn.disabled = true;

    // Simulate luxury API handling (or connect with Supabase)
    setTimeout(() => {
      status.classList.add('success');
      form.reset();
      submitBtn.innerText = 'Inquiry Sent Successfully ✓';
      setTimeout(() => {
        submitBtn.innerText = 'Send Booking Inquiry';
        submitBtn.disabled = false;
      }, 5000);
    }, 1200);
  });
}

/**
 * 10. Lightbox Modal for Gallery Images
 */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const cards = document.querySelectorAll('.gallery-card');

  if (!modal || !img || !closeBtn) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-lightbox');
      if (fullSrc) {
        img.src = fullSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
