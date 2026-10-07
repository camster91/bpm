# Current access update

Browser verification succeeded on 7 October 2026 UTC. See [authenticated inventory and content definitions](authenticated-audit.md). The earlier access-blocker statements below are historical; file export and complete configuration/compatibility checks remain pending.

# Theme workflow and rollback — #3

## Current evidence

Current theme `190930944372` is now confirmed in authenticated Admin, matching public metadata. Dawn `15.4.1` remains public schema evidence pending source verification. Repo branch `work/recover-original-source` preserves the recovered reference. No Shopify theme files, production export, development theme or tested rollback exists yet. Do not mark #3 complete.

## Prepared read-only export

Destination is an empty owner-only directory outside the tracked repository. Proposed command, not executed:

```sh
CI=1 SHOPIFY_CLI_FORCE_AUTO_UPGRADE=0 shopify theme pull --store qef4ye-yg.myshopify.com --theme 190930944372 --path /Users/Cameron/Documents/Codex/bpm-private-audit/theme-190930944372-20261007 --nodelete
```

This sends the store/theme identifiers and authenticated theme-file read requests to Shopify, then saves returned files locally. It does not upload, edit, publish or duplicate a remote theme. CLI authentication may be required separately from the existing browser session; stop for any unexpected access expansion. The CLI skill requires showing the command and receiving explicit confirmation in a separate turn before execution. After a successful export, record checksums and retrieval metadata without exposing private configuration; inspect app placements and content bindings before choosing an implementation base.

## Next sequence after access is restored

1. Confirm BPM store/domain, full live theme identity and source configuration read-only.
2. Export theme files to protected local storage. Record retrieval time, file count, checksums and source theme ID; scan for credentials/private configuration before committing any subset. A Git branch alone is not a production backup.
3. Inspect sections/templates/settings and app dependencies. Choose the existing theme as the implementation base only after this audit.
4. Prepare isolated local theme work. Creating/uploading a Shopify development theme needs explicit authorization under this thread goal. Record candidate ID/environment after that action, never invent one.
5. Validate local static checks and Theme Check. Preview and test affected templates/commerce in the authorized environment; confirm candidate is not the live theme.
6. Prepare release/rollback instructions referencing exact old and candidate IDs/commits. Test what can be tested without publishing. Switching the live theme requires separate explicit approval.

## Rollback evidence required

Recoverable export plus checksum verification, exact prior live theme ID, documented app/content changes (theme switching cannot reverse store-wide changes), responsible owner and post-rollback smoke checks. Until verified, call this a prepared procedure, not tested rollback.
