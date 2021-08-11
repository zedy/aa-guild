// libs
import React from "react";
import { connect } from "react-redux";

// components
import ImageUpload from "../image-upload/image-upload.component";
import UserForm from "../user-form/user-form.component";

// firebase
import { updateUserProfile } from "../../firebase/firebase.utils";

const UserProfile = ({ currentUser }) => {
  if (!currentUser) return null;

  return (
    <div className="ui grid">
      <div className="four wide column">
        <ImageUpload
          user={currentUser}
          path='profile'
          fieldName='profilePic'
          presetImage={currentUser.profilePic}
          profileUpdateCallback={updateUserProfile}
        />
      </div>
      <div className="twelve wide column">
        <UserForm user={currentUser} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(UserProfile);
