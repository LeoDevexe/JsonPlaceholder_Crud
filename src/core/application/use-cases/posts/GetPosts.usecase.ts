import { Post } from '@domain/entities';
import { PostRepository } from '@domain/repositories';
import { Pagination, SortCriteria, FilterCriteria as FilterCriteriaVO } from '@domain/value-objects';
import { PaginatedResponse, SortParams } from '@shared/types';
import { FilterCriteria } from '@shared/types/filter.types';

export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(
    page: number,
    limit: number,
    sort?: SortParams,
    filters?: FilterCriteria[]
  ): Promise<PaginatedResponse<Post>> {
    const pagination = Pagination.create(page, limit);

    const sortCriteria = sort
      ? SortCriteria.create(sort.field, sort.direction as 'asc' | 'desc')
      : undefined;

    const filterCriteria = filters?.map(filter =>
      FilterCriteriaVO.create(filter.field, filter.operator, filter.value)
    );

    return await this.postRepository.findAll(pagination, sortCriteria, filterCriteria);
  }
}

