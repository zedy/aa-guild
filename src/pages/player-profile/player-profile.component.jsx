// libs
import React from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";

// components
import Throw403 from "../403/throw403.component.jsx";
import UserProfile from "../../components/user-profile/user-profile.component.jsx";
import CharacterProfile from "../../components/character-profile/character-profile.component";

const PlayerProfile = ({ match, currentUser }) => {
  if (currentUser && match.params.id !== currentUser.id) {
    return <Throw403 />;
  } else if (!currentUser) {
    return null;
  }

  // TODO add Loading to class
  const panes = [
    {
      menuItem: "User profile",
      render: () => (
        <Tab.Pane>
          <UserProfile />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Player character profile",
      render: () => (
        <Tab.Pane>
          <CharacterProfile />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="ui container content" style={{ paddingTop: "9em" }}>
      <div className="ui content">
        <h1>Profiles page</h1>
        <Tab panes={panes} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(PlayerProfile);
