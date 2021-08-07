// libs
import React from "react";
import { connect } from "react-redux";

// components
import EventListItem from "../../components/event/event-list-item.component";
import { Placeholder } from "../../components/static/static.component";

// redux
import { getSplitEventList } from "../../redux/events/events.selectors";

const EventListPage = ({ eventList }) => {
  return (
    <div className="ui container content" style={{ paddingTop: "9em" }}>
      <h1>Events</h1>
      <h2>Upcoming events</h2>
      <div className="ui middle aligned divided list">
        {eventList.future.length ? (
          eventList.future.map((event) => {
            return <EventListItem key={event.id} event={event} />;
          })
        ) : (
          <Placeholder />
        )}
      </div>
      <div className="ui divider"></div>
      <h2>Past events</h2>
      <div className="ui middle aligned divided list">
        {eventList.past.length ? (
          eventList.past.map((event) => {
            return <EventListItem key={event.id} event={event} />;
          })
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  eventList: getSplitEventList(state),
});

export default connect(mapStateToProps)(EventListPage);
