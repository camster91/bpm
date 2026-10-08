# Contact and search controls — 2026-10-08

Browser verification of the current local fabricated previews found associated labels for all contact fields. Empty required name/email/message fields were invalid, malformed email triggered `typeMismatch`, and fabricated valid name/email/message values cleared validity errors. Keyboard Tab moved name → email → topic → message. The native topic selector accepted Wholesale / partnership. Contact submit remained disabled throughout; no message or form was sent.

The searchbox had an associated label, required validation rejected an empty query, and a fabricated `citrus & lime` query was valid. Its fixture form used GET and the sort selector retained `sort_by`. Both search and filter submissions remain disabled. These observations establish input behavior only; selecting an option does not prove server sorting or result preservation.

Code review confirmed native contact form names, email error association and escaped retained values; existing Liquid checks cover native success/error markup. Actual Shopify response states, spam protection, delivery, search/filter results and focus after server responses require dev-theme verification. The local preview action `/sites-search.html` is a fixture substitution, not the native `routes.search_url`.

Raw data is in `sites-contact-search-controls-20261008.json`. No defect or theme edit was needed. Candidate bytes are unchanged from 0670942; its reviewed exact upload command remains pending user confirmation. No Shopify or GitHub mutation occurred.
