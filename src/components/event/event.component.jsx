// libs
import React from 'react';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// components
import Masthead from '../../layouts/masthead.component';
import { GoogleMaps } from '../google/google.component';
import {
  EventRegisterButton,
  EventUnregisterButton,
  EventRedirectLink
} from '../buttons/buttons.component';

// styles
import './event.styles.scss';

// firebase
import { eventRegister } from '../../firebase/firebase.utils';

// redux
import { hideModal, showModal } from '../../redux/modal/modal.actions';

// utils
import { convertDateToUTCString } from '../../utils';

// helper functions
const LocationMarker = () => (
  <div>
    <i style={{ fontSize: '40px' }} className='icon map marker alternate'></i>
  </div>
);
//

// component
const Event = ({ event, currentUser }) => {
  const dispatch = useDispatch();

  const openEventRegistrationModal = e => {
    e.preventDefault();
    dispatch(
      showModal({
        modalType: 'EVENT_REGISTER',
        modalProps: {
          handleConfirm: eventRegistration,
          closeModal: closeModal
        }
      })
    );
  };

  const openEventUnregistrationModal = e => {
    e.preventDefault();
    dispatch(
      showModal({
        modalType: 'EVENT_UNREGISTER',
        modalProps: {
          handleConfirm: eventUnregistration,
          closeModal: closeModal
        }
      })
    );
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  const eventRegistration = async () => {
    sendRequestToFirebase();
  };

  const eventUnregistration = async () => {
    sendRequestToFirebase(true);
  };

  const sendRequestToFirebase = async (unregister = false) => {
    const response = await eventRegister(event, currentUser.id, unregister);
    toastr[response.status](response.message);
    closeModal();
  };
  //

  const eventButtonRender = () => {
    if (!currentUser) {
      return <EventRedirectLink />;
    }

    const isGoing = event.attendees.includes(currentUser.id);

    return (
      <>
        {isGoing ? (
          <EventUnregisterButton callback={openEventUnregistrationModal} />
        ) : (
          <EventRegisterButton callback={openEventRegistrationModal} />
        )}
      </>
    );
  };

  return (
    <>
      <Masthead url={event.heroImage} headline={event.headline}>
        <h2>{convertDateToUTCString(event.date.seconds)}</h2>
        {eventButtonRender()}
      </Masthead>
      <div className='ui container content'>
        <h3>Detalji o eventu</h3>
        <table className='ui table'>
          <tbody>
            <tr>
              <td>Season</td>
              <td>{event.season}</td>
            </tr>
            <tr>
              <td>Session</td>
              <td>{event.session}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{event.location}</td>
            </tr>
          </tbody>
        </table>
        <div
          className='ui body-image'
          style={{
            backgroundImage: `url("${event.bodyImage}")`
          }}></div>
        <div
          className='text'
          dangerouslySetInnerHTML={{ __html: event.text }}
        />
        <div style={{ height: '450px', width: '100%' }}>
          <GoogleMaps geoLoc={event.geoLocation}>
            <LocationMarker
              lat={event.geoLocation.latitude}
              lng={event.geoLocation.longitude}
            />
          </GoogleMaps>
        </div>
      </div>
    </>
  );
};

export default Event;
