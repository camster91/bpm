# Source-preserving policy content package

The actual recovered inventory contains **seven policy detail pages plus one policy index**. The preceding coverage note incorrectly called these eight detail pages; the current inventory and this document correct that count.

`../source-policy-content-candidate.json` prepares the refund, shipping, privacy, terms, subscription/cancellation, legal-notice and contact-information bodies from authoritative recovered Sites HTML. It records the captured public policy route as a historical lead, source page/section/body hashes, title and body separately, and explicit unverified approval/destination/backup flags. No native IDs or current URLs are inferred from a historical capture.

`npm run check:policy-content` verifies the exact policy page set against the captured records, one source body per page, unchanged normalized words, unchanged links/images and the prepared package's exact hashes/content/status. Both the original captured section and the cleaned Sites section include the page title. The package removes only that first H1 from the body and records it as the separate title; body words and links remain intact. This avoids appending an extra native page title when reviewing the prepared body. It does not invent, revise or approve legal/operational text.

| Policy source | Captured path — current resolution unverified | Prepared status |
| --- | --- | --- |
| Refund | `/policies/refund-policy` | Local only; body still contains source H1 requiring heading review |
| Shipping | `/policies/shipping-policy` | Local only; historical processing/destinations/rates need current review |
| Privacy | `/policies/privacy-policy` | Local only; actual providers/data/consent practice need current review |
| Terms | `/policies/terms-of-service` | Local only; operational/legal acceptance pending |
| Subscription | `/policies/subscription-policy` | Local only; actual selling-plan and cancellation behavior need verification |
| Legal | `/policies/legal-notice` | Local only; entity/contact details and native destination need verification |
| Contact information | `/policies/contact-information` | Local only; current details and native destination need verification |

The refund source retains its internal `Return & Satisfaction Policy` H1 after separating the first `Refund policy` page title. The package flags `bodyContainsH1`; native policy rendering and heading hierarchy require review before applying it. No source words were removed to silence that finding.

The nondeploying theme CI now includes the policy package integrity check. The template-coverage audit requires a corresponding prepared entry for each policy detail route. CI integrity is not legal approval, current Shopify verification or proof of visual parity.

No theme bytes changed: the frozen c1655f6 candidate remains the development upload candidate. Policy packages are outside its 163 upload files. Policy data is shared store content and can affect the live storefront independently of theme publication; development-theme upload approval does not authorize applying this package. No Shopify policy write, account change, custom push/merge or publication occurred.

Next policy action: after authorized native access, resolve the actual destinations and layout, preserve a named current body backup, reconcile source/current operational and legal differences for Cameron/Corey acceptance, check source layout and heading hierarchy on representative devices, then prepare the exact separately approved bounded write if needed. Keep #29 content acceptance and #26/#27 native/release gates open.
