// libs
import React from "react";
import { connect } from "react-redux";

// components
import EventListItemWrapper from "./event-list-item-wrapper.component";

// redux
import { getSplitEventList } from "../../redux/events/events.selectors";

const EventList = ({ eventList }) => {
  return (
    <div className="event-list">
      <h2>Upcoming events</h2>
      <EventListItemWrapper events={eventList.future} />
      <div className="ui divider"></div>
      <EventListItemWrapper events={eventList.past} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  eventList: getSplitEventList(state),
});

export default connect(mapStateToProps)(EventList);
