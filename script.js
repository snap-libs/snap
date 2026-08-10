document.addEventListener('DOMContentLoaded', () => {
  // Cursor glow effect tracking
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.setProperty('--mouse-x', `${e.clientX}px`);
      glow.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // Example Tab Switcher Logic
  window.switchExampleTab = function(lang) {
    const tabs = ['kr', 'ja', 'en'];
    tabs.forEach(t => {
      const btn = document.getElementById('tab-btn-' + t);
      const content = document.getElementById('tab-content-' + t);
      if (btn && content) {
        if (t === lang) {
          btn.classList.add('text-white', 'border-slate-200');
          btn.classList.remove('text-slate-400', 'border-transparent');
          content.classList.remove('hidden');
        } else {
          btn.classList.remove('text-white', 'border-slate-200');
          btn.classList.add('text-slate-400', 'border-transparent');
          content.classList.add('hidden');
        }
      }
    });
  };

  // ITN Example Tab Switcher Logic
  window.switchItnExampleTab = function(lang) {
    const tabs = ['kr', 'ja', 'en'];
    tabs.forEach(t => {
      const btn = document.getElementById('tab-itn-btn-' + t);
      const content = document.getElementById('tab-itn-content-' + t);
      if (btn && content) {
        if (t === lang) {
          btn.classList.add('text-white', 'border-slate-200');
          btn.classList.remove('text-slate-400', 'border-transparent');
          content.classList.remove('hidden');
        } else {
          btn.classList.remove('text-white', 'border-slate-200');
          btn.classList.add('text-slate-400', 'border-transparent');
          content.classList.add('hidden');
        }
      }
    });
  };

  // Neural Head Tab Switcher Logic
  window.switchHeadTab = function(lang) {
    const tabs = ['kr', 'ja', 'en'];
    tabs.forEach(t => {
      const btn = document.getElementById('tab-head-btn-' + t);
      const content = document.getElementById('tab-head-content-' + t);
      if (btn && content) {
        if (t === lang) {
          btn.classList.add('text-white', 'border-slate-200');
          btn.classList.remove('text-slate-400', 'border-transparent');
          content.classList.remove('hidden');
        } else {
          btn.classList.remove('text-white', 'border-slate-200');
          btn.classList.add('text-slate-400', 'border-transparent');
          content.classList.add('hidden');
        }
      }
    });
  };

  // Applications Showcase Tab Switcher Logic
  window.switchShowcaseLang = function(lang) {
    const tabs = ['kr', 'ja', 'en'];
    tabs.forEach(t => {
      const btn = document.getElementById('tab-showcase-btn-' + t);
      const content = document.getElementById('showcase-content-' + t);
      if (btn && content) {
        if (t === lang) {
          btn.classList.add('text-white', 'border-slate-200');
          btn.classList.remove('text-slate-400', 'border-transparent');
          content.classList.remove('hidden');
        } else {
          btn.classList.remove('text-white', 'border-slate-200');
          btn.classList.add('text-slate-400', 'border-transparent');
          content.classList.add('hidden');
        }
      }
    });

    // Pause any playing audio elements when switching showcase tabs
    const allAudios = document.querySelectorAll('.showcase-lang-content audio');
    allAudios.forEach(a => { a.pause(); });
  };

  // 3-Language Toggle (EN / KO / JA)
  const btnEn = document.getElementById('btn-en');
  const btnKo = document.getElementById('btn-ko');
  const btnJa = document.getElementById('btn-ja');
  const translatableElements = document.querySelectorAll('[data-en][data-ko]');

  function setLanguage(lang) {
    [btnEn, btnKo, btnJa].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (lang === 'en' && btnEn) btnEn.classList.add('active');
    if (lang === 'ko' && btnKo) btnKo.classList.add('active');
    if (lang === 'ja' && btnJa) btnJa.classList.add('active');

    translatableElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.innerHTML = text;
      }
    });

    // Synchronize TN Example Tab, ITN Example Tab, Neural Head Tab & Showcase Tab with Main Header Language Toggle
    const targetTab = (lang === 'ko') ? 'kr' : lang;
    window.switchExampleTab(targetTab);
    window.switchItnExampleTab(targetTab);
    window.switchHeadTab(targetTab);
    window.switchShowcaseLang(targetTab);
  }

  if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
  if (btnKo) btnKo.addEventListener('click', () => setLanguage('ko'));
  if (btnJa) btnJa.addEventListener('click', () => setLanguage('ja'));

  // High-precision Natural ScrollSpy
  const sections = document.querySelectorAll('section[id], div[id^="app-"]');
  const navLinks = document.querySelectorAll('.nav a');

  function updateActiveNav(activeId) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function handleScrollSpy() {
    // If user scrolled to the absolute bottom of page
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 15) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        updateActiveNav(lastSection.id);
        return;
      }
    }

    // Determine active section based on viewport center (35% threshold)
    const viewportOffset = window.innerHeight * 0.35;
    let currentActiveId = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // Section top is above 35% viewport and section bottom is below top
      if (rect.top <= viewportOffset) {
        currentActiveId = section.id;
      }
    });

    // Fallback for top of page
    if (!currentActiveId && sections.length > 0) {
      currentActiveId = sections[0].id;
    }

    if (currentActiveId) {
      updateActiveNav(currentActiveId);
    }
  }

  // Listen for scroll & resize events with passive performance
  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  window.addEventListener('resize', handleScrollSpy, { passive: true });

  // Initial calculation on page load
  handleScrollSpy();

  // Explicitly handle nav click for instant feedback
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        updateActiveNav(targetId);
      }
    });
  });

  // Image Lightbox Modal Logic
  window.openImageModal = function(src) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    if (modal && modalImg) {
      modalImg.src = src;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeImageModal = function() {
    const modal = document.getElementById('image-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeImageModal();
    }
  });
});
