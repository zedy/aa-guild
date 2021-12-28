// libs
import React from 'react';
import { withRouter } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

// routes
import * as route from '../../routes';

// auth
import { UserAuth } from '../../redux/user/user.auth';

// helper fn
const AdminRoute = props => {
  if (!props.user.isAdmin) return <Redirect to={route.THROW_403} />;

  return <Route {...props} component={props.componentPath} />;
};

const AuthenticatedRoute = props => {
  if (!props.user || props.user.id !== props.computedMatch.params.id)
    return <Redirect to={route.THROW_403} />;

  return <Route {...props} component={props.componentPath} />;
};

// component
export const UserRouter = ({ match }) => {
  const { currentUser } = UserAuth();

  return (
    <Switch>
      <AdminRoute
        exact
        user={currentUser}
        path={route.EVENT_CREATE}
        componentPath={route.componentPaths['eventcreate']}
      />
      <AdminRoute
        exact
        user={currentUser}
        path={route.BADGE_CREATE}
        componentPath={route.componentPaths['badgecreate']}
      />
      <AdminRoute
        user={currentUser}
        path={route.BADGE_ROUTE_PAGE}
        componentPath={route.componentPaths['badgeroutepage']}
      />
      <AdminRoute
        exact
        user={currentUser}
        path={route.NEWS_CREATE}
        componentPath={route.componentPaths['newscreate']}
      />
      <AdminRoute
        exact
        user={currentUser}
        path={route.DASHBOARD}
        componentPath={route.componentPaths['dashboard']}
      />
      <AuthenticatedRoute
        exact
        user={currentUser}
        match={match}
        path={route.PLAYER_PROFILE}
        componentPath={route.componentPaths['playerprofile']}
      />
    </Switch>
  );
};

export default withRouter(UserRouter);
