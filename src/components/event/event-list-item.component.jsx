// libs
import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const EventListItem = ({ event, match, currentUser }) => {
  const getDate = (eventDate) => {
    var theDate = new Date(eventDate * 1000);
    return theDate.toUTCString();
  };

  const isPastEvent = () => {
    const now = new Date().getTime();

    return event.date.seconds * 1000 < now;
  };

  const isAdmin = () => {
    return match.path === "/admin/dashboard" && currentUser.isAdmin;
  };

  const eventContent = () => (
    <>
      <img
        style={{ width: "100px", height: "100px" }}
        className="ui avatar image"
        src={`${event.image}`}
        alt="test"
      />
      <div className="content">
        <span className="header">{event.headline.toUpperCase()}</span>
        <div className="description">
          <div className="info">
            Date: <strong>{getDate(event.date.seconds)}</strong>
          </div>
          <div className="info">
            Sezona: <strong>{event.season}</strong>
          </div>
          <div className="info">
            Sesija: <strong>{event.session}</strong>
          </div>
        </div>
      </div>
      {isAdmin() ? (
        <div className="actions">
          <Link className="ui orange button" to={`/event/${event.id}/edit`}>
            <i className="edit icon"></i>Edit event
          </Link>
          <Link className="ui olive button" to={`/event/${event.id}/player-list`}>
            <i className="users icon"></i>Manage players
          </Link>
        </div>
      ) : null}      
    </>
  );

  return (
    <>
      {isPastEvent() || isAdmin() ? (
        <div className="item">{eventContent()}</div>
      ) : (
        <Link to={`/event/${event.id}`} className="item">
          {eventContent()}
        </Link>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default withRouter(connect(mapStateToProps)(EventListItem));
