// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import { EditNews } from '../buttons/buttons.component';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';

// helper functions
import { convertDateToUTCString } from '../../utils';

// component
const NewsListItem = ({ news, match }) => {
  const currentUser = useSelector(getCurrentUser);

  const isAdmin = () => {
    return match.path === '/admin/dashboard' && currentUser.isAdmin;
  };

  return (
    <>
      <Link to={`/news/${news.id}`} className='item'>
        <img
          style={{ width: '100px', height: '100px' }}
          className='ui avatar image'
          src={`${news.heroImage}`}
          alt='test'
        />
        <div className='content'>
          <span className='header'>{news.headline.toUpperCase()}</span>
          <div className='description'>
            <div className='info'>
              Date:{' '}
              <strong>{convertDateToUTCString(news.createdAt.seconds)}</strong>
            </div>
            <div className='info'>
              Sezona: <strong>{`${news.article.substring(0, 100)} ...`}</strong>
            </div>
          </div>
        </div>
        {isAdmin() ? <div className='actions'>{EditNews(news.id)}</div> : null}
      </Link>
    </>
  );
};

export default withRouter(NewsListItem);
