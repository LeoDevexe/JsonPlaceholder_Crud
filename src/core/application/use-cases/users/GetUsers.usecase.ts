import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}

