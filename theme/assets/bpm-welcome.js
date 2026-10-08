(() => {
  const bind = (root = document) => root.querySelectorAll('[data-bpm-welcome]').forEach(wrapper => {
    if (wrapper.dataset.bpmWelcomeBound) return;
    const launch = wrapper.querySelector('.bpm-welcome-launch');
    const panel = wrapper.querySelector('dialog');
    if (!launch || typeof panel?.showModal !== 'function') return;
    wrapper.dataset.bpmWelcomeBound = 'true';
    launch.hidden = false;
    launch.addEventListener('click', () => { if (!panel.open) panel.showModal(); });
    wrapper.querySelector('.bpm-welcome-close').addEventListener('click', () => panel.close());
    panel.addEventListener('close', () => { if (launch.isConnected) launch.focus(); });
    panel.addEventListener('click', event => {
      if (event.target !== panel) return;
      const rect = panel.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) panel.close();
    });
  });
  bind();
  document.addEventListener('shopify:section:load', event => bind(event.target));
  document.addEventListener('shopify:section:unload', event => event.target.querySelectorAll('[data-bpm-welcome] dialog[open]').forEach(panel => panel.close()));
})();
