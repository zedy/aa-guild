import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from '../../redux/user/useAuth';
import * as route from '../../routes';
import BadgesRoutePage from '../../pages/badges/badges-route-page.component';
import HomePage from '../../pages/homepage/homepage.component';
import NewsListingPage from '../../pages/news/news-listing-page.component';
import Throw403 from '../../pages/403/throw403.component';

const AdminRoute = props => {
  const { user } = useAuth();
  if (!user.isAdmin) return <Redirect to={route.THROW_403} />;

  return <Route {...props} />;
};

// /badges ruta odabrana samo radi demonstracije admin rute
export const UserRouter = () => {
  return (
    <Switch>
      <AdminRoute
        exact
        path={route.BADGES_LISTING}
        component={BadgesRoutePage}
      />

      <Route exact path={route.HOME_PAGE} component={HomePage} />
      <Route exact path={route.NEWS_LISTING} component={NewsListingPage} />
      <Route exact path={route.THROW_403} component={Throw403} />
      {/* ... */}
      <Redirect to={route.HOME_PAGE} />
    </Switch>
  );
};
