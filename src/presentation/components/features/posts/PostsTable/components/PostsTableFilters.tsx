import { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Chip,
  Paper,
  Grid,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { FilterOperator } from '@shared/enums';
import { FILTER_OPERATORS } from '@shared/constants';
import { FilterCriteria } from '@shared/types/filter.types';

interface PostsTableFiltersProps {
  filters: FilterCriteria[];
  onAddFilter: (filter: FilterCriteria) => void;
  onRemoveFilter: (field: string) => void;
  onClearFilters: () => void;
}

const FILTERABLE_FIELDS = [
  { value: 'title', label: 'Título' },
  { value: 'body', label: 'Contenido' },
  { value: 'id', label: 'ID' },
  { value: 'userId', label: 'Usuario ID' },
];

export const PostsTableFilters = ({
  filters,
  onAddFilter,
  onRemoveFilter,
  onClearFilters,
}: PostsTableFiltersProps) => {
  const [field, setField] = useState('title');
  const [operator, setOperator] = useState<FilterOperator>(FilterOperator.CONTAINS);
  const [value, setValue] = useState('');

  const handleAddFilter = () => {
    if (value.trim()) {
      onAddFilter({ field, operator, value: value.trim() });
      setValue('');
    }
  };

  const getFieldLabel = (fieldValue: string): string => {
    return FILTERABLE_FIELDS.find(f => f.value === fieldValue)?.label || fieldValue;
  };

  const getOperatorLabel = (operatorValue: FilterOperator): string => {
    return FILTER_OPERATORS.find(op => op.value === operatorValue)?.label || operatorValue;
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Campo</InputLabel>
              <Select value={field} onChange={e => setField(e.target.value)} label="Campo">
                {FILTERABLE_FIELDS.map(f => (
                  <MenuItem key={f.value} value={f.value}>
                    {f.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Operador</InputLabel>
              <Select
                value={operator}
                onChange={e => setOperator(e.target.value as FilterOperator)}
                label="Operador"
              >
                {FILTER_OPERATORS.map(op => (
                  <MenuItem key={op.value} value={op.value}>
                    {op.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              label="Valor"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleAddFilter()}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={handleAddFilter}
              disabled={!value.trim()}
            >
              Filtrar
            </Button>
          </Grid>
        </Grid>

        {filters.length > 0 && (
          <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
            <Box sx={{ fontWeight: 'medium' }}>Filtros activos:</Box>
            {filters.map((filter, index) => (
              <Chip
                key={`${filter.field}-${index}`}
                label={`${getFieldLabel(filter.field)} ${getOperatorLabel(filter.operator)} "${filter.value}"`}
                onDelete={() => onRemoveFilter(filter.field)}
                color="primary"
                variant="outlined"
              />
            ))}
            <Button
              size="small"
              startIcon={<ClearIcon />}
              onClick={onClearFilters}
              color="error"
            >
              Limpiar todo
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

