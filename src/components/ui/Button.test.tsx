import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

// Helper to check if element has a CSS module class (pattern: _classname_hash)
const hasModuleClass = (element: HTMLElement, className: string) => {
  return Array.from(element.classList).some((cls) =>
    cls.includes(`_${className}_`)
  );
};

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when loading", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(hasModuleClass(screen.getByRole("button"), "primary")).toBe(true);

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(hasModuleClass(screen.getByRole("button"), "secondary")).toBe(true);

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(hasModuleClass(screen.getByRole("button"), "ghost")).toBe(true);
  });

  it("applies size classes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(hasModuleClass(screen.getByRole("button"), "sm")).toBe(true);

    rerender(<Button size="lg">Large</Button>);
    expect(hasModuleClass(screen.getByRole("button"), "lg")).toBe(true);
  });
});
