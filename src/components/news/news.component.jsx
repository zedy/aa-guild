// libs
import React from 'react';

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
          backgroundImage: `url("${newsArticle.heroImage}")`,
          minHeight: '550px'
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
      <div className='ui container content' style={{ paddingTop: '4em' }}>
        <div className='ui'>
          <span>{getDate(newsArticle.createdAt)}</span>
          <div dangerouslySetInnerHTML={{ __html: newsArticle.article }} />
        </div>
        <div
          className='ui inverted vertical masthead center aligned segment'
          style={{
            backgroundImage: `url("${newsArticle.bodyImage}")`,
            minHeight: '550px'
          }}></div>
        <p>{newsArticle.text}</p>
      </div>
    </>
  );
};

export default NewsArticle;
