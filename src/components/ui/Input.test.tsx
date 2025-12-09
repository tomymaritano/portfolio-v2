import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

// Helper to check if element has a CSS module class (pattern: _classname_hash)
const hasModuleClass = (element: HTMLElement, className: string) => {
  return Array.from(element.classList).some((cls) =>
    cls.includes(`_${className}_`)
  );
};

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("handles value changes", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("applies error state", () => {
    render(<Input error data-testid="input-wrapper" />);
    const wrapper = screen.getByRole("textbox").parentElement;
    expect(hasModuleClass(wrapper!, "error")).toBe(true);
  });

  it("renders with icon", () => {
    render(<Input icon={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
