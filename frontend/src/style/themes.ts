import { createTheme } from '@mui/material/styles';

export const styletheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#e9edd5',
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
        background: {
          default: '#39342b',
        },
      },
    },
  },
});