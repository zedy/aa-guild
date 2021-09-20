// libs
import React from 'react';
import { Link } from 'react-router-dom';

// helper functions
const renderActions = id => (
  <Link className='edit-button' to={`/badge/${id}/edit`}>
    <i className='ui edit icon'></i>
  </Link>
);

// component
const Badge = ({
  badge: { name, description, badgeImage, id },
  currentUser
}) => {
  return (
    <div className='badge item'>
      <span
        className={`badge-image ${name}`}
        style={{ backgroundImage: `url(${badgeImage})` }}></span>
      <p className='description'>{description}</p>

      {currentUser && currentUser.isAdmin && renderActions(id)}
    </div>
  );
};

export default Badge;
