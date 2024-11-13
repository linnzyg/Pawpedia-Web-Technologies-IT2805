import { createTheme } from '@mui/material/styles';

export const styletheme = createTheme({
  palette: {
    mode: 'light', // This sets the initial mode to light
    background: {
      default: '#e9edd5', // Light mode default background color
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
        background: {
          default: '#39342b', // Dark mode default background color
        },
      },
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#505443' : '#ffffff', // Background color based on mode
          color: theme.palette.text.primary, // Text color based on mode
        }),
      },
    },
  },
});
