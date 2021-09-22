// libs
import React from 'react';

// component
const Masthead = ({ url, headline, children }) => (
  <div
    className='ui inverted vertical masthead center aligned segment'
    style={{
      backgroundImage: `url("${url}")`
    }}>
    <div className='ui grid middle aligned'>
      <div className='row'>
        <div className='column'>
          <div className='ui text '>
            <h1 className='ui inverted header'>{headline}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Masthead;
