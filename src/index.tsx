import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);

