// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component
import './App.css'; // Import your global styles

// Get the root element from index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
