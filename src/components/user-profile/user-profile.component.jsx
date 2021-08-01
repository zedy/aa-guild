// libs
import React from 'react';
import { connect } from 'react-redux';

// components
import UserPic from '../user-pic/user-pic.component';
import UserForm from '../user-form/user-form.component';

const UserProfile = ({ currentUser }) => {
  if (!currentUser) return null;

  return (
    <div className="ui grid">
      <div className="four wide column">
        <UserPic user={currentUser} />
      </div>
      <div className="twelve wide column">
          <UserForm user={currentUser} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(UserProfile);