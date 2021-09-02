// libs
import React from 'react';

const Throw403 = () => {
  return (
    <div className='ui container content' style={{ paddingTop: '9em' }}>
      <div className='ui centered middle aligned two column grid'>
        <div className='row'>
          <div className='column'>
            <h1>403</h1>
            <p>You are not authorized to access this page</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Throw403;
