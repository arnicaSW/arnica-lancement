import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/fredoka';
import './index.css';
// Palette choisie au build via VITE_THEME (originale | nouvelle), voir vite.config.ts
import '@palette';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
