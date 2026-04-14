import { describe, expect, test } from "bun:test";
import { Elysia } from "elysia";
import { errorPlugin } from "../../plugins/error.plugin";
import type { UserRepository } from "../../../domain/repositories/user.repository";
import type { User } from "../../../domain/entities/user.entity";

const mockUser: User = {
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  emailVerified: false,
  image: null,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

function toUserResponse(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    createdAt: user.createdAt.toISOString(),
  };
}

function createTestApp(
  authenticated: boolean,
  repo: Partial<UserRepository> = {},
) {
  const userRepo: UserRepository = {
    findById: repo.findById ?? (async () => mockUser),
    update: repo.update ?? (async () => mockUser),
    delete: repo.delete ?? (async () => {}),
  };

  return new Elysia()
    .use(errorPlugin)
    .decorate("userRepo", userRepo)
    .resolve(() => ({
      user: authenticated ? ({ id: "user-1" } as { id: string } | null) : null,
      session: authenticated
        ? ({ id: "session-1" } as { id: string } | null)
        : null,
    }))
    .onBeforeHandle(({ user, set }) => {
      if (!user) {
        set.status = 401;
        return { code: "UNAUTHORIZED", message: "Authentication required" };
      }
    })
    .get("/me", async ({ user, userRepo: ur }) => {
      const { GetProfileUseCase } = await import(
        "../../../application/use-cases/get-profile.use-case"
      );
      const useCase = new GetProfileUseCase(ur);
      const profile = await useCase.execute(user!.id);
      return toUserResponse(profile);
    })
    .patch("/me", async ({ user, userRepo: ur, request, set }) => {
      const { UpdateProfileRequestSchema } = await import("@repo/shared");
      const body = await request.json();
      const parsed = UpdateProfileRequestSchema.safeParse(body);
      if (!parsed.success) {
        set.status = 400;
        return {
          code: "VALIDATION_ERROR",
          message: parsed.error.issues[0].message,
        };
      }
      const { UpdateProfileUseCase } = await import(
        "../../../application/use-cases/update-profile.use-case"
      );
      const useCase = new UpdateProfileUseCase(ur);
      const updated = await useCase.execute(user!.id, parsed.data);
      return toUserResponse(updated);
    })
    .delete("/me", async ({ user, userRepo: ur, set }) => {
      const { DeleteAccountUseCase } = await import(
        "../../../application/use-cases/delete-account.use-case"
      );
      const useCase = new DeleteAccountUseCase(ur);
      await useCase.execute(user!.id);
      set.status = 204;
    });
}

describe("GET /me", () => {
  test("returns user profile when authenticated", async () => {
    const app = createTestApp(true);
    const res = await app.handle(new Request("http://localhost/me"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe("user-1");
    expect(body.name).toBe("Test User");
    expect(body.email).toBe("test@example.com");
  });

  test("returns 401 when unauthenticated", async () => {
    const app = createTestApp(false);
    const res = await app.handle(new Request("http://localhost/me"));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.code).toBe("UNAUTHORIZED");
  });
});

describe("PATCH /me", () => {
  test("updates user name", async () => {
    const updated = { ...mockUser, name: "New Name" };
    const app = createTestApp(true, {
      update: async () => updated,
    });
    const res = await app.handle(
      new Request("http://localhost/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "New Name" }),
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.name).toBe("New Name");
  });

  test("rejects empty body", async () => {
    const app = createTestApp(true);
    const res = await app.handle(
      new Request("http://localhost/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }),
    );
    expect(res.status).toBe(400);
  });
});

describe("DELETE /me", () => {
  test("deletes user and returns 204", async () => {
    let deleted = false;
    const app = createTestApp(true, {
      delete: async () => {
        deleted = true;
      },
    });
    const res = await app.handle(
      new Request("http://localhost/me", { method: "DELETE" }),
    );
    expect(res.status).toBe(204);
    expect(deleted).toBe(true);
  });

  test("returns 401 when unauthenticated", async () => {
    const app = createTestApp(false);
    const res = await app.handle(
      new Request("http://localhost/me", { method: "DELETE" }),
    );
    expect(res.status).toBe(401);
  });
});
