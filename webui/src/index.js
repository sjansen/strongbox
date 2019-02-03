// @format
import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';

import {Authenticator} from 'aws-amplify-react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './containers/App';
import config from './config';
import store from './store';
import * as serviceWorker from './serviceWorker';

//Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: {
      domain: config.oauth.DOMAIN,
      scope: ['aws.cognito.signin.user.admin', 'email', 'openid', 'profile'],
      redirectSignIn: `${window.location.protocol}//${
        window.location.host
      }/signin`,
      redirectSignOut: `${window.location.protocol}//${
        window.location.host
      }/signout`,
      responseType: 'code',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Authenticator hideDefault={true}>
        <App />
      </Authenticator>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.register();
//serviceWorker.unregister();
