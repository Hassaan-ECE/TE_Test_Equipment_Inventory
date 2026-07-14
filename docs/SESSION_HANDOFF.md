# Session handoff — TE Test Equipment Inventory

**Last updated:** 2026-07-14

**State:** v0.1 implementation candidate; not a published production release or completed lab cutover

## Workspace and authority

Open only:

```text
C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory
```

`C:\Projects\Active\TE_Lab_Equipment_Inventory` is an old planning/other-PC tree, not the app. Planning authority is [planning/DECISIONS.md](planning/DECISIONS.md). Read this handoff, the decision register, [../README.md](../README.md), and [../AGENTS.md](../AGENTS.md) before changing code.

The repository is initialized locally with baseline commits `7a96a9f` and `bf8baee`. It has no configured remote. Do not create or push a remote unless the owner asks.

Historical/read-only references:

| Reference | Location | Revision |
|-----------|----------|----------|
| ME Inventory scaffold lineage | `C:\Projects\Active\Inventory_Apps\ME\ME_Inventory` | `e092c73` |
| TE Parts sibling | `C:\Projects\Active\Inventory_Apps\TE\TE_Parts_Inventory` | `e444389` |

## Stable identity

| Item | Value |
|------|-------|
| Display | TE Test Equipment Inventory |
| Package | `te-test-equipment-inventory` version `0.1.0` |
| Tauri id | `com.te.test.equipment.inventory` |
| Local database | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |

Local AppData is implemented. When the Local target is absent, startup copies the same identifier's Roaming `inventory.feox` and preserves the source; an existing Local target wins. The inherited updater runtime, dependencies, permissions, endpoint/signing configuration, and update UI are removed or disabled, and updater artifacts are off.

## Implemented state

### Decisions and domain

D-017 through D-025 resolve former O-001 through O-008 for the initial implementation:

- current-state calibration fields only; `CalibrationEvent` history is deferred;
- requirement is `required | reference_only | not_required | unknown` and out-to-calibration is separate;
- explicit due date is authoritative; optional interval only suggests a date;
- derived health is `missing_due | overdue | due_soon | current | not_applicable | unknown | out_to_cal` with the inclusive 30-day due-soon window;
- `verifiedAt` replaces timeless verification, with optional free-text `verifiedBy`;
- optional certificate reference/vendor notes and existing picture path remain simple strings;
- UUID is stable identity; manufacturer plus model never auto-merges;
- archive remains separate from lifecycle.

The entry contract is wired through Rust and TypeScript models, FeOxDB serialization, legacy verification projection, mutations, merge/diff, sync schema 2 payloads, snapshots, export, and tests. Derived health is computed rather than stored.

### Importer

The desktop flow supports `.csv`, `.xlsx`, and `.xls` paths, dry-run reporting, and an explicitly confirmed commit. Every source row is classified as inserted, matched, conflicted, rejected, or ignored; columns and raw values remain accountable. Batch identity and provenance cover file, sheet, row, and original identifiers. Commit revalidates source and reconciliation state, blocks conflicts/rejections, is idempotent, and writes inserts through normal mutation/outbox paths.

A live export is present locally under the gitignored `data/import/` path and has been aggregate-profiled under D-025. The importer selects its `Inventory` sheet, accounts for the exact 22-column shape, and dry-runs against an empty temporary database as `573 total / 515 inserted / 0 matched / 50 conflicted / 8 rejected / 0 ignored`, with `blocking=true`. Supporting sheets are excluded by selection rather than counted as ignored inventory rows. The 50 identity conflicts and eight invalid-date rows must be corrected before commit. See [planning/IMPORT_PROFILE.md](planning/IMPORT_PROFILE.md).

### UI and operations

The existing inventory shell now shows and edits calibration requirement, last/due dates, interval suggestion, out-to-calibration, certificate/vendor/notes, and timestamped verification. Table badges, health/requirement/due-window filters, sorting, and active overdue/due-soon/missing-due/out-to-cal counts are implemented. The importer dialog exposes dry run, blocking state, explicit confirmation, classifications, diagnostics, and commit result.

The default export filename is `TE_Test_Equipment_Inventory_Export.xlsx`, and workbook output includes calibration, derived health, verification, and provenance fields.

Production shared synchronization is disabled by default and remains configuration-gated:

- `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED`
- `TE_TEST_EQUIPMENT_SHARED_ROOT`
- `TE_TEST_EQUIPMENT_SYNC_HMAC_KEY`

Sync is not a backup. Final root/ACL/owner decisions, restore proof, and real two-machine validation remain operations gates.

## Verification evidence recorded in this implementation session

This evidence supports the implementation candidate; it is not the independent final review or Boss acceptance gate.

Frontend, using the SHA-verified official portable Node 24.18.0 because Bun 1.3.14 crashed when invoking ESLint/Vitest on this workstation:

- explicit TypeScript build for `frontend/tsconfig.app.json`, `frontend/tsconfig.node.json`, and `frontend/tsconfig.tests.json`: exit 0;
- full Vitest run: 15 files passed, 1 skipped; 120 tests passed, 1 skipped.

The portable Node path under `C:\tmp` is a session tool, not a project dependency or required installation path. `bun install --frozen-lockfile` completed, but ordinary project commands remain the documented interface.

Backend:

- `cargo fmt --manifest-path backend/Cargo.toml --all -- --check`: exit 0;
- `cargo check --manifest-path backend/Cargo.toml --all-targets`: exit 0;
- `cargo clippy --manifest-path backend/Cargo.toml --all-targets --all-features -- -D warnings`: exit 0;
- `cargo test --manifest-path backend/Cargo.toml --test import_flow -- --nocapture`: exit 0 — 55 passed, including the aggregate-only live workbook test;
- dedicated live dry run: 1 passed and printed `573 total / 515 inserted / 0 matched / 50 conflicted / 8 rejected / 0 ignored / blocking=true`;
- `cargo test --manifest-path backend/Cargo.toml --no-fail-fast`: exit 0 — library 62, importer 55, performance 25 plus 1 ignored, shared flow 37, conflict flow 38, and sync core 51 passed.

## Remaining gates and limitations

Before claiming the initial version complete:

1. Run an independent read-only post-change review against acceptance A–G and route any fixes through a Worker.
2. Run Boss verification of frontend lint/test/build, backend gates, Tauri/desktop build or exact environment blocker, and an isolated smoke. Do not represent the evidence above as that Boss gate.
3. Correct the 50 identity-conflicted rows and eight invalid-date rows in a protected cutover source, then repeat the aggregate dry run. Never commit the workbook.
4. Rehearse protected import, backup retention, restore, and rollback. Preserve a Python read-only window; do not retire the Python app in this phase.
5. Decide the department-owned shared root, ACL writers, backup owner, and run real two-machine proof before production shared mode.
6. Obtain owner authorization before publishing, deploying, installing on lab PCs, or changing external state.

Known v0.1 boundaries:

- current calibration values overwrite prior values; there is no event/audit ledger;
- certificate and picture fields are references, not a managed cross-machine media vault;
- valid binary `.xls` parsing is routed through calamine but no valid binary `.xls` fixture has been generated;
- the import source must stay accessible and unchanged between preview and commit;
- live aggregate fit is verified, but live commit and cutover readiness remain blocked on source correction, protected rehearsal, restore proof, and authorization.

Use [SESSION_START_PROMPT.md](SESSION_START_PROMPT.md) to begin a new session without reopening settled decisions.
