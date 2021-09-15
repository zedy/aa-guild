// libs
import React, { useState } from 'react';
import { toastr } from 'react-redux-toastr';

// components
import { GoogleMaps } from '../google/google.component';
import { ModalDefault } from '../modal/modal.component';
import {
  ModalContentEventRegister,
  ModalContentEventUnRegister
} from '../modal/content/modal-content.component';
import {
  EventRegisterButton,
  EventUnregisterButton,
  EventRedirectLink
} from './event-buttons.component';

// styles
import './event.styles.scss';

// firebase
import { eventRegister } from '../../firebase/firebase.utils';

// helper functions
const LocationMarker = () => (
  <div>
    <i style={{ fontSize: '40px' }} className='icon map marker alternate'></i>
  </div>
);

const getDate = eventDate => {
  var theDate = new Date(eventDate * 1000);
  const dateString = theDate.toUTCString();
  return dateString;
};
//

// component
const Event = ({ event, currentUser }) => {
  const [isRegisterModalActive, setIsRegisterModalActive] = useState(false);
  const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);

  // TODO refactor these two methods
  const eventRegistration = async () => {
    const response = await eventRegister(event, currentUser.id);
    toastr[response.status](response.message);
    setIsRegisterModalActive(false);
  };

  const eventUnRegistration = async () => {
    const response = await eventRegister(event, currentUser.id, true);
    toastr[response.status](response.message);
    setIsConfirmModalActive(false);
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
          <EventUnregisterButton onClick={setIsConfirmModalActive} />
        ) : (
          <EventRegisterButton onClick={setIsRegisterModalActive} />
        )}
      </>
    );
  };

  return (
    <div>
      <div
        className='ui inverted vertical masthead center aligned segment'
        style={{
          backgroundImage: `url("${event.heroImage}")`
        }}>
        <div className='ui grid middle aligned'>
          <div className='row'>
            <div className='column'>
              <div className='ui text '>
                <h1 className='ui inverted header'>{event.headline}</h1>
                <h2>{getDate(event.date.seconds)}</h2>
                {eventButtonRender()}
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <ModalDefault isActive={isRegisterModalActive}>
        <ModalContentEventRegister
          handleConfirm={eventRegistration}
          handleDeny={() => {
            setIsRegisterModalActive(false);
          }}
        />
      </ModalDefault>
      <ModalDefault isActive={isConfirmModalActive}>
        <ModalContentEventUnRegister
          handleConfirm={eventUnRegistration}
          handleDeny={() => {
            setIsConfirmModalActive(false);
          }}
        />
      </ModalDefault>
    </div>
  );
};

export default Event;
