import { Post, CreatePostDto } from '@domain/entities';
import { PostRepository } from '@domain/repositories';

export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(postDto: CreatePostDto): Promise<Post> {
    this.validatePostDto(postDto);
    return await this.postRepository.create(postDto);
  }

  private validatePostDto(postDto: CreatePostDto): void {
    if (!postDto.title || postDto.title.trim() === '') {
      throw new Error('Title is required');
    }

    if (!postDto.body || postDto.body.trim() === '') {
      throw new Error('Body is required');
    }

    if (!postDto.userId || postDto.userId <= 0) {
      throw new Error('Valid userId is required');
    }
  }
}

