# BPM Custom theme — foundation in development

This is the new repository-owned custom Shopify implementation path. It is not the recovered HTML reference or the protected repaired-Dawn candidate. Layout, global tokens and editable announcement/header/footer are implemented; page templates and commerce modules are still pending. Do not publish this incomplete foundation.

Source reference: `docs/figma-context/` and `design-assets/figma/manifest.json`. Header/footer logos, account/cart/social icons and CTA product imagery are exact downloaded Figma assets; source SVG files remain unmodified. Existing Helvetica Extended fonts and Adobe Roc Grotesk kit are retained from the audited theme. Exact font weights/licensing and image-delivery optimisation remain review items. Responsive layouts are proposed adaptations because the current Figma file contains only desktop frames.

Merchant control: global colors/content width/corner radius; announcement text/link/colors/height; native main/footer/policy menus; logo override; account visibility; homepage overlay; CTA text/collection; optional social destinations. Empty announcements and social links stay hidden. Native account/cart URLs and actual cart count replace prototype actions. Blank `settings_data.json` contains no production configuration. Existing merchant app-embed/block configuration is not migrated yet; app compatibility is not proved by this layout.

Local validation:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run check:theme
CI=1 SHOPIFY_CLI_FORCE_AUTO_UPGRADE=0 shopify theme check --path theme --output json
```

Foundation checkpoint: 0 Theme Check errors, 1 RemoteAsset warning for the existing Adobe kit; 7 fabricated Liquid rendering checks pass. These check menu nesting/escaping, native links/counts and blank-data fallbacks. Browser smoke checks at 1440px and 390px loaded every chrome image without horizontal overflow; the mobile menu opened and Escape closed it with focus returned to its summary. This is a local LiquidJS preview with fabricated store data, not Shopify runtime. Exact Figma geometry, section-editor persistence, checkout and app integrations remain unverified. CI is prepared locally and has not run on GitHub for this branch.

The Shopify Liquid helper validation was attempted and remains unavailable because its bundled `@shopify/theme-check-common` dependency is missing. The installed Shopify CLI performed full local Theme Check; managed plugin files were not modified and no checks disabled.

No theme upload or production settings change has occurred. The older prepared dev-upload command targets repaired Dawn, not this custom theme. A new exact command must be prepared and confirmed when this candidate is ready for remote review. Native forms/products and all storefront templates, accessibility, SEO, performance, analytics, cross-device/purchase QA and rollback work remain in the master tracker.
