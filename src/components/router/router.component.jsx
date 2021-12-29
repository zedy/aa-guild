// libs
import React from 'react';

// components
import { UserRouter } from './user-router.component';
import { GuestRouter } from './guest-router.compoent';

// component
const Router = () => {
  return (
    <>
      <UserRouter />
      <GuestRouter />
    </>
  );
};

export default Router;
