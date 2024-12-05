import { createTheme } from '@mui/material/styles';

export const styletheme = createTheme({
  palette: {
    mode: 'light', // This sets the initial mode to light
    primary: {
      main: 'rgba(141, 118, 168, 1)', // Same primary color in dark mode
      light: 'rgba(141, 118, 168, 0.7)', // Lighter shade for hover states
      dark: 'rgba(141, 118, 168, 0.9)',
      contrastText: '#000000',
    },
    background: {
      default: '#e9edd5', // Light mode default background color
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: 'rgba(177, 154, 204, 1)', // Same primary color in dark mode
          light: 'rgba(177, 154, 204, 0.7)', // Lighter shade for hover states
          dark: 'rgba(177, 154, 204, 0.9)', // Darker shade for focus or other states
          contrastText: '#ffffff',
        },
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
          backgroundColor: theme.palette.mode === 'dark' ? '#211e1c' : '#ffffff', // Background color based on mode
          color: theme.palette.text.primary, // Text color based on mode
          backgroundImage: 'none', // Ensures no default gradient or overlay
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
            backgroundColor: 'rgba(177, 154, 204, 0.3) !important',
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#211e1c' : 'white',
          borderRadius: '0',
          '&.Mui-selected': {
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // Selected text color
            backgroundColor: 'rgba(177, 154, 204) !important', // Selected background color
          },
        }),
      },
    },
  },
});
