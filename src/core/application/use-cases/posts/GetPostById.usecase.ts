import { Post } from '@domain/entities';
import { PostRepository } from '@domain/repositories';

export class GetPostByIdUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: number): Promise<Post> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }

    return post;
  }
}

