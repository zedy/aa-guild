// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import LanguageSwitcher from '../language/language-switcher.components';
import UserProfile from '../user-profile/user-profile.component';

// assets
import logo from '../../assets/logo.png';

const Header = ({ currentUser }) => {
  return (
    <div className="ui inverted menu top fixed">
      <div className="ui container">
        <div className="item">
          <Link to="/">
            <img src={logo} className="logo" alt="aa-logo" style={{width: "50px"}} />
          </Link>
        </div>
        <div className="item right">
          <Link className="item active" to="/about">About us</Link>
          <Link className="item" to="/events">Events</Link>
          <Link className="item" to="/news">News</Link>
          <Link className="item" to="/players-list">Players</Link>          
        </div>
        <div className="item">
          <LanguageSwitcher />
        </div>
        {
            currentUser ? 
            <UserProfile user={currentUser} />
            :
            <div className="item">
              <Link to="/signin" className="ui button">
                <i className="sign-in icon"></i>
                  Log in
              </Link>
            </div>
          }
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(Header);