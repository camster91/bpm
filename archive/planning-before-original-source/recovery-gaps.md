# Recovery gaps — issue #1

## Confirmed recovered

- Complete rendered text projection from the published ChatGPT Site.
- ChatGPT Site project metadata and source-version metadata.
- Original BPM Figma file and verified top-level frame IDs.
- Public product media URLs used by the current Shopify product page.
- Core interactive intent: product gallery, rotation choice, purchase option, quantity, accordions, review/comment affordance.

## Not yet recoverable byte-for-byte

1. **Original ChatGPT Site HTML/CSS/JS bundle**
   - The active Site record is available, but the editable/private generated bundle is not exposed by the available Site/Library interfaces.

2. **Exact ChatGPT Site style tokens**
   - The current implementation is a code-based reconstruction guided by the preserved content, Figma design and live BPM media.

3. **Original application-video source URL**
   - The live Shopify page exposes the video poster/thumbnail through the available web surface, but not the source MP4 through the current retrieval path.
   - The recovery baseline links the video card to the live product page rather than inventing a video source.

4. **Server-side review/comment backend**
   - The published prototype includes a review/comment affordance.
   - The recovery baseline implements browser-local comments only. It does not send or publish feedback.

## Validation required

- Compare the repo recovery against the still-live ChatGPT Site at representative desktop, tablet and mobile widths.
- Replace remote Shopify CDN references with repo-owned/exported Figma assets where appropriate.
- Document any remaining visual differences before closing issue #1.
