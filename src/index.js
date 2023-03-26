import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    // font size by default (16px): Homepage post title and single post content
    body1: {
      fontSize: 16,
      color: purple[400],
    },
    body2: {
      fontSize: 12,
      color: '#CE93D8',
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
    }
  },
  palette: {
    primary: {
      main: purple[400],
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#f5f3f7',
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
