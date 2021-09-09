// libs
import React from 'react';
import { useSelector } from 'react-redux';

// components
import NewsListItem from '../news/news-list-item.component';

// redux
import { getAllNewsArticles } from '../../redux/news/news.selectors';
import { Placeholder } from 'semantic-ui-react';

const NewsList = () => {
  const newsList = useSelector(getAllNewsArticles);

  return (
    <div className='news-list'>
      <div className='ui middle aligned divided list'>
        {newsList.length ? (
          newsList.map(news => {
            return <NewsListItem key={news.id} news={news} />;
          })
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};

export default NewsList;
