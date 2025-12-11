import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ButtonProps extends MuiButtonProps {
  label?: string;
}

export const Button = ({ label, children, ...props }: ButtonProps) => {
  return (
    <MuiButton {...props}>
      {label || children}
    </MuiButton>
  );
};

interface ClearDataButtonProps {
  onClear: () => void;
}

export const ClearDataButton = ({ onClear }: ClearDataButtonProps) => {
  return (
    <MuiButton
      variant="outlined"
      color="warning"
      size="small"
      startIcon={<DeleteIcon />}
      onClick={onClear}
    >
      Limpiar datos locales
    </MuiButton>
  );
};

