import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

export const Header = () => {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1}>
          <ArticleIcon />
          <Typography variant="h6" component="div">
            JSONPlaceholder CRUD
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

