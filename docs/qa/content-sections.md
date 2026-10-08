# Reusable content section checkpoint — 2026-10-07

This advances issues #6/#16 and prepares app-block rendering for #4; none is closed by this local checkpoint. Current Figma Home benefit panel `42:1131` and FAQ `42:1021` were re-rendered for comparison against the preserved high-fidelity context in `docs/figma-context/home-42-985.txt`.

Implemented:
- `bpm-benefits`: editable heading/rich text, up to nine approved benefit blocks, original icon selector, image overrides and independent panel/background/text colors. Blank benefits and all-blank icon rows are omitted.
- `bpm-faq`: editable complete question/answer pairs, independent initial expansion and photo visibility, photo override/description, native exclusive disclosure groups, original photograph/mask and distinct plus/close assets. Questions are escaped; approved answer rich text remains HTML. Native controls operate without custom JavaScript.
- `apps` and `bpm-app-region`: automatic top-level app wrapper and merchant-addable integration region, shared native app-block renderer, optional width/spacing and region heading. No app data is fabricated or replaced. Empty regions render nothing.
- Homepage JSON contains disabled benefit/review/FAQ regions until approved copy and app blocks are configured. Schema presets make the sections reusable on other page templates. These are authoring defaults, not a completed homepage composition.

Seven new runtime assets match downloaded Figma manifest hashes byte-for-byte. Static design slots are mapped as follows:

| Source slot | Runtime asset | Treatment |
|---|---|---|
| `42:1137`, `imgImage1` | `bpm-benefit-flask.png` | 89×96 px at desktop |
| `42:1140`, `imgImage2` | `bpm-benefit-leaf.png` | 90×96 px at desktop |
| `42:1143`, `imgImage4` | `bpm-benefit-fresh.png` | 90×96 px at desktop |
| `42:1025`, photograph layer | `bpm-faq-photo.png` | Original percentage crop |
| `42:1025`, mask layer | `bpm-faq-mask.svg` | Original rounded mask |
| `42:1039` and other closed rows | `bpm-faq-plus.svg` | Native 24×24 px |
| `42:1031`, expanded row | `bpm-faq-close.svg` | Native 24×24 px |

Browser checks used a 1455px viewport for a 1440px document content width, plus 768px and 390px viewports. Benefit section height is 817px; panel begins x27/y21 with height616; heading begins y210; icon slots begin y676 at x113/x565.5/x1018 and end y772. The panel is 1386px wide versus Figma's 1387px; this one-pixel responsive gutter difference remains in the acceptance comparison. FAQ mask/crop and icon states were visually inspected. Tablet/mobile initially overflowed because intrinsic photo width expanded the grid; explicit zero-minimum tracks/children corrected it. Final document scroll widths equal client widths (753px tablet, 375px mobile), and all visible images loaded.

Native FAQ browser evidence: clicking question two closed question one and showed only the selected draft answer; Enter collapsed the focused summary, leaving focus on it. Full local comparison screenshots are `benefits-faq-desktop-local.png` and `benefits-faq-mobile-local.png`. Their copy is isolated draft Figma/fixture material. No sample claims or question answers were added to theme defaults or Shopify data.

Validation: 20 LiquidJS render checks pass, including blank-state omission, escaping, resource overrides, first complete FAQ expansion and empty app wrappers. JavaScript syntax and Shopify CLI Theme Check pass with zero errors and the existing one RemoteAsset warning. The plugin validator was attempted and still cannot load its bundled `@shopify/theme-check-common` dependency. No managed plugin files were modified.

Limits: Shopify editor persistence and real app rendering are unverified; empty-region tests do not establish Judge.me compatibility or Figma review styling. Current exported font files do not include Helvetica Neue LT Std 63 Medium Extended; FAQ summaries request weight500, but exact face matching and font licensing need owner confirmation. A text question was raised for this. Screenshot colors still differ from Figma despite matching computed CSS colors. A neutral vision-emulation diagnostic on the temporary QA tab did not resolve that difference; no CSS compensation or browser-wide setting change was made. See the primary [CDP emulation definitions](https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/pdl/domains/Emulation.pdl) for that diagnostic command.

Remaining homepage work: claim strip, verified review presentation/app configuration, scent selector, story and approved partner logo strip. All other templates, native commerce, broad accessibility/performance/SEO/analytics and release gates remain open. No push, merge, upload, publication or store configuration mutation occurred.
