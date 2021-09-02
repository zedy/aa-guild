import React from 'react';
import ReactDOM from 'react-dom';

export const ModalDefault = ({
  title,
  content,
  actions,
  isActive,
  children
}) => {
  return ReactDOM.createPortal(
    <div className={`${isActive ? 'active' : null} ui dimmer modals visible`}>
      <div
        onClick={e => e.stopPropagation()}
        className='ui standard modal visible active'>
        {title ? <div className='header'>{title}</div> : ''}
        <div className='content'>{children ? children : content}</div>
        {actions}
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export const ModalHero = ({ isActive, children }) => {
  return ReactDOM.createPortal(
    <div className={`${isActive ? 'active' : null} ui dimmer modals visible`}>
      {children}
    </div>,
    document.querySelector('#modal')
  );
};
