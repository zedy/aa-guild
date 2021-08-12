// libs
import React from "react";
import { connect } from 'react-redux';

// components
import ImageUpload from "../image-upload/image-upload.component";
import CharacterProfileForm from "./character-profile-form.component";

// firebase
import { updatePlayerCharacterProfile, updateUserProfile } from "../../firebase/firebase.utils";

const CharacterProfile = ({ currentUser }) => {
  return (
    <div className="ui grid">
      <div className="four wide column">
        <ImageUpload
          user={currentUser}
          path='character'
          fieldName='characterPic'
          presetImage={currentUser.characterPic}
          profileUpdateCallback={updateUserProfile}
        />
      </div>
      <div className="twelve wide column">
        <CharacterProfileForm user={currentUser} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(CharacterProfile);
