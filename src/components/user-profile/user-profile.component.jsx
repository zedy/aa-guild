// libs
import React from 'react';
import { useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// components
import ImageUpload from '../image-upload/image-upload.component';
import UserForm from '../user-form/user-form.component';
import Loader from '../loader/loader.component';

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
    <div className='ui grid'>
      <div className='four wide column'>
        <ImageUpload
          fileName={currentUser.id}
          path='profile'
          isAvatar={true}
          presetImage={currentUser.profilePic}
          callback={UserProfileUpdate}
          defaultImage={defaultAvatar}
        />
      </div>
      <div className='twelve wide column'>
        <UserForm user={currentUser} />
      </div>
    </div>
  );
};

export default UserProfile;
