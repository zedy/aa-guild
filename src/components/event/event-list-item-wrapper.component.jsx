// libs
import React from "react";

// components
import EventListItem from "../../components/event/event-list-item.component";
import { Placeholder } from "../../components/static/static.component";

const EventListItemWrapper = ({ events }) => {
  return (
    <div className="ui middle aligned divided list">
      {events.length ? (
        events.map((event) => {
          return <EventListItem key={event.id} event={event} isPast={false} />;
        })
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default EventListItemWrapper;
