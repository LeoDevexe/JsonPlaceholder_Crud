import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { UserServiceInputPort } from '../ports/input';
import { GetUsersUseCase, GetUserByIdUseCase } from '../use-cases/users';

export class UserService implements UserServiceInputPort {
  private readonly getUsersUseCase: GetUsersUseCase;
  private readonly getUserByIdUseCase: GetUserByIdUseCase;

  constructor(userRepository: UserRepository) {
    this.getUsersUseCase = new GetUsersUseCase(userRepository);
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  }

  async getUsers(): Promise<User[]> {
    return await this.getUsersUseCase.execute();
  }

  async getUserById(id: number): Promise<User> {
    return await this.getUserByIdUseCase.execute(id);
  }
}
