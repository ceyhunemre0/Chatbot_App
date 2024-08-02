import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00A896',  // ChatGPT'nin yeşil rengi
    },
    background: {
      default: '#F0F2F5',  // ChatGPT'nin arka plan rengi
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
