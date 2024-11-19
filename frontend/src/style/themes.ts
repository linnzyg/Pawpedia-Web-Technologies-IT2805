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
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // Indicator color based on mode
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // Tab text color based on mode
          '&.Mui-selected': {
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // Selected tab text color based on mode
            backgroundColor: "rgba(177, 154, 204, 0.3) !important",
            
          },
        }),
      },
    },
    MuiRating: {
      styleOverrides: {
          iconFilled: "#d6aa70",
      },
    },
  },
});
