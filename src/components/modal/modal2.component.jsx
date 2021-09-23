// libs
import React from 'react';
import ReactDOM from 'react-dom';

// components
const Modal = ({ modalInfo: { isActive, modalType, modalProps } }) => {
  const title = null;
  const actions = null;
  const children = null;
  const content = '';

  return ReactDOM.createPortal(
    <div className={`${isActive ? 'active' : ''} ui dimmer modals visible`}>
      <div
        onClick={e => e.stopPropagation()}
        className='ui standard modal visible active'>
        {title ? <div className='header'>{title}</div> : ''}
        <div className='content'>{children ? children : content} TITS </div>
        {actions}
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;

// export const Modal = ({ title, content, actions, isActive, children }) => {
//   return ReactDOM.createPortal(
//     <div className={`${isActive ? 'active' : null} ui dimmer modals visible`}>
//       <div
//         onClick={e => e.stopPropagation()}
//         className='ui standard modal visible active'>
//         {title ? <div className='header'>{title}</div> : ''}
//         <div className='content'>{children ? children : content} TITS </div>
//         {actions}
//       </div>
//     </div>,
//     document.querySelector('#modal')
//   );
// };

export const ModalHero = ({ isActive, children }) => {
  return ReactDOM.createPortal(
    <div className={`${isActive ? 'active' : null} ui dimmer modals visible`}>
      {children}
    </div>,
    document.querySelector('#modal')
  );
};
