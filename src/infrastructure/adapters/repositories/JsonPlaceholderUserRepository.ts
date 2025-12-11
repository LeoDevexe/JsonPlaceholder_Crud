import { User } from '@domain/entities';
import { UserRepository } from '@domain/repositories';
import { HttpClient } from '@application/ports/output';
import { API_ENDPOINTS } from '../../config/constants';
import { UserMapper } from '../../mappers/UserMapper';

export class JsonPlaceholderUserRepository implements UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async findAll(): Promise<User[]> {
    const data = await this.httpClient.get<unknown[]>(API_ENDPOINTS.USERS);
    return UserMapper.toDomainList(data);
  }

  async findById(id: number): Promise<User | null> {
    try {
      const data = await this.httpClient.get<unknown>(`${API_ENDPOINTS.USERS}/${id}`);
      return UserMapper.toDomain(data);
    } catch (error) {
      return null;
    }
  }
}

