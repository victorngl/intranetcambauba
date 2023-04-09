import '../styles/globals.css'

import { createTheme } from '@mui/material/styles';
import { orange, pink } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FAB702',
      },
      
      secondary: pink,
    },
    typography: {
      
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
    </ThemeProvider>
  );
}