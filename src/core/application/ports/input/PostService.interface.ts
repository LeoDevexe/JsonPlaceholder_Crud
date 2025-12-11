import { Post, CreatePostDto, UpdatePostDto } from '@domain/entities';
import { PaginatedResponse, SortParams } from '@shared/types';
import { FilterCriteria } from '@shared/types/filter.types';

export interface PostServiceInputPort {
  getPosts(
    page: number,
    limit: number,
    sort?: SortParams,
    filters?: FilterCriteria[]
  ): Promise<PaginatedResponse<Post>>;

  getPostById(id: number): Promise<Post>;

  createPost(post: CreatePostDto): Promise<Post>;

  updatePost(post: UpdatePostDto): Promise<Post>;

  deletePost(id: number): Promise<void>;
}

