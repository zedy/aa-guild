// libs
import React from 'react';
import { connect } from 'react-redux';

// components
import UserPic from '../user-pic/user-pic.component';
import UserForm from '../user-form/user-form.component';

const UserProfile = ({ currentUser }) => {
  console.log(currentUser);

  return (
    <div className="ui grid">
      <div className="four wide column">
        <UserPic />
      </div>
      <div className="twelve wide column">
          <UserForm />
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(UserProfile);