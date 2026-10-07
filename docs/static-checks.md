# Static checks — #15

Authorized local candidate repairs now pass full Theme Check: zero errors/three explicit warnings. Fifteen rendering fixtures pass; see `theme-baseline-fixes.md` and `scripts/test-theme-baseline-fixes.mjs`. The original baseline failure report below is retained for comparison. Theme Check CI and remote preview/commerce verification remain open.

Protected exported Dawn 15.4.1 now has an actual local Theme Check baseline: exit 1, 9 errors/11 warnings, no auto-correction/source edits. See `theme-export-audit.md`. This supersedes the earlier no-source status below. Candidate remediation and GitHub Theme Check CI remain open.

`npm run check` verifies recovered-file hashes, JavaScript syntax, builds the reference Worker, tests the comment API and checks page/internal-target responses. `.github/workflows/reference-checks.yml` runs the same command on PRs and relevant branches, with read-only repository permissions and no Shopify credentials or deployment step.

Workflow is prepared locally, not pushed or run on GitHub. Local checks passed on Node 26.5.0 and the exact CI runtime, Node 22.13.1 (via the official Node npm package), including all five API tests and route checks. CI uses Node 22.13.1 with built-in SQLite support. CI execution still needs verification after authorized push.

This is reference CI only. Theme Check is not yet configured because this repo has no actual Liquid theme. After protected export and base-theme selection, add a dedicated theme path/config and non-deploying Theme Check step, document exceptions rather than suppressing failures, and run identical checks locally. CSS/Liquid/accessibility validation remains to be selected against actual implementation. #15 remains incomplete.
## GitHub integration checkpoint — 7 October 2026

PR #12 merged at `168a5f2eff7afdd5f9bfb82e5ef053c44f315137`. Both Reference checks runs for PR head `7d3e69456852332255849a973081a5bd044858c5` succeeded (runs 37696981777 and 37696981844); GitGuardian succeeded. The workflow contains only checkout, Node setup and `npm run check`, with read-only repository permissions. No deployment or Shopify operation is configured.

The post-merge `main` workflow also succeeded: [run 37697028021](https://github.com/camster91/bpm/actions/runs/37697028021), exact merge commit above, including `npm run check`.

Local recovery checks were rerun successfully before merge: 60 source hashes, 10 JavaScript syntax checks, build, five API tests, 25 routes and 40 internal targets. All 15 local Liquid rendering fixtures passed and the portable patch passed `git apply --check` against the original export. Recovered policy whitespace was retained to preserve source hashes.

This proves reference CI execution, not Shopify Theme Check CI or rendered commerce compatibility. The protected candidate's earlier Theme Check result is 0 errors and 3 documented warnings; that candidate is outside Git. #15 still requires a repository-owned theme path and equivalent non-deploying theme checks after the implementation architecture is selected. Earlier local-only/no-export notes below are historical.
