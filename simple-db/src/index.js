import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GoogleLoginButton from './ss2json'

ReactDOM.render(
  <React.StrictMode>
    <GoogleLoginButton />
  </React.StrictMode>, 
  document.getElementById('login-button')
); 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);