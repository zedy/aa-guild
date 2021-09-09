// libs
import React from 'react';
import { Tab } from 'semantic-ui-react';

// components
import UserProfile from '../../components/user-profile/user-profile.component.jsx';
import CharacterProfile from '../../components/character-profile/character-profile.component';

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

const PlayerProfile = () => {
  return (
    <div className='ui container content'>
      <div className='ui content'>
        <h1>Profiles page</h1>
        <Tab panes={panes} />
      </div>
    </div>
  );
};

export default PlayerProfile;
