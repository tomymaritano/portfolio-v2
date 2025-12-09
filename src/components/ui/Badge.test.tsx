import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

// Helper to check if element has a CSS module class (pattern: _classname_hash)
const hasModuleClass = (element: HTMLElement, className: string) => {
  return Array.from(element.classList).some((cls) =>
    cls.includes(`_${className}_`)
  );
};

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    render(<Badge>Default</Badge>);
    expect(hasModuleClass(screen.getByText("Default"), "default")).toBe(true);
  });

  it("applies accent variant", () => {
    render(<Badge variant="accent">Accent</Badge>);
    expect(hasModuleClass(screen.getByText("Accent"), "accent")).toBe(true);
  });

  it("applies success variant", () => {
    render(<Badge variant="success">Success</Badge>);
    expect(hasModuleClass(screen.getByText("Success"), "success")).toBe(true);
  });

  it("applies warning variant", () => {
    render(<Badge variant="warning">Warning</Badge>);
    expect(hasModuleClass(screen.getByText("Warning"), "warning")).toBe(true);
  });

  it("applies error variant", () => {
    render(<Badge variant="error">Error</Badge>);
    expect(hasModuleClass(screen.getByText("Error"), "error")).toBe(true);
  });

  it("applies size classes", () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(hasModuleClass(screen.getByText("Small"), "sm")).toBe(true);

    rerender(<Badge size="md">Medium</Badge>);
    expect(hasModuleClass(screen.getByText("Medium"), "md")).toBe(true);
  });
});
