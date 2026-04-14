import { Elysia } from "elysia";
import {
  UpdateProfileRequestSchema,
  ChangePasswordRequestSchema,
} from "@repo/shared";
import { diPlugin } from "../../plugins/di.plugin";
import { auth } from "../../auth/auth";
import { GetProfileUseCase } from "../../../application/use-cases/get-profile.use-case";
import { UpdateProfileUseCase } from "../../../application/use-cases/update-profile.use-case";
import { DeleteAccountUseCase } from "../../../application/use-cases/delete-account.use-case";
import { ValidationError } from "../../../domain/errors/domain-errors";
import type { UserResponse } from "@repo/shared";
import type { User } from "../../../domain/entities/user.entity";

function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    createdAt: user.createdAt.toISOString(),
  };
}

export const meRoutes = new Elysia({ prefix: "/me" })
  .use(diPlugin)
  .resolve(async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    return {
      user: session?.user as {
        id: string;
        name: string;
        email: string;
      } | null,
      session: session?.session as { id: string } | null,
    };
  })
  .onBeforeHandle(({ user, set }) => {
    if (!user) {
      set.status = 401;
      return { code: "UNAUTHORIZED", message: "Authentication required" };
    }
  })
  .get("/", async ({ user, userRepo }) => {
    const useCase = new GetProfileUseCase(userRepo);
    const profile = await useCase.execute(user!.id);
    return toUserResponse(profile);
  })
  .patch("/", async ({ user, userRepo, request }) => {
    const body = await request.json();
    const parsed = UpdateProfileRequestSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError("Invalid request body", [
        parsed.error.issues[0].message,
      ]);
    }
    const useCase = new UpdateProfileUseCase(userRepo);
    const updated = await useCase.execute(user!.id, parsed.data);
    return toUserResponse(updated);
  })
  .delete("/", async ({ user, userRepo, set }) => {
    const useCase = new DeleteAccountUseCase(userRepo);
    await useCase.execute(user!.id);
    set.status = 204;
  })
  .patch("/password", async ({ request, set }) => {
    const body = await request.json();
    const parsed = ChangePasswordRequestSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError("Invalid request body", [
        parsed.error.issues[0].message,
      ]);
    }
    try {
      await auth.api.changePassword({
        headers: request.headers,
        body: {
          currentPassword: parsed.data.currentPassword,
          newPassword: parsed.data.newPassword,
          revokeOtherSessions: false,
        },
      });
    } catch {
      set.status = 400;
      return {
        code: "BAD_REQUEST",
        message: "Current password is incorrect",
      };
    }
    return { message: "Password changed successfully" };
  });
