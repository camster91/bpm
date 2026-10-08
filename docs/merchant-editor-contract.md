# Merchant editor contract — proposed for #14 and #28

This is a reviewable specification, not installed definitions or accepted client requirements. Existing field names/types come from the authenticated audit in `content-ownership.md`; current rendering comes from the protected source and local patch. Labels/help below are proposed wording, not a transcription of current Admin labels. #6 must choose the reusable section architecture before shared record schemas are finalised. No app is being scaffolded and no app-owned namespace is introduced for existing merchant-owned `custom.*` fields.

## Existing product fields

Edit these in the individual product's metafields. Changing a shared template must not change another product's ingredients, safety directions or scent. Existing definition constraints have not all been inspected; the rules below specify intended display validation, not verified Admin enforcement. Preserve existing types and values. Adding constraints requires checking all existing values first.

| Existing key | Proposed label and help | Display rule and missing-data behaviour |
|---|---|---|
| `custom.whats_inside_title` | **Formula explanation heading** — Optional heading for this product's formula explanation. | Plain text; escape when rendering. If the body exists and title is empty, use “What's inside, in plain language”; hide the tab if body is absent. |
| `custom.whats_inside_description` | **Formula explanation** — Explain this product's ingredients in rich text; keep the ingredient list in Ingredients. | Render supported rich text. Empty body hides only this tab; body alone must render even when all other tab bodies are absent. |
| `custom.ingredients_title` | **Ingredients heading** — Optional heading above this product's ingredient list. | Plain text; escape. With a body and no title, use “Ingredients”. A title alone does not create a tab. |
| `custom.ingredients` | **Ingredients** — Rich-text ingredient list for this product. Preserve INCI, allergens and separate component lists for mixed bundles. | Preserve rich-text structure and product-specific wording. Empty body hides the tab and flags a product-content review before release; do not copy another product's list. |
| `custom.how_to_use_title` | **Directions heading** — Optional heading above this product's directions. | Plain text; escape. With body and no title, use “How to Use”. Hide when body is absent. |
| `custom.how_to_use` | **Directions** — Multi-line directions for this product, including approved cautions, storage and warnings. | Preserve line breaks and safety language. Empty body hides the tab and requires content review before release; no generic invented directions. |
| `custom.shipping_title` | **Shipping heading** — Optional heading for the shipping information tab. | Plain text; escape. With body and no title, use “Shipping”; hide absent-body tab. |
| `custom.shipping` | **Shipping information** — Multi-line editorial shipping information. Confirm it matches current shipping policies and checkout settings. | Preserve line breaks. Empty body hides the tab; retain the store's valid policy link elsewhere. Do not infer rates, countries or delivery promises from this text. |
| `custom.scent_tagline` | **Scent description** — Short product-specific scent description; distinguish unscented and mixed packs. | Plain text; escape. Empty hides the tagline. Do not fall back to another scent or claim. |
| `custom.card_color` | **Product card palette** — Use palette token 1, 2, 3 or 4. These select the theme palette, not arbitrary CSS colours. | Supported values are exactly strings `1`–`4`; blank or other values use the theme default. Never concatenate arbitrary input into CSS classes. Existing observed values are 1/2. |

The candidate currently provides tab title defaults, supported rich-text rendering and palette allowlisting. It does not yet prove the proposed escaping for every label, translated defaults, keyboard behaviour or all missing-field cases. Treat those as implementation acceptance checks, not completed repairs.

## Section settings and editing scope

Every reusable section must show a short scope message: “Changes affect every page using this template.” Product fields say “Changes affect this product.” Shared records must identify affected consumers before editing. Site-wide header/footer settings say “Changes affect the whole store.” Template duplication is a merchant workflow to demonstrate, not an automatic new-product requirement.

| Review module | Authoritative editor/data | Labels/help and fallback contract |
|---|---|---|
| Header, footer, mobile navigation | Native menus and shared sections | **Navigation menu**, **Logo**, **Footer links**. Select resources rather than paste handles. Omit absent optional links; preserve a usable menu and native cart state. |
| Hero, texture, founder/ownership story, closing CTA | Section settings; native page body where it owns the story | **Heading**, **Body**, **Image**, **Image description**, **Button label**, **Button destination**. Hide incomplete optional CTA. Decorative images have empty alt; meaningful images need contextual descriptions. Do not expose file paths or provenance in the storefront. |
| Featured singles, duo/four-pack groups, recommendations | Product/collection resource selection | **Featured collection** or **Products**. Read native title/media/price/availability; omit unselected resources. Preserve unpublished-product boundaries. Never reproduce bundle composition, stock or selling plans in section text. |
| Product gallery and purchase controls | Native product/variant media and commerce data | Media alt/focal settings belong to the selected media. Variant selection must update price, availability, eligible plans and submitted IDs. Missing media uses an intentional placeholder; no eligible plan means one-time only. |
| Benefit strip, claims, ingredient roles, scent notes, usage steps | Product fields where product-specific; shared records only when deliberately reused | **Approved benefit**, **Ingredient explanation**, **Step heading**, **Step description**. Hide empty entries. Copy must have approved sources under #29; administrative approval evidence must not become public marketing copy. |
| Product estimates, comparisons, pricing/value story | Owner-approved editorial data; native current product price | **Comparison label**, **Source**, **Date checked**. Hide missing/unapproved estimates. Keep comparison estimates distinct from current transaction prices; no inferred profit figures or fixed cents copied into commerce UI. |
| FAQ | Reusable question/answer data or section blocks after #6 decision | **Question**, **Answer**. Require both for a displayed entry; hide empty entries and the whole section if none remain. Shared FAQ edits affect every reference; product-specific answers must not leak to other products. |
| Reviews and editorial highlights | Judge.me for actual ratings/reviews; approved attributed source for highlights | Preserve app product assignments. Missing real ratings must not produce invented stars/counts. An editorial highlight needs its attribution and does not create an aggregate rating. |
| Creator/application videos | Approved Shopify video or supported provider resource plus attribution/rights/captions | **Video**, **Poster**, **Creator**, **Original post**, **Caption/transcript**, **Disclosure**. Hide empty/unapproved entries. Require accessible playback and rights verification; no autoplay audio or placeholder creator identity. |
| Blog cards/articles | Native blog/article resources | **Blog**, **Article count**. Preserve title/body/date/image/URLs; hide absent optional image and empty lists. Never replace the original article with a preview summary. |
| Source article formatting | Prepared source HTML package | `docs/source-article-content-candidate.json` preserves source wording and destinations with hashes. Native `article.content` remains editable. Article content is shared store data; a dev-theme upload does not apply or isolate this package. Verify IDs, back up current bodies, and obtain approval before any content write. |
| Mobile purchase bar | Native product form | **Show mobile purchase bar** controls the fixed bar through 680px. It shares variant, quantity, and selling-plan inputs with the main button and respects unavailable states. Full product title remains native; long titles use two visual lines. Verify current app handlers and actual native cart behavior in the dev theme. |
| Contact and newsletter/offer | Verified existing form/provider and native operational offer | **Form heading**, **Consent wording**, **Success message**. Display success only after provider confirmation. Preserve input on error; no preview coupon, fabricated subscription or duplicate welcome send. Offer stays unavailable until actual eligibility and terms are configured and tested. |
| About, ownership and policies | Native page/policy content plus dedicated page template modules | Keep factual/legal wording under its owner. An empty legal page body must not fall back to the shared founder/story layout. Verify every page assignment after template changes. |
| Cart, accounts, search, localisation | Native Shopify/app data and supported templates | Messages describe actual results and errors. No demonstration cart, dummy account action or hard-coded currency/country inventory becomes operational state. |

## Shared-data decision and implementation sequence

Before introducing reusable records, inspect existing shared definitions and reference semantics. #6/#14 must resolve which FAQ, story, benefit, ingredient explanation and creator-video content is actually reused; the reference preview alone does not prove sharing. Record exact names, types, required fields, reference restrictions, ordering, publication/access rules and consumer scope for each selected record. Do not create duplicate competing sources or migrate category/feed records into theme editorial data.

For any authorised new definition: first define the reviewed schema and ownership, then write a fabricated isolated value, then retrieve it and render every intended consumer. Preserve a backup and migration map for any existing value conversion. This repository is a merchant theme recovery, so app-owned TOML examples are not an instruction to create an app or replace existing `custom.*` fields.

## Required merchant demonstration

In an authorised isolated theme, Cameron/Corey must be able to change a heading/image/button, add/reorder/remove a supported section and Judge.me block, edit a product field and article, and reload without AI regeneration. Verify both edited and unaffected products plus every affected shared-template surface at mobile/tablet/desktop widths. Explain which new layouts require development.

Use an isolated fabricated future product with no editorial fields, only one tab body, invalid palette, missing media and no eligible plan. Verify hidden empty modules, neutral defaults, correct price/availability and absence of copied scent/claims. Then test eligible/ineligible variant switching, bundle data and cart selling-plan transport separately. Those cases exceed the current 15 Liquid fixtures and remain unverified.

#14 completion still requires final schemas/constraints, architecture under #6 and the rendered editor demonstration. #28 requires Cameron/Corey's accepted reference and agreement with these editing limits. This specification supplies concrete review material for those decisions; it does not satisfy acceptance on their behalf.

## Original Sites carton compositions

Product track, collection presentation and homepage bundle blocks can select the original carton mix. Choose the mix matching the selected native product; new blocks default to native product media. Uploaded card images (including secondary images) or any configured bundle component image supersede original artwork. Existing defaults map all nine public products; no ingredient, price or availability data comes from artwork. Original carton pixels/crops are preserved in shared theme assets. This control requires a native editor demonstration before merchant acceptance.

## Product-card presentation heading

Product-track and catalogue mapping blocks expose **Display title override**. It changes only the visible card heading, is escaped, and falls back to the native product title when blank. Source short names are configured for existing mapped products. The product picker controls native identity, price, availability and URL; future unmatched products retain native output. Clear the override if Admin title edits should automatically appear in cards. Native editor save/reload and locale behavior remain development QA requirements.

## Value-section price narration

**Price sentence introduction** adds optional escaped words before the selected product’s current Shopify price and joins **Copy** into that paragraph. The homepage uses “BPM prices a single tube at”. Verify the introduction describes the picked product; leave blank for the native product-title presentation with separate copy. Range prices retain the native From label and suppress per-application estimates. Missing products omit the price introduction and retain body copy. This control changes theme presentation only; native editor persistence and current store prices still require dev-theme verification.

## Site-wide welcome offer

Footer-group **BPM welcome offer** exposes launcher, approved offer display, heading/copy and terms. Configure the supported provider app block, verify its native dialog behavior/consent/duplicate/double-opt-in/offer delivery, then record approval before checking **Provider and offer verified** and **Show welcome launcher**. Both default off. Native dialog support is required; the shell does not manage provider success, email lists or discounts. Known signed-in marketing subscribers are hidden; anonymous subscriber suppression belongs to the provider. No native setup or activation is proved by a local fixture.
