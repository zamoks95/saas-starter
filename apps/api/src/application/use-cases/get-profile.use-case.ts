import type { UserRepository } from "../../domain/repositories/user.repository";
import { NotFoundError } from "../../domain/errors/domain-errors";
import type { User } from "../../domain/entities/user.entity";

export class GetProfileUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError("User", userId);
    }
    return user;
  }
}
