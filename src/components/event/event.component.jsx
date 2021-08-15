// libs
import React, { useState } from "react";
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr'

// redux
import { getListByID } from "../../redux/events/events.selectors";

// components
import Loader from "../../components/loader/loader.component";
import { GoogleMaps } from "../google/google.component";
import { ModalDefault } from "../modal/modal.component";
import {
  ModalContentEventRegister,
  ModalContentEventUnRegister,
} from "../modal/content/modal-content.component";

// firebase
import { eventRegister } from "../../firebase/firebase.utils";

const Event = ({ match, events, currentUser }) => {
  const [isRegisterModalActive, setIsRegisterModalActive] = useState(false);
  const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);

  if (Object.keys(events).length === 0 || !currentUser) return <Loader />;

  const event = events[match.params.id];
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

  const eventButton = () => {
    const isGoing = event.attendees.includes(currentUser.id);

    return (
      <>
        {isGoing ? (
          <button
            className="ui huge red button"
            onClick={() => {
              setIsConfirmModalActive(true);
            }}
          >
            Odjavi se sa event-a <i className="right arrow icon"></i>
          </button>
        ) : (
          <button
            className="ui huge primary button"
            onClick={() => {
              setIsRegisterModalActive(true);
            }}
          >
            Prijavite se na event <i className="right arrow icon"></i>
          </button>
        )}
      </>
    );
  };

  return (
    <div>
      <div
        className="ui inverted vertical masthead center aligned segment"
        style={{
          marginTop: "5em",
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
                {eventButton()}
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

const mapStateToProps = (state) => ({
  events: getListByID(state),
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Event);
