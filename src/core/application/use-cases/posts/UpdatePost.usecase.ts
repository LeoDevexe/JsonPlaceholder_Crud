import { Post, UpdatePostDto } from '@domain/entities';
import { PostRepository } from '@domain/repositories';

export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(postDto: UpdatePostDto): Promise<Post> {
    this.validatePostDto(postDto);

    const existingPost = await this.postRepository.findById(postDto.id);
    if (!existingPost) {
      throw new Error(`Post with id ${postDto.id} not found`);
    }

    return await this.postRepository.update(postDto);
  }

  private validatePostDto(postDto: UpdatePostDto): void {
    if (!postDto.id || postDto.id <= 0) {
      throw new Error('Valid post id is required');
    }

    if (postDto.title !== undefined && postDto.title.trim() === '') {
      throw new Error('Title cannot be empty');
    }

    if (postDto.body !== undefined && postDto.body.trim() === '') {
      throw new Error('Body cannot be empty');
    }
  }
}

