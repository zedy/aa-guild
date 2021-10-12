// libs
import React from 'react';

// components
import EventList from '../../components/event/event-list.component';

// styles
import '../listing-pages/listing-page.styles.scss';

// components
const EventListPage = () => {
  return (
    <div className='ui container content'>
      <div className='listing-page'>
        <h1>Events</h1>
        <EventList />
      </div>
    </div>
  );
};

export default EventListPage;
