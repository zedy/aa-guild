// libs
import React from "react";
import { Link } from "react-router-dom";

const EventListItem = ({ event, isPast }) => {
  const getDate = (eventDate) => {
    var theDate = new Date(eventDate * 1000);
    const dateString = theDate.toUTCString();
    return dateString;
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
    </>
  );

  return (
    <>
    {
      isPast ?
      (<div className="item">{ eventContent() }</div>)
      :
      (<Link to={`/event/${event.id}`} className="item">{ eventContent() }</Link>)
    }
    </>
  );
};

export default EventListItem;
