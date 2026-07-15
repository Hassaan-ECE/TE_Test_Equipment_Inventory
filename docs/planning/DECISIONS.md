# TE Test Equipment Inventory — Decision Register

**Status:** Authoritative planning record  
**Last updated:** 2026-07-15

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
| D-016 | Working application tree is the ME-family scaffold already present at `C:\Projects\Active\Inventory_Apps\TE\TE_Test_Equipment_Inventory` (partial rebrand only). | Continue domain work in this tree. D-018 records the sibling SHAs; do not re-scaffold from scratch unless a deliberate reset is approved. |
| D-017 | For v1, store current-state calibration fields on equipment and compute derived health; do not implement a `CalibrationEvent` history store. | V1 is a reminder/current-state application, not a calibration audit ledger. Editing current calibration values overwrites their prior state. Keep stable equipment UUID identity and current-state field semantics so a future event entity can reference equipment without redefining it. |
| D-018 | Keep the existing ME-family application tree selected by D-016. Record its lineage as ME Inventory at `e092c73`; TE Parts at `e444389` remains a read-only sibling reference. | O-002 is resolved; continue hardening this scaffold rather than re-scaffolding or porting the application wholesale from TE Parts. |
| D-019 | Defer managed certificate and picture/media storage for v1. Keep optional free-text certificate/reference and vendor-notes fields when low cost, plus the scaffold's existing picture-path field where present. | Do not build a shared media vault or claim that local picture paths are multi-machine durable. A later attachment model can replace or supplement these simple references. |
| D-020 | Retain the current shared-root sketch, but keep production shared synchronization configuration-gated under D-012. | **Superseded by D-027** for the default enablement gate. Shared-root location, ACLs, backup ownership, and two-machine proof remain operations concerns under D-013. |
| D-021 | Require `verifiedAt`; make `verifiedBy` and calibration operator optional free-text attribution. | Verification must carry a timestamp. Store optional attribution where low cost, but do not require login, authentication, or operator identity to use the v1 UI. |
| D-022 | Treat an explicit calibration due date as the source of truth. `calibrationIntervalMonths` is optional and may only suggest a next due date. | Never calculate and overwrite a user-entered due date automatically. Applying a suggested due date requires an explicit user/import action, and derived health always uses the resulting explicit due date. |
| D-023 | Use **Reference only** for `reference_only` and **Not required** for `not_required` in user-facing copy. | Keep the two requirement states distinct in filters, badges, forms, imports, and exports. |
| D-025 | Aggregate profiling of the supplied live export is accepted for importer compatibility, using only the `Inventory` sheet and mapping version `te-test-equipment-v2`. | The empty-database dry run is `573 total / 515 inserted / 0 matched / 50 conflicted / 8 rejected / 0 ignored`, so commit remains blocked until the 50 identity conflicts and eight invalid-date rows are corrected. Supporting sheets are excluded by selection, not counted as ignored inventory rows. |
| D-026 | V0.1 cutover import is an offline/operator-driven, full-batch-only workflow. The inventory shell exposes no Import action, and the desktop command rejects partial commit requests. | A live commit requires a non-blocking dry run. The importer engine may retain partial behavior for synthetic/internal tests, but partial import is unsupported against real Local AppData. Correct all conflicts/rejections, protect the source, rehearse backup/restore, and obtain authorization before a full commit. Adding in-app Import chrome or supporting production partial import requires a replacement decision. |
| D-027 | From v0.1.1, shared synchronization is **on by default** (ME/TE Parts family pattern). Default product share root is `S:\Engineering\Public\Syed_Hassaan_Shah\InventoryApps\TE_Test_Equipment_Inventory` (same layout as ME/TE: current installer at folder root, `release-support\vX.Y.Z\`, and `shared\inventory\`). | Set `TE_TEST_EQUIPMENT_SHARED_SYNC_ENABLED` to `0`/`false`/`no`/`off` to opt out. Override root with `TE_TEST_EQUIPMENT_SHARED_ROOT`. Optional `TE_TEST_EQUIPMENT_SYNC_HMAC_KEY` (16+ bytes) authenticates shared files. When the root is missing, the app stays fully usable locally and queues publish until the root exists. Existing Local AppData entries bootstrap onto the share once when sync first runs. Sync is not a backup (D-013). Real two-machine proof and durable ACL ownership remain recommended ops validation, not a code gate. |

## Superseded decisions

| ID | Status | Replacement |
|----|--------|-------------|
| D-024 | **Superseded.** It recorded that no live export was present and allowed synthetic-only importer work. | D-025 records the live aggregate profile and blocking dry-run evidence. |
| D-020 | **Superseded** for default-off production gating. | D-027 enables shared sync by default with explicit opt-out and the accepted default root. |

## Resolved provisional v1 inputs

No item from O-001 through O-008 remains an open blocker for the initial v1 implementation. The owner accepted the provisional defaults above; new evidence may replace them only through the decision-change process.

| Former open item | Resolution |
|------------------|------------|
| O-001 | D-017 — current-state calibration; history deferred |
| O-002 | D-018 — retain the ME-family scaffold and record sibling SHAs |
| O-003 | D-019 — managed certificate/media storage deferred |
| O-004 | D-020 — shared-root sketch retained; production sync remains gated |
| O-005 | D-021 — timestamp required; operator fields optional free text |
| O-006 | D-022 — explicit due date is authoritative; interval only suggests |
| O-007 | D-023 — user-facing labels accepted |
| O-008 | D-025 — live aggregate profile available; blocking source corrections remain required before commit |

## Deferred for v1

| Item | Reason |
|------|--------|
| Ownership/rental detail | The inspected reference snapshot was effectively all owned; revisit if live export disproves that assumption. |
| Estimated age, age basis, acquired date | Not central to calibration, identity, or location. |
| Quantity and project name | Rarely useful for individually identified instruments. |
| Full Python master/survey dual-workbook pipeline | Cutover uses the live export plus reviewed supplemental workbooks. |
| Full `CalibrationEvent` history | V1 deliberately keeps only current calibration state; it does not provide an audit ledger. |
| Managed certificate/media vault | Optional simple references remain; shared managed attachments need a later design and operations decision. |
| Department-owned shared-root ACLs / two-machine formal proof | D-027 enables default shared sync on the accepted sketch root; durable department ownership and formal multi-machine ops sign-off may still follow. |
| Live-data correction and cutover validation | Aggregate profiling is complete, but 50 identity-conflicted rows and eight invalid-date rows still block commit; protected import/restore rehearsal and cutover authorization remain outstanding. |
| Dashboard-heavy reporting | Derived health filters and counts are sufficient for initial use. |
| TanStack Table migration | Existing sibling-app table patterns are adequate at the expected scale. |
| Reicon migration | Keep sibling-app icon consistency; revisit only as a deliberate family-wide change. |

## Decision-change process

1. Add or update an entry in this file first.
2. Record the status and the reason for the change.
3. If replacing an accepted decision, mark the old entry **Superseded** and reference the new ID.
4. Reconcile README, PROJECT_DISCUSSION, implementation docs, tests, and examples in the same change.
5. Do not represent an **Open** item as an implementation default unless the decision register is updated.
