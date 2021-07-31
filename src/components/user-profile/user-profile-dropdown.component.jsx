// libs
import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

// firebase
import { auth } from "../../firebase/firebase.utils";

// component
import Button from "../buttons/button.components";

const UserProfileDropdown = ({ user }) => {
  return (
    <div className="item">
      <Dropdown icon="user outline">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link
              style={{ color: "#000" }}
              className="item"
              to={`/player/${user.id}/profile`}
            >
              Profile page
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Button
              style={{ color: "#000" }}
              onClick={() => auth.signOut()}
              className="ui button item"
            >
              <i className="sign out icon"></i>
              Sign out
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserProfileDropdown;
