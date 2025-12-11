import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }
}

