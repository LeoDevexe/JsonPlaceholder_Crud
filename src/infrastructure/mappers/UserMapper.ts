import { User } from '@domain/entities';

export class UserMapper {
  static toDomain(data: unknown): User {
    const user = data as Record<string, unknown>;
    const address = (user.address || {}) as Record<string, unknown>;
    const geo = (address.geo || {}) as Record<string, unknown>;
    const company = (user.company || {}) as Record<string, unknown>;

    return {
      id: Number(user.id),
      name: String(user.name || ''),
      username: String(user.username || ''),
      email: String(user.email || ''),
      phone: String(user.phone || ''),
      website: String(user.website || ''),
      address: {
        street: String(address.street || ''),
        suite: String(address.suite || ''),
        city: String(address.city || ''),
        zipcode: String(address.zipcode || ''),
        geo: {
          lat: String(geo.lat || '0'),
          lng: String(geo.lng || '0'),
        },
      },
      company: {
        name: String(company.name || ''),
        catchPhrase: String(company.catchPhrase || ''),
        bs: String(company.bs || ''),
      },
    };
  }

  static toDomainList(data: unknown[]): User[] {
    return data.map(item => this.toDomain(item));
  }
}

