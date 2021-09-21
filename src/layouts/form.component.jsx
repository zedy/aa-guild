// libs
import React from 'react';

// component
const FormLayout = ({ children }) => (
  <div className='ui container content'>
    <div className='ui centered grid'>
      <div className='ten wide column'>{children}</div>
    </div>
  </div>
);

export default FormLayout;
