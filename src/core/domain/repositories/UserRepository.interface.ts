import { User } from '../entities';

export interface UserRepository {
  findAll(): Promise<User[]>;

  findById(id: number): Promise<User | null>;
}

