import { ReactNode, useState, useCallback, useEffect } from 'react';
import { Post, CreatePostDto, UpdatePostDto } from '@domain/entities';
import { SortParams } from '@shared/types';
import { FilterCriteria } from '@shared/types/filter.types';
import { PostServiceInputPort } from '@application/ports/input';
import { PostContext } from './PostContext';

interface PostProviderProps {
  children: ReactNode;
  postService: PostServiceInputPort;
}

export const PostProvider = ({ children, postService }: PostProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState<SortParams | null>(null);
  const [filters, setFilters] = useState<FilterCriteria[]>([]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await postService.getPosts(page, limit, sort || undefined, filters);
      setPosts(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar posts');
    } finally {
      setLoading(false);
    }
  }, [postService, page, limit, sort, filters]);

  const createPost = useCallback(
    async (post: CreatePostDto) => {
      setLoading(true);
      setError(null);
      try {
        await postService.createPost(post);
        await fetchPosts();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al crear post');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [postService, fetchPosts]
  );

  const updatePost = useCallback(
    async (post: UpdatePostDto) => {
      setLoading(true);
      setError(null);
      try {
        await postService.updatePost(post);
        await fetchPosts();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar post');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [postService, fetchPosts]
  );

  const deletePost = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await postService.deletePost(id);
        await fetchPosts();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al eliminar post');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [postService, fetchPosts]
  );

  const addFilter = useCallback((filter: FilterCriteria) => {
    setFilters(prev => {
      const filtered = prev.filter(f => f.field !== filter.field);
      return [...filtered, filter];
    });
    setPage(1);
  }, []);

  const removeFilter = useCallback((field: string) => {
    setFilters(prev => prev.filter(f => f.field !== field));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters([]);
    setPage(1);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const value = {
    posts,
    loading,
    error,
    pagination: { page, limit, total, totalPages },
    sort,
    filters,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    setPage,
    setLimit,
    setSort,
    setFilters,
    addFilter,
    removeFilter,
    clearFilters,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

