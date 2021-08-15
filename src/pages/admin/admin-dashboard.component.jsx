// libs
import React from "react";
import { connect } from "react-redux";

// redux
import { getSplitEventList } from "../../redux/events/events.selectors";

// components
import EventListItem from "../../components/event/event-list-item.component";

const AdminDashboard = ({ eventList }) => {
  return (
    <div className="ui container content" style={{ paddingTop: "9em" }}>
      <h2>Events</h2>
      <div
        className={`ui ${
          eventList.future.length === 0 ? "loading" : null
        } segment`}
      >
        <div className="ui middle aligned divided list">
          {eventList.future.map((event) => {
            return (
              <EventListItem key={event.id} event={event} isPast={false} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  eventList: getSplitEventList(state),
});

export default connect(mapStateToProps)(AdminDashboard);
