// libs
import React from 'react';
import { withRouter } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

// routes
import * as route from '../../routes';

// helper functions
const AsyncRoute = ({ componentPath, ...props }) => {
  return <Route {...props} component={route.componentPaths[componentPath]} />;
};

const AdminRoute = props => {
  if (!props.user && !props.user.isAdmin)
    return <Redirect to={route.THROW_403} />;

  return <AsyncRoute {...props} />;
};

const AuthenticatedRoute = props => {
  if (!props.user || props.user.id !== props.computedMatch.params.id)
    return <Redirect to={route.THROW_403} />;

  return <AsyncRoute {...props} />;
};

const GuestRoute = props => {
  if (props.componentPath === 'signinout' && props.user) {
    return <Redirect to={route.HOME_PAGE} />;
  }

  return <AsyncRoute {...props} />;
};

// component
export const Router = ({ match, currentUser }) => {
  if (!currentUser) return null;

  return (
    <Switch>
      <GuestRoute exact path={route.HOME_PAGE} componentPath='homepage' />
      <AdminRoute
        exact
        path={route.EVENT_CREATE}
        user={currentUser}
        componentPath='eventcreate'
      />
      <GuestRoute
        path={route.EVENT_ROUTE_PAGE}
        componentPath='eventroutepage'
      />
      <GuestRoute
        exact
        path={route.EVENT_LISTING}
        componentPath='eventlisting'
      />
      <GuestRoute exact path={route.NEWS_LISTING} componentPath='newslisting' />
      <AdminRoute
        exact
        path={route.NEWS_CREATE}
        user={currentUser}
        componentPath='newscreate'
      />
      <GuestRoute path={route.NEWS_ROUTE_PAGE} componentPath='newsroutepage' />
      <GuestRoute
        exact
        path={route.PLAYER_LISTING}
        componentPath='playerlisting'
      />
      <GuestRoute exact path={route.PLAYER_PAGE} componentPath='playerpage' />
      <AuthenticatedRoute
        exact
        user={currentUser}
        match={match}
        path={route.PLAYER_PROFILE}
        componentPath='playerprofile'
      />
      <AdminRoute
        exact
        user={currentUser}
        path={route.DASHBOARD}
        componentPath='dashboard'
      />
      <GuestRoute
        exact
        path={route.SIGN_IN_OUT}
        user={currentUser}
        componentPath='signinout'
      />
      <GuestRoute exact path={route.THROW_403} componentPath='fourohthree' />
    </Switch>
  );
};

export default withRouter(Router);
