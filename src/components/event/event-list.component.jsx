// libs
import React from 'react';
import { useSelector } from 'react-redux';

// components
import EventListItemWrapper from './event-list-item-wrapper.component';

// redux
import { getSplitEventList } from '../../redux/events/events.selectors';

const EventList = () => {
  const eventList = useSelector(getSplitEventList);

  return (
    <div className='event-list'>
      <h2>Upcoming events</h2>
      <EventListItemWrapper events={eventList.future} />
      <h2>Past events</h2>
      <EventListItemWrapper events={eventList.past} />
    </div>
  );
};

export default EventList;
