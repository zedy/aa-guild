// libs
import React from 'react';

// component
const Badge = ({ badge: { name, description, badgeImage } }) => {
  return (
    <div className='item'>
      <span
        className={`badge ${name}`}
        style={{ backgroundImage: `url(${badgeImage})` }}></span>
      <p className='description'>{description}</p>
    </div>
  );
};

export default Badge;
