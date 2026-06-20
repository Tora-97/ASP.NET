import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Nạp file App.js (hoặc App.jsx) ở cùng thư mục src

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);