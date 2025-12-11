import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Post, CreatePostDto, UpdatePostDto } from '@domain/entities';

interface PostFormProps {
  open: boolean;
  post?: Post | null;
  onClose: () => void;
  onSubmit: (post: CreatePostDto | UpdatePostDto) => Promise<void>;
}

export const PostForm = ({ open, post, onClose, onSubmit }: PostFormProps) => {
  const [formData, setFormData] = useState({
    userId: post?.userId || 1,
    title: post?.title || '',
    body: post?.body || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        userId: post.userId,
        title: post.title,
        body: post.body,
      });
    } else {
      setFormData({
        userId: 1,
        title: '',
        body: '',
      });
    }
    setErrors({});
  }, [post, open]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'El contenido es requerido';
    }

    if (formData.userId <= 0) {
      newErrors.userId = 'Seleccione un usuario válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      if (post) {
        await onSubmit({
          id: post.id,
          ...formData,
        } as UpdatePostDto);
      } else {
        await onSubmit(formData as CreatePostDto);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{post ? 'Editar Post' : 'Crear Nuevo Post'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <FormControl fullWidth error={!!errors.userId}>
              <InputLabel>Usuario</InputLabel>
              <Select
                value={formData.userId}
                onChange={e => handleChange('userId', e.target.value as number)}
                label="Usuario"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => (
                  <MenuItem key={id} value={id}>
                    Usuario {id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Título"
              value={formData.title}
              onChange={e => handleChange('title', e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
              required
            />

            <TextField
              label="Contenido"
              value={formData.body}
              onChange={e => handleChange('body', e.target.value)}
              error={!!errors.body}
              helperText={errors.body}
              fullWidth
              required
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Guardando...' : post ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

