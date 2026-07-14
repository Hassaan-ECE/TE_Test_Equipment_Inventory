import { convertFileSrc, invoke, isTauri } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";

import {
  parseBoolean,
  parseDeleteMutationResult,
  parseEntryMutationResult,
  parseExcelExportResult,
  parseInventoryQueryResult,
  parseInventorySyncResult,
  parseImportCommitResult,
  parseImportDryRunReport,
  parseNullableString,
} from "@/integrations/tauri/bridgeGuards";
import type {
  InventoryEntryEditContext,
  InventoryEntryInput,
  InventoryQueryInput,
  ImportCommitInput,
} from "@/features/inventory/types";

// Window geometry restore is intentionally disabled — it was breaking window layout on some monitors.

if (typeof window !== "undefined" && isTauri()) {
  window.inventoryDesktop = {
    isDesktop: true,
    loadInventory: () => invoke("load_inventory").then(parseInventorySyncResult),
    queryInventory: (input: InventoryQueryInput) =>
      invoke("query_inventory", { input }).then(parseInventoryQueryResult),
    syncInventory: () => invoke("sync_inventory").then(parseInventorySyncResult),
    toggleVerifiedEntry: (entryId: string, nextVerified: boolean) =>
      invoke("toggle_verified_entry", {
        entryId,
        nextVerified,
      }).then(parseEntryMutationResult),
    createEntry: (input: InventoryEntryInput) =>
      invoke("create_entry", { input }).then(parseEntryMutationResult),
    updateEntry: (entryId: string, input: InventoryEntryInput, editContext?: InventoryEntryEditContext) =>
      invoke("update_entry", { editContext, entryId, input }).then(parseEntryMutationResult),
    setArchivedEntry: (entryId: string, archived: boolean) =>
      invoke("set_archived_entry", {
        entryId,
        archived,
      }).then(parseEntryMutationResult),
    deleteEntry: (entryId: string) =>
      invoke("delete_entry", { entryId }).then(parseDeleteMutationResult),
    openExternal: async (url: string) =>
      invoke("open_external", { url }).then((value) => parseBoolean(value, "open_external result")),
    openPath: async (path: string) =>
      invoke("open_path", { path }).then((value) => parseBoolean(value, "open_path result")),
    loadPicturePreview: async (path: string) => {
      const previewPath = await invoke("load_picture_preview", { path }).then((value) =>
        parseNullableString(value, "picture preview path"),
      );
      return previewPath ? convertFileSrc(previewPath) : null;
    },
    pickPicturePath: () =>
      invoke("pick_picture_path").then((value) => parseNullableString(value, "picked picture path")),
    pickImportFile: () =>
      invoke("pick_import_file").then((value) => parseNullableString(value, "picked import path")),
    previewImport: (path: string) =>
      invoke("preview_import", { path }).then(parseImportDryRunReport),
    commitImport: (input: ImportCommitInput) =>
      invoke("commit_import", { input }).then(parseImportCommitResult),
    exportExcel: () =>
      invoke("export_excel").then(parseExcelExportResult),
    onSharedInventoryChanged: listenToSharedInventoryChanged,
  };
}
function listenToSharedInventoryChanged(callback: () => void): () => void {
  let disposed = false;
  let unlisten: UnlistenFn | null = null;

  void listen("inventory:shared-changed", () => {
    callback();
  })
    .then((nextUnlisten) => {
      if (disposed) {
        nextUnlisten();
        return;
      }

      unlisten = nextUnlisten;
    })
    .catch(() => undefined);

  return () => {
    disposed = true;
    unlisten?.();
    unlisten = null;
  };
}
