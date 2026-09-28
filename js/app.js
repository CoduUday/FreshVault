/* ==========================================================================
   FreshVault NER - Main App Logic & Interactions (Streamlined)
   Solar-Powered Smart Mini Cold Storage for North Eastern Region
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Hero 3D Viewer
  let heroViewer = null;

  if (window.FreshVault3D && document.getElementById('hero-3d-canvas')) {
    heroViewer = window.FreshVault3D.createViewer('hero-3d-canvas', {
      initialView: 'front',
      autoRotate: true,
      showAirflow: false
    });
  }

  // Hero Quick View Switcher
  const heroCtrlButtons = document.querySelectorAll('.hero-ctrl-btn');
  heroCtrlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      heroCtrlButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-view');
      if (heroViewer) {
        heroViewer.setView(view);
      }
    });
  });

  // 2. Hardware Component Category Filter
  const hwFilterBtns = document.querySelectorAll('.hw-filter-btn');
  const hwCards = document.querySelectorAll('.hw-card');

  hwFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hwFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-cat');

      hwCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Sticky Navbar Active Link Highlighting on Scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-links-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 5. Multi-Device Share Modal & Dynamic QR Code Generation
  const shareModal = document.getElementById('share-modal');
  const openShareBtn = document.getElementById('open-share-modal-btn');
  const closeShareBtn = document.getElementById('close-share-modal-btn');
  const qrCanvasContainer = document.getElementById('qr-code-canvas');
  const shareUrlInput = document.getElementById('share-url-input');
  const copyUrlBtn = document.getElementById('copy-url-btn');
  const copyStatusMsg = document.getElementById('copy-status-msg');

  // Compute live URL or use fallback IP
  let currentShareUrl = window.location.href;
  if (window.location.protocol === 'file:') {
    currentShareUrl = 'http://192.168.1.9:8080';
  }
  if (shareUrlInput) {
    shareUrlInput.value = currentShareUrl;
  }

  let qrGenerated = false;
  const generateQRCode = () => {
    if (qrGenerated || !qrCanvasContainer || typeof QRCode === 'undefined') return;
    qrCanvasContainer.innerHTML = '';
    new QRCode(qrCanvasContainer, {
      text: currentShareUrl,
      width: 170,
      height: 170,
      colorDark: '#1F4E79',
      colorLight: '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.M
    });
    qrGenerated = true;
  };

  if (openShareBtn && shareModal) {
    openShareBtn.addEventListener('click', () => {
      shareModal.classList.add('active');
      generateQRCode();
    });
  }

  if (closeShareBtn && shareModal) {
    closeShareBtn.addEventListener('click', () => {
      shareModal.classList.remove('active');
    });
  }

  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) {
        shareModal.classList.remove('active');
      }
    });
  }

  if (copyUrlBtn && shareUrlInput) {
    copyUrlBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(shareUrlInput.value).then(() => {
        if (copyStatusMsg) {
          copyStatusMsg.textContent = 'Copied to clipboard! ✓';
          setTimeout(() => { copyStatusMsg.textContent = ''; }, 2500);
        }
      }).catch(() => {
        shareUrlInput.select();
        document.execCommand('copy');
        if (copyStatusMsg) {
          copyStatusMsg.textContent = 'Copied! ✓';
          setTimeout(() => { copyStatusMsg.textContent = ''; }, 2500);
        }
      });
    });
  }
});
