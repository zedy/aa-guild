// libs
import React from "react";
import { connect } from "react-redux";

// redux
import { getListByID } from "../../redux/events/events.selectors";

// components
import Loader from "../../components/loader/loader.component";
import { GoogleMaps } from '../google/google.component';

const Event = ({ match, events }) => {
  if (Object.keys(events).length === 0) return <Loader />; 

  const event = events[match.params.id];

  const getDate = eventDate => {
    var theDate = new Date(eventDate * 1000);
    const dateString = theDate.toUTCString();
    return dateString;
  }

  const LocationMarker = () => <div><i style={{fontSize: '40px'}} className="icon map marker alternate"></i></div>;

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
                <h1 className="ui inverted header">{ event.headline }</h1>
                <h2>{ getDate(event.date) }</h2>
                <div className="ui huge primary button">
                  Prijavite se na event <i className="right arrow icon"></i>
                </div>
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
            <td>{ event.season }</td>
          </tr>
          <tr>
            <td>Session</td>
            <td>{ event.session }</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{ event.location }</td>
          </tr>
        </tbody>
      </table>
        <p>{ event.text }</p>
        <div style={{ height: '450px', width: '100%' }}>
        <GoogleMaps geoLoc={event.geoLocation} >
          <LocationMarker lat={event.geoLocation.latitude} lng={event.geoLocation.longitude} />
        </GoogleMaps>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: getListByID(state),
});

export default connect(mapStateToProps)(Event);
