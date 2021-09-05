// libs
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// redux
import { getListByID } from '../../redux/news/news.selectors';

// components
import Loader from '../../components/loader/loader.component';
import NewsArticle from '../../components/news/news.component';

const NawsRoutePage = ({ match, news }) => {
  if (Object.keys(news).length === 0) return <Loader />;

  const newsArticle = news[match.params.id];

  return (
    <div className='news-page'>
      <Route
        exact
        path={`${match.path}`}
        render={props => <NewsArticle newsArticle={newsArticle} {...props} />}
      />
      {/* <Route
        exact
        path={`${match.path}/edit`}
        render={props => (
          <EventForm news={newsArticle} currentUser={currentUser} {...props} />
        )}
      /> */}
    </div>
  );
};

const mapStateToProps = state => ({
  news: getListByID(state)
  //currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(NawsRoutePage);
