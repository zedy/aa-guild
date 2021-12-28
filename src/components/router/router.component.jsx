// libs
import React from 'react';
import { withRouter } from 'react-router';
import { Route, useLocation } from 'react-router-dom';

// components
import { UserRouter } from './user-router.component';
import { GuestRouter } from './guest-router.compoent';

// pages
import Throw404 from '../../pages/404/throw404.component';

// component
const Router = () => {
  let location = useLocation();

  return (
    <>
      <UserRouter />
      <GuestRouter />
      <Route path='*'>
        <Throw404 location={location} />
      </Route>
    </>
  );
};

export default withRouter(Router);
