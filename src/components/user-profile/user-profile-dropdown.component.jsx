// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

// styles
import './user-profile.styles.scss';

// firebase
import { auth } from '../../firebase/firebase.utils';

// component
import Button from '../buttons/buttons.component';

const UserProfileDropdown = ({ user, history }) => {
  return (
    <div className='item user-profile-dropdown'>
      <Dropdown floating icon='user outline'>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link
              style={{ color: '#000' }}
              className=''
              to={`/admin/dashboard`}>
              <i className='ui settings icon'></i>
              Admin dashboard
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              style={{ color: '#000' }}
              className=''
              to={`/player/${user.id}/profile`}>
              <i className='ui user circleu icon'></i>
              User profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Button
              style={{ color: '#000' }}
              onClick={() => {
                auth.signOut();
                history.push('/signin');
              }}
              className='ui button item'>
              <i className='sign out icon'></i>
              Sign out
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default withRouter(UserProfileDropdown);
