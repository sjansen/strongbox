import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './Home';
import SignIn from './SignIn';
import NotFound from './NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signin" exact component={SignIn} />
    <Route component={NotFound} />
  </Switch>
);
