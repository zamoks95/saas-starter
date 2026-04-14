import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import {
  user as userTable,
  session as sessionTable,
  account as accountTable,
} from "@repo/db/schema";
import type * as schema from "@repo/db/schema";
import type { User } from "../../domain/entities/user.entity";
import type { UserRepository } from "../../domain/repositories/user.repository";
import { NotFoundError } from "../../domain/errors/domain-errors";

type Database = PostgresJsDatabase<typeof schema>;

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: Database) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async update(
    id: string,
    data: Partial<Pick<User, "name" | "image">>,
  ): Promise<User> {
    const result = await this.db
      .update(userTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(userTable.id, id))
      .returning();

    if (!result[0]) {
      throw new NotFoundError("User", id);
    }
    return result[0];
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(sessionTable).where(eq(sessionTable.userId, id));
    await this.db.delete(accountTable).where(eq(accountTable.userId, id));
    await this.db.delete(userTable).where(eq(userTable.id, id));
  }
}
