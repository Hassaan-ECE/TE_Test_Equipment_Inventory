# Agent notes — TE Test Equipment Inventory

Read `docs/SESSION_HANDOFF.md` and `docs/planning/DECISIONS.md` before non-trivial work.

## Workspace

- **Active app:** `C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory`
- **Not the app:** `C:\Projects\Active\TE_Lab_Equipment_Inventory` (other-PC leftovers)
- Planning authority: `docs/planning/DECISIONS.md` (imported from the Lab-named GitHub planning repo)

## Identity (stable)

| Item | Value |
|------|--------|
| Name | TE Test Equipment Inventory |
| Tauri id | `com.te.test.equipment.inventory` |
| Local DB | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |

Do not change the Tauri identifier after installs without a migration plan.

## Stack

Tauri 2, React 19, TypeScript, Vite, Tailwind v4, Bun, Rust, FeOxDB.  
Scaffold lineage: ME inventory family (partial rebrand only).

## Priorities

1. Calibration semantics + import identity + ops (backup/sync gates)  
2. Domain/storage/sync/importer  
3. UI on existing inventory shell  
4. Optional later: table library / icon set swaps  

Do **not** freeze schema without a live Excel export profile and closed blocking opens in DECISIONS.md.

## Import data

Put cutover workbooks under `data/import/` (gitignored). Never commit live lab inventory exports.

## Verification

Run real lint/test/build/smoke commands before claiming success. Sync artifacts are not a backup.

**Do not trust docs blindly.** Version, shared root, sync default, and release paths must match code (`package.json` / `Cargo.toml` / `tauri.conf.json` / `backend/src/sync`) and live share/GitHub when claimed as current. Prefer `docs/SESSION_HANDOFF.md` + DECISIONS over discussion/superpowers plans.

## New session

Owner can paste `docs/SESSION_START_PROMPT.md` into a new chat after opening this folder.
