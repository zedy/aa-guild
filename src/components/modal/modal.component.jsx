// libs
import React from 'react';
import ReactDOM from 'react-dom';

// components
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`${isOpen ? 'active' : ''} ui dimmer modals visible`}>
      <div
        onClick={e => e.stopPropagation()}
        className='ui standard modal visible active'>
        <div>
          <button onClick={onClose}>X</button>
          {children}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
