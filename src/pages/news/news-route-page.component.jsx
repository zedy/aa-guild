// libs
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

// redux
import { getListByID } from '../../redux/news/news.selectors';

// components
import Loader from '../../components/loader/loader.component';
import NewsArticle from '../../components/news/news.component';
import NewsForm from '../../components/news/news-form.component';

const NawsRoutePage = ({ match }) => {
  const news = useSelector(getListByID);

  if (Object.keys(news).length === 0) return <Loader />;

  const newsArticle = news[match.params.id];

  return (
    <div className='news-page'>
      <Route
        exact
        path={`${match.path}`}
        render={props => <NewsArticle newsArticle={newsArticle} {...props} />}
      />
      <Route
        exact
        path={`${match.path}/edit`}
        render={props => <NewsForm newsArticle={newsArticle} {...props} />}
      />
    </div>
  );
};

export default NawsRoutePage;
