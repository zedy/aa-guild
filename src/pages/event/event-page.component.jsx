// libs
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// redux
import { getListByID } from '../../redux/events/events.selectors';

// components
import Loader from '../../components/loader/loader.component';
import Event from '../../components/event/event.component';
import EventPlayerList from '../../components/event/event-player-list.component';
import EventForm from '../../components/event/event-form.component';

const EventRoutePage = ({ match, events, currentUser }) => {
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

const mapStateToProps = state => ({
  events: getListByID(state),
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(EventRoutePage);
