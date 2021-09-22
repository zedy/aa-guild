// libs
import React from 'react';
import { useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// components
import ImageUpload from '../image-upload/image-upload.component';
import UserForm from '../user-form/user-form.component';
import { Loader } from '../static/static.component';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';

// firebase
import { updateUserProfile } from '../../firebase/firebase.utils';

// env
const defaultAvatar = process.env.REACT_APP_USER_AVATAR;

// component
const UserProfile = () => {
  const currentUser = useSelector(getCurrentUser);

  if (!currentUser) return <Loader />;

  const UserProfileUpdate = async callbackResponse => {
    const response = await updateUserProfile(currentUser, {
      profilePic: callbackResponse
    });
    toastr[response.status](response.message);
  };

  return (
    <div className='ui stackable two column grid'>
      <div className='column'>
        <ImageUpload
          fileName={currentUser.id}
          path='profile'
          isAvatar={true}
          presetImage={currentUser.profilePic}
          callback={UserProfileUpdate}
          defaultImage={defaultAvatar}
        />
      </div>
      <div className='column'>
        <UserForm user={currentUser} />
      </div>
    </div>
  );
};

export default UserProfile;
