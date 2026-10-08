# Native header at 320px

The committed-resource homepage fixture revealed a real narrow-screen defect: at 320×740, Menu and Account broke into two lines although page scroll width remained 320px. Account is a native Shopify addition to the Sites actions and must remain accessible.

A CSS override limited to widths ≤360px reduces header/action gaps and action text size, keeps action labels unbroken, and retains minimum 44px control dimensions. Navigation items inside the expanded menu retain their existing wrapping. No action is removed and native links/account visibility conditions remain intact. Reference code/assets are unchanged.

Observed after regenerating the local preview and reloading Chrome:

- viewport and document scroll width: 320px;
- Menu: 57.91×44.30px, Account: 56.98×44px, Bag: 66.83×44px; each action uses nowrap;
- Enter on Menu opened all five navigation links; the saved screenshot after Escape shows the collapsed menu with keyboard focus visibly on Menu;
- screenshot `sites-header-320.png` visually confirms intact labels and the unchanged hero below.

This is fabricated-data LiquidJS browser evidence, not Shopify runtime. The subsequent batch of wider viewport checks timed out and the Chrome browser connection became unavailable. Its partial results and viewport reset were not returned and are not claimed. Reconnect browser and reset the temporary viewport before resuming; repeat 360/375 and wider regression checks. The new rules are scoped to ≤360px, but that scope is not a substitute for rendered regression evidence.

Fresh `npm run check:theme` passes 319 rendering checks and motion/gift-card/resource/app configuration checks. No tests were added that merely repeat CSS declarations. Installed Theme Check reports 0 errors and 1 existing Adobe RemoteAsset warning.

The prior frozen dev snapshot remains unchanged and does not contain this correction. Re-freeze current theme and present the updated exact command before any authenticated upload. No upload or production change occurred.
