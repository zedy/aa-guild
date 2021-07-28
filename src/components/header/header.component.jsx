// libs
import React from 'react';
import { Link } from 'react-router-dom';

// components
import LanguageSwitcher from '../language/language-switcher.components';

// assets
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <div className="ui inverted menu top fixed">
      <div className="ui container">
        <div className="item">
          <Link to="/">
            <img src={logo} className="logo" style={{width: "50px"}} />
          </Link>
        </div>
        <div className="item right">
          <Link to="/about">About us</Link>
          <Link to="/events">Events</Link>
          <Link to="/news">News</Link>
          <Link to="/players-list">Players</Link>
          <span className="menu-divider">|</span>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}

export default Header;