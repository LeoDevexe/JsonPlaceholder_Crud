import { User } from '@domain/entities';

export interface UserServiceInputPort {
  getUsers(): Promise<User[]>;

  getUserById(id: number): Promise<User>;
}

