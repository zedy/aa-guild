// libs
import React from 'react';

// styles
import './news.styles.scss';

// helper functions
const getDate = date => {
  var theDate = new Date(date * 1000);
  const dateString = theDate.toUTCString();
  return dateString;
};

// component
const NewsArticle = ({ newsArticle }) => {
  return (
    <>
      <div
        className='ui inverted vertical masthead center aligned segment'
        style={{
          backgroundImage: `url("${newsArticle.heroImage}")`
        }}>
        <div className='ui grid middle aligned'>
          <div className='row'>
            <div className='column'>
              <div className='ui text '>
                <h1 className='ui inverted header'>{newsArticle.headline}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='ui container content'>
        <div className='ui'>
          <strong className='date'>
            Objavljeno {getDate(newsArticle.createdAt)}
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
