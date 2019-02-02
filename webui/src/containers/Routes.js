// @format
import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './Home';
import SignIn from './SignIn';
import SignOut from './SignOut';
import NotFound from './NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signin" exact component={SignIn} />
    <Route path="/signout" exact component={SignOut} />
    <Route component={NotFound} />
  </Switch>
);
