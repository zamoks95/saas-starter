import { Elysia } from "elysia";
import { auth } from "../auth/auth";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}

export const authPlugin = new Elysia({ name: "auth" })
  .derive(
    { as: "scoped" },
    async ({ request }): Promise<{
      user: AuthUser | null;
      session: AuthSession | null;
    }> => {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      return {
        user: (session?.user as AuthUser) ?? null,
        session: (session?.session as AuthSession) ?? null,
      };
    },
  );
