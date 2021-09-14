// libs
import React from 'react';
import { useSelector } from 'react-redux';

// components
import { Placeholder } from '../static/static.component';

// redux
import { getAboutUs } from '../../redux/misc/misc.selectors';

// consts & helpers
const image = src => (
  <img alt='about-us' className='ui fluid image' src={src} />
);

const parapraph = p => (
  <div className='ui text' dangerouslySetInnerHTML={{ __html: p }} />
);

const renderData = data => {
  return data.keyOrder.map(key => {
    return key.includes('rte') ? parapraph(data[key]) : image(data[key]);
  });
};

const renderPlaceholder = () => <Placeholder placeholderClass='fluid' />;
//

// component
const AboutUs = () => {
  const data = useSelector(getAboutUs);

  return (
    <section className='about-us'>
      <div className='ui container content' style={{ paddingTop: '3em' }}>
        <h1>About us</h1>
        {!data || Object.keys(data).length === 0
          ? renderPlaceholder()
          : renderData(data)}
      </div>
    </section>
  );
};

export default AboutUs;
