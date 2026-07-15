# Session handoff — TE Test Equipment Inventory

**Last updated:** 2026-07-15

**State:** v0.1.2 with shared sync on by default (D-027). Product share folder matches ME/TE layout. Full lab Excel cutover still blocked on source corrections.

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
| Package | `te-test-equipment-inventory` version `0.1.2` |
| Tauri id | `com.te.test.equipment.inventory` |
| Local database | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |
| Product share | `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory` |

## Share layout (ME/TE family)

```text
S:\...\InventoryApps\TE_Test_Equipment_Inventory\
  TE Test Equipment Inventory_0.1.2_x64-setup.exe   # current latest
  release-support\
    v0.1.0\  installer + SHA256SUMS.txt
    v0.1.1\  installer + SHA256SUMS.txt
    v0.1.2\  installer + SHA256SUMS.txt
  shared\inventory\{ops,snapshots,locks,backups,manifest.json}
  backups\   # optional Local AppData copies (not sync)
```

Default shared root is the product folder itself (same as ME → `...\ME`, TE Components → `...\TE`). Layout under it is `shared\inventory\...`.

Do **not** use `...\InventoryApps\TE\shared` (TE Lab Components).

## Implemented highlights

- D-026: offline full-batch import only; shell has no Import action
- D-027: shared sync on by default; opt out with `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED=0|false|no|off`
- First successful sync bootstraps existing Local AppData entries onto the share once
- Sync is not a backup

## Remaining gates

1. Install 0.1.2 over prior build; confirm Local entries remain and Shared status works
2. Confirm ops under `TE_Test_Equipment_Inventory\shared\inventory\ops`
3. Second-machine pull smoke
4. Correct 50 conflicted + 8 rejected live Excel rows before full cutover
5. Backup/restore drill; keep Python read-only until authorized retirement
