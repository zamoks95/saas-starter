import { describe, expect, test } from "bun:test";
import { createBaseLayout } from "./base-layout";

describe("createBaseLayout", () => {
  test("wraps content in a complete HTML document", () => {
    const html = createBaseLayout("<p>Hello</p>");

    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
    expect(html).toContain("<p>Hello</p>");
  });

  test("includes app name in header", () => {
    const html = createBaseLayout("<p>Test</p>");

    expect(html).toContain("SaaS Starter");
  });

  test("includes support email in footer", () => {
    const html = createBaseLayout("<p>Test</p>");

    expect(html).toContain("noreply@example.com");
  });

  test("uses inline styles", () => {
    const html = createBaseLayout("<p>Test</p>");

    expect(html).toContain('style="');
  });
});
