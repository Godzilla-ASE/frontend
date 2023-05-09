import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import { PostProvider } from './context/PostContext';
import { MessageProvider } from './context/MessageContext';


import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    body1: {
      fontSize: 18,
    },
    body2: {
      fontSize: 14,
      // color: '#CE93D8',
    },
    body3: {
      fontSize: 10,
      // color: '#CE93D8',
    },
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    }
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#CECECE',
    },
    thirdInformation: {
      main: "#9F9F9F"
    },
    postBackground: {
      main: '#333333',
    },
    background: {
      default: '#282828',
    },
    submit: {
      main: '#0095f6'
    }
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: 'white',
            '&.Mui-checked': {
              color: 'white',
            },
          },
        },
      },
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ThemeProvider theme={theme}>
    <CssBaseline />
    <PostProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </PostProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
