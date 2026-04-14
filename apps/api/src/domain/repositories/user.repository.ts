import type { User } from "../entities/user.entity";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  update(id: string, data: Partial<Pick<User, "name" | "image">>): Promise<User>;
  delete(id: string): Promise<void>;
}
