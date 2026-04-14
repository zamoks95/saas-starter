import { describe, expect, test } from "bun:test";
import { DeleteAccountUseCase } from "./delete-account.use-case";
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

let deletedId: string | null = null;

function createMockRepo(findResult: User | null): UserRepository {
  deletedId = null;
  return {
    findById: async () => findResult,
    update: async () => mockUser,
    delete: async (id: string) => {
      deletedId = id;
    },
  };
}

describe("DeleteAccountUseCase", () => {
  test("deletes user when found", async () => {
    const useCase = new DeleteAccountUseCase(createMockRepo(mockUser));
    await useCase.execute("user-1");
    expect(deletedId).toBe("user-1");
  });

  test("throws NotFoundError when user does not exist", async () => {
    const useCase = new DeleteAccountUseCase(createMockRepo(null));
    expect(useCase.execute("missing")).rejects.toBeInstanceOf(NotFoundError);
  });
});
