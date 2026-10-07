# Current access update

Browser verification succeeded on 7 October 2026 UTC. See [authenticated inventory and content definitions](authenticated-audit.md). The earlier access-blocker statements below are historical; file export and complete configuration/compatibility checks remain pending.

# Theme workflow and rollback — #3

## Current evidence

Public theme metadata: `190930944372`, main, Dawn `15.4.1`; authenticated confirmation pending. Repo branch `work/recover-original-source` preserves the recovered reference. No Shopify theme files, production export, development theme or tested rollback exists yet. Do not mark #3 complete.

## Next sequence after access is restored

1. Confirm BPM store/domain, full live theme identity and source configuration read-only.
2. Export theme files to protected local storage. Record retrieval time, file count, checksums and source theme ID; scan for credentials/private configuration before committing any subset. A Git branch alone is not a production backup.
3. Inspect sections/templates/settings and app dependencies. Choose the existing theme as the implementation base only after this audit.
4. Prepare isolated local theme work. Creating/uploading a Shopify development theme needs explicit authorization under this thread goal. Record candidate ID/environment after that action, never invent one.
5. Validate local static checks and Theme Check. Preview and test affected templates/commerce in the authorized environment; confirm candidate is not the live theme.
6. Prepare release/rollback instructions referencing exact old and candidate IDs/commits. Test what can be tested without publishing. Switching the live theme requires separate explicit approval.

## Rollback evidence required

Recoverable export plus checksum verification, exact prior live theme ID, documented app/content changes (theme switching cannot reverse store-wide changes), responsible owner and post-rollback smoke checks. Until verified, call this a prepared procedure, not tested rollback.
