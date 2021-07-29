// libs
import React from 'react';
import { connect } from 'react-redux';

// redux
import setCurrentUser from '../../redux/user/user.actions';

const SingIn = () => (
    <div className='sign-up eight wide column'>
        <h2>Sign in</h2>
        <form className="ui form">        
            <div className="field">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter your email" />
            </div>
            <div class="field">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter your passward"/>
            </div>
            <button className="ui button" type="submit">Sign in</button>
            <button className="ui button red" type="submit">Sign in with Google</button>
        </form>
    </div>
);

export default SingIn;