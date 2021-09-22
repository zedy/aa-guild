// libs
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

// redux
import { getListByID } from '../../redux/events/events.selectors';
import { getCurrentUser } from '../../redux/user/user.selectors';

// components
import { Loader } from '../../components/static/static.component';
import Event from '../../components/event/event.component';
import EventPlayerList from '../../components/event/event-player-list.component';
import EventForm from '../../components/event/form/event-form.component';

const EventRoutePage = ({ match }) => {
  const events = useSelector(getListByID);
  const currentUser = useSelector(getCurrentUser);

  if (Object.keys(events).length === 0) return <Loader />;

  const event = events[match.params.id];

  return (
    <div className='event-page'>
      <Route
        exact
        path={`${match.path}`}
        render={props => (
          <Event event={event} currentUser={currentUser} {...props} />
        )}
      />
      <Route
        exact
        path={`${match.path}/player-list`}
        render={props => (
          <EventPlayerList event={event} currentUser={currentUser} {...props} />
        )}
      />
      <Route
        exact
        path={`${match.path}/edit`}
        render={props => (
          <EventForm event={event} currentUser={currentUser} {...props} />
        )}
      />
    </div>
  );
};

export default EventRoutePage;
