// libs
import React from 'react';

const DMItem = ({ item, index }) => {
  const image = () => (
    <div className='profile four wide column'>
      <img alt={item.name} className='ui circular image' src={item.image} />
    </div>
  );

  const bio = () => (
    <div className='twelve wide column'>
      <div className='bio'>
        <h3>{item.name}</h3>
        <p>{item.about}</p>
      </div>
    </div>
  );

  return (
    <div className='row'>
      {index % 2 === 0 ? bio() : image()}
      {index % 2 === 0 ? image() : bio()}
    </div>
  );
};

export default DMItem;
