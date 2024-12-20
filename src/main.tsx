import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <script defer src="https://cloud.umami.is/script.js" data-website-id="5d7adf9e-3b2b-4a8a-9435-2c35686b4c69"></script>
  </StrictMode>
);
