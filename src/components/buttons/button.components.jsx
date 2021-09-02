import React from 'react';

const Button = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button className={`custom-button`} {...otherProps}>
    {children}
  </button>
);

export default Button;
