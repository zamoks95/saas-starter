import { describe, expect, test } from "bun:test";
import { GetProfileUseCase } from "./get-profile.use-case";
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

function createMockRepo(user: User | null): UserRepository {
  return {
    findById: async () => user,
    update: async () => mockUser,
    delete: async () => {},
  };
}

describe("GetProfileUseCase", () => {
  test("returns user when found", async () => {
    const useCase = new GetProfileUseCase(createMockRepo(mockUser));
    const result = await useCase.execute("user-1");
    expect(result).toEqual(mockUser);
  });

  test("throws NotFoundError when user does not exist", async () => {
    const useCase = new GetProfileUseCase(createMockRepo(null));
    expect(useCase.execute("missing")).rejects.toBeInstanceOf(NotFoundError);
  });
});
