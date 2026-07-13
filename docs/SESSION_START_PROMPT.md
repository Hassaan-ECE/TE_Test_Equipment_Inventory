# Paste this into a new chat (same folder)

Open the workspace:

```text
C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory
```

Then paste:

---

Continue TE Test Equipment Inventory on this PC.

**Active workspace only:**  
`C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory`

**Do not use as the app tree:**  
`C:\Projects\Active\TE_Lab_Equipment_Inventory` (other-PC planning shell / broken git).  
Planning content was imported from GitHub `Hassaan-ECE/TE_Lab_Equipment_Inventory` into `docs/planning/` and remapped to **Test Equipment** naming.

**Read first (in order):**
1. `docs/SESSION_HANDOFF.md`
2. `docs/planning/DECISIONS.md`
3. `README.md` (top sections: source truth + current status)
4. `AGENTS.md`

**Product:** Tauri 2 + React + FeOxDB desktop app replacing Python TE equipment inventory. Focus: calibration, equipment identity, location. Same UX family as TE Parts + ME; not merged with components.

**Code state:** Full ME-family scaffold with partial rebrand (`com.te.test.equipment.inventory`). Domain still generic inventory — **no calibration model yet**. Updater/README still have ME leftovers. **No git** in this folder yet.

**Identity (keep):** display name TE Test Equipment Inventory; id `com.te.test.equipment.inventory`; local DB under `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox`.

**Siblings:**  
- ME base lineage: `C:\Projects\Active\Inventory_Apps\ME\ME_Inventory` @ `e092c73`  
- TE Parts: `C:\Projects\Active\Inventory_Apps\TE\TE_Parts_Inventory` @ `e444389`

**Do not:** freeze domain schema or build full cal UI before open decisions + live Excel profile (`data/import/`, gitignored).  
**Do:** follow build sequence in handoff / DECISIONS; evidence before “works” claims.

**Ask me which next slice I want** if unclear: rebrand hygiene | close open decisions | profile Excel export | domain/cal fields | init git | other.

---
