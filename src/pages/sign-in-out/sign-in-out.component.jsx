// libs
import React from 'react';

// components
import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';

const SingInOut = () => (
    <div className='ui grid container sign-in-and-sign-up'>
        <SignIn />
        <SignUp />
    </div>
);

export default SingInOut;