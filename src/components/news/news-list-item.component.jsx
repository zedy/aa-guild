// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';

// helper functions
const getDate = date => {
  var theDate = new Date(date * 1000);
  return theDate.toUTCString();
};

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
              Date: <strong>{getDate(news.createdAt.seconds)}</strong>
            </div>
            <div className='info'>
              Sezona: <strong>{`${news.article.substring(0, 100)} ...`}</strong>
            </div>
          </div>
        </div>
        {isAdmin() ? (
          <div className='actions'>
            <Link className='ui orange button' to={`/news/${news.id}/edit`}>
              <i className='edit icon'></i>Edit news article
            </Link>
          </div>
        ) : null}
      </Link>
    </>
  );
};

export default withRouter(NewsListItem);
