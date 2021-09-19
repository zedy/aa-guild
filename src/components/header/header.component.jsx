// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// styles
import './header.styles.scss';

// components
import LanguageSwitcher from '../language/language-switcher.components';
import UserProfileDropdown from '../user-profile/user-profile-dropdown.component';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';

// component
const Header = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <div className='header'>
      <div className='ui vertical inverted segment'>
        <div className='ui container'>
          <div className='ui inverted secondary menu'>
            <div className='item'>
              <Link to='/'>
                <i className='ui icon home'></i>
              </Link>
            </div>
            <div className='item right'>
              <Link className='item' to='/badges'>
                Badges
              </Link>
              <Link className='item' to='/events'>
                Events
              </Link>
              <Link className='item' to='/news'>
                News
              </Link>
              <Link className='item' to='/players-list'>
                Players
              </Link>
            </div>
            <div className='item'>
              <LanguageSwitcher />
            </div>
            {currentUser ? (
              <UserProfileDropdown user={currentUser} />
            ) : (
              <div className='item'>
                <Link to='/signin' className='ui signin-link'>
                  Sign in &nbsp;
                  <i className='sign-in icon'></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
