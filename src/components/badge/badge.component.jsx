// libs
import React from 'react';

// components
import { EditBadge } from '../buttons/buttons.component';

// component
const Badge = ({
  badge: { name, description, badgeImage, id },
  showActions
}) => {
  return (
    <div className='badge item'>
      <div>
        <strong className='name'>{name}</strong>
        <span
          className={`badge-image ${name}`}
          style={{ backgroundImage: `url(${badgeImage})` }}></span>
      </div>
      <p className='description'>{description}</p>

      {showActions && EditBadge(id)}
    </div>
  );
};

export default Badge;
