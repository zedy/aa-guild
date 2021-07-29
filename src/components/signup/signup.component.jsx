// libs
import React from 'react';

const SingUp = () => (
    <div className='sign-up eight wide column'>
        <h2>Sign up</h2>
        <form className="ui form">
            <div className="field">
                <label>First Name</label>
                <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
                <label>Last Name</label>
                <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
                <label>User name</label>
                <input type="text" name="user-name" placeholder="User Name" />
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" name="password"/>
            </div>
            <div className="field">
                <label>Confirm password</label>
                <input type="password" name="confirm-password"/>
            </div>
            <div className="field">
                <div className="ui checkbox">
                <input type="checkbox" className="hidden" />
                <label>I agree to the Terms and Conditions</label>
                </div>
            </div>
            <button className="ui button" type="submit">Submit</button>
        </form>
    </div>
);

export default SingUp;