// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import NewsListItem from '../news/news-list-item.component';

// redux
import { getAllNewsArticles } from '../../redux/news/news.selectors';
import { setNewsList } from '../../redux/news/news.actions';

// utils
import { renderPlaceholders } from '../../utils';
import { fetchAllNews } from '../../firebase/firebase-fetch';

// constants
const PLACEHOLDER_NUMBER = 4;

// component
const NewsList = () => {
  const dispatch = useDispatch();
  const newsList = useSelector(getAllNewsArticles);

  useEffect(() => {
    (async () => {
      if (!newsList.length) {
        const newsData = await fetchAllNews();
        dispatch(setNewsList(newsData));
      }
    })();
  }, []);

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
