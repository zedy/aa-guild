// libs
import React from 'react';
import { Button } from 'semantic-ui-react';
import { useAuth } from '../../redux/user/useAuth';

const SingInOut = () => {
  const { login, loginAsAdmin, signup } = useAuth();
  return (
    <div className='ui container content'>
      <Button onClick={login} classList='teal' type='submit'>
        Login
      </Button>
      <Button onClick={loginAsAdmin} classList='teal' type='submit'>
        Login as admin
      </Button>
      <Button onClick={signup} classList='teal' type='submit'>
        Signup
      </Button>
    </div>
  );
};

export default SingInOut;
