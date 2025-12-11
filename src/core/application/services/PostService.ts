import { Post, CreatePostDto, UpdatePostDto } from '@domain/entities';
import { PostRepository } from '@domain/repositories';
import { PostServiceInputPort } from '../ports/input';
import { PaginatedResponse, SortParams } from '@shared/types';
import { FilterCriteria } from '@shared/types/filter.types';
import {
  GetPostsUseCase,
  GetPostByIdUseCase,
  CreatePostUseCase,
  UpdatePostUseCase,
  DeletePostUseCase,
} from '../use-cases/posts';

export class PostService implements PostServiceInputPort {
  private readonly getPostsUseCase: GetPostsUseCase;
  private readonly getPostByIdUseCase: GetPostByIdUseCase;
  private readonly createPostUseCase: CreatePostUseCase;
  private readonly updatePostUseCase: UpdatePostUseCase;
  private readonly deletePostUseCase: DeletePostUseCase;

  constructor(postRepository: PostRepository) {
    this.getPostsUseCase = new GetPostsUseCase(postRepository);
    this.getPostByIdUseCase = new GetPostByIdUseCase(postRepository);
    this.createPostUseCase = new CreatePostUseCase(postRepository);
    this.updatePostUseCase = new UpdatePostUseCase(postRepository);
    this.deletePostUseCase = new DeletePostUseCase(postRepository);
  }

  async getPosts(
    page: number,
    limit: number,
    sort?: SortParams,
    filters?: FilterCriteria[]
  ): Promise<PaginatedResponse<Post>> {
    return await this.getPostsUseCase.execute(page, limit, sort, filters);
  }

  async getPostById(id: number): Promise<Post> {
    return await this.getPostByIdUseCase.execute(id);
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    return await this.createPostUseCase.execute(post);
  }

  async updatePost(post: UpdatePostDto): Promise<Post> {
    return await this.updatePostUseCase.execute(post);
  }

  async deletePost(id: number): Promise<void> {
    return await this.deletePostUseCase.execute(id);
  }
}
