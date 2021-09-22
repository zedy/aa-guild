// libs
import React from 'react';

// components
import SignIn from '../../components/signin/signin-form.component';
import SignUp from '../../components/signup/signup-form.component';

const SingInOut = () => (
  <div className='ui container content'>
    <div className='sign-in-and-sign-up ui stackable two column grid'>
      <SignIn />
      <SignUp />
    </div>
  </div>
);

export default SingInOut;
