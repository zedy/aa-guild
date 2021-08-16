// libs
import React from "react";
import { connect } from "react-redux";

// components
import EventList from "../../components/event/event-list.component";

// redux
import { getSplitEventList } from "../../redux/events/events.selectors";

const EventListPage = ({ eventList }) => {
  return (
    <div className="content">
      <h1>Events</h1>
      <EventList />
    </div>
  );
};

const mapStateToProps = (state) => ({
  eventList: getSplitEventList(state),
});

export default connect(mapStateToProps)(EventListPage);
