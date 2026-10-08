# Published Sites source reconciliation — 8 October 2026

A fresh public GET audit compared 30 resources against the preserved recovery manifest: all 25 page HTML files, two shared HTML fragments, `site.css`, `site.js` and `catalogue.json`. Every local SHA-256 matches the original manifest. The audit uses source-listed paths, performs no authentication or mutation, does not execute remote code and does not follow redirects.

Result: **30 source-byte matches, 0 unexplained differences, 0 retrieval failures**. 5 responses match directly. 25 responses contain one injected Cloudflare footer script; removing only that identified script immediately before `</body>` produces the exact recovered bytes. Both raw and normalized hashes, response status/type and removed-wrapper count are retained in `hosted-source-byte-audit-20261008.json`. The comparison never discards application scripts, markup or styles to make mismatches pass.

This resolves the previously unexplained homepage byte difference and verifies the inspected published source surfaces against recovery commit `2f95c940c42b1bc4152790a83f0f455f66ceaaa4`. It does not prove full hosted runtime/visual behavior, externally hosted media identity, client content/design acceptance, or Shopify source fidelity. CSS/JS/font/image rendering and all native states still require browser/dev QA. Internal comments tools remain source-only.

Fresh `npm run check` also passes: 60 manifest files verified, 10 scripts parsed, source build succeeds, 5 comments API tests pass, and all 25 local routes/40 internal targets resolve without broken targets. These are recovered-runtime checks, not Shopify commerce checks. No recovery files were modified.

Repeat the bounded public audit when the design authority changes:

```sh
node scripts/audit-hosted-reference.mjs /absolute/new/evidence-file.json
```

The separate browser connection remains unavailable from the prior turn. This source audit is not a workaround for browser visual verification or a claim that wider device checks passed. Upload confirmation and production publication remain separate gates.
