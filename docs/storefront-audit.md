# Current storefront audit — #13

## Scope and access

Read-only public audit, captured during this goal continuation. Exact retrieval time and catalogue URLs are in `public-catalogue-snapshot.json`. This is not a complete Admin audit. Shopify connector returned reauthentication required; the browser reached a passkey verification checkpoint. Owner: Cameron. Resume: complete verification or reconnect the connector to BPM, then verify the selected store before any authenticated inspection.

Homepage JavaScript identifies `qef4ye-yg.myshopify.com`, live theme `190930944372`, role `main`, schema Dawn `15.4.1`, and a truncated theme name beginning `Final 2026 Site - description-above-buybox`. These are publicly emitted metadata; verify exact name, files, version and configuration in Admin. No backup exists in this checkout yet.

## Feature inventory

| Feature | Observed source | Data dependency / decision | Issue | QA case |
|---|---|---|---|---|
| Nine catalogue products | `/products.json?limit=250` | Native product/variant data; preserve handles and current catalogue | #7/#17/#21 | Every product maps to correct variant/media/price |
| Singles, duos, four-packs | Public catalogue | Prices $23.99/$39.99/$74.98 in snapshot; never bake these into theme truth | #21/#29 | Current price and correct components at cart/checkout |
| Product options | Catalogue snapshot | One variant per observed product; options retained in JSON | #7 | Product/variant selection and availability states |
| Product gallery/video | Rendered Bergamot & Lime PDP | Eight media controls visible; preserve original media and usable controls | #7/#2 | Keyboard/touch gallery and video/captions |
| One-time/subscription | Rendered Bergamot & Lime PDP | $23.99 one-time and $21.60 subscription with 10% message; exact provider/plans unknown | #4/#7/#21 | Selling-plan cadence, eligibility, price and cart representation |
| Reviews | PDP shows 15 reviews and review button; Judge.me markers in HTML | App-owned history/count/assignments; preserve, verify Admin | #4/#7 | Product badge/list and isolated submission flow |
| Related pack offers | PDP links to six other products | Current product links; identify section/data implementation after export | #7/#21 | Correct product destination/media and no stale hardcoded offer |
| Country/currency | PDP Canada / CAD selector | Current Markets configuration unknown; preserve enabled controls | #20 | Supported market/currency switch without wrong prices |
| Account entry | PDP login link | Customer-authentication redirect; account settings unknown | #20 | Correct account destination; no fabricated login |
| Cart | PDP quantity/Add to cart; cart-drawer markup | Shopify cart; backend purchase flow untested | #20 | Add/update/remove + subscription/bundle lines in approved environment |
| Search | Predictive-search markup | Theme search implementation/config unknown | #17/#20 | Query, results, keyboard selection and empty states |
| Navigation | Rendered header/footer | Native menus; exact Admin ownership unknown | #5/#13 | Mobile/desktop menu links and focus |
| Supporting content | `/pages/contact`, `/blogs/news` respond with canonical URLs | Native pages/blog; template inventory needs theme files | #18/#19 | Forms, article pages, long content and error states |
| Canonicals | Home, PDP, collection, Contact, blog | Current canonical destinations observed; retain important URLs | #22 | Candidate canonical/redirect checks |

No public `available` value is treated as stock-on-hand. No add-to-cart, order, newsletter, contact or review submission was performed on the live store.

## Still required for #13 completion

Authenticated template/file inventory, menus, metafields/metaobjects, selling plans, Markets, app embeds/blocks, redirects, forms/providers and policy configuration. Public page coverage is preliminary; every live template must be classified after theme export. Keep/change/remove decisions remain preserve-by-default until approved changes exist. Current HTML and speculative script matches do not prove feature functionality.

## Expanded public URL inventory

45 public routes now recorded with owner issues and preserve-by-default decisions. Nine current articles include one absent from the frozen reference. See [public reconciliation findings](public-audit-findings.md) and `public-url-inventory.json`; authenticated template coverage remains unverified.
