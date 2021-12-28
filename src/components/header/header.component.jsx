// libs
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Icon, Menu, Sidebar } from 'semantic-ui-react';
import disableScroll from 'disable-scroll';

// styles
import './header.styles.scss';

// components
import LanguageSwitcher from '../language/language-switcher.components';
import UserProfileDropdown from '../user-profile/user-profile-dropdown.component';
import { CloseSidebar } from '../buttons/buttons.component';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';
import { BADGES_LISTING } from '../../routes';

const HeaderMenuItems = [
  {
    text: 'Badges',
    path: BADGES_LISTING,
    icon: 'trophy'
  },
  {
    text: 'Events',
    path: '/events',
    icon: 'calendar alternate outline'
  },
  {
    text: 'News',
    path: '/news',
    icon: 'newspaper'
  },
  {
    text: 'Players',
    path: '/players-list',
    icon: 'users'
  },
  {
    text: 'Rules',
    path: '/rules',
    icon: 'unordered list'
  }
];

const renderMenu = (path, callback = null) => {
  return HeaderMenuItems.map(item => (
    <Menu.Item
      className={`${path === item.path ? 'active' : ''}`}
      key={item.text.toLowerCase()}
      as={Link}
      onClick={() => (callback !== null ? callback() : undefined)}
      to={item.path}>
      <Icon name={item.icon} />
      {item.text}
    </Menu.Item>
  ));
};

const HeaderSidebar = ({ path, children, visible, callback }) => {
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation='overlay'
        direction='top'
        icon='labeled'
        inverted
        vertical
        visible={visible}>
        {CloseSidebar(callback)}
        {renderMenu(path, callback)}
      </Sidebar>
      <div onClick={() => callback()} className='dimmer'></div>
      <Sidebar.Pusher>{children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const HeaderMenu = ({ path, user, callback }) => (
  <div className='ui vertical inverted segment'>
    <Container>
      <Menu className='main-menu' inverted>
        <Menu.Item className='home' as={Link} to='/'>
          <Icon name='home' />
        </Menu.Item>

        {renderMenu(path)}

        <Menu.Menu position='right'>
          <div className='item'>
            <LanguageSwitcher />
          </div>
          {user ? (
            <UserProfileDropdown user={user} />
          ) : (
            <div className='item'>
              <Link to='/signin' className='ui signin-link'>
                Sign in &nbsp;
                <i className='sign-in icon'></i>
              </Link>
            </div>
          )}
          <Menu.Item className='menu-trigger' as='a' onClick={() => callback()}>
            <Icon className='bars' name='bars' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  </div>
);

// component
const Header = () => {
  const location = useLocation();
  const currentUser = useSelector(getCurrentUser);
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible);

    if (visible) {
      disableScroll.off();
    } else {
      disableScroll.on();
    }
  };

  return (
    <div className='header'>
      <HeaderSidebar
        user={currentUser}
        visible={visible}
        path={location.pathname}
        callback={handleToggle}>
        <HeaderMenu
          user={currentUser}
          path={location.pathname}
          callback={handleToggle}
        />
      </HeaderSidebar>
    </div>
  );
};

export default Header;
