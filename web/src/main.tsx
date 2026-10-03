// Global styles must load before any component stylesheet so component rules win the cascade.
import './styles/variables.css';
import './styles/globals.css';
import './components/ui/Button.css';
import './components/ui/Drawer.css';
import './components/ui/Primitives.css';
import './components/ui/Field.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
