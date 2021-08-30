// libs
import React, { useState } from "react";
import { actions, toastr } from 'react-redux-toastr'

// components
import { GoogleMaps } from "../google/google.component";
import { ModalDefault } from "../modal/modal.component";
import {
  ModalContentEventRegister,
  ModalContentEventUnRegister,
} from "../modal/content/modal-content.component";
import { EventRegisterButton, EventUnregisterButton, EventRedirectLink } from './event-buttons.component';

// firebase
import { eventRegister } from "../../firebase/firebase.utils";

const Event = ({ event, currentUser }) => {
  const [isRegisterModalActive, setIsRegisterModalActive] = useState(false);
  const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);

  const getDate = (eventDate) => {
    var theDate = new Date(eventDate * 1000);
    const dateString = theDate.toUTCString();
    return dateString;
  };

  const LocationMarker = () => (
    <div>
      <i style={{ fontSize: "40px" }} className="icon map marker alternate"></i>
    </div>
  );

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

  const eventButtonRender = () => {
    if (!currentUser) {
      return <EventRedirectLink />
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
        className="ui inverted vertical masthead center aligned segment"
        style={{
          backgroundImage: `url("${event.heroImage}")`,
          minHeight: "550px",
        }}
      >
        <div className="ui grid middle aligned">
          <div className="row">
            <div className="column">
              <div className="ui text ">
                <h1 className="ui inverted header">{event.headline}</h1>
                <h2>{getDate(event.date.seconds)}</h2>
                { eventButtonRender() }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui container content" style={{ paddingTop: "4em" }}>
        <table className="ui table">
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
        <p>{event.text}</p>
        <div style={{ height: "450px", width: "100%" }}>
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

// COMMENT Modal Example
{/* <button onClick={()=>{dispatch(setModalOpen({
  handleConfirm: ()=>{.Date.Dat}
}))}}>Open Modal</button>

const setModalOpen = (payload) => ({ 
  type:OPEN_NEKI_MODAL,
  body: <NekiModal />,
  payload
})

...case OPEN_NEKI_MODAL: {
  return { ...StaticRange,isModalOpen:true, conftent:actions.payload,body:actions.body}
}

const {body,content} useSelector(state)


return <div className= "modalclass"><Body {...content}></Body></div>

const body = ({handleConfirm}) */}