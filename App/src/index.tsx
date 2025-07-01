import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// Create a root and ensure TypeScript knows the element exists
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found");
}


