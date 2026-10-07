# Recovered design-review site

This folder is the first repo-owned reconstruction of the published BPM ChatGPT Site.

## Run

No build step is required.

Serve this directory with any static web server, for example:

```bash
python -m http.server 8080 -d recovery-site
```

Then open `http://localhost:8080`.

## Purpose

This is **not yet the Shopify theme**. It is a recovery/reference implementation used to:

- preserve the September 30 design-review structure and copy;
- keep the current public ChatGPT Site unchanged as evidence;
- map the review direction into version-controlled HTML/CSS/JS;
- provide a baseline for later Shopify section/theme work.

## Asset strategy

The original ChatGPT Site source bundle is not available through the current Site/Library interfaces. This recovery therefore references verified public BPM product media from `bpmdeodorant.com` while the original Figma assets are inventoried under issue #2.

Before this baseline is considered fully portable, production assets should be copied into the repo (where licensing/client ownership allows) rather than depending on live Shopify CDN URLs.

## Known gaps

See `../docs/recovery-gaps.md`.
