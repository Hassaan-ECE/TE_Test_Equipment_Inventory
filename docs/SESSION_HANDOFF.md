# Session handoff — TE Test Equipment Inventory

**Last updated:** 2026-07-15

**State:** v0.1.5 with shared sync on by default (D-027) and ME-style in-app updater (D-028). Idle "Shared operation sync ready" footer text is suppressed. Product share keeps only v0.1.4+ installers. Full lab Excel cutover still blocked on source corrections.

## Workspace and authority

Open only:

```text
C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory
```

`C:\Projects\Active\TE_Lab_Equipment_Inventory` is an old planning/other-PC tree, not the app. Planning authority is [planning/DECISIONS.md](planning/DECISIONS.md).

The repository is on `main` and tracks `origin/main`; `origin` is `https://github.com/Hassaan-ECE/TE_Test_Equipment_Inventory.git`.

## Stable identity

| Item | Value |
|------|-------|
| Display | TE Test Equipment Inventory |
| Package | `te-test-equipment-inventory` version `0.1.5` |
| Tauri id | `com.te.test.equipment.inventory` |
| Local database | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |
| Product share | `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory` |

## Share layout (ME/TE family)

```text
S:\...\InventoryApps\TE_Test_Equipment_Inventory\
  TE Test Equipment Inventory_0.1.5_x64-setup.exe   # current latest
  release-support\
    v0.1.4\ … v0.1.5\   installer + SHA256SUMS (+ .sig/latest.json)
  shared\inventory\{ops,snapshots,locks,backups,manifest.json}
  backups\   # optional Local AppData copies (not sync)
```

Installers **0.1.3 and below** are removed from the share and GitHub so they are not installed by mistake.

Default shared root is the product folder itself (same as ME → `...\ME`, TE Components → `...\TE`). Layout under it is `shared\inventory\...`.

Updater endpoint: `https://github.com/Hassaan-ECE/TE_Test_Equipment_Inventory/releases/latest/download/latest.json`  
Private signing key (not in repo): `%USERPROFILE%\.tauri\te-test-equipment-inventory-updater.key`

Do **not** use `...\InventoryApps\TE\shared` (TE Lab Components).

## Implemented highlights

- D-026: offline full-batch import only; shell has no Import action
- D-027: shared sync on by default; opt out with `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED=0|false|no|off`
- D-028: in-app Update button when GitHub latest is newer (ME-style)
- First successful sync bootstraps existing Local AppData entries onto the share once
- Sync is not a backup

## How to update

Install/run the current root setup, or from **0.1.4** open the app online and use **Update 0.1.5** when shown. Older than 0.1.4 is not kept on the share.

## Remaining gates

1. Confirm Update path 0.1.3 → 0.1.4 on a real PC  
2. Confirm Shared status and ops under `TE_Test_Equipment_Inventory\shared\inventory\ops`  
3. Second-machine pull smoke  
4. Correct 50 conflicted + 8 rejected live Excel rows before full cutover  
5. Backup/restore drill; keep Python read-only until authorized retirement  
