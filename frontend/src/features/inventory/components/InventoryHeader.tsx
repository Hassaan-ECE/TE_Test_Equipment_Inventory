import { useState } from "react";
import { MoonIcon, PlusIcon, SunIcon } from "lucide-react";

import { ExportMenu } from "@/features/inventory/components/header/ExportMenu";
import { ScopeToggle } from "@/features/inventory/components/header/ScopeToggle";
import { UpdateActionButton } from "@/features/inventory/components/header/UpdateActionButton";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import type { InventoryScope, InventorySharedStatus, ThemeMode, UpdateState } from "@/features/inventory/types";

interface InventoryHeaderProps {
  archiveCount: number;
  canModifyEntries: boolean;
  inventoryCount: number;
  onAddEntry: () => void;
  onExportExcel: () => void;
  onExportHtml: () => void;
  onScopeChange: (scope: InventoryScope) => void;
  onThemeToggle: () => void;
  onUpdateAction: () => void;
  scope: InventoryScope;
  sharedStatus?: InventorySharedStatus;
  theme: ThemeMode;
  updateState: UpdateState;
}

export function InventoryHeader({
  archiveCount,
  canModifyEntries,
  inventoryCount,
  onAddEntry,
  onExportExcel,
  onExportHtml,
  onScopeChange,
  onThemeToggle,
  onUpdateAction,
  scope,
  sharedStatus,
  theme,
  updateState,
}: InventoryHeaderProps) {
  const [exportOpen, setExportOpen] = useState(false);
  const isLocalOnly = !sharedStatus?.enabled;
  const modeTitle = isLocalOnly
    ? sharedStatus?.message?.trim() ||
      "Shared sync is off for this session. Changes stay on this computer; sync is not a backup."
    : sharedStatus?.message?.trim() || "Shared sync enabled";

  return (
    <header
      className={cn(
        "relative shrink-0 border-b border-border px-3 py-3 sm:px-5",
        // Keep header above the search card so Export is never covered by it.
        exportOpen ? "z-50" : "z-30",
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
              <h1 className="min-w-0 text-2xl font-semibold tracking-tight text-foreground">
                TE Test Equipment Inventory
              </h1>
              <span
                className={
                  isLocalOnly
                    ? "rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-muted-foreground"
                    : "rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-emerald-700 dark:text-emerald-300"
                }
                title={modeTitle}
              >
                {isLocalOnly ? "Local" : "Shared"}
              </span>
              <UpdateActionButton state={updateState} onClick={onUpdateAction} />
            </div>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
          <ScopeToggle
            archiveCount={archiveCount}
            inventoryCount={inventoryCount}
            scope={scope}
            onScopeChange={onScopeChange}
          />

          <Button size="sm" variant="outline" onClick={onThemeToggle}>
            {theme === "light" ? <MoonIcon className="size-3.5" /> : <SunIcon className="size-3.5" />}
            {theme === "light" ? "Dark Theme" : "Light Theme"}
          </Button>
          <ExportMenu onExportExcel={onExportExcel} onExportHtml={onExportHtml} onOpenChange={setExportOpen} />
          <Button disabled={!canModifyEntries} size="sm" onClick={onAddEntry}>
            <PlusIcon className="size-3.5" />
            Add Entry
          </Button>
        </div>
      </div>
    </header>
  );
}
