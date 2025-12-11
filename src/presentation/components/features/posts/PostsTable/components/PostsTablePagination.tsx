import { TablePagination } from '@mui/material';

interface PostsTablePaginationProps {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export const PostsTablePagination = ({
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
}: PostsTablePaginationProps) => {
  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage + 1); // MUI usa 0-based, nosotros 1-based
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onLimitChange(parseInt(event.target.value, 10));
    onPageChange(1);
  };

  return (
    <TablePagination
      component="div"
      count={total}
      page={page - 1} // MUI usa 0-based, nosotros 1-based
      onPageChange={handleChangePage}
      rowsPerPage={limit}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      labelRowsPerPage="Filas por página:"
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
    />
  );
};

