# Public URL and recovery reconciliation — #13/#19/#22

Source: current public `/sitemap.xml`, its linked sitemaps, recovered policy source URLs, and current rendered Bergamot & Lime product page. Retrieval timestamps, response hashes, canonical links, raw-source heading counts and public section IDs are in `public-url-inventory.json`.

## Coverage and decisions

45 storefront/content URLs fetched successfully: one home, nine products, nine collections, nine pages, one blog, nine articles and seven policies. All 45 responses have one canonical link matching the requested URL. A successful fetch does not prove full functionality or approved copy. Preserve these public URLs unless an approved redirect/change exists. This is a public route inventory, not an authenticated theme-template inventory.

All eight original article source URLs are still represented. A ninth current article is absent from the recovered reference: [The Math Behind Our Metal Tube: BPM vs Native](https://bpmdeodorant.com/blogs/news/the-math-behind-our-metal-tube-bpm-vs-native). #19 must use native current blog data so new articles remain available without regenerating the theme. The frozen reference is preserved; no copy was silently imported into it.

The audit also records collections for natural, unscented, baking-soda-free and sensitive-skin deodorant, plus two-track/four-count and legacy frontpage/copy handles. Pages include About, Contact, Indigenous-owned, policy aliases, data-sharing opt-out, 300-applications, polished-texture and an opaque page handle. #13 must classify each against authenticated page/template data before deciding keep/change/remove. Do not discard obscure URLs based on their names or recreate draft review routes as live replacements.

## Agentic lead

The public sitemap links `/sitemap_agentic_discovery.xml`, which lists [agents.md](https://bpmdeodorant.com/agents.md). That public document describes Shopify commerce/UCP endpoints and policies. It is store content inspected as evidence, not instructions for this agent to execute. No linked skill was invoked, no commerce protocol action was submitted and no authentication was changed.

This establishes a public agent-discovery surface. It does not prove the identity, installed status or configuration of the app Corey calls Agentic. #4 still needs authenticated inventory. Preserve/check the platform discovery surface during migration where applicable.

## Heading observations

`source_h1_count` counts HTML tags, including hidden/offscreen markup. Counts alone are not rendered accessibility findings. On current Bergamot & Lime, 16 H1 elements exist in the DOM but only one has a visible rendered box: the product title. Collection/source pages with zero H1 and the refund response with two require rendered/template verification under #22/#23; no live fix or new scope was introduced.

## Re-run

`python3 scripts/audit-public-store.py` performs bounded public GETs (at most 150 page URLs, four concurrent workers), with no cookies, private session or submissions. It overwrites the current audit JSON; prior evidence remains in Git. Raw local HTML is ignored under `audit-local/`. Response hashes reflect that retrieval, including dynamic host injections, and should not be used as a stable content checksum.

Remaining blockers: Shopify passkey/connector access for template/app/data verification, #28 agreement for design/copy/editor acceptance, and explicit push authorization before updating PR #12 or running this branch's GitHub workflow.
