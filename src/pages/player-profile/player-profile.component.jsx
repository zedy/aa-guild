// libs
import React from 'react';
import { Tab } from 'semantic-ui-react';

// components
import UserProfile from '../../components/user-profile/user-profile.component.jsx';
import CharacterProfile from '../../components/character-profile/character-profile.component';

// helper functions
const renderCharacterProfile = () => (
  <Tab.Pane>
    <CharacterProfile />
  </Tab.Pane>
);

const renderUserProfile = () => (
  <Tab.Pane>
    <UserProfile />
  </Tab.Pane>
);
//

// constants
const panes = [
  {
    menuItem: 'User profile',
    render: renderUserProfile
  },
  {
    menuItem: 'Player character profile',
    render: renderCharacterProfile
  }
];

// component
const PlayerProfile = () => {
  return (
    <div className='profile-page'>
      <div className='ui container'>
        <div className='ui content'>
          <h1>Profiles page</h1>
          <Tab panes={panes} />
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
