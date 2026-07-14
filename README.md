# TE Test Equipment Inventory

TE Test Equipment Inventory is a Windows desktop inventory application built with Tauri 2, React 19, TypeScript, Vite, Tailwind CSS v4, Bun, Rust, and FeOxDB. The current tree is a v0.1 implementation candidate; it is not a published production release and has not completed lab cutover.

Product decisions are authoritative in [docs/planning/DECISIONS.md](docs/planning/DECISIONS.md). The ME Inventory tree at `e092c73` is historical scaffold lineage, and TE Parts at `e444389` is a read-only sibling reference. Neither is this product's runtime or release identity.

## Identity and storage

| Item | Source truth |
|------|--------------|
| Display name | `TE Test Equipment Inventory` |
| Package | `te-test-equipment-inventory` version `0.1.0` |
| Tauri identifier | `com.te.test.equipment.inventory` — keep stable after installation |
| Local database | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |
| Excel export default | `TE_Test_Equipment_Inventory_Export.xlsx` |

Tauri Local AppData is the authoritative database location. If the Local target does not yet exist, startup copies a same-identifier Roaming `inventory.feox` into Local AppData and preserves the Roaming source. An existing Local database is never overwritten by that compatibility copy.

The inherited updater integration and dependencies have been removed, updater artifacts are disabled, and the app contains no inherited release endpoint, signing identity, or automatic update workflow. Releases remain a future operations task.

## Implemented v0.1 behavior

### Calibration and verification

Equipment stores current calibration state:

- `calibrationRequirement`: `required | reference_only | not_required | unknown`
- separate `outToCalibration` workflow flag
- optional `lastCalibratedAt`, explicit `calibrationDueAt`, and `calibrationIntervalMonths`
- optional `certificateRef`, calibration vendor, and calibration notes
- timestamped `verifiedAt` with optional free-text `verifiedBy`

Calibration health is derived, not stored: `missing_due | overdue | due_soon | current | not_applicable | unknown | out_to_cal`. For active entries, the implemented precedence is not-applicable requirements, unknown requirement, out-to-cal, missing due date, overdue, due soon, then current. A required item without an explicit due date is `missing_due`. Due soon means `today <= dueDate <= today + 30 days`; dates before today are overdue. An interval can suggest a due date, but it never silently overwrites an explicit due date.

V0.1 keeps current state only. A full `CalibrationEvent` history store and managed certificate/media vault are deferred.

### Inventory UI

The existing inventory shell supports active and archive views, add/edit/verify/archive/restore/delete flows, search, sorting, column visibility, and calibration-specific display and editing. It shows requirement, due date, out-to-calibration state, derived health badges, and timestamped verification. Filters cover requirement, derived health, and due windows; active counts show overdue, due soon, missing due, and out to cal.

### Importer

The desktop importer accepts `.csv`, `.xlsx`, and `.xls` paths through a native picker. A dry run accounts for every source row as `inserted`, `matched`, `conflicted`, `rejected`, or `ignored`, and reports the treatment of source columns and raw values.

Batch identity is content/sheet/mapping based and import provenance retains batch, source filename, sheet, row, and original identifiers. Matching is limited to unique normalized asset or serial identity; manufacturer plus model never auto-merges. Commit requires explicit confirmation, revalidates the source and reconciliation basis, and blocks while conflicts or rejections remain. Repeating a completed batch is idempotent; matched and intentionally ignored rows are durable no-ops.

A local, gitignored live export has been aggregate-profiled. The importer selects its `Inventory` sheet and reports `573 total / 515 inserted / 0 matched / 50 conflicted / 8 rejected / 0 ignored`, with commit blocked until the identity conflicts and invalid dates are corrected. No live row contents or identifier values are tracked; see [docs/planning/IMPORT_PROFILE.md](docs/planning/IMPORT_PROFILE.md).

### Storage, export, and sync

FeOxDB is the local authoritative store. Calibration, verification, provenance, mutation, export, sync payload, merge, conflict, and snapshot paths share the current entry contract. App UUID is stable identity; archive remains separate from lifecycle.

Excel export writes active and archive worksheets and includes calibration, derived health for the export date, verification, and provenance fields.

Shared synchronization is integrated but disabled by default in this implementation candidate. It may be exercised only with deliberate configuration:

- `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED` — truthy values enable the shared path
- `TE_TEST_EQUIPMENT_SHARED_ROOT` — optional root override
- `TE_TEST_EQUIPMENT_SYNC_HMAC_KEY` — optional shared-file authentication secret, at least 16 bytes

The fallback root remains the accepted TE Test Equipment sketch under the Engineering share. Production shared mode, final root/ACL ownership, and two-machine proof are not complete. Sync is not a backup: cutover still requires protected source exports, retention, a restore drill, and a rollback plan.

## Workspace

```text
frontend/     React UI, bridge, and frontend tests
backend/      Tauri/Rust commands, domain, FeOxDB, importer, export, and sync
docs/         Decisions, handoff, planning, and engineering references
data/import/  Gitignored live-profile inputs; never commit lab exports
scripts/      Smoke and maintenance helpers
```

Active app workspace:

```text
C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory
```

`C:\Projects\Active\TE_Lab_Equipment_Inventory` is an old planning/other-PC tree, not the application workspace. Engineering runbooks under `docs/engineering/` retain historical scaffold lineage and must be checked against current source and decisions before use.

## Development and verification

Install dependencies and run the web UI:

```powershell
bun install --frozen-lockfile
bun run dev
```

Run frontend gates:

```powershell
bun run lint
bun run test
bun run build
```

Run backend gates from the repository root:

```powershell
cargo fmt --manifest-path backend/Cargo.toml --all -- --check
cargo check --manifest-path backend/Cargo.toml --all-targets
cargo clippy --manifest-path backend/Cargo.toml --all-targets --all-features -- -D warnings
cargo test --manifest-path backend/Cargo.toml --no-fail-fast
```

Run the isolated one-machine sync smoke:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\smoke-sync-one-machine.ps1
```

Run or build the desktop application when the host toolchain permits:

```powershell
bun run desktop
bun run build:desktop
```

## Remaining release and cutover gates

- independent post-change review and Boss acceptance verification
- final frontend build and desktop/Tauri smoke on the target Windows environment
- correction of 50 identity-conflicted and eight invalid-date live rows, followed by a protected repeat dry run
- backup retention and restore drill
- final shared root, ACL/owner decisions, and real two-machine sync proof
- migration rehearsal, operator sign-off, protected cutover inputs, and Python read-only rollback window

Do not publish, install on lab PCs, enable production shared synchronization, or retire the Python workflow until those gates are explicitly authorized and completed.

## Documentation map

- [docs/SESSION_HANDOFF.md](docs/SESSION_HANDOFF.md) — current cross-session state
- [docs/SESSION_START_PROMPT.md](docs/SESSION_START_PROMPT.md) — paste block for a new session
- [docs/planning/DECISIONS.md](docs/planning/DECISIONS.md) — authoritative decisions
- [docs/planning/IMPORT_PROFILE.md](docs/planning/IMPORT_PROFILE.md) — live aggregate profile, exact mapping, and blocking dry-run boundary
- [AGENTS.md](AGENTS.md) — workspace rules
