# Current access update

Browser verification succeeded on 7 October 2026 UTC. See [authenticated inventory and content definitions](authenticated-audit.md). The earlier access-blocker statements below are historical; file export and complete configuration/compatibility checks remain pending.

# Current storefront audit — #13

## Scope and access

Read-only public audit expanded with authenticated browser evidence in `authenticated-audit.md` and `app-audit.md`. Exact public retrieval time and catalogue URLs are in `public-catalogue-snapshot.json`. Browser verification is cleared; Shopify connector reconnection is separate. This remains an incomplete Admin/source audit, with the protected theme export awaiting confirmation.

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

## Authenticated editor evidence

Current theme `190930944372` is confirmed in Admin. Product template selector displays Default product assigned to seven products, bergamot-lime assigned to one, and unscented assigned to one. This reconciles the nine-product catalogue; exact JSON filenames and per-product assignment records still need source/Admin verification. All three belong to #7, with bundles/subscriptions also #21. Their shared-template editing scope must be clearly explained to Corey: editing Default product can affect seven products, not just the selected preview.

The selector also exposes Home page (#16), Collections/Collections list/Search (#17), Pages/Password/404 (#18/#20), Blogs/Blog posts (#19), Cart/Gift card (#20), and Checkout and customer accounts (#20). These are editor groups, not a complete source-file inventory or proof that each custom template is assigned. Do not create metaobject templates or checkout changes from their presence alone.

Default product currently uses Star Ratings and Review Widget app blocks around Custom Product and Product Showcase, plus Testimonial Slider. App embeds/settings and current footer/header evidence are in `app-audit.md`. Existing Product Tabs help references the verified editorial fields but has a type mismatch for Ingredients. Current custom Purchase Options explains a placeholder discount; source eligibility and native selling-plan submission remain mandatory verification, not assumed compatibility.

Remaining #13 evidence: export/source inventory, remaining editor-template variants/assignments, menus, Markets/localisation, redirects, forms/providers, full app/source bindings and rendered journey checks in an approved isolated environment. No live commerce/form submission was performed.

## Additional template assignments

The editor selector displays Default collection assigned to nine collections and Default blog assigned to one blog. Its zero counts for Default blog post and Default page are contradicted by the native content records below; use the records for migration coverage. Preserve all public URLs and templates.

### Native page and public article reconciliation — 7 October 2026 UTC

All nine visible native pages were opened read-only. Each selected template was verified in the dropdown grid; no option was selected or saved.

| Page | Native record ID | Selected template |
|---|---|---|
| About Us | 705670807924 | Default page |
| Your Privacy Choices | 708561764724 | Default page |
| What Indigenous Owned Means at BPM | 715065426292 | indigenous-owned |
| wholesale | 714997039476 | wholesale |
| Polished Texture | 712836907380 | campaign-texture |
| 300+ Applications | 712832287092 | campaign-300applications |
| Privacy Policy | 706719089012 | Default page |
| Terms of Service | 706719318388 | Default page |
| Contact | 702804590964 | contact |

Four Default page records plus five custom assignments reconcile all nine public pages. About Us has an empty native content body; its visible content must be traced in theme source rather than inferred to be absent. Native Privacy Policy/Terms pages and platform `/policies/` routes are distinct surfaces; preserve both until an approved consolidation exists.

All nine visible public articles use **Default blog post**, verified through each native record's selected template grid: 1005408616820 (Fair Pricing), 1005565280628 (Metal Tube), 1005514195316 (Underarms Are Skin), 1005453869428 (Indigenous Ownership), 1005365231988 (Packaging), 1005365133684 (Sensitive Skin), 1005365100916 (Switching), 1005365297524 (Cream), and 1005365035380 (Baking Soda). The list also contains one hidden draft; it was left unopened and unchanged. Save remained disabled throughout. This resolves native assignment coverage, not article rendering, claim approval or source export.

## Native menus and redirects

Authenticated Content > Menus displays three menus: Main menu (`main-menu`, ID 313728303476), Footer menu (313728336244), Customer account main menu (313728369012). Main menu has Home, Products, Bundles, Collections, About Us, Indigenous Owned, The Breakdown, Contact Us and Policy Pages. Expanded Bundles has The Two Track/The Four Count; Collections has Shop All Tracks, Unscented, Bergamot & Lime, The Two Track, The Four Count and Sensitive Skin. Policies has all seven existing policy links. Footer includes Search, Privacy Policy, Terms of Service, Your Privacy Choices and Indian Status Tax Exemption. Customer account menu includes Orders, Profile, Manage Subscriptions, Indian Status Tax Exemption and seven policies. Preserve native ownership and required access to privacy/tax/subscription surfaces under #5/#20; exact resource destinations and candidate rendering remain to verify. No menu item was edited or saved.

URL redirects lists 15 entries with both pagination controls disabled. Exact configured pairs and public GET results are in `redirect-audit.json` (#22). Eleven reach HTTP 200; four reach HTTP 404 after one redirect:

- `/pages/baking-soda-free` → `/pages/300-applicationsa`
- `/products/bergamot-lime-copy` → `/products/bergamot-lime-2`
- `/products/unscented-copy` → `/products/unscented-2`
- `/products/bpm-natural-deodorant-bergamot-lime-4` → `/products/bergamot-lime-2`

These are existing P2 URL/SEO findings under the plan's severity definitions, not defects introduced by the candidate. Owner must confirm intended replacements before any store redirect mutation. Preserve working redirect rules and campaign UTM destinations; a theme switch alone won't repair store-wide redirects.

Top-level Markets screen reports "This feature isn't currently available for your store." This is an access/feature limitation, not evidence that only Canada is enabled. No plan, access or Markets setting was changed.

Customer accounts settings show Show sign-in links checked for the online-store header and checkout, and account URL `https://account.bpmdeodorant.com`. Preserve the native authentication destination, account menu, subscription management and tax-exemption access under #20. No customer record, login or return/cancellation transaction was tested. Self-serve return/cancellation conditions toggle is unchecked; do not change this store-wide operational setting as part of theme work.

Languages lists English as Default/Published on three domains, with French only offered as a suggestion. No additional language was added, published or inferred from that suggestion. Exact enabled Markets/currencies/domain-language mappings remain to verify through an available authenticated surface or owner evidence. The current Settings navigation does not expose a Markets link.
