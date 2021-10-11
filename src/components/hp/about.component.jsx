// libs
import React from 'react';
import { useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

// components
import { Placeholder } from '../static/static.component';

// redux
import { getAboutUs } from '../../redux/misc/misc.selectors';

// consts & helpers
const image = (src, key) => (
  <div key={key} className='image-wrapper element'>
    <img alt='about-us' className='ui fluid image' src={src} />
  </div>
);

const parapraph = (p, key) => (
  <div
    key={key}
    className='ui text element'
    dangerouslySetInnerHTML={{ __html: p }}
  />
);

const renderData = data => {
  let carousel = [];
  const carouselIndex = carouselCalculator(data.keyOrder);

  return data.keyOrder.map((key, index) => {
    if (key.includes('rte')) {
      return parapraph(data[key], key);
    }

    if (key.includes('image')) {
      if (index >= carouselIndex[0] && index <= carouselIndex[1]) {
        carousel.push(image(data[key], key));
      } else {
        return image(data[key], key);
      }
      if (index === carouselIndex[1]) {
        return (
          <Carousel showThumbs={false} dynamicHeight infiniteLoop>
            {carousel}
          </Carousel>
        );
      }
    }

    return null; // to satisfy eslint
  });
};

const carouselCalculator = keys => {
  let imageCounter = [];
  let prevKey = null;

  keys.forEach((key, index) => {
    if (key.includes('image') && prevKey === 'image' && !imageCounter.length) {
      imageCounter.push(index - 1);
    } else if (key.includes('rte') && prevKey === 'image') {
      imageCounter.push(index - 1);
    }
    prevKey = key.slice(0, -2);
  });

  return imageCounter;
};

const renderPlaceholder = () => <Placeholder placeholderClass='fluid' />;
//

// component
const AboutUs = () => {
  const data = useSelector(getAboutUs);

  return (
    <section className='about-us'>
      <div className='ui container content'>
        <h1>About us</h1>
        {!data || Object.keys(data).length === 0
          ? renderPlaceholder()
          : renderData(data)}
      </div>
    </section>
  );
};

export default AboutUs;
