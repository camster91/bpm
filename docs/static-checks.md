# Static checks — #15

Protected exported Dawn 15.4.1 now has an actual local Theme Check baseline: exit 1, 9 errors/11 warnings, no auto-correction/source edits. See `theme-export-audit.md`. This supersedes the earlier no-source status below. Candidate remediation and GitHub Theme Check CI remain open.

`npm run check` verifies recovered-file hashes, JavaScript syntax, builds the reference Worker, tests the comment API and checks page/internal-target responses. `.github/workflows/reference-checks.yml` runs the same command on PRs and relevant branches, with read-only repository permissions and no Shopify credentials or deployment step.

Workflow is prepared locally, not pushed or run on GitHub. Local checks passed on Node 26.5.0 and the exact CI runtime, Node 22.13.1 (via the official Node npm package), including all five API tests and route checks. CI uses Node 22.13.1 with built-in SQLite support. CI execution still needs verification after authorized push.

This is reference CI only. Theme Check is not yet configured because this repo has no actual Liquid theme. After protected export and base-theme selection, add a dedicated theme path/config and non-deploying Theme Check step, document exceptions rather than suppressing failures, and run identical checks locally. CSS/Liquid/accessibility validation remains to be selected against actual implementation. #15 remains incomplete.
