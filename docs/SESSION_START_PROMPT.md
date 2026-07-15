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

**Current state:** package **0.1.1** on the ME-family Tauri 2 + React + FeOxDB scaffold. Shared sync is **on by default** (D-027) using `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE\Test_Equipment`. Full live Excel cutover is still blocked on 50 identity conflicts + 8 invalid dates. ME Inventory `e092c73` is historical scaffold lineage; TE Parts `e444389` is a read-only sibling.

**Stable identity:**

- display: TE Test Equipment Inventory
- package: `te-test-equipment-inventory` `0.1.1`
- Tauri id: `com.te.test.equipment.inventory` — do not change after installs without a migration plan
- local DB: `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox`

**Implemented:** identity hygiene; Local AppData; current-state calibration and derived health; FeOxDB/sync/export; offline full-batch importer (D-026); calibration UI. D-027 enables shared sync by default with opt-out via `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED=0|false|no|off`. Optional `TE_TEST_EQUIPMENT_SHARED_ROOT` and `TE_TEST_EQUIPMENT_SYNC_HMAC_KEY`.

**Operations boundary:** sync is not a backup. Keep Local AppData on upgrade. Do not use the TE Lab Components shared folder. Do not partial-load the blocking live workbook. Do not retire the Python app without authorization.

**Remaining gates:**

1. seed-machine upgrade smoke (0.1.0 → 0.1.1) and shared bootstrap of existing entries;
2. second-machine pull proof;
3. live import row corrections + full-batch cutover rehearsal;
4. backup/restore drill;
5. optional department ACL ownership.

Keep v0.1 boundaries: current calibration state only, no `CalibrationEvent` history store, no managed media vault, no Python retirement without owner OK.

---
