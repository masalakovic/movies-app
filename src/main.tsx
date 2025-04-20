import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import UserProvider from './context/UserProvieder.tsx';

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </UserProvider>
);
