// libs
import React from 'react';

// styles
import './news.styles.scss';

// components
import Masthead from '../../layouts/masthead.component';

// helper functions
import { convertDateToUTCString } from '../../utils';

// component
const NewsArticle = ({ newsArticle }) => {
  return (
    <>
      <Masthead url={newsArticle.heroImage} headline={newsArticle.headline} />
      <div className='ui container content'>
        <div className='ui'>
          <strong className='date'>
            Objavljeno {convertDateToUTCString(newsArticle.createdAt)}
          </strong>
          <div dangerouslySetInnerHTML={{ __html: newsArticle.article }} />
        </div>
        <div
          className='ui body-image'
          style={{
            backgroundImage: `url("${newsArticle.bodyImage}")`
          }}></div>
        <p>{newsArticle.text}</p>
      </div>
    </>
  );
};

export default NewsArticle;
