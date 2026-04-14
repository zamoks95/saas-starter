import { describe, expect, test } from "bun:test";
import { UpdateProfileUseCase } from "./update-profile.use-case";
import { NotFoundError } from "../../domain/errors/domain-errors";
import type { UserRepository } from "../../domain/repositories/user.repository";
import type { User } from "../../domain/entities/user.entity";

const mockUser: User = {
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  emailVerified: false,
  image: null,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

function createMockRepo(
  findResult: User | null,
  updateResult?: User,
): UserRepository {
  return {
    findById: async () => findResult,
    update: async () => updateResult ?? mockUser,
    delete: async () => {},
  };
}

describe("UpdateProfileUseCase", () => {
  test("updates user name", async () => {
    const updated = { ...mockUser, name: "New Name" };
    const useCase = new UpdateProfileUseCase(
      createMockRepo(mockUser, updated),
    );
    const result = await useCase.execute("user-1", { name: "New Name" });
    expect(result.name).toBe("New Name");
  });

  test("throws NotFoundError when user does not exist", async () => {
    const useCase = new UpdateProfileUseCase(createMockRepo(null));
    expect(
      useCase.execute("missing", { name: "New" }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
