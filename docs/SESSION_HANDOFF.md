# Session handoff — TE Test Equipment Inventory

**Last updated:** 2026-07-16  
**Evidence basis:** code + release build for v0.1.6 UI fixes (serial column, filter stacking, sort cycle, filter dropdown height)

**State:** **v0.1.6** ready for team install/update. Shared inventory remains the product ops set on the S: share (previously verified **543** durable equipment records). Full original Excel cutover profile (573-row dry-run with 50 conflicts / 8 rejects) is a separate source-correction track.

## Workspace

```text
C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory
```

Planning authority: [planning/DECISIONS.md](planning/DECISIONS.md).  
Remote: `origin` → `https://github.com/Hassaan-ECE/TE_Test_Equipment_Inventory.git` (`main`).

Do not use `C:\Projects\Active\TE_Lab_Equipment_Inventory` as the app tree.

## Stable identity

| Item | Value |
|------|-------|
| Display | TE Test Equipment Inventory |
| Package / installer | `0.1.6` |
| Tauri id | `com.te.test.equipment.inventory` |
| Local DB | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |
| Product share (default sync root) | `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory` |

## Team download

| What | Where |
|------|--------|
| Current installer | `S:\...\TE_Test_Equipment_Inventory\TE Test Equipment Inventory_0.1.6_x64-setup.exe` |
| Prior (updater base) | `release-support\v0.1.5\` |
| Current archive | `release-support\v0.1.6\` (+ SHA256SUMS, `.sig`, `latest.json`) |
| GitHub Latest | `v0.1.6` on `Hassaan-ECE/TE_Test_Equipment_Inventory` |

Installers **0.1.3 and below** were removed from the share and GitHub so they are not installed by mistake.

**Requirements for shared mode:** S: path reachable; same default root (or matching `TE_TEST_EQUIPMENT_SHARED_ROOT`). Sync is **on by default** (D-027); opt out with `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED=0|false|no|off`.

Updater endpoint (D-028):  
`https://github.com/Hassaan-ECE/TE_Test_Equipment_Inventory/releases/latest/download/latest.json`  
Signing key stays outside the repo: `%USERPROFILE%\.tauri\te-test-equipment-inventory-updater.key`

## Inventory data (last full audit 2026-07-15)

| Check | Result |
|-------|--------|
| Local AppData entry count | **543** (all active; 0 archived) |
| Shared `*.op.json` count | **543** |
| Duplicate asset / serial keys | **0 / 0** |
| Fresh empty DB pull from product shared root | **543** entries; **no new ops written**; manifest unchanged |
| Synthetic one-machine sync smoke | **PASS** |
| Two-DB create/update/delete flow | **PASS** |

Composition noted in repair notes (not re-derived here): ~514 recovered current + ~29 unique legacy additions. Legacy workbook under `data/import/` is **gitignored**.

Repair backup (ops/snapshots/local snapshots before repair):

```text
S:\...\TE_Test_Equipment_Inventory\backups\shared-data-repair-20260715-094133
```

Manifest may still reference an **empty** snapshot (`entryCount: 0`) from an earlier client; data is carried by the 543 ops until compaction (threshold **1000** ops or snapshot age **≥24h**).

Idle footer text “Shared operation sync ready.” is suppressed in UI (Shared pill covers mode). Actionable messages (pending, unavailable, errors) still show.

## v0.1.6 product UI fixes

- Filter dropdowns elevate above the inventory table (no longer paint under the grid).
- **Serial #** column added (default visible, sortable, toggleable in View settings).
- Column sort cycles **asc → desc → off → asc**.
- Filter select menus tall enough for full health list without forced scroll.

## Product behavior (code)

- Calibration current-state fields; derived health; no `CalibrationEvent` ledger (D-017).
- Import: offline / full-batch only; shell has **no** Import chrome (D-026).
- Shared sync default on; Local AppData is authoritative store; **sync is not a backup** (D-013).

## Remaining gates

1. Team install on second real lab PC + confirm inventory pull (first empty install).
2. Backup/restore drill for Local AppData (and awareness of shared repair backup).
3. Optional: department ACL ownership / formal two-machine sign-off.
4. Optional: correct remaining **source Excel** conflicts (old 573-row profile: 50 conflicts + 8 rejects) if a full re-import cutover is still desired.
5. Snapshot compaction when age/ops thresholds hit (automatic).

## Verify before trusting any doc

Re-check package version, `DEFAULT_SHARED_ROOT`, live share listing, and `gh release list` — do not copy version numbers from older markdown.
