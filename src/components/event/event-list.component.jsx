// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import EventListItemWrapper from './event-list-item-wrapper.component';

// redux
import { getSplitEventList } from '../../redux/events/events.selectors';
import { setEventsList } from '../../redux/events/events.actions';

// utils
import { fetchAllEvents } from '../../firebase/firebase-fetch';

// component
const EventList = () => {
  const dispatch = useDispatch();
  const eventList = useSelector(getSplitEventList);

  useEffect(() => {
    (async () => {
      if (!eventList) {
        const eventsData = await fetchAllEvents();
        dispatch(setEventsList(eventsData));
      }
    })();
  }, []);

  return (
    <div className='event-list'>
      <h2>Upcoming events</h2>
      <EventListItemWrapper
        events={eventList !== null ? eventList.future : []}
      />
      <h2>Past events</h2>
      <EventListItemWrapper events={eventList !== null ? eventList.past : []} />
    </div>
  );
};

export default EventList;
