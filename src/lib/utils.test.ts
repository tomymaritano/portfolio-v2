import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("combines class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
  });

  it("returns empty string for no classes", () => {
    expect(cn()).toBe("");
  });
});
