# Session handoff — TE Test Equipment Inventory

**Last updated:** 2026-07-13  
**Purpose:** Pick up work in a **new chat** opened on this folder without re-deriving project context.

## Open this workspace

```text
C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory
```

Do **not** treat these as the active app tree on this PC:

| Path | Role |
|------|------|
| `C:\Projects\Active\TE_Lab_Equipment_Inventory` | Other-PC / planning shell; broken git; skill leftovers — **not** the app |
| `https://github.com/Hassaan-ECE/TE_Lab_Equipment_Inventory` | Original **docs-only** planning repo (Lab naming) — content now lives under `docs/planning/` here |

## What this project is

Modern **Tauri 2 + React + TypeScript + Bun + Rust + FeOxDB** desktop app to **replace the Python TE test/lab equipment inventory**, focused on:

1. **Calibration** (requirement + workflow + derived health)  
2. **Equipment identity** (asset, serial, maker, model, …)  
3. **Location**

Same UI/UX family as TE Parts (Components) and ME Inventory — **not** a Python GUI port, **not** merged with TE components.

## Current code state (verified 2026-07-13)

| Area | State |
|------|--------|
| Scaffold | Full ME-family inventory app tree (`frontend/`, `backend/`, sync, tests) |
| Rebrand | **Partial** — name/id mostly Test Equipment |
| Domain model | Still **generic ME inventory** — no calibration fields yet |
| Verified field | Still `verified_in_survey` bool — planning wants `verifiedAt` (+ optional `verifiedBy`) |
| Updater / README leftovers | Still point at **ME** releases / `com.me.inventory` in places |
| Git | **No `.git`** in this folder yet (init/link when ready) |
| `node_modules` / `backend/target` | Not fully present like TE Parts may be; expect install/build as needed |

### Identity (accepted)

| Item | Value |
|------|--------|
| Display name | TE Test Equipment Inventory |
| Package | `te-test-equipment-inventory` @ `0.1.0` |
| Tauri id | `com.te.test.equipment.inventory` |
| Local DB path (decision) | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |
| Shared root sketch | `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE\Test_Equipment` |

### Sibling apps on this PC

| App | Path | Git origin @ HEAD (approx) |
|-----|------|----------------------------|
| ME Inventory (scaffold lineage) | `C:\Projects\Active\Inventory_Apps\ME\ME_Inventory` | `ME_Inventory_App_Tauri_v2` @ `e092c73` |
| TE Parts / Components | `C:\Projects\Active\Inventory_Apps\TE\TE_Parts_Inventory` | `TE_Component_Inventory` @ `e444389` |

## Planning authority

| Doc | Role |
|-----|------|
| [planning/DECISIONS.md](planning/DECISIONS.md) | **Authoritative** decisions |
| [planning/PROJECT_DISCUSSION.md](planning/PROJECT_DISCUSSION.md) | Product context + build sequence |
| [planning/SECOND_OPINION_REVIEW.md](planning/SECOND_OPINION_REVIEW.md) | Acceptance criteria |
| [planning/ENGINEERING_SUGGESTIONS.md](planning/ENGINEERING_SUGGESTIONS.md) | Advisory implementation notes |
| [planning/README.md](planning/README.md) | Index + identity |

## Build sequence (do not skip)

1. Data discovery — profile live Python **Excel export** (keep out of git; use `data/import/`)  
2. Resolve open decisions in DECISIONS.md  
3. Base comparison note (working tree already ME-based; record O-002 formally)  
4. Finish rebrand/cleanup (updater, preference keys, LocalAppData, strip ME leftovers)  
5. Domain / storage / sync for calibration  
6. Importer (dry-run → commit)  
7. UI (derived health, filters, dialog)  
8. Ops hardening + two-machine sync proof  
9. Migration rehearsal  
10. Cutover  

**Do not** jump to full calibration UI polish or freeze schema without export profiling + open decisions.

## Open decisions still blocking schema freeze

| ID | Topic |
|----|--------|
| O-001 | CalibrationEvent history vs current-state-only v1 |
| O-002 | Formal base SHA record (tree is already ME-scaffolded) |
| O-003 | Certificate/picture handling |
| O-004 | Final shared root / ACLs / backup owner |
| O-005 | Operator attribution (`verifiedBy` / cal operator) |
| O-006 | Explicit due dates only vs interval-derived |
| O-007 | UI labels for `reference_only` vs `not_required` |
| O-008 | Live Excel export profile |

## Accepted calibration baseline (implement later; do not invent mixed enum)

- Requirement: `required | reference_only | not_required | unknown`  
- Workflow: `outToCalibration` separate  
- Derived health: `missing_due | overdue | due_soon | current | not_applicable | unknown | out_to_cal`  
- Due soon: `today <= dueDate <= today + 30 days`  
- Required + no due date → **`missing_due`**, never current  
- Import: UUID identity; never auto-merge on manufacturer+model  

## Suggested next sessions (pick one)

1. **Finish rebrand hygiene** — strip ME release/updater/`com.me.inventory` leftovers; enforce LocalAppData path.  
2. **Close open product decisions** — O-001, O-003, O-005, O-006, O-007 into DECISIONS.md.  
3. **Data discovery** — place export under `data/import/` (gitignored) and profile headers/duplicates/cal combos.  
4. **Domain slice** — add calibration fields + derived health + tests (after O-001/O-006 clarity).  
5. **Init git** — optional; remote may be new repo or continue planning-repo story under Test Equipment name.

## Agent rules of thumb

- Prefer thin vertical slices; verify with real commands before claiming “works.”  
- Sync artifacts ≠ backup (D-013).  
- Production shared sync stays config-gated until two-machine proof (D-012).  
- Do not silently discard import columns/rows (D-008).  
- Engineering docs under `docs/engineering/` are mostly **ME-lineage** runbooks; treat planning/ as product truth for equipment/calibration.

## Paste block for a new chat

Copy the block in [SESSION_START_PROMPT.md](SESSION_START_PROMPT.md) into a new agent session opened on this folder.
