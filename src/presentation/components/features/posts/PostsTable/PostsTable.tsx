import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import { Post, CreatePostDto, UpdatePostDto } from '@domain/entities';
import { usePostContext } from '@presentation/context';
import { Loader } from '@presentation/components/common/Loader';
import { PostForm } from '../PostForm';
import { PostsTableFilters } from './components/PostsTableFilters';
import { PostsTablePagination } from './components/PostsTablePagination';
import { SortDirection } from '@shared/enums';

type SortField = 'id' | 'userId' | 'title' | 'body';

export const PostsTable = () => {
  const {
    posts,
    loading,
    error,
    pagination,
    sort,
    filters,
    setPage,
    setLimit,
    setSort,
    addFilter,
    removeFilter,
    clearFilters,
    createPost,
    updatePost,
    deletePost,
  } = usePostContext();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const handleSort = (field: SortField) => {
    const isAsc = sort?.field === field && sort?.direction === SortDirection.ASC;
    setSort({
      field,
      direction: isAsc ? SortDirection.DESC : SortDirection.ASC,
    });
  };

  const handleCreate = () => {
    setSelectedPost(null);
    setFormOpen(true);
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setFormOpen(true);
  };

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        await deletePost(postToDelete.id);
        setDeleteDialogOpen(false);
        setPostToDelete(null);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleFormSubmit = async (post: CreatePostDto | UpdatePostDto) => {
    try {
      if ('id' in post && typeof post.id === 'number') {
        await updatePost(post);
        setSnackbar({ open: true, message: '¡Post actualizado exitosamente!', severity: 'success' });
      } else {
        await createPost(post as CreatePostDto);
        setSnackbar({ open: true, message: '¡Post creado exitosamente!', severity: 'success' });
      }
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: 'Error al guardar el post', 
        severity: 'error' 
      });
    }
  };

  const handleClearLocalData = () => {
    localStorage.clear();
    setClearDialogOpen(false);
    setSnackbar({ 
      open: true, 
      message: 'Datos locales eliminados. Recargando...', 
      severity: 'success' 
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const isLocalPost = (id: number): boolean => {
    return id >= 10000;
  };

  const getSortDirection = (field: SortField): 'asc' | 'desc' | undefined => {
    if (sort?.field === field) {
      return sort.direction === SortDirection.ASC ? 'asc' : 'desc';
    }
    return undefined;
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Posts
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <InfoIcon fontSize="small" color="info" />
            <Typography variant="caption" color="text.secondary">
              Los cambios se guardan localmente en tu navegador
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <Button 
            variant="outlined" 
            color="warning" 
            size="small"
            startIcon={<ClearIcon />} 
            onClick={() => setClearDialogOpen(true)}
          >
            Limpiar Datos
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
            Nuevo Post
          </Button>
        </Box>
      </Box>

      <PostsTableFilters
        filters={filters}
        onAddFilter={addFilter}
        onRemoveFilter={removeFilter}
        onClearFilters={clearFilters}
      />

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sort?.field === 'id'}
                    direction={getSortDirection('id')}
                    onClick={() => handleSort('id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sort?.field === 'userId'}
                    direction={getSortDirection('userId')}
                    onClick={() => handleSort('userId')}
                  >
                    Usuario
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sort?.field === 'title'}
                    direction={getSortDirection('title')}
                    onClick={() => handleSort('title')}
                  >
                    Título
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sort?.field === 'body'}
                    direction={getSortDirection('body')}
                    onClick={() => handleSort('body')}
                  >
                    Contenido
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Loader message="Cargando posts..." />
                  </TableCell>
                </TableRow>
              ) : posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" color="text.secondary" py={4}>
                      No se encontraron posts
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                posts.map(post => (
                  <TableRow key={post.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {post.id}
                        {isLocalPost(post.id) && (
                          <Chip label="Nuevo" size="small" color="success" variant="outlined" />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{post.userId}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {post.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          maxWidth: '400px',
                        }}
                      >
                        {post.body}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" gap={1} justifyContent="flex-end">
                        <Tooltip title="Editar">
                          <IconButton size="small" onClick={() => handleEdit(post)} color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(post)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <PostsTablePagination
          total={pagination.total}
          page={pagination.page}
          limit={pagination.limit}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </Paper>

      <PostForm
        open={formOpen}
        post={selectedPost}
        onClose={() => {
          setFormOpen(false);
          setSelectedPost(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea eliminar el post "{postToDelete?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={clearDialogOpen} onClose={() => setClearDialogOpen(false)}>
        <DialogTitle>Limpiar datos locales</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea eliminar todos los datos guardados localmente? 
            Esto incluye posts creados, actualizados y eliminados. 
            Los datos volverán a su estado original de la API.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleClearLocalData} color="warning" variant="contained">
            Limpiar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

