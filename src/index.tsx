import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { store } from './store/reducers';

// require avoids TS "Could not find a declaration file" errors.
// Update once DefinitelyTyped includes react-redux 5.0.4
const reactRedux = require('react-redux');

ReactDOM.render(
  <reactRedux.Provider store={store}>
    <App />
  </reactRedux.Provider>,
  document.getElementById('root')
);
