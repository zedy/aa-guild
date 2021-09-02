// libs
import React from 'react';

const Loader = () => (
  <div className='ui container content' style={{ paddingTop: '9em' }}>
    <div className='ui active inverted dimmer'>
      <div className='ui text loader'>Loading</div>
    </div>
    <p></p>
  </div>
);

export default Loader;
