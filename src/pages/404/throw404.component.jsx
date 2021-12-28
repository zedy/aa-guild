// libs
import React from 'react';

// component
const Throw404 = ({ location }) => {
  return (
    <div className='throw404 ui container content'>
      <div className='center'>
        <h1>404</h1>
        <p>
          We could not find <strong>{location.pathname}</strong>
        </p>
      </div>
    </div>
  );
};

export default Throw404;
