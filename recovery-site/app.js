(() => {
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const $ = (selector, root = document) => root.querySelector(selector);

  // Product gallery
  const galleryImage = $("#gallery-image");
  const galleryCount = $("#gallery-count");
  const thumbs = $$(".thumb");
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
      galleryImage.style.opacity = "0";
      window.setTimeout(() => {
        galleryImage.src = thumb.dataset.image;
        galleryImage.alt = thumb.dataset.alt || "";
        galleryImage.style.opacity = "1";
      }, 100);
      galleryCount.textContent = `${index + 1} / ${thumbs.length}`;
    });
  });

  // Rotation selector is visual-only in the recovered prototype.
  $$(".segmented button").forEach(button => {
    button.addEventListener("click", () => {
      $$(".segmented button").forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");
    });
  });

  // Purchase option + quantity
  const price = { unit: 23.99, sub: 21.60 };
  let quantity = 1;
  let unitPrice = price.unit;
  const qtyOut = $("#quantity");
  const addButton = $("#add-to-bag");

  function updateCartLabel() {
    qtyOut.textContent = String(quantity);
    addButton.textContent = `Add to bag · $${(unitPrice * quantity).toFixed(2)}`;
  }

  $("[data-qty-minus]").addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    updateCartLabel();
  });
  $("[data-qty-plus]").addEventListener("click", () => {
    quantity = Math.min(12, quantity + 1);
    updateCartLabel();
  });

  $$('input[name="purchase"]').forEach(input => {
    input.addEventListener("change", () => {
      unitPrice = Number(input.value);
      $$(".purchase-card").forEach(card => card.classList.toggle("is-selected", card.contains(input)));
      updateCartLabel();
    });
  });

  // Local review drawer — intentionally no network/backend.
  const drawer = $("#review-drawer");
  const scrim = $(".drawer-scrim");
  const sectionSelect = $("#review-section");
  const commentField = $("#review-comment");
  const form = $("#review-form");
  const saved = $("#saved-comments");
  const storageKey = "bpm-recovery-review-comments";

  function loadComments() {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
    catch { return []; }
  }
  function renderComments() {
    const comments = loadComments();
    saved.innerHTML = comments.length ? "<h3>Saved in this browser</h3>" : "";
    comments.slice().reverse().forEach(item => {
      const node = document.createElement("article");
      node.className = "saved-comment";
      const strong = document.createElement("strong");
      strong.textContent = item.section;
      const time = document.createElement("time");
      time.dateTime = item.createdAt;
      time.textContent = new Date(item.createdAt).toLocaleString("en-CA");
      const p = document.createElement("p");
      p.textContent = item.comment;
      node.append(strong, time, p);
      saved.append(node);
    });
  }
  function openDrawer(section = "General") {
    sectionSelect.value = [...sectionSelect.options].some(o => o.value === section) ? section : "General";
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    scrim.hidden = false;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => commentField.focus(), 20);
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    scrim.hidden = true;
    document.body.style.overflow = "";
  }

  $$("[data-review-open]").forEach(button => button.addEventListener("click", () => openDrawer(button.dataset.reviewSection)));
  $$("[data-review-close]").forEach(button => button.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer(); });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const comment = commentField.value.trim();
    if (!comment) return;
    const comments = loadComments();
    comments.push({ section: sectionSelect.value, comment, createdAt: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(comments));
    commentField.value = "";
    renderComments();
  });

  renderComments();
})();