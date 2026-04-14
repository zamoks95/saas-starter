import { describe, expect, test } from "bun:test";
import type { User } from "./user.entity";

describe("User entity", () => {
  test("can be constructed with required fields", () => {
    const user: User = {
      id: "user-1",
      name: "Test User",
      email: "test@example.com",
      emailVerified: false,
      image: null,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    };

    expect(user.id).toBe("user-1");
    expect(user.name).toBe("Test User");
    expect(user.email).toBe("test@example.com");
    expect(user.emailVerified).toBe(false);
    expect(user.image).toBeNull();
  });

  test("image can be a string URL", () => {
    const user: User = {
      id: "user-1",
      name: "Test User",
      email: "test@example.com",
      emailVerified: true,
      image: "https://example.com/avatar.png",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    };

    expect(user.image).toBe("https://example.com/avatar.png");
    expect(user.emailVerified).toBe(true);
  });
});
