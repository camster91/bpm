(() => {
  const code = document.getElementById('GiftCardCode');
  const copy = document.querySelector('[data-bpm-copy-code]');
  const status = document.querySelector('[data-bpm-copy-status]');
  if (code && copy && status && navigator.clipboard?.writeText) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent.replace(/\s/g, ''));
        status.textContent = status.dataset.success;
      } catch {
        status.textContent = status.dataset.failure;
      }
    });
  }
  const print = document.querySelector('[data-bpm-print]');
  if (print) {
    print.hidden = false;
    print.addEventListener('click', () => window.print());
  }
  const qr = document.querySelector('[data-bpm-gift-qr]');
  if (qr && typeof window.QRCode === 'function') {
    try {
      new window.QRCode(qr, { text: qr.dataset.bpmGiftQr, width: 160, height: 160 });
      qr.hidden = false;
    } catch {
      // The visible redemption code remains available if QR generation fails.
    }
  }
})();
