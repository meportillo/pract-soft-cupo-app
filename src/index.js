import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import SSRProvider from 'react-bootstrap/SSRProvider';


ReactDOM.render(
    <SSRProvider>
      <App />
    </SSRProvider>,
  document.getElementById('root')
);
