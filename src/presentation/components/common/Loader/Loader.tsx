import { Box, CircularProgress, Typography } from '@mui/material';

interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = 'Cargando...' }: LoaderProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
      gap={2}
    >
      <CircularProgress size={50} />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

