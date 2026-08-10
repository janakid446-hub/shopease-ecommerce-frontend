import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './components/common/ScrollToTop.jsx';
import App from './App.jsx';
import { AppProviders } from './context/AppProviders.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <ScrollToTop />
        <App />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
