// libs
import React from 'react';
import { useSelector } from 'react-redux';

// components
import NewsListItem from '../news/news-list-item.component';

// redux
import { getAllNewsArticles } from '../../redux/news/news.selectors';

// utils
import { renderPlaceholders } from '../../utils';

// constants
const PLACEHOLDER_NUMBER = 4;

// component
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
          <>{renderPlaceholders(PLACEHOLDER_NUMBER)}</>
        )}
      </div>
    </div>
  );
};

export default NewsList;
