import { describe, expect, test } from "bun:test";
import { renderWelcomeEmail } from "./welcome.template";
import { renderVerificationEmail } from "./verification.template";
import { renderPasswordResetEmail } from "./password-reset.template";

describe("renderWelcomeEmail", () => {
  const result = renderWelcomeEmail({ name: "Alice" });

  test("returns subject", () => {
    expect(result.subject).toBeString();
    expect(result.subject.length).toBeGreaterThan(0);
  });

  test("returns html with user name", () => {
    expect(result.html).toContain("Alice");
    expect(result.html).toContain("<!DOCTYPE html>");
  });

  test("returns plain text fallback", () => {
    expect(result.text).toContain("Alice");
    expect(result.text).not.toContain("<");
  });
});

describe("renderVerificationEmail", () => {
  const result = renderVerificationEmail({
    name: "Bob",
    url: "https://example.com/verify?token=abc",
  });

  test("returns subject", () => {
    expect(result.subject).toBeString();
    expect(result.subject.length).toBeGreaterThan(0);
  });

  test("returns html with verification link", () => {
    expect(result.html).toContain("Bob");
    expect(result.html).toContain("https://example.com/verify?token=abc");
    expect(result.html).toContain("<a ");
  });

  test("returns plain text with verification url", () => {
    expect(result.text).toContain("Bob");
    expect(result.text).toContain("https://example.com/verify?token=abc");
  });
});

describe("renderPasswordResetEmail", () => {
  const result = renderPasswordResetEmail({
    name: "Carol",
    url: "https://example.com/reset?token=xyz",
  });

  test("returns subject", () => {
    expect(result.subject).toBeString();
    expect(result.subject.length).toBeGreaterThan(0);
  });

  test("returns html with reset link", () => {
    expect(result.html).toContain("Carol");
    expect(result.html).toContain("https://example.com/reset?token=xyz");
    expect(result.html).toContain("<a ");
  });

  test("includes security notice", () => {
    expect(result.html).toContain("didn't request");
    expect(result.text).toContain("didn't request");
  });

  test("returns plain text with reset url", () => {
    expect(result.text).toContain("Carol");
    expect(result.text).toContain("https://example.com/reset?token=xyz");
  });
});
