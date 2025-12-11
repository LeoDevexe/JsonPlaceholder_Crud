import { Routes, Route, Navigate } from 'react-router-dom';
import { PostsPage, NotFoundPage } from '../pages';
import { ROUTES } from './routes.config';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.POSTS} replace />} />
      <Route path={ROUTES.POSTS} element={<PostsPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

