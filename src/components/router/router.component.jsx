// libs
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// routes
import * as route from '../../routes';

const AsyncRoute = ({ componentPath, ...props }) => {
  return <Route {...props} component={route.componentPaths[componentPath]} />;
};

const AdminRoute = props => {
  if (!props.currentUser && !props.currentUser.isAdmin)
    return <Redirect to={route.HOME_PAGE} />;

  return <AsyncRoute {...props} />;
};

const AuthenticatedRoute = props => {
  if (!props.currentUser) return <Redirect to={route.SIGN_IN_OUT} />;

  return <AsyncRoute {...props} />;
};

const GuestRoute = props => {
  return <AsyncRoute {...props} />;
};

export const Router = ({ currentUser }) => {
  return (
    <Switch>
      <GuestRoute exact path={route.HOME_PAGE} componentPath='homepage' />
      <GuestRoute exact path={route.EVENT_FORM} componentPath='eventform' />
      <GuestRoute path={route.EVENT_PAGE} componentPath='eventpage' />
      <GuestRoute
        exact
        path={route.EVENT_LISTING}
        componentPath='eventlisting'
      />
      <GuestRoute exact path={route.NEWS_LISTING} componentPath='newslisting' />
      <GuestRoute
        exact
        path={route.PLAYER_LISTING}
        componentPath='playerlisting'
      />
      <AuthenticatedRoute
        exact
        user={currentUser}
        path={route.PLAYER_PAGE}
        componentPath='playerpage'
      />
      <AuthenticatedRoute
        exact
        user={currentUser}
        path={route.PLAYER_PROFILE}
        componentPath='playerprofile'
      />
      <AdminRoute
        exact
        user={currentUser}
        path={route.DASHBOARD}
        componentPath='dashbaord'
      />
      <GuestRoute exact path={route.SIGN_IN_OUT} componentPath='signinout' />
    </Switch>
  );
};

export default Router;
