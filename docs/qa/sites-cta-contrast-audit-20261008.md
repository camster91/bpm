# Default CTA text contrast audit — 2026-10-08

Following the closing/formula repairs in `be89949`, the local browser measured 44 rendered `.button` elements across fifteen representative templates at 375px: Home, About, Indigenous-owned, Contact, bound collection, search, both single-product PDPs, populated/empty/bundle-error carts, article, texture campaign, newsletter and native policy-body fixture.

For each CTA, the audit read computed foreground and the first opaque background on the element/ancestor chain, rejecting image-background cases rather than guessing their color. All 44 yielded measurable solid-color pairs and met the 4.5:1 text contrast threshold. Disabled preview controls were included for presentation coverage. No theme edit was necessary.

This is default-state solid-color CTA evidence, not full WCAG verification. It excludes motion opacity, hover/focus states, zoom, device/browser variants, screen readers, non-CTA text, third-party apps and native Shopify output. Existing three-width repairs prove the closing/formula pairs separately. Raw colors/ratios and scope are recorded in `sites-cta-contrast-audit-20261008.json`.

No forms were submitted, links purchased, or remote settings changed. The reviewed development upload remains unexecuted; prior frozen candidate omits latest ownership/contrast changes and must be refreshed before current-code upload.
