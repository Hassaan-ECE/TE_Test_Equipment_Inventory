import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { InventoryShell } from "@/features/inventory/components/InventoryShell";

describe("InventoryShell import UI", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    delete window.inventoryDesktop;
  });

  it("does not expose an Import header action (one-time data load is offline/agent-driven)", () => {
    render(<InventoryShell />);
    expect(screen.queryByRole("button", { name: "Import" })).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: "Import equipment" })).not.toBeInTheDocument();
  });
});
