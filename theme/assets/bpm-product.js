const bindProduct = (root = document) => {
  root.querySelectorAll('[data-bpm-product]').forEach((product) => {
    if (product.dataset.bpmBound) return;
    product.dataset.bpmBound = 'true';
    const gallery = product.querySelector('[data-bpm-gallery]');
    gallery.dataset.bpmEnhanced = 'true';
    const media = [...gallery.querySelectorAll('[data-bpm-media]')];
    const thumbs = [...gallery.querySelectorAll('[data-bpm-thumb]')];
    const selectMedia = (id) => {
      if (!media.some((item) => item.id === id)) return;
      media.forEach((item) => {
        item.hidden = item.id !== id;
        if (item.hidden) item.querySelectorAll('video').forEach((video) => video.pause());
      });
      thumbs.forEach((thumb) => {
        if (thumb.hash.slice(1) === id) thumb.setAttribute('aria-current', 'true');
        else thumb.removeAttribute('aria-current');
      });
    };
    selectMedia(gallery.querySelector('[data-initial-media]')?.id || media[0]?.id);
    thumbs.forEach((thumb) => thumb.addEventListener('click', (event) => {
      event.preventDefault();
      selectMedia(thumb.hash.slice(1));
    }));
    product.querySelectorAll('[name="selling_plan"]').forEach((radio) => radio.addEventListener('change', () => {
      if (radio.checked) product.querySelector('[data-bpm-product-price]').textContent = radio.dataset.price;
    }));
    const variants = product.querySelector('[data-bpm-variant-form]');
    variants?.querySelector('select').addEventListener('change', () => variants.requestSubmit());
  });
};
bindProduct();
document.addEventListener('shopify:section:load', (event) => bindProduct(event.target));
