// libs
import React from 'react';

// components
import AddBadgeForm from '../../badge/form/badge-add-form.component';

// badge
export const addBadgeModalContent = props => (
  <>
    <div className='header'>Add badge</div>
    <div className='image content'>
      <AddBadgeForm data={props} />
    </div>
    <div className='actions'>
      <div className='ui button' onClick={() => props.closeModal()}>
        Close
      </div>
    </div>
  </>
);

export const deleteBadgeModalContent = ({
  badgeId,
  removeBadge,
  closeModal
}) => {
  return (
    <>
      <div className='header'>Remove badge</div>
      <div className='image content'>
        Are you sure you want to remove this badge from the players list?
      </div>
      <div className='actions'>
        <div className='ui red button' onClick={() => removeBadge(badgeId)}>
          Yes
        </div>
        <div className='ui button' onClick={() => closeModal()}>
          No
        </div>
      </div>
    </>
  );
};
//

// event
export const eventRegisterModalContent = ({ handleConfirm, closeModal }) => (
  <>
    <div className='header'>Prijava za event</div>
    <div className='content'>
      <p>
        Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
        facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
        referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
        electram, eos choro alterum definiebas in. Vim dolorum definiebas an.
        Mei ex natum rebum iisque.
      </p>
    </div>
    <div className='actions'>
      <div className='ui button' onClick={() => handleConfirm()}>
        Potvrdjujem dolazak
      </div>
      <div className='ui button' onClick={() => closeModal()}>
        Close
      </div>
    </div>
  </>
);

export const eventUnregisterModalContent = ({ handleConfirm, closeModal }) => (
  <>
    <div className='header'>Odjava sa event-a</div>
    <div className='content'>
      <p>Da li ste sigurni da zelite da se odjavite?</p>
    </div>
    <div className='actions'>
      <div className='ui button' onClick={() => handleConfirm()}>
        Da
      </div>
      <div className='ui button' onClick={() => closeModal()}>
        Ne
      </div>
    </div>
  </>
);
//

// new user
export const newUserModalContent = ({ handleConfirm }) => (
  <>
    <div className='header'>Dobro dosli na sajt AA</div>
    <div className='content'>
      <p>
        Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
        facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
        referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
        electram, eos choro alterum definiebas in. Vim dolorum definiebas an.
        Mei ex natum rebum iisque.
      </p>
    </div>
    <div className='actions'>
      <div className='ui button' onClick={() => handleConfirm()}>
        Razumem
      </div>
    </div>
  </>
);
