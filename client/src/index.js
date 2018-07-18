import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Index = () => {
    return <App/>
  };
  
  ReactDOM.render(<Index />, document.getElementById("index"));