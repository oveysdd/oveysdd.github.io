/* ============================================
   OVEYS LAB — Main JavaScript
   ============================================ */

(function() {
  'use strict';

  // ==========================================
  // Theme Manager — Circular Reveal Effect
  // ==========================================
  const ThemeManager = {
    init() {
      this.toggleBtn = document.querySelector('.theme-toggle');
      this.reveal = document.querySelector('.theme-reveal');
      this.html = document.documentElement;
      const savedTheme = localStorage.getItem('oveys-theme') || 'light';
      this.html.setAttribute('data-theme', savedTheme);
      this.updateRevealClass(savedTheme);
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', (e) => this.toggle(e));
      }
    },
    toggle(e) {
      const currentTheme = this.html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      const rect = this.toggleBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      this.reveal.style.setProperty('--x', x + 'px');
      this.reveal.style.setProperty('--y', y + 'px');
      this.updateRevealClass(newTheme);
      this.reveal.classList.add('active');
      setTimeout(() => {
        this.html.setAttribute('data-theme', newTheme);
        localStorage.setItem('oveys-theme', newTheme);
      }, 400);
      setTimeout(() => {
        this.reveal.classList.remove('active');
      }, 800);
    },
    updateRevealClass(theme) {
      this.reveal.classList.remove('light', 'dark');
      this.reveal.classList.add(theme === 'dark' ? 'light' : 'dark');
    }
  };

  // ==========================================
  // Typing Animation
  // ==========================================
  const TypingAnimation = {
    init() {
      this.element = document.querySelector('.typing-text');
      if (!this.element) return;
      this.texts = ['Mechanical Engineer', 'FEA Analyst', 'Developer', 'Problem Solver'];
      this.textIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.typeSpeed = 100;
      this.deleteSpeed = 50;
      this.pauseTime = 2000;
      this.type();
    },
    type() {
      const currentText = this.texts[this.textIndex];
      if (this.isDeleting) {
        this.element.textContent = currentText.substring(0, this.charIndex - 1);
        this.charIndex--;
      } else {
        this.element.textContent = currentText.substring(0, this.charIndex + 1);
        this.charIndex++;
      }
      let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
      if (!this.isDeleting && this.charIndex === currentText.length) {
        speed = this.pauseTime;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.textIndex = (this.textIndex + 1) % this.texts.length;
        speed = 500;
      }
      setTimeout(() => this.type(), speed);
    }
  };

  // ==========================================
  // Counter Animation
  // ==========================================
  const CounterAnimation = {
    init() {
      this.counters = document.querySelectorAll('.counter');
      if (this.counters.length === 0) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      this.counters.forEach(counter => observer.observe(counter));
    },
    animate(counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const startTime = performance.now();
      const startValue = 0;
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
        counter.textContent = currentValue.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      requestAnimationFrame(updateCounter);
    }
  };

  // ==========================================
  // Scroll to Top
  // ==========================================
  const ScrollToTop = {
    init() {
      this.btn = document.querySelector('.scroll-top');
      if (!this.btn) return;
      window.addEventListener('scroll', () => this.toggleVisibility());
      this.btn.addEventListener('click', () => this.scroll());
    },
    toggleVisibility() {
      if (window.scrollY > 400) {
        this.btn.classList.add('visible');
      } else {
        this.btn.classList.remove('visible');
      }
    },
    scroll() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ==========================================
  // Like System — Starts at 0, increments by 1 per user click
  // ==========================================
  const LikeSystem = {
    init() {
      this.buttons = document.querySelectorAll('.like-btn');
      this.storageKey = 'oveys-likes';
      this.likes = this.loadLikes();
      this.buttons.forEach(btn => {
        const postId = btn.getAttribute('data-post-id');
        if (!postId) return;
        this.updateButton(btn, postId);
        btn.addEventListener('click', (e) => this.handleLike(e, btn, postId));
      });
    },
    loadLikes() {
      try {
        return JSON.parse(localStorage.getItem(this.storageKey)) || {};
      } catch {
        return {};
      }
    },
    saveLikes() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.likes));
    },
    handleLike(e, btn, postId) {
      e.preventDefault();
      e.stopPropagation();
      const isLiked = this.likes[postId];
      if (isLiked) {
        delete this.likes[postId];
      } else {
        this.likes[postId] = true;
        const star = btn.querySelector('.star');
        if (star) {
          star.style.transform = 'scale(1.5)';
          setTimeout(() => { star.style.transform = ''; }, 200);
        }
      }
      this.saveLikes();
      this.updateButton(btn, postId);
    },
    updateButton(btn, postId) {
      const isLiked = this.likes[postId];
      const countEl = btn.querySelector('.like-count');
      // base-count is the starting count (0 for new items)
      const baseCount = parseInt(btn.getAttribute('data-base-count') || '0');
      // total = base + (1 if liked by this user else 0)
      const total = baseCount + (isLiked ? 1 : 0);
      if (countEl) countEl.textContent = total;
      if (isLiked) {
        btn.classList.add('liked');
      } else {
        btn.classList.remove('liked');
      }
    }
  };

  // ==========================================
  // Search Functionality
  // ==========================================
  const SearchManager = {
    init() {
      this.searchBtn = document.querySelector('.search-btn');
      this.overlay = document.querySelector('.search-overlay');
      this.closeBtn = document.querySelector('.search-close');
      this.input = document.querySelector('.search-input');
      if (!this.overlay) return;
      if (this.searchBtn) this.searchBtn.addEventListener('click', () => this.open());
      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
      if (this.input) {
        this.input.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') this.close();
          if (e.key === 'Enter') this.performSearch();
        });
      }
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.open();
        }
      });
    },
    open() {
      this.overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => { if (this.input) this.input.focus(); }, 100);
    },
    close() {
      this.overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (this.input) this.input.value = '';
    },
    performSearch() {
      const query = this.input.value.trim().toLowerCase();
      if (!query) return;
      window.location.href = 'blog.html?q=' + encodeURIComponent(query);
    }
  };

  // ==========================================
  // Mobile Menu
  // ==========================================
  const MobileMenu = {
    init() {
      this.menuBtn = document.querySelector('.mobile-menu-btn');
      this.menu = document.querySelector('.mobile-menu');
      this.overlay = document.querySelector('.mobile-menu-overlay');
      this.closeBtn = document.querySelector('.mobile-menu-close');
      if (!this.menuBtn || !this.menu) return;
      this.menuBtn.addEventListener('click', () => this.open());
      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
      if (this.overlay) this.overlay.addEventListener('click', () => this.close());
      this.menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.close());
      });
    },
    open() {
      this.menu.classList.add('active');
      if (this.overlay) this.overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    },
    close() {
      this.menu.classList.remove('active');
      if (this.overlay) this.overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // ==========================================
  // Fade In on Scroll
  // ==========================================
  const FadeInOnScroll = {
    init() {
      this.elements = document.querySelectorAll('.fade-in');
      if (this.elements.length === 0) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      this.elements.forEach(el => observer.observe(el));
    }
  };

  // ==========================================
  // Skill Bars Animation
  // ==========================================
  const SkillBars = {
    init() {
      this.bars = document.querySelectorAll('.skill-progress');
      if (this.bars.length === 0) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            if (width) {
              setTimeout(() => { bar.style.width = width + '%'; }, 200);
            }
            observer.unobserve(bar);
          }
        });
      }, { threshold: 0.5 });
      this.bars.forEach(bar => observer.observe(bar));
    }
  };

  // ==========================================
  // Disqus Comments Loader
  // ==========================================
  const DisqusLoader = {
    init() {
      this.container = document.getElementById('disqus_thread');
      if (!this.container) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.load();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(this.container);
    },
    load() {
      const disqus_config = function() {
        this.page.url = window.location.href;
        this.page.identifier = window.location.pathname;
      };
      const d = document, s = d.createElement('script');
      s.src = 'https://oveys-lab.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    }
  };

  // ==========================================
  // Navbar Scroll Effect
  // ==========================================
  const NavbarScroll = {
    init() {
      this.navbar = document.querySelector('.navbar');
      if (!this.navbar) return;
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          this.navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
          this.navbar.style.boxShadow = 'none';
        }
      });
    }
  };

  // ==========================================
  // Active Navigation Link
  // ==========================================
  const ActiveNavLink = {
    init() {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-links a, .mobile-menu-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
          link.classList.add('active');
        }
      });
    }
  };

  // ==========================================
  // Initialize Everything
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    TypingAnimation.init();
    CounterAnimation.init();
    ScrollToTop.init();
    LikeSystem.init();
    SearchManager.init();
    MobileMenu.init();
    FadeInOnScroll.init();
    SkillBars.init();
    DisqusLoader.init();
    NavbarScroll.init();
    ActiveNavLink.init();
  });

})();
