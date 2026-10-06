# BPM

BPM Shopify redesign and recovery repository.

## Current source of truth

This repository is being used to preserve and rebuild the BPM product-design review that was published as a ChatGPT Site on 30 September 2026.

- Published review: https://bpm-product-design-review.cameron91.chatgpt.site/index.html
- ChatGPT Site project ID: `appgprj_6abd1b4cc7fc81918f01d4a2e99698b3`
- ChatGPT Site source version: `1`
- ChatGPT Site projection revision: `2`
- Figma source: `BPM - Updates` — file key `REGkhZvykpOP4XmN7EKSnh`
- Live Shopify store: https://bpmdeodorant.com/

## Recovery status

The published Site artifact and its rendered content are preserved in `archive/`.

The private editable HTML/CSS/JS bundle used internally by ChatGPT Sites has not been exposed through the available Site/Library interfaces, so the repository does **not** claim to contain the original byte-for-byte source yet.

The rebuild standard is:

1. Preserve the published review visually and editorially.
2. Preserve BPM product imagery and design decisions from Figma.
3. Preserve Shopify commerce behaviour and app integrations from the live store.
4. Convert the concept into reusable, merchant-editable Shopify sections and blocks.
5. Keep the published review unchanged as a comparison baseline until implementation QA passes.

See `docs/recovery-manifest.md` for provenance and `archive/chatgpt-site-content.txt` for the recovered rendered content snapshot.
