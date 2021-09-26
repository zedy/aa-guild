// libs
import React from 'react';
import ReactDOM from 'react-dom';

// components
import {
  addBadgeModalContent,
  deleteBadgeModalContent,
  eventRegisterModalContent,
  eventUnregisterModalContent,
  newUserModalContent
} from './content/modal-content.component';

// constants
const modals = {
  ADD_BADGE: addBadgeModalContent,
  DELETE_BADGE: deleteBadgeModalContent,
  EVENT_REGISTER: eventRegisterModalContent,
  EVENT_UNREGISTER: eventUnregisterModalContent,
  NEW_USER: newUserModalContent
};

// components
const Modal = ({ modalInfo: { isActive, modalType, modalProps } }) => {
  if (!modalType) return null;

  const Component = modals[modalType];

  return ReactDOM.createPortal(
    <div className={`${isActive ? 'active' : ''} ui dimmer modals visible`}>
      <div
        onClick={e => e.stopPropagation()}
        className='ui standard modal visible active'>
        {Component(modalProps)}
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
