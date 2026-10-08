# Dark-section CTA contrast repair — 2026-10-08

Investigation of a blank closing CTA screenshot disproved the initial motion hypothesis. With motion paused, the anchor retained its label, opacity 1 and no animation, but foreground and background were both cream `rgb(255,253,233)`. This was an inherited-color defect, not a transient screenshot state.

Live source computed colors show closing CTA ink text on cream; the theme now explicitly restores ink text. Hover uses cream text with a cream border on the ink fill. The source formula CTA itself has cream foreground/fill, so copying it exactly would retain an unreadable action. The theme intentionally uses a transparent fill on the dark ink band, preserving the existing cream text and outline. This is an accessibility correction to source presentation and must be included in client review.

Browser observations at 375/820/1440px verify the repaired computed colors and opacity. Cream/ink pair contrast is approximately 16:1; the transparent formula fill resolves over the ink section background. This scoped observation does not establish whole-theme accessibility or hover/touch/screen-reader/device acceptance. Raw evidence: `sites-dark-button-contrast-20261008.json`; closing screenshot: `sites-closing-readable-20261008.png`.

All 332 Liquid rendering checks and existing lifecycle/resource/app checks passed; Theme Check has zero errors and one existing Adobe Typekit RemoteAsset warning. Motion logic was unchanged. No native action, upload or GitHub mutation occurred. The previous frozen candidate omits this repair and the ownership-page correction, so current upload preparation must be refreshed.
