import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SSRProvider from 'react-bootstrap/SSRProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
      <SSRProvider>
        <App />
      </SSRProvider>
    </StrictMode>);
