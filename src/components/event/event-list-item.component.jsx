// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';

// helper functions
const getDate = eventDate => {
  var theDate = new Date(eventDate * 1000);
  return theDate.toUTCString();
};

const isPastEvent = event => {
  const now = new Date().getTime();

  return event.date.seconds * 1000 < now;
};

const eventContent = (event, isAdmin) => (
  <>
    <img
      style={{ width: '100px', height: '100px' }}
      className='ui avatar image'
      src={`${event.heroImage}`}
      alt='test'
    />
    <div className='content'>
      <span className='header'>{event.headline.toUpperCase()}</span>
      <div className='description'>
        <div className='info'>
          Date: <strong>{getDate(event.date.seconds)}</strong>
        </div>
        <div className='info'>
          Sezona: <strong>{event.season}</strong>
        </div>
        <div className='info'>
          Sesija: <strong>{event.session}</strong>
        </div>
      </div>
    </div>
    {isAdmin() ? (
      <div className='actions'>
        <Link className='ui orange button' to={`/event/${event.id}/edit`}>
          <i className='edit icon'></i>Edit event
        </Link>
        <Link className='ui olive button' to={`/event/${event.id}/player-list`}>
          <i className='users icon'></i>Manage players
        </Link>
      </div>
    ) : null}
  </>
);

// component
const EventListItem = ({ event, match }) => {
  const currentUser = useSelector(getCurrentUser);

  const isAdmin = () => {
    return match.path === '/admin/dashboard' && currentUser.isAdmin;
  };

  return (
    <>
      {isPastEvent(event) || isAdmin() ? (
        <div className='item'>{eventContent(event, isAdmin)}</div>
      ) : (
        <Link to={`/event/${event.id}`} className='item'>
          {eventContent(event, isAdmin)}
        </Link>
      )}
    </>
  );
};

export default withRouter(EventListItem);
