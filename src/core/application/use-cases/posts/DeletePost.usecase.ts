import { PostRepository } from '@domain/repositories';

export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new Error('Valid post id is required');
    }

    const existingPost = await this.postRepository.findById(id);
    if (!existingPost) {
      throw new Error(`Post with id ${id} not found`);
    }

    await this.postRepository.delete(id);
  }
}

