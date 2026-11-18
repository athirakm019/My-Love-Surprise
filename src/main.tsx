import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SurpriseProvider } from './context/SurpriseContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SurpriseProvider>
      <App />
    </SurpriseProvider>
  </React.StrictMode>,
);
