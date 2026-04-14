import { describe, expect, test } from "bun:test";
import {
  DomainError,
  NotFoundError,
  ValidationError,
} from "./domain-errors";

describe("DomainError", () => {
  test("sets name to class name", () => {
    const error = new DomainError("test");
    expect(error.name).toBe("DomainError");
    expect(error.message).toBe("test");
  });
});

describe("NotFoundError", () => {
  test("formats message with resource and id", () => {
    const error = new NotFoundError("User", "123");
    expect(error.message).toBe("User with id '123' not found");
    expect(error.name).toBe("NotFoundError");
    expect(error).toBeInstanceOf(DomainError);
  });
});

describe("ValidationError", () => {
  test("stores details array", () => {
    const error = new ValidationError("Invalid input", ["field is required"]);
    expect(error.message).toBe("Invalid input");
    expect(error.details).toEqual(["field is required"]);
    expect(error.name).toBe("ValidationError");
    expect(error).toBeInstanceOf(DomainError);
  });

  test("defaults to empty details", () => {
    const error = new ValidationError("Invalid");
    expect(error.details).toEqual([]);
  });
});
