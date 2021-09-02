// libs
import React from 'react';

// components
import SignIn from '../../components/signin/signin-form.component';
import SignUp from '../../components/signup/signup-form.component';

const SingInOut = () => (
  <div className='ui container content' style={{ paddingTop: '9em' }}>
    <div className='ui grid container sign-in-and-sign-up'>
      <SignIn />
      <SignUp />
    </div>
  </div>
);

export default SingInOut;
