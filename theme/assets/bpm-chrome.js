const bindChrome = (root = document) => {
  document.documentElement.style.setProperty('--bpm-announcement-height', `${document.querySelector('[data-bpm-announcement]')?.getBoundingClientRect().height || 0}px`);
  root.querySelectorAll('.bpm-mobile-menu, .bpm-nav-disclosure').forEach((disclosure) => {
    if (disclosure.dataset.bpmBound) return;
    disclosure.dataset.bpmBound = 'true';
    disclosure.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !disclosure.open) return;
      event.stopPropagation();
      disclosure.open = false;
      disclosure.querySelector(':scope > summary')?.focus();
    });
  });
};
bindChrome();
document.addEventListener('shopify:section:load', (event) => bindChrome(event.target));
document.addEventListener('shopify:section:unload', () => requestAnimationFrame(() => bindChrome()));
window.addEventListener('resize', () => bindChrome());
