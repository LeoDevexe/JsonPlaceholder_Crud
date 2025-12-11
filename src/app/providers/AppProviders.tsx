import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@presentation/styles';
import { PostProvider } from '@presentation/context';
import { QueryClientProvider } from './QueryClientProvider';
import { PostService } from '@application/services';
import { AxiosHttpClientAdapter } from '@infrastructure/adapters/http';
import { JsonPlaceholderPostRepository } from '@infrastructure/adapters/repositories';

// Inicialización de dependencias (Inyección de Dependencias)
const httpClient = new AxiosHttpClientAdapter();
const postRepository = new JsonPlaceholderPostRepository(httpClient);
const postService = new PostService(postRepository);

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PostProvider postService={postService}>
            {children}
          </PostProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

