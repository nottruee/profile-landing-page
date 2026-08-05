// Dynamic rain loop generator
function createRain() {
  const container = document.getElementById('rainContainer');
  if (!container) return;
  
  const dropCount = 50;
  
  for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (Math.random() * 1 + 0.7) + 's';
    drop.style.animationDelay = (Math.random() * 2) + 's';
    container.appendChild(drop);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createRain();
  
  // 1. Smooth Scroll Handling (only runs if the arrow exists on the page)
  const arrow = document.getElementById('scrollArrow');
  if (arrow) {
    arrow.addEventListener('click', (e) => {
      // If you prefer regular linking instead of scrolling, you can omit this block 
      // since the arrow in index.html now links directly to projects.html.
    });
  }
  
  // 2. Mobile Menu Navigation Toggler & Auto-Close
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const menuLinks = document.querySelectorAll('.menu-item');
  
  function toggleMenu() {
    if (!mobileMenu || !menuIcon) return;
    mobileMenu.classList.toggle('open');
    
    if (mobileMenu.classList.contains('open')) {
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-xmark');
    } else {
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
});
