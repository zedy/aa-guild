// libs
import React from 'react';
import { useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// components
import ImageUpload from '../image-upload/image-upload.component';
import CharacterProfileForm from './character-profile-form.component';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';

// firebase
import { updateUserProfile } from '../../firebase/firebase.utils';

const CharacterProfile = () => {
  const currentUser = useSelector(getCurrentUser);
  const defaultAvatar = process.env.REACT_APP_DEFAULT_AVATAR;

  const CharacterProfileUpdate = async callbackResponse => {
    const response = await updateUserProfile(currentUser, {
      characterPic: callbackResponse
    });
    toastr[response.status](response.message);
  };

  return (
    <div className='ui stackable two column grid'>
      <div className='column'>
        <ImageUpload
          fileName={currentUser.id}
          path='character'
          isAvatar={true}
          presetImage={currentUser.characterPic}
          callback={CharacterProfileUpdate}
          defaultImage={defaultAvatar}
        />
      </div>
      <div className='column'>
        <CharacterProfileForm user={currentUser} />
      </div>
    </div>
  );
};

export default CharacterProfile;
