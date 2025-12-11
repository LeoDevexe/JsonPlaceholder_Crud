import { Post, CreatePostDto, UpdatePostDto } from '../entities';
import { Pagination } from '../value-objects/Pagination.vo';
import { SortCriteria } from '../value-objects/SortCriteria.vo';
import { FilterCriteria } from '../value-objects/FilterCriteria.vo';
import { PaginatedResponse } from '@shared/types';

export interface PostRepository {
  findAll(
    pagination: Pagination,
    sort?: SortCriteria,
    filters?: FilterCriteria[]
  ): Promise<PaginatedResponse<Post>>;

  findById(id: number): Promise<Post | null>;

  create(post: CreatePostDto): Promise<Post>;

  update(post: UpdatePostDto): Promise<Post>;

  delete(id: number): Promise<void>;
}

