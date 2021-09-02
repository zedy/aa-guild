// libs
import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// components
import ImageUpload from '../image-upload/image-upload.component';
import UserForm from '../user-form/user-form.component';

// firebase
import { updateUserProfile } from '../../firebase/firebase.utils';

const UserProfile = ({ currentUser }) => {
  if (!currentUser) return null;

  // todo move to .env
  const defaultAvatar =
    'https://via.placeholder.com/300x300.png?text=User Avatar';

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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(UserProfile);
