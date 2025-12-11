import { createContext } from 'react';
import { Post, CreatePostDto, UpdatePostDto } from '@domain/entities';
import { PaginatedResponse, SortParams } from '@shared/types';
import { FilterCriteria } from '@shared/types/filter.types';

export interface PostContextValue {
  posts: Post[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sort: SortParams | null;
  filters: FilterCriteria[];
  fetchPosts: () => Promise<void>;
  createPost: (post: CreatePostDto) => Promise<void>;
  updatePost: (post: UpdatePostDto) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSort: (sort: SortParams | null) => void;
  setFilters: (filters: FilterCriteria[]) => void;
  addFilter: (filter: FilterCriteria) => void;
  removeFilter: (field: string) => void;
  clearFilters: () => void;
}

export const PostContext = createContext<PostContextValue | undefined>(undefined);

