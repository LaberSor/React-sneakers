import React from 'react';
import ReactDOM from 'react-dom';
import 'index.scss';
import App from 'App';
import 'macro-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      <ToastContainer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
