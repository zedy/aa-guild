// libs
import React from 'react';

// components
import BadgeList from '../../components/badge/badge-list.component';

// component
const BadgesPage = () => {
  return (
    <div className='ui container content'>
      <div className='listing-page'>
        <h1>Awards & Badges</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac auctor
          augue mauris augue neque gravida in fermentum. Congue quisque egestas
          diam in. Pharetra diam sit amet nisl. Quis auctor elit sed vulputate
          mi. Porttitor massa id neque aliquam vestibulum morbi. Sagittis
          aliquam malesuada bibendum arcu vitae. Integer eget aliquet nibh
          praesent tristique magna sit. Nisi vitae suscipit tellus mauris a
          diam.
        </p>
        <BadgeList />
      </div>
    </div>
  );
};

export default BadgesPage;
