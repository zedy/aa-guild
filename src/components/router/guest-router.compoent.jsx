// libs
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// routes
import * as route from '../../routes';

// auth
import { UserAuth } from '../../redux/user/user.auth';

// helper functions
const GuestRoute = props => {
  if (props.componentPath === 'signinout' && props.user) {
    return <Redirect to={route.HOME_PAGE} />;
  }

  return (
    <Route {...props} component={route.componentPaths[props.componentPath]} />
  );
};

// component
export const GuestRouter = () => {
  const { currentUser } = UserAuth();

  return (
    <Switch>
      <GuestRoute exact path={route.HOME_PAGE} componentPath='homepage' />
      <GuestRoute
        path={route.EVENT_ROUTE_PAGE}
        componentPath='eventroutepage'
      />
      <GuestRoute
        exact
        path={route.EVENT_LISTING}
        componentPath='eventlisting'
      />
      <GuestRoute
        exact
        path={route.BADGES_LISTING}
        componentPath='badgeslisting'
      />
      <GuestRoute exact path={route.NEWS_LISTING} componentPath='newslisting' />
      <GuestRoute path={route.NEWS_ROUTE_PAGE} componentPath='newsroutepage' />
      <GuestRoute exact path={route.PLAYERS_PAGE} componentPath='playerspage' />
      <GuestRoute
        exact
        path={route.SIGN_IN_OUT}
        user={currentUser}
        componentPath='signinout'
      />
      <GuestRoute exact path={route.RULES} componentPath='rules' />
      <GuestRoute exact path={route.THROW_403} componentPath='fourohthree' />
    </Switch>
  );
};
