# TE Test Equipment Inventory — Decision Register

**Status:** Authoritative planning record  
**Last updated:** 2026-07-13  
**Owner:** TE Test Equipment Inventory project owner

This file is the source of truth for product and engineering decisions. If another planning document conflicts with this register, update that document and follow this register.

**Provenance:** Planning content originated in the docs-only GitHub repo  
[`Hassaan-ECE/TE_Lab_Equipment_Inventory`](https://github.com/Hassaan-ECE/TE_Lab_Equipment_Inventory)  
(earlier working name used “Lab Equipment”). On this PC the product identity is **TE Test Equipment Inventory** under  
`C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory`.  
Session handoff: [../SESSION_HANDOFF.md](../SESSION_HANDOFF.md).

The supporting documents remain useful but advisory:

- [PROJECT_DISCUSSION.md](PROJECT_DISCUSSION.md) contains context, alternatives, and the working plan.
- [SECOND_OPINION_REVIEW.md](SECOND_OPINION_REVIEW.md) contains independent review findings and acceptance criteria.
- [ENGINEERING_SUGGESTIONS.md](ENGINEERING_SUGGESTIONS.md) contains implementation suggestions and optional tooling notes.

## Status definitions

| Status | Meaning |
|--------|---------|
| **Accepted** | Use this direction unless the owner records a replacement decision here. |
| **Open** | Input or a product/IT choice is still required; do not silently assume an answer. |
| **Deferred** | Intentionally outside the current v1 path. |
| **Superseded** | Replaced by a newer numbered decision. |

## Accepted decisions

| ID | Decision | Consequence |
|----|----------|-------------|
| D-001 | Build a separate **TE Test Equipment Inventory** application rather than merging equipment into TE Components. | Separate data, repository, releases, updater identity, and shared root. |
| D-002 | Use Tauri identifier `com.te.test.equipment.inventory`. | Keep it stable across releases; use distinct preference and updater keys. |
| D-003 | Reuse the TE Components / ME interaction and visual patterns without a major v1 redesign. | Domain, migration, and operations work take priority over table or icon rewrites. |
| D-004 | Treat a fresh export from the live Python app as the primary cutover source. Use older workbooks only as reviewed supplements. | Profile the live export before schema freeze; Python SQLite on this machine is reference data only. |
| D-005 | Store calibration requirement separately from workflow and derive display health from dates. | Requirement values are `required`, `reference_only`, `not_required`, and `unknown`; `outToCalibration` is separate. Derived health includes `missing_due`, `overdue`, `due_soon`, `current`, `not_applicable`, `unknown`, and `out_to_cal`. |
| D-006 | Use a 30-day default due-soon window with the rule `today <= dueDate <= today + 30 days`. | Due today is due soon; dates before today are overdue; required equipment without a due date is `missing_due`, never current. |
| D-007 | Use the app UUID as stable internal identity. Never auto-merge on manufacturer plus model. | Only unique normalized asset/serial matches may resolve automatically; duplicates and disagreement become conflicts. Manufacturer/model may rank review candidates only. |
| D-008 | Make imports dry-runnable, idempotent, and reconcilable. | Every source row is counted as inserted, matched, conflicted, rejected, or intentionally ignored. Keep import batch, file, sheet, row, and original identifier provenance. |
| D-009 | Store the machine-local FeOxDB under `%LOCALAPPDATA%\com.te.test.equipment.inventory\inventory.feox` using Tauri Local AppData. | Do not inherit the candidate bases' Roaming AppData path without deliberately changing it. Confirm the organization profile policy during validation. |
| D-010 | Keep Archive and lifecycle as separate concepts. | Scrapped or missing equipment is not automatically equivalent to archived data; archive controls normal visibility. |
| D-011 | Compare TE Components and local ME Tauri before scaffolding, then record the selected repository and exact commit SHA. | Do not select a base only by product name or begin by blindly cloning TE Components. |
| D-012 | Integrate synchronization into domain/storage work early, but keep production shared mode configuration-gated until real two-machine proof. | Calibration fields/entities must participate in serialization, merge, snapshots, conflicts, and tests before shared mode is enabled. |
| D-013 | Treat sync artifacts as synchronization, not backup. | Define retention and restore procedures, run a restore drill, back up final cutover inputs, and retain a documented Python read-only rollback window. |
| D-014 | Replace the timeless verification boolean with `verifiedAt`; support `verifiedBy` if operator attribution is adopted. | Location verification has an age and cannot remain permanently true without context. |
| D-015 | Product identity on this PC is **TE Test Equipment Inventory** (`com.te.test.equipment.inventory`), not the earlier planning name “TE Lab Equipment Inventory”. | Keep folder, display name, Tauri id, preference keys, and updater identity under the Test Equipment names unless the owner deliberately renames before first install. |
| D-016 | Working application tree is the ME-family scaffold already present at `C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory` (partial rebrand only). | Continue domain work in this tree. Formal base comparison (O-002) still records sibling SHAs; do not re-scaffold from scratch unless a deliberate reset is approved. |

## Open decisions and required inputs

| ID | Open item | Needed before | Owner/input |
|----|-----------|---------------|-------------|
| O-001 | Store `CalibrationEvent` history in v1, or explicitly ship a current-state reminder board without history. | Domain/schema freeze | Product owner |
| O-002 | Formally record base comparison outcome. Working tree is already ME-scaffolded; sibling refs on this PC: ME `e092c73` (`ME_Inventory_App_Tauri_v2`), TE Parts `e444389` (`TE_Component_Inventory`). Confirm keep-ME vs port-from-TE before large domain edits if parity gaps appear. | Large domain/sync rework | Engineering |
| O-003 | Choose certificate/picture handling: managed shared media, durable UNC/URL references, or defer for v1. | Domain/schema freeze | Product owner + IT if shared storage is used |
| O-004 | Select a durable lab/department-owned shared root and confirm writer ACLs, backup ownership, and naming. | Production shared-sync enablement | Lab operations / IT |
| O-005 | Decide whether `verifiedBy` and calibration operator identity are required. | Domain/schema freeze | Product owner |
| O-006 | Decide whether due dates are entered explicitly only or may also be calculated from `calibrationIntervalMonths`. | Calibration workflow implementation | Product owner |
| O-007 | Confirm user-facing language for `reference_only` versus `not_required`. | UI copy freeze | Product owner / lab users |
| O-008 | Obtain and profile a representative live Python Excel export. | Model freeze and importer implementation | Lab data owner |

## Deferred for v1

| Item | Reason |
|------|--------|
| Ownership/rental detail | The inspected reference snapshot was effectively all owned; revisit if live export disproves that assumption. |
| Estimated age, age basis, acquired date | Not central to calibration, identity, or location. |
| Quantity and project name | Rarely useful for individually identified instruments. |
| Full Python master/survey dual-workbook pipeline | Cutover uses the live export plus reviewed supplemental workbooks. |
| Dashboard-heavy reporting | Derived health filters and counts are sufficient for initial use. |
| TanStack Table migration | Existing sibling-app table patterns are adequate at the expected scale. |
| Reicon migration | Keep sibling-app icon consistency; revisit only as a deliberate family-wide change. |

## Decision-change process

1. Add or update an entry in this file first.
2. Record the status and the reason for the change.
3. If replacing an accepted decision, mark the old entry **Superseded** and reference the new ID.
4. Reconcile README, PROJECT_DISCUSSION, implementation docs, tests, and examples in the same change.
5. Do not represent an **Open** item as an implementation default unless the decision register is updated.

