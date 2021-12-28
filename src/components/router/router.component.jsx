import React from 'react';
import { withRouter } from 'react-router';
import { useAuth } from '../../redux/user/useAuth';
import { UnauthedRouter } from './unauthed-router';
import { UserRouter } from './user-router';

export const Router = () => {
  const { user } = useAuth();

  if (!user) return <UnauthedRouter />;

  return <UserRouter />;
};

export default withRouter(Router);
