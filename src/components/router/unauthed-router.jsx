import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SignInOut from '../../pages/sign-in-out/sign-in-out.component';
import * as route from '../../routes';

export const UnauthedRouter = () => (
  <Switch>
    <Route path={route.SIGN_IN_OUT}>
      <SignInOut />
    </Route>
    {/* ... */}
    <Redirect to={route.SIGN_IN_OUT} />
  </Switch>
);
