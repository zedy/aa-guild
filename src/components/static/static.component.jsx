// libs
import React from 'react';

export const Placeholder = ({ placeholderClass }) => (
  <div className={`ui ${placeholderClass} placeholder`}>
    <div className='image header'>
      <div className='medium line'></div>
      <div className='full line'></div>
    </div>
    <div className='paragraph'>
      <div className='full line'></div>
      <div className='medium line'></div>
    </div>
  </div>
);
