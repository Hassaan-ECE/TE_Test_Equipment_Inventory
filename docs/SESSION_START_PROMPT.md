# Paste this into a new chat opened on the repository folder

---

Continue TE Test Equipment Inventory on this PC.

**Active workspace only:**

`C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory`

Do not use `C:\Projects\Active\TE_Lab_Equipment_Inventory` as the app tree. It is an old planning/other-PC location.

**Read first, in order:**

1. `docs/SESSION_HANDOFF.md`
2. `docs/planning/DECISIONS.md`
3. `README.md`
4. `AGENTS.md`

**Current state:** v0.1 implementation candidate on the existing ME-family Tauri 2 + React + FeOxDB scaffold. ME Inventory `e092c73` is historical scaffold lineage and TE Parts `e444389` is a read-only sibling reference. This app is not a published production release and lab cutover is not complete.

**Stable identity:**

- display: TE Test Equipment Inventory
- package: `te-test-equipment-inventory`
- Tauri id: `com.te.test.equipment.inventory` — do not change after installs without a migration plan
- local DB: `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox`

**Implemented:** identity/updater hygiene; Local AppData compatibility copy; current-state calibration and derived health; timestamped verification; calibration-aware FeOxDB/sync/export; dry-run and confirmed idempotent CSV/Excel importer with provenance; live aggregate import profiling; calibration UI, filters, and chips. Former O-001 through O-008 are resolved by D-017 through D-025. D-026 makes v0.1 import offline/operator-driven and full-batch-only: the shell has no Import action, the desktop command rejects partial commits, and partial behavior remains internal-test-only.

**Operations boundary:** shared synchronization is disabled by default behind `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED`; optional configuration uses `TE_TEST_EQUIPMENT_SHARED_ROOT` and `TE_TEST_EQUIPMENT_SYNC_HMAC_KEY`. Sync is not a backup. Do not enable production shared mode, push, deploy, publish, install on lab PCs, delete lab data, or expand scope without owner authorization.

**Remaining gates:**

1. independent post-change review;
2. Boss lint/test/build/Tauri/smoke verification and exact blocker reporting;
3. live import correction — aggregate profile is available, but 50 identity conflicts and eight invalid-date rows block the required full-batch commit; never partial-load real Local AppData;
4. protected import/restore rehearsal and rollback plan;
5. department shared-root/ACL/backup ownership and real two-machine proof;
6. explicit cutover authorization.

Keep v0.1 boundaries: current calibration state only, no `CalibrationEvent` history store, no managed media vault, no production shared-sync enablement, and no Python retirement.

Use Workers for tracked project edits, Managers/Reviewers read-only, and require independent review plus Boss verification before claiming completion.

---
