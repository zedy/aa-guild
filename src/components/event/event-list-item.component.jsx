// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';

// utils
import { convertDateToUTCString } from '../../utils';

// buttons
import { ManagePlayers, EditEvent } from '../buttons/buttons.component';

// utils
import { isPastEvent } from './helpers';

// content
const eventContent = (event, isAdmin) => (
  <>
    <div
      className='box-image'
      style={{ backgroundImage: `url(${event.heroImage})` }}></div>
    <div className='content'>
      <span className='header'>{event.headline.toUpperCase()}</span>
      <div className='description'>
        <div className='info'>
          Date: <strong>{convertDateToUTCString(event.date.seconds)}</strong>
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
        {EditEvent(event.id)}
        {ManagePlayers(event.id)}
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
      {isPastEvent(event.date) || isAdmin() ? (
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
