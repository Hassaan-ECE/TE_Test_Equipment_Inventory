# Session handoff — TE Test Equipment Inventory

**Last updated:** 2026-07-15

**State:** v0.1.1 released with shared sync on by default (D-027). Full lab Excel cutover still blocked on source corrections.

## Workspace and authority

Open only:

```text
C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory
```

`C:\Projects\Active\TE_Lab_Equipment_Inventory` is an old planning/other-PC tree, not the app. Planning authority is [planning/DECISIONS.md](planning/DECISIONS.md). Read this handoff, the decision register, [../README.md](../README.md), and [../AGENTS.md](../AGENTS.md) before changing code.

The repository is on `main` and tracks `origin/main`; `origin` is `https://github.com/Hassaan-ECE/TE_Test_Equipment_Inventory.git`. Do not push or change remote configuration unless the owner asks.

Historical/read-only references:

| Reference | Location | Revision |
|-----------|----------|----------|
| ME Inventory scaffold lineage | `C:\Projects\Active\Inventory_Apps\ME\ME_Inventory` | `e092c73` |
| TE Parts sibling | `C:\Projects\Active\Inventory_Apps\TE\TE_Parts_Inventory` | `e444389` |

## Stable identity

| Item | Value |
|------|-------|
| Display | TE Test Equipment Inventory |
| Package | `te-test-equipment-inventory` version `0.1.1` |
| Tauri id | `com.te.test.equipment.inventory` |
| Local database | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |
| Default shared root | `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE\Test_Equipment` |

Local AppData is implemented. When the Local target is absent, startup copies the same identifier's Roaming `inventory.feox` and preserves the source; an existing Local target wins. Do not change the Tauri identifier after installs. The inherited auto-updater is removed; version upgrades are reinstall/NSIS over the same id so Local AppData is kept.

## Implemented state

### Decisions and domain

D-017 through D-027 cover calibration semantics, import policy, and shared sync default:

- current-state calibration fields only; `CalibrationEvent` history is deferred;
- requirement is `required | reference_only | not_required | unknown` and out-to-calibration is separate;
- explicit due date is authoritative; optional interval only suggests a date;
- derived health is computed rather than stored;
- UUID is stable identity; manufacturer plus model never auto-merges;
- archive remains separate from lifecycle;
- D-026: cutover import is offline/full-batch-only; shell has no Import action;
- D-027: shared sync **on by default**; opt out with `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED=0|false|no|off`.

### Shared sync (v0.1.1)

Shared mode matches the ME / TE Parts family: attempt the default shared root unless opted out.

- Default root: `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE\Test_Equipment`
- Layout: `{root}\shared\inventory\{ops,snapshots,locks,backups,manifest.json}`
- Optional override: `TE_TEST_EQUIPMENT_SHARED_ROOT`
- Optional HMAC: `TE_TEST_EQUIPMENT_SYNC_HMAC_KEY` (16+ bytes)
- Missing root → local-only usability; changes queue until the root is available
- First successful sync run bootstraps all existing local entries onto the share once (`meta:sync_bootstrap_complete`)

**Do not** point this app at `...\InventoryApps\TE\shared` (TE Lab Components). Sync is not a backup.

### Importer

Still offline/operator-driven and full-batch-only under D-026. Live dry-run profile remains `573 / 515 / 0 / 50 / 8 / 0` with `blocking=true` until source corrections. Never partial-load into real Local AppData.

### UI

Calibration UI, filters, chips, export Excel are present. Import chrome is intentionally unmounted.

## Installer locations

| Version | Path |
|---------|------|
| 0.1.0 | `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory_0.1.0\` |
| 0.1.1 | `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory_0.1.1\` |

## Remaining gates

1. Install 0.1.1 over 0.1.0 on the seed PC; confirm Local AppData entries remain and shared status becomes available.
2. Confirm bootstrap published ops under the default shared root.
3. Second-machine pull smoke when ready.
4. Correct 50 conflicted + 8 rejected live rows before full-batch Excel cutover.
5. Backup/restore drill; keep Python read-only until authorized retirement.
6. Optional: department-owned root and formal ACL ownership.

Use [SESSION_START_PROMPT.md](SESSION_START_PROMPT.md) to begin a new session without reopening settled decisions.
