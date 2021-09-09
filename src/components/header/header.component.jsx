// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import LanguageSwitcher from '../language/language-switcher.components';
import UserProfileDropdown from '../user-profile/user-profile-dropdown.component';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';

// assets
import logo from '../../assets/logo.png';

const Header = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <div className='ui inverted menu top fixed'>
      <div className='ui container'>
        <div className='item'>
          <Link to='/'>
            <img
              src={logo}
              className='logo'
              alt='aa-logo'
              style={{ width: '50px' }}
            />
          </Link>
        </div>
        <div className='item right'>
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
            <Link to='/signin' className='ui white'>
              Sign in &nbsp;
              <i className='sign-in icon'></i>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
