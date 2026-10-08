# Section typography reflow verification — 2026-10-08

After commit `460c338` restored the source section lead sizes (20px through 1000px, 21px through 680px), the local browser checked ten representative templates at six widths: 320, 375, 680, 820, 1000 and 1440px. Exact breakpoint widths are included because rule precedence changes there.

Templates: homepage with bound fixtures, About, article, empty/populated cart, collection with bindings, Contact, policies, Bergamot PDP and search. All 60 observations used explicitly verified viewport widths. No horizontal document overflow, no visible input/select/textarea outside viewport bounds, and exactly one main H1 per observation. Raw data includes computed lead font sizes and widths in `sites-typography-reflow-20261008.json`.

This establishes local reflow following the CSS change. It does not establish exact source fidelity for every section/template, real Shopify resource or app behavior, device rendering, text zoom, checkout, client acceptance or release readiness. Home price and FAQ source geometry have separate measured evidence. Native purchase journeys and editor persistence still require the development upload and bounded native QA.

The frozen candidate `/tmp/bpm-sites-dev-candidate-20261008-460c338` still represents this tested code; no theme code changed in this verification pass. Upload command approval remains pending. No Shopify or GitHub mutation occurred.
