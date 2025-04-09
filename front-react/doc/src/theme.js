// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2342', // Azul marino
    },
    secondary: {
      main: '#6B8E23', // Verde oliva
    },
    background: {
      default: '#F5EBDD', // Piel
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h5: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
