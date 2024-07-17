import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import "../styles/index.css"

const qsFont =  "'Quicksand', sans-serif";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFAF0',//'#FFFFF0',
    },
    secondary: {
      main: '#A9A9A9',
    },
  },
  typography: {
    fontFamily: qsFont,
    fontSize: 12,
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
)
