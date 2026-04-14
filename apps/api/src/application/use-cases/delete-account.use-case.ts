import type { UserRepository } from "../../domain/repositories/user.repository";
import { NotFoundError } from "../../domain/errors/domain-errors";

export class DeleteAccountUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string): Promise<void> {
    const existing = await this.userRepo.findById(userId);
    if (!existing) {
      throw new NotFoundError("User", userId);
    }
    await this.userRepo.delete(userId);
  }
}
