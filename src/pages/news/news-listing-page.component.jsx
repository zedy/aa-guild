import React from 'react';

import NewsList from '../../components/news/news-list.components';

const NewsListingPage = () => {
  return (
    <div className='ui container content'>
      <div className='listing-page'>
        <h1>News</h1>
        <NewsList />
      </div>
    </div>
  );
};

export default NewsListingPage;
