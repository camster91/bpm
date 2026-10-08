(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const merchantEnabled = document.documentElement.dataset.bpmMotionEnabled !== 'false';
  const editing = window.Shopify?.designMode === true;
  const supported = 'IntersectionObserver' in window;
  const visibleProducts = new Set();
  const visibleGroups = new Set();
  const detailAnimations = new Set();
  let sections = [], products = [], groups = [], observers = [], frame = null, paused = false;
  const enabled = () => supported && merchantEnabled && !editing && !preference.matches && !paused;
  const progress = (rect) => Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
  const update = () => {
    frame = null;
    if (!enabled()) return;
    const turns = [...visibleProducts].filter(el => el.isConnected).map(el => [el, (progress(el.parentElement.getBoundingClientRect()) - .5) * 24]);
    const positions = [...visibleGroups].filter(el => el.isConnected).map(group => {
      const rect = group.getBoundingClientRect();
      return { group, width: rect.width, height: rect.height, phase: (progress(group.closest('.track-image,.bundle-spotlight').getBoundingClientRect()) - .5) * Math.PI * 2 };
    });
    turns.forEach(([el, angle]) => el.style.setProperty('--scroll-turn', angle.toFixed(2) + 'deg'));
    positions.forEach(({ group, width, height, phase }) => {
      [...group.children].forEach((img, i, items) => {
        const angle = phase + i * Math.PI * 2 / items.length, depth = Math.sin(angle);
        const x = Math.cos(angle) * width * .32, y = depth * height * .10, z = depth * Math.min(width * .15, 70);
        img.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${z.toFixed(2)}px) rotateY(${(-depth * 12).toFixed(2)}deg)`;
      });
    });
  };
  const schedule = () => {
    if (frame === null && enabled() && (visibleProducts.size || visibleGroups.size)) frame = requestAnimationFrame(update);
  };
  const reset = () => {
    observers.forEach(observer => observer.disconnect());
    observers = [];
    visibleProducts.clear(); visibleGroups.clear();
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    detailAnimations.forEach(animation => animation.cancel()); detailAnimations.clear();
    sections.forEach(section => {
      section.classList.remove('motion-scene', 'motion-entered', 'motion-active');
      section.style.removeProperty('--motion-turn');
      section.querySelectorAll('.motion-item').forEach(item => { item.classList.remove('motion-item'); item.style.removeProperty('--motion-delay'); });
    });
    products.forEach(el => { el.classList.remove('scroll-product'); el.style.removeProperty('--scroll-turn'); });
    groups.forEach(group => { group.classList.remove('orbital-pack'); [...group.children].forEach(img => img.style.removeProperty('transform')); });
  };
  const setup = () => {
    reset();
    sections = [...document.querySelectorAll('main > section,main > .shopify-section > section')];
    products = [...document.querySelectorAll('main .track-image .pack-line.count-1,main .tube-detail img')];
    groups = [...document.querySelectorAll('main .track-image .pack-line.count-2,main .track-image .pack-line.count-4,main .bundle-spotlight .pack-line')];
    document.documentElement.classList.toggle('bpm-motion-paused', paused || !merchantEnabled || editing);
    document.querySelectorAll('[data-bpm-motion-toggle]').forEach(button => {
      button.hidden = !supported || !merchantEnabled || editing || preference.matches;
      button.textContent = paused ? button.dataset.resumeLabel : button.dataset.pauseLabel;
      if (!button.dataset.bpmMotionBound) {
        button.dataset.bpmMotionBound = 'true';
        button.addEventListener('click', () => { paused = !paused; setup(); });
      }
    });
    document.querySelectorAll('main details').forEach(detail => {
      if (detail.dataset.bpmMotionBound) return;
      detail.dataset.bpmMotionBound = 'true';
      detail.addEventListener('toggle', () => {
        if (!detail.open || !enabled()) return;
        [...detail.children].filter(child => child.tagName !== 'SUMMARY' && typeof child.animate === 'function').forEach(child => {
          const animation = child.animate([{ opacity: .4, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 280, easing: 'ease-out' });
          detailAnimations.add(animation);
          animation.onfinish = animation.oncancel = () => detailAnimations.delete(animation);
        });
      });
    });
    if (!enabled()) return;
    sections.forEach((section, index) => {
      section.classList.add('motion-scene');
      section.style.setProperty('--motion-turn', index % 2 ? '2deg' : '-2deg');
      section.querySelectorAll('.track-card,.creator-slot,.customer-quote,.benefit-grid > article,.bundle-spotlight,.editorial-card,.principle-grid > article,.ingredient-list > p,.value-list > article,.pricing-notes > div').forEach((item, i) => {
        item.classList.add('motion-item'); item.style.setProperty('--motion-delay', `${Math.min(i, 5) * 85}ms`);
      });
    });
    const scenes = new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => {
      target.classList.toggle('motion-active', isIntersecting);
      if (isIntersecting) target.classList.add('motion-entered');
    }), { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    const cartons = new IntersectionObserver(entries => { entries.forEach(({ target, isIntersecting }) => { if (isIntersecting) visibleProducts.add(target); else visibleProducts.delete(target); }); schedule(); }, { rootMargin: '80px 0px' });
    const orbits = new IntersectionObserver(entries => { entries.forEach(({ target, isIntersecting }) => { if (isIntersecting) visibleGroups.add(target); else visibleGroups.delete(target); }); schedule(); }, { rootMargin: '100px 0px' });
    observers = [scenes, cartons, orbits];
    sections.forEach(section => scenes.observe(section));
    products.forEach(el => { el.classList.add('scroll-product'); cartons.observe(el); });
    groups.forEach(el => { el.classList.add('orbital-pack'); orbits.observe(el); });
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  preference.addEventListener('change', setup);
  document.addEventListener('shopify:section:load', setup);
  document.addEventListener('shopify:section:unload', () => { reset(); requestAnimationFrame(setup); });
  document.addEventListener('shopify:section:reorder', setup);
  setup();
})();
