# Custom Sites theme — development upload review

This review supersedes the repaired-Dawn upload command. Its prior text is preserved in `plan-history/2026-10-07-before-custom-dev-candidate/dev-upload-readiness.md`. The full Phase 0–5 plan remains in `shopify-redesign-plan.md`.

## Current snapshot revision — 8 October 2026

The October 7 snapshot is preserved and superseded for the current upload review. The new snapshot includes the narrow-phone header and purchase-option restoration fixes. The prior manifest is retained as `qa/dev-candidate-manifest-20261007.json`; the updated manifest is `qa/dev-candidate-manifest-20261008.json`. No previous exact command has been executed or newly approved. Use the revised command below only after separate confirmation.

## Local candidate and freeze

The candidate is committed `theme/`, built against Sites and recovered source. Fresh checks pass: 319 Liquid rendering checks, motion/gift-card checks, 96 captured resource bindings and 9 Judge.me configuration bindings; installed Theme Check has 0 errors and 1 existing Adobe Typekit RemoteAsset warning. Current native data, editor and app runtime are not proved by these tests.

Prepare the frozen candidate locally:

```sh
node scripts/prepare-dev-theme.mjs /tmp/bpm-sites-dev-candidate-20261008
```

The script refuses an existing destination or dirty theme, exports committed Shopify directories only, preserves explicit development noindex, rejects non-regular files, makes snapshot files read-only, and writes `manifest.json` outside the upload directory. The manifest records source commit/tree and every transmitted file's SHA-256 and size. README, repository documents, source reference, tests, protected audits and Git history are excluded. Verify it before upload:

```sh
node scripts/verify-dev-theme.mjs /tmp/bpm-sites-dev-candidate-20261008
```

The verifier checks the exact file set, sizes, hashes, bytes against the source commit, explicit noindex and current theme-tree identity. A valid historical snapshot can still report `matchesCurrentTheme: false`; do not substitute it for the reviewed current candidate. Preparation and verification are local only.

## Prepared exact upload command — not executed

```sh
CI=1 SHOPIFY_CLI_FORCE_AUTO_UPGRADE=0 shopify theme push --store qef4ye-yg.myshopify.com --path /tmp/bpm-sites-dev-candidate-20261008/theme --development --development-context bpm-sites-custom-qa-20261008 --strict --json
```

Target must be confirmed as BPM's `qef4ye-yg.myshopify.com` before execution. Transmits that store identifier, authenticated theme requests, and every file in the manifest: Liquid, JSON templates/sections, CSS/JavaScript, images/fonts, locales and theme settings including resource handles and app extension references. It creates a development theme for this context or replaces that context's existing development theme. No live/publish/theme-ID flags are supplied. Development previews share the store's products, apps and store-wide settings; they are not an isolated commerce backend.

Installed CLI help confirms development-context behavior and strict error checking. [Shopify CLI theme push documentation](https://shopify.dev/docs/api/shopify-cli/theme/theme-push) describes the upload operation. The [Shopify CLI skill](/Users/Cameron/.codex/plugins/cache/openai-curated-remote/shopify/4.1.1/skills/shopify-use-shopify-cli/SKILL.md) requires: “Before executing a Shopify CLI command that authenticates … show the exact command, target, transmitted data, and side effects, then obtain the user's explicit confirmation in a separate turn.” General dev-theme authorization is already given; exact-command confirmation remains required. Do not reuse historical codes or transmit credentials in arguments or logs.

## Native QA and stop conditions

1. Record returned store, theme ID, role, editor and preview URLs. Confirm BPM, development role and ID different from captured production `190930944372`. That production ID is historical, not current proof. Stop on wrong store, live target or unexpected authentication/scopes. Do not publish.
2. Check resource handles, all nine products, native Files crop identity, template assignments and original/fallback media; capture real screenshots at plan widths. Compare source framing/layout/motion, not only absence of overflow.
3. Verify editor edits persist, section add/reorder/remove works, app blocks remain configurable, and editor reload does not duplicate handlers. Undo bounded dev-theme test edits and retain candidate identity.
4. Check Judge.me product attribution/rating/listing, app embeds, combined structured data, subscription availability/cadence labels, bundle pricing/stock, account model and market links. Do not alter store-wide subscriptions or apps to make fixtures appear correct.
5. Exercise native one-time/subscription/bundle cart states and checkout handoff only within an explicitly agreed isolated test boundary. Contact, newsletter, review submission, real purchase and email activation can trigger live effects and remain gated.
6. Record accessibility/device defects, actual loading/performance, consent/event paths, approved claims/policy/offer decisions and P0–P3 findings. No local fixture or mock establishes native correctness.

## Remaining acceptance gates

| Gate | Current evidence | Still required |
|---|---|---|
| Source recovery/acceptance | Recovered source and preserved provenance | Current hosted-source reconciliation; complete comparisons; final client acceptance |
| Theme coverage/editability | Templates, section schemas and local bindings | Native assignments/resources, editor persistence and full source/state matrix |
| Commerce/apps | Native forms and captured app payloads | Current app behavior, subscription decision, bundle/cart/error/checkout journeys |
| Content/provider decisions | Existing source/native fields; hidden optional slots | Approved claims/legal, newsletter/provider/offer and creator permissions |
| Hardening | Local focus/motion/metadata/schema/image checks | Native combined schema, accessibility, measured performance, analytics/consent |
| Release/rollback | Protected historical export; committed candidate snapshot | Current production identity/backup verification, bounded rollback rehearsal, frozen dev ID and acceptance packet |

## Rollback boundary

For local recovery, retain the frozen snapshot and manifest; verify hashes before reuse. A failed dev upload never authorizes replacing production. Stop, record the returned theme/context state and any partial upload, and resume only against the confirmed development target. Re-uploading a frozen snapshot, deleting a dev theme, or authenticated remote backup work requires its exact bounded command authorization. Never execute the obsolete repaired-Dawn command as a custom-theme rollback.

Before an eventual production release, independently confirm current live theme and preserve a fresh named backup, validate the approved candidate and exact publication/rollback commands, record approvals, and rehearse the bounded recovery procedure. The captured October export alone is not a current release backup. No production release or completed rollback rehearsal is claimed here.
