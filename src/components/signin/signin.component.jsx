// libs
import React from 'react';
import { connect } from 'react-redux';

// auth
import { signInWithGoogle } from '../../firebase/firebase.utils';

// components
import Button from '../buttons/button.components';

const SingIn = () => (
    <div className='sign-up eight wide column'>
        <h2>Sign in</h2>
        <form className="ui form">        
            <div className="field">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter your email" />
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter your passward"/>
            </div>
            <button className="ui button" type="submit">Sign in</button>
            <Button className="ui button red" type="button" onClick={signInWithGoogle}>
                <i className="google icon"></i>
                Sign in with Google
            </Button>
        </form>
    </div>
);

export default SingIn;