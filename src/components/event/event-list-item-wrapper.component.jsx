// libs
import React from 'react';

// components
import EventListItem from '../../components/event/event-list-item.component';

// utils
import { renderPlaceholders } from '../../utils';

// constants
const PLACEHOLDER_NUMBER = 4;

// component
const EventListItemWrapper = ({ events }) => {
  return (
    <div className='ui middle aligned divided list'>
      {events.length ? (
        events.map(event => {
          return <EventListItem key={event.id} event={event} />;
        })
      ) : (
        <>{renderPlaceholders(PLACEHOLDER_NUMBER)}</>
      )}
    </div>
  );
};

export default EventListItemWrapper;
