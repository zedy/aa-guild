// libs
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// styles
import './badges.styles.scss';

// firestore
import { fetchBadges } from '../../utils/firebaseFetch';

// components
import { Placeholder } from '../../components/static/static.component';
import Badge from '../../components/badge/badge.component';

// redux
import { setBadges } from '../../redux/misc/misc.actions';

// helper functions
const renderPlaceholder = () => (
  <div className='twelve wide column'>
    <Placeholder placeholderClass='fluid' />
  </div>
);

const renderData = badges =>
  badges.list.map(item => {
    const key = item.toLowerCase().replace(' ', '_');
    return <Badge key={key} name={key} description={badges.details[key]} />;
  });
//

// component
const BadgesPage = () => {
  const dispatch = useDispatch();
  const [badgesList, setBadgesList] = useState(null);

  useEffect(() => {
    (async () => {
      const badgesData = await fetchBadges();
      dispatch(setBadges(badgesData));
      setBadgesList(badgesData);
      console.log(badgesData.details);
    })();
  }, []);

  return (
    <div className='ui container content'>
      <div className='listing-page'>
        <h1>Badges</h1>
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
        <div className='badge-list'>
          {!badgesList ? renderPlaceholder() : renderData(badgesList)}
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;
