# Product purchase-option price restoration

The prior enhancement changed the price only after a selling-plan radio `change` event. A checked subscription restored by browser form-state recovery could therefore coexist with the server's one-time displayed price. This is a client-side display risk; no backend price or selling plan has been changed.

`bpm-product.js` now reconciles the displayed price with the checked purchase-option radio before binding each product, on checked-option changes, and on `pageshow`. A missing checked option or price preserves existing output. The existing binding guard retains one set of interaction listeners even when restoration or editor events repeat. Native prices still originate from Liquid-rendered allocation data; no calculation, discount or plan is invented.

A focused VM test models the browser DOM/events and covers:

- checked subscription on initial binding and one-time switching;
- unchecked radio changes cannot override the current option;
- restored selection on pageshow, repeated pageshow without duplicate listeners;
- native variant GET request submission;
- gallery thumbnail selection/current state and hidden video pause;
- newly loaded editor section binding, and missing selection fallback.

The same test run against the prior committed JS fails at the first price check: actual `$24.00 CAD`, expected `$21.60 CAD`. It passes against the revised script. This proves the code regression in the isolated event model, not actual browser restoration timing or native Shopify purchase transport. Add browser back/reload restoration and one-time/subscription cart verification to development QA when available.

The test is included in `npm run check:theme`; all 319 rendering checks and existing lifecycle/resource/app checks continue to pass. Installed Theme Check reports 0 errors and 1 pre-existing Adobe RemoteAsset warning. The previous frozen upload snapshot does not include this change or the narrow-header correction; prepare a fresh snapshot before any upload. No authenticated upload, selling-plan configuration, live theme or production publication changed.
