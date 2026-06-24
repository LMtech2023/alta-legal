// Shrink header on scroll
const hdr = document.getElementById('hdr');

addEventListener('scroll', () => {
  hdr.style.height = scrollY > 40 ? '' : '';
  hdr.style.boxShadow = scrollY > 40 ? '0 6px 24px rgba(6,16,31,.08)' : 'none';
});

// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
  const navList = document.querySelector('nav ul');
  const open = navList.style.display === 'flex';
  navList.style.cssText = open
    ? ''
    : 'display:flex;position:absolute;top:78px;left:0;right:0;background:#fff;flex-direction:column;padding:20px 28px;gap:18px;border-bottom:1px solid var(--line);box-shadow:0 12px 30px rgba(0,0,0,.1)';
});
