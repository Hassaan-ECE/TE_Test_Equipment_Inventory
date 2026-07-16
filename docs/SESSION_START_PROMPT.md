# Paste this into a new chat opened on the repository folder

---

Continue TE Test Equipment Inventory on this PC.

**Active workspace only:**

`C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory`

Do not use `C:\Projects\Active\TE_Lab_Equipment_Inventory` as the app tree.

**Read first (then verify critical claims against code / live paths):**

1. `docs/SESSION_HANDOFF.md`
2. `docs/planning/DECISIONS.md`
3. `README.md`
4. `AGENTS.md`

**Current product (as of 2026-07-16 handoff):** package **0.1.6**. Shared sync **on by default** (D-027). In-app updater enabled (D-028). Default shared root:

`S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory`

Team installer: that folder’s root `TE Test Equipment Inventory_0.1.6_x64-setup.exe`. Only **v0.1.4+** kept under `release-support\`.

**Data:** Local + shared inventory verified at **543** entries (no duplicate asset/serial). Sync smoke and empty-client pull against the product shared root passed. Sync is **not** a backup.

**Stable identity:** Tauri id `com.te.test.equipment.inventory`; local DB `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox`.

**Import:** still offline full-batch only (D-026); no Import button in the shell.

**Do not** use TE Components `...\InventoryApps\TE\shared`. Do not install removed 0.1.3-and-below setups.

---
