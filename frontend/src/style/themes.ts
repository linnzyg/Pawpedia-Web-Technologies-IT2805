import { createTheme } from '@mui/material/styles';

export const styletheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(141, 118, 168, 1)',
      light: 'rgba(141, 118, 168, 0.7)',
      dark: '#40285c',
      contrastText: '#000000',
    },
    background: {
      default: '#e9edd5',
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: 'rgba(177, 154, 204, 1)',
          light: 'rgba(177, 154, 204, 0.7)',
          dark: 'rgba(177, 154, 204, 0.9)',
          contrastText: '#ffffff',
        },
        background: {
          default: '#39342b',
        },
      },
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#211e1c' : '#ffffff',
          color: theme.palette.text.primary,
          backgroundImage: 'none',
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
          '&.Mui-selected': {
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
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
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
            backgroundColor: 'rgba(177, 154, 204) !important',
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#211e1c' : 'white',
          borderRadius: '0',
          '&.Mui-selected': {
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
          },
        }),
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#211e1c' : 'transparent',
          borderRadius: 0,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: '1px solid',
          color: theme.palette.primary.contrastText,
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: 'rgba(177, 154, 204, 0.3)',
          },
        }),
      },
    },
  },
});
