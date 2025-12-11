import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from '../Header';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, py: 3, bgcolor: 'grey.50' }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};

