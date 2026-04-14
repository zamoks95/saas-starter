import type { UserRepository } from "../../domain/repositories/user.repository";
import { NotFoundError } from "../../domain/errors/domain-errors";
import type { User } from "../../domain/entities/user.entity";

interface UpdateProfileInput {
  name?: string;
  image?: string;
}

export class UpdateProfileUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string, input: UpdateProfileInput): Promise<User> {
    const existing = await this.userRepo.findById(userId);
    if (!existing) {
      throw new NotFoundError("User", userId);
    }
    return this.userRepo.update(userId, input);
  }
}
