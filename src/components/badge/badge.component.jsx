// libs
import React from 'react';

// components
import { EditBadge, RemoveBadgeFromPlayer } from '../buttons/buttons.component';

// component
const Badge = ({
  badge: { name, description, badgeImage, id },
  showEdit,
  removeBadge
}) => {
  return (
    <div className='badge item'>
      <strong className='name'>{name}</strong>
      <span
        className={`badge-image ${name}`}
        style={{ backgroundImage: `url(${badgeImage})` }}></span>
      <p className='description'>{description}</p>

      {showEdit && EditBadge(id)}
      {removeBadge !== null && typeof removeBadge !== 'undefined'
        ? RemoveBadgeFromPlayer(removeBadge, id)
        : null}
    </div>
  );
};

export default Badge;
