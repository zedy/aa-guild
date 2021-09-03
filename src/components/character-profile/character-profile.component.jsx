// libs
import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// components
import ImageUpload from '../image-upload/image-upload.component';
import CharacterProfileForm from './character-profile-form.component';

// firebase
import { updateUserProfile } from '../../firebase/firebase.utils';

const CharacterProfile = ({ currentUser }) => {
  const defaultAvatar = process.env.REACT_APP_DEFAULT_AVATAR;

  const CharacterProfileUpdate = async callbackResponse => {
    const response = await updateUserProfile(currentUser, {
      characterPic: callbackResponse
    });
    toastr[response.status](response.message);
  };

  return (
    <div className='ui grid'>
      <div className='four wide column'>
        <ImageUpload
          fileName={currentUser.id}
          path='character'
          isAvatar={true}
          presetImage={currentUser.characterPic}
          callback={CharacterProfileUpdate}
          defaultImage={defaultAvatar}
        />
      </div>
      <div className='twelve wide column'>
        <CharacterProfileForm user={currentUser} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(CharacterProfile);
