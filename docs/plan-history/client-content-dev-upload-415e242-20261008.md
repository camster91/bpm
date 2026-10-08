# Client-content dev upload review

Candidate 415e242772c8b1d786f6a09774807384fc4d131b, theme tree 28e9497742d6d5c1c72f129d6ff05aa7a92c527e. Immutable path /tmp/bpm-sites-dev-candidate-20261008-415e242/theme. 168 files, 45,111,695 bytes. Hashes/file set verified; matches current theme tree; noindex explicitly true. Theme Check: zero errors, one Adobe RemoteAsset warning. No upload executed for this candidate.

```sh
CI=1 SHOPIFY_CLI_FORCE_AUTO_UPGRADE=0 shopify theme push --store qef4ye-yg.myshopify.com --path /tmp/bpm-sites-dev-candidate-20261008-415e242/theme --development --development-context bpm-sites-custom-qa-20261008-5daa4af --strict --json
```

Target: BPM store qef4ye-yg.myshopify.com, existing development context bpm-sites-custom-qa-20261008-5daa4af mapping to theme 194480669044. Replaces that dev context's theme files/settings with the frozen candidate. Transmits the 168 Liquid/JSON/CSS/JS/font/image assets and settings including client content, native newsletter form mode, resource/image handles and homepage Judge.me configuration. Excludes repository docs, captured reviews/inventory, audits, manifests, reference-site and Git history. May request authentication. If the CLI context mapping has expired it can recreate the development context; inspect returned ID/role before further writes. No --live, --publish or --allow-live flags.

Dev storefront shares native products, articles, apps and provider/customer backends. Native newsletter UI retains the existing live customer-form route and newsletter tag; signup can create marketing customers and trigger existing automations if a person submits it. No provider settings, sends or submissions are requested. Verify native rendering, resource resolution and editor persistence after upload; keep cart/checkout/provider submissions separately bounded. No production publication is authorized.

Shopify CLI skill requires the exact command, target, transmitted data and effects to be shown and then explicit human confirmation in a separate turn. This packet makes the new candidate reviewable; previous approvals for a17ef61 do not approve these new bytes. See client-home-content-migration-20261008.md, its scope/evidence and the two desktop review screenshots. Full release/claims/account/commerce/analytics/rollback gates remain open.
