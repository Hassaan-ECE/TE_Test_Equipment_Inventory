# Planning docs (product decisions)

**Status:** Active  
**Last updated:** 2026-07-13

These documents are the **product and architecture plan** for TE Test Equipment Inventory. They were imported from the docs-only GitHub repo [Hassaan-ECE/TE_Lab_Equipment_Inventory](https://github.com/Hassaan-ECE/TE_Lab_Equipment_Inventory) and remapped to the **Test Equipment** identity used on this PC.

## Authority order

1. [DECISIONS.md](DECISIONS.md) — **authoritative** accepted / open / deferred decisions  
2. [PROJECT_DISCUSSION.md](PROJECT_DISCUSSION.md) — working product context and plan  
3. [SECOND_OPINION_REVIEW.md](SECOND_OPINION_REVIEW.md) — advisory review + acceptance criteria  
4. [ENGINEERING_SUGGESTIONS.md](ENGINEERING_SUGGESTIONS.md) — advisory implementation opinions  

If documents disagree, update the others to match **DECISIONS.md**.

## Related project entry points

| Doc | Role |
|-----|------|
| [../../README.md](../../README.md) | Project entry, runtime identity, current code state |
| [../SESSION_HANDOFF.md](../SESSION_HANDOFF.md) | Cross-machine / new-chat handoff |
| [../../AGENTS.md](../../AGENTS.md) | Short rules for coding agents in this repo |

## Identity (do not casually change)

| Item | Value |
|------|--------|
| Display name | TE Test Equipment Inventory |
| Workspace | `C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory` |
| Tauri identifier | `com.te.test.equipment.inventory` |
| Local DB (accepted) | `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` |
| Product share (D-027) | `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory` |

Earlier planning used the name “TE Lab Equipment Inventory” / `com.te.lab.equipment.inventory`. That is **historical**; see D-015 in DECISIONS.md.
