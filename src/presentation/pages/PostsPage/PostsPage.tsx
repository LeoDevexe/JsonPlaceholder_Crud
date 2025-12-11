import { PostsTable } from '@presentation/components/features/posts';
import { MainLayout } from '@presentation/components/layout/MainLayout';

export const PostsPage = () => {
  return (
    <MainLayout>
      <PostsTable />
    </MainLayout>
  );
};

