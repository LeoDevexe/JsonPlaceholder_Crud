import { useContext } from 'react';
import { PostContext, PostContextValue } from './PostContext';

export const usePostContext = (): PostContextValue => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }

  return context;
};

