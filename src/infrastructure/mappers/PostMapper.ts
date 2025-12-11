import { Post } from '@domain/entities';

export class PostMapper {
  static toDomain(data: unknown): Post {
    const post = data as Record<string, unknown>;

    return {
      id: Number(post.id),
      userId: Number(post.userId),
      title: String(post.title || ''),
      body: String(post.body || ''),
    };
  }

  static toDomainList(data: unknown[]): Post[] {
    return data.map(item => this.toDomain(item));
  }

  static toApi(post: Partial<Post>): Record<string, unknown> {
    return {
      ...(post.id && { id: post.id }),
      ...(post.userId && { userId: post.userId }),
      ...(post.title && { title: post.title }),
      ...(post.body && { body: post.body }),
    };
  }
}

