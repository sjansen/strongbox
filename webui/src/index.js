// @format
import React from 'react';
import ReactDOM from 'react-dom';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './containers/App';
import store, {persistor} from './store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.register();
//serviceWorker.unregister();
