# TE Test Equipment Inventory

Windows desktop inventory app (Tauri 2, React 19, TypeScript, Vite, Tailwind v4, Bun, Rust, FeOxDB).

**Current package version: `0.1.5`** (verify in `package.json` / `backend/Cargo.toml` / `backend/tauri.conf.json` before treating this line as truth).

Product policy: [docs/planning/DECISIONS.md](docs/planning/DECISIONS.md). Session state: [docs/SESSION_HANDOFF.md](docs/SESSION_HANDOFF.md). Docs map and trust rules: [docs/README.md](docs/README.md).

Scaffold lineage (not runtime identity): ME Inventory `e092c73`; TE Parts `e444389` is a sibling reference.

## Team install (shared mode)

| Item | Location |
|------|----------|
| Installer | `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory\TE Test Equipment Inventory_0.1.5_x64-setup.exe` |
| Shared data root (default) | same folder (`shared\inventory\` under it) |
| GitHub Latest | [v0.1.5](https://github.com/Hassaan-ECE/TE_Test_Equipment_Inventory/releases/latest) |

1. Ensure the Engineering **S:** share is available.
2. Run the **0.1.5** setup (current-user NSIS).
3. Open the app — it should sync from the product share and show the shared inventory (seed machine was verified at **543** entries on 2026-07-15).
4. Do **not** install removed builds **0.1.3 and below**.

Upgrades keep Local AppData when the Tauri id stays `com.te.test.equipment.inventory`. In-app **Update** appears when GitHub `latest.json` reports a newer signed release (D-028).

## Identity and storage

| Item | Source truth |
|------|--------------|
| Display name | `TE Test Equipment Inventory` |
| Package | `te-test-equipment-inventory` version `0.1.5` |
| Tauri identifier | `com.te.test.equipment.inventory` — keep stable after installation |
| Local database | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |
| Excel export default | `TE_Test_Equipment_Inventory_Export.xlsx` |

Local AppData is the machine-local store. If Local is missing and a same-id Roaming `inventory.feox` exists, startup copies Roaming → Local once and leaves the source in place.

## Behavior summary

### Calibration

Current-state fields on each entry; **derived** health (`missing_due | overdue | due_soon | current | not_applicable | unknown | out_to_cal`). No `CalibrationEvent` history ledger (D-017). Explicit due date is authoritative; interval only suggests (D-022).

### UI

Active/archive views, add/edit/verify/archive/restore/delete, search, filters, calibration badges/counts. **No Import button** in the shell (D-026). Header shows **Shared** / **Local** mode; idle “Shared operation sync ready.” footer text is suppressed.

### Importer (offline cutover)

Still available as backend/offline tooling only: dry-run, full-batch commit, no partial desktop commits. Historical live Excel aggregate profile (empty-DB dry-run): `573 / 515 / 0 / 50 / 8 / 0` blocking — see [docs/planning/IMPORT_PROFILE.md](docs/planning/IMPORT_PROFILE.md). The **deployed shared inventory** is the repaired **543**-entry set (ops on the product share), not that unfinished full-workbook cutover.

### Shared sync (D-027)

**On by default.** Default root:

`S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory`

Layout: `shared\inventory\{ops,snapshots,locks,backups,manifest.json}` (ME/TE family pattern).

| Env | Purpose |
|-----|---------|
| `TE_TEST_EQUIPMENT_SHARED_ROOT` | Override root |
| `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED` | `0` / `false` / `no` / `off` to disable |
| `TE_TEST_EQUIPMENT_SYNC_HMAC_KEY` | Optional shared-file HMAC (≥16 bytes) |

**Sync is not a backup.** Keep Local AppData copies and the dated repair backup under the product `backups\` folder when needed.

Do **not** point this app at TE Lab Components’ `...\InventoryApps\TE\shared`.

## Workspace

```text
frontend/     React UI, bridge, tests
backend/      Tauri/Rust, domain, FeOxDB, importer, export, sync
docs/         Decisions, handoff, planning (see docs/README.md)
data/import/  Gitignored lab workbooks — never commit
scripts/      Smoke helpers
```

## Development

```powershell
bun install --frozen-lockfile
bun run lint
bun run test
bun run build
cargo fmt --manifest-path backend/Cargo.toml --all -- --check
cargo test --manifest-path backend/Cargo.toml --no-fail-fast
powershell -ExecutionPolicy Bypass -File scripts\smoke-sync-one-machine.ps1
bun run build:desktop
```

On this workstation, ESLint/Vitest often need official portable Node ahead of Bun on `PATH` (Trend Micro / Bun EPERM issues).

## Remaining ops / cutover

- Second lab PC: install 0.1.5, confirm shared pull of the 543-entry inventory
- Local AppData backup/restore drill
- Department ACL ownership if required by IT
- Optional: finish correcting the original 573-row Excel profile if a full re-import is still wanted
- Python read-only window until deliberately retired

## Documentation map

- [docs/README.md](docs/README.md) — index + trust rules  
- [docs/SESSION_HANDOFF.md](docs/SESSION_HANDOFF.md) — current verified state  
- [docs/SESSION_START_PROMPT.md](docs/SESSION_START_PROMPT.md) — new chat paste  
- [docs/planning/DECISIONS.md](docs/planning/DECISIONS.md) — decisions  
- [docs/planning/IMPORT_PROFILE.md](docs/planning/IMPORT_PROFILE.md) — Excel import profile  
- [AGENTS.md](AGENTS.md) — agent rules  
