# Phase 0/1 handoff

Branch: `work/recover-original-source`. Recovery commit: `d1161aa`. The subsequent local commit contains acceptance/audit/CI preparation; neither has been pushed. Draft PR #12 remains open at `04f4455a259369baf94a2f39e6fcf81a539e9f71` and therefore does not include this work.

## Prepared and verified

- #28 concern mapping and approval boundaries: `design-acceptance.md`.
- #13 public catalogue/rendered purchase evidence: `storefront-audit.md`, `public-catalogue-snapshot.json`.
- #4 preliminary integration register: `app-audit.md`.
- #3 workflow and rollback evidence requirements: `theme-workflow.md`.
- #14 provisional data ownership: `content-ownership.md`.
- #15 credential-free reference workflow: `static-checks.md` and `.github/workflows/reference-checks.yml`.
- Local checks pass on Node 26.5.0 and 22.13.1: source hashes, syntax, build, five API tests, 25 pages/40 targets. GitHub CI has not run this workflow.

## Required next evidence

Cameron: complete Shopify passkey verification or reconnect the Shopify connector to BPM. Browser profile ashbi.ca has the pending BPM Admin verification tab. Then inspect the live theme and installed apps read-only, obtain a protected export, and finish #3/#4/#13/#14. Exact Agentic identity is unknown. Creation/upload of a development theme remains separately authorized.

Cameron/Corey: agree #28 design reference/version, outstanding copy/design feedback and editor expectations. Positive feedback has not been treated as final acceptance. No message sent.

No Phase 0/1 issue is represented as completed solely by these documents. No GitHub issues or canonical Notion status were edited. Notion access discovery remains unavailable in the exposed connector tools; locate the existing canonical BPM record when available. Push/PR changes, merging and production publication remain separate actions. Next internal work while access is pending: extend public URL/content coverage and record source conflicts; avoid turning incomplete public evidence into installed-app or backend claims.
