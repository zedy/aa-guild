// libs
import React from 'react';

// components
import DMList from '../../components/hp/dm-list.component';
import HpHero from '../../components/hp/hero.component';
import AboutUs from '../../components/about/about.component';

const HomePage = () => {
  return (
    <div className='homepage'>
      <HpHero />
      <AboutUs />
      <DMList />
    </div>
  );
};

export default HomePage;
