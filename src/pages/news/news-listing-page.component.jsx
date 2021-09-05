import React from 'react';

import NewsList from '../../components/news/news-list.components';

const NewsListingPage = () => {
  return (
    <div className='content'>
      <h1>News</h1>
      <NewsList />
    </div>
  );
};

export default NewsListingPage;
