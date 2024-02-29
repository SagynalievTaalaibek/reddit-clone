import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
