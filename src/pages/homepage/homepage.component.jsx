// libs
import React from 'react';

// styles
import '../../components/hp/hp.styles.scss';

// components
import DMList from '../../components/hp/dm-list.component';
import HpHero from '../../components/hp/hero.component';
import AboutUs from '../../components/hp/about.component';

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
