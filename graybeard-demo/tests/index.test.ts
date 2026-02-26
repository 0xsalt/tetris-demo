import { describe, expect, test } from "bun:test";
import { greet } from "../src/index";

describe("greet", () => {
  test("returns greeting with name", () => {
    expect(greet("Chris")).toBe("Hello, Chris!");
  });

  test("handles empty string", () => {
    expect(greet("")).toBe("Hello, !");
  });
});
