import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap Icons (optional, if you want to use icons in your components)
import 'bootstrap-icons/font/bootstrap-icons.css';
// Import custom CSS (if you have any global styles)
import './index.css'; // Create this file if you need global custom styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
