import { Post, CreatePostDto, UpdatePostDto } from '@domain/entities';
import { PostRepository } from '@domain/repositories';
import { Pagination } from '@domain/value-objects/Pagination.vo';
import { SortCriteria } from '@domain/value-objects/SortCriteria.vo';
import { FilterCriteria } from '@domain/value-objects/FilterCriteria.vo';
import { PaginatedResponse } from '@shared/types';
import { HttpClient } from '@application/ports/output';
import { API_ENDPOINTS } from '../../config/constants';
import { PostMapper } from '../../mappers/PostMapper';
import { LocalStorageAdapter } from '../storage/LocalStorageAdapter';

export class JsonPlaceholderPostRepository implements PostRepository {
  private readonly storage: LocalStorageAdapter;
  private readonly CREATED_POSTS_KEY = 'created_posts';
  private readonly UPDATED_POSTS_KEY = 'updated_posts';
  private readonly DELETED_POSTS_KEY = 'deleted_posts';
  private nextTempId = 10001; // IDs temporales para posts creados

  constructor(private readonly httpClient: HttpClient) {
    this.storage = new LocalStorageAdapter();
  }

  private getCreatedPosts(): Post[] {
    return this.storage.get<Post[]>(this.CREATED_POSTS_KEY) || [];
  }

  private getUpdatedPosts(): Record<number, Post> {
    return this.storage.get<Record<number, Post>>(this.UPDATED_POSTS_KEY) || {};
  }

  private getDeletedPostIds(): number[] {
    return this.storage.get<number[]>(this.DELETED_POSTS_KEY) || [];
  }

  private saveCreatedPost(post: Post): void {
    const createdPosts = this.getCreatedPosts();
    createdPosts.unshift(post); // Agregar al inicio
    this.storage.set(this.CREATED_POSTS_KEY, createdPosts);
  }

  private saveUpdatedPost(post: Post): void {
    const updatedPosts = this.getUpdatedPosts();
    updatedPosts[post.id] = post;
    this.storage.set(this.UPDATED_POSTS_KEY, updatedPosts);
  }

  private saveDeletedPostId(id: number): void {
    const deletedIds = this.getDeletedPostIds();
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      this.storage.set(this.DELETED_POSTS_KEY, deletedIds);
    }
  }

  private mergePosts(apiPosts: Post[]): Post[] {
    const createdPosts = this.getCreatedPosts();
    const updatedPosts = this.getUpdatedPosts();
    const deletedIds = this.getDeletedPostIds();

    // Filtrar posts eliminados y aplicar actualizaciones
    let mergedPosts = apiPosts
      .filter(post => !deletedIds.includes(post.id))
      .map(post => updatedPosts[post.id] || post);

    // Agregar posts creados localmente al inicio
    mergedPosts = [...createdPosts, ...mergedPosts];

    return mergedPosts;
  }

  async findAll(
    pagination: Pagination,
    sort?: SortCriteria,
    filters?: FilterCriteria[]
  ): Promise<PaginatedResponse<Post>> {
    // Obtener posts de la API
    const allPosts = await this.httpClient.get<unknown[]>(API_ENDPOINTS.POSTS);
    let posts = PostMapper.toDomainList(allPosts);

    // Combinar con posts creados/actualizados/eliminados localmente
    posts = this.mergePosts(posts);

    // Aplicar filtros
    if (filters && filters.length > 0) {
      posts = this.applyFilters(posts, filters);
    }

    // Aplicar ordenamiento
    if (sort) {
      posts = this.applySort(posts, sort);
    }

    // Calcular totales
    const total = posts.length;
    const totalPages = Math.ceil(total / pagination.limit);

    // Aplicar paginación
    const start = pagination.offset;
    const end = start + pagination.limit;
    const paginatedPosts = posts.slice(start, end);

    return {
      data: paginatedPosts,
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages,
    };
  }

  private applyFilters(posts: Post[], filters: FilterCriteria[]): Post[] {
    return posts.filter(post => {
      return filters.every(filter => {
        const value = String(post[filter.field as keyof Post] || '');
        return filter.matches(value);
      });
    });
  }

  private applySort(posts: Post[], sort: SortCriteria): Post[] {
    return [...posts].sort((a, b) => {
      const field = sort.field as keyof Post;
      const aValue = a[field];
      const bValue = b[field];

      // Si los valores son números, hacer comparación numérica
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (sort.isAscending()) {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }

      // Para strings, usar localeCompare
      const aString = String(aValue || '');
      const bString = String(bValue || '');

      if (sort.isAscending()) {
        return aString.localeCompare(bString);
      } else {
        return bString.localeCompare(aString);
      }
    });
  }

  async findById(id: number): Promise<Post | null> {
    // Verificar si el post fue eliminado
    const deletedIds = this.getDeletedPostIds();
    if (deletedIds.includes(id)) {
      return null;
    }

    // Verificar si el post fue actualizado localmente
    const updatedPosts = this.getUpdatedPosts();
    if (updatedPosts[id]) {
      return updatedPosts[id];
    }

    // Verificar si es un post creado localmente
    const createdPosts = this.getCreatedPosts();
    const createdPost = createdPosts.find(p => p.id === id);
    if (createdPost) {
      return createdPost;
    }

    // Buscar en la API
    try {
      const data = await this.httpClient.get<unknown>(`${API_ENDPOINTS.POSTS}/${id}`);
      return PostMapper.toDomain(data);
    } catch (error) {
      return null;
    }
  }

  async create(postDto: CreatePostDto): Promise<Post> {
    // Llamar a la API (aunque no persista realmente)
    await this.httpClient.post<unknown>(
      API_ENDPOINTS.POSTS,
      PostMapper.toApi(postDto)
    );

    // Crear el post con un ID temporal
    const newPost: Post = {
      id: this.nextTempId++,
      userId: postDto.userId,
      title: postDto.title,
      body: postDto.body,
    };

    // Guardar en localStorage
    this.saveCreatedPost(newPost);

    return newPost;
  }

  async update(postDto: UpdatePostDto): Promise<Post> {
    // Obtener el post actual
    const existingPost = await this.findById(postDto.id);
    if (!existingPost) {
      throw new Error(`Post with id ${postDto.id} not found`);
    }

    // Crear el post actualizado
    const updatedPost: Post = {
      ...existingPost,
      ...postDto,
      id: postDto.id,
    };

    // Extraer el id para no enviarlo en el body
    const { id, ...postWithoutId } = postDto;

    // Llamar a la API (aunque no persista realmente)
    // Solo para posts que vienen de la API (id < 10000)
    if (id < 10000) {
      try {
        await this.httpClient.put<unknown>(
          `${API_ENDPOINTS.POSTS}/${id}`,
          postWithoutId
        );
      } catch (error) {
        // Si falla la API, aún así guardamos localmente
        console.warn('API update failed, saving locally:', error);
      }
    }

    // Si es un post creado localmente, actualizar en la lista de creados
    const createdPosts = this.getCreatedPosts();
    const createdIndex = createdPosts.findIndex(p => p.id === postDto.id);
    if (createdIndex !== -1) {
      createdPosts[createdIndex] = updatedPost;
      this.storage.set(this.CREATED_POSTS_KEY, createdPosts);
    } else {
      // Si es un post de la API, guardar en actualizados
      this.saveUpdatedPost(updatedPost);
    }

    return updatedPost;
  }

  async delete(id: number): Promise<void> {
    // Si es un post creado localmente, eliminarlo de la lista
    const createdPosts = this.getCreatedPosts();
    const filteredCreated = createdPosts.filter(p => p.id !== id);
    if (filteredCreated.length !== createdPosts.length) {
      this.storage.set(this.CREATED_POSTS_KEY, filteredCreated);
      return;
    }

    // Llamar a la API solo para posts que vienen de la API (id < 10000)
    if (id < 10000) {
      try {
        await this.httpClient.delete(`${API_ENDPOINTS.POSTS}/${id}`);
      } catch (error) {
        // Si falla la API, aún así guardamos localmente
        console.warn('API delete failed, saving locally:', error);
      }
    }

    // Si es un post de la API, agregarlo a la lista de eliminados
    this.saveDeletedPostId(id);

    // Remover de actualizados si existe
    const updatedPosts = this.getUpdatedPosts();
    if (updatedPosts[id]) {
      delete updatedPosts[id];
      this.storage.set(this.UPDATED_POSTS_KEY, updatedPosts);
    }
  }
}

