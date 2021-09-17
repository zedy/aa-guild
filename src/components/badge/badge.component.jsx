// libs
import React from 'react';

// component
const Badge = ({ name, description }) => {
  return (
    <div className='item'>
      <span className={`badge ${name}`}></span>
      <p>{description}</p>
    </div>
  );
};

export default Badge;
