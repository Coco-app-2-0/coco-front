'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
    allVariants: {
      color: "black"
    },
  },
  palette: {
    // Aquí debes definir tu paleta de colores
    // Por ejemplo:
    primary: {
      main: '#ff9900',
      light: '#ffd599',
      dark: '#563a0f',
      contrastText: "#fff"
    },
    secondary: {
      main: '#176dee',
      light: '#9ec4ff',
      dark: '#172f53'
    },
    success: {
      main: '#3F8E00',
      light: '#51ff78',
      dark: '#105b21'
    },
    error: {
      main: '#ff2e00',
      light: '#ffab99',
      dark: '#561c0f'
    },
    info: {
      main: '#5600E3',
      light: '#B080FF',
      dark: '#1F0B41'
    }
  },
});

export default theme;