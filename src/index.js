import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import "offline-js";

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();