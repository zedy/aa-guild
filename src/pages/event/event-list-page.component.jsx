// libs
import React from 'react';

// components
import EventList from '../../components/event/event-list.component';

const EventListPage = () => {
  return (
    <div className='content'>
      <h1>Events</h1>
      <EventList />
    </div>
  );
};

export default EventListPage;
