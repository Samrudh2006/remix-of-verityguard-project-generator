import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { I18nProvider } from './i18n';
import { LocationProvider } from './contexts/LocationContext';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nProvider>
      <AuthProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </AuthProvider>
    </I18nProvider>
  </React.StrictMode>
);
