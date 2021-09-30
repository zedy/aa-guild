// libs
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// styles
import './badges.styles.scss';

// firestore
import { fetchAllBadges } from '../../firebase/firebase-fetch';

// components
import { Placeholder } from '../static/static.component';
import Badge from './badge.component';

// redux
import { setBadges } from '../../redux/badges/badges.actions';
import { getBadges } from '../../redux/badges/badges.selectors';

// helper functions
const renderPlaceholder = () => (
  <div className='twelve wide column'>
    <Placeholder placeholderClass='fluid' />
  </div>
);

const renderData = (badges, showActions) => {
  return badges.map(badge => {
    return <Badge key={badge.id} badge={badge} showActions={showActions} />;
  });
};
//

// component
const BadgeList = ({ showActions }) => {
  const dispatch = useDispatch();
  const badgesList = useSelector(getBadges);

  useEffect(() => {
    (async () => {
      if (!badgesList) {
        const badgesData = await fetchAllBadges();
        dispatch(setBadges(badgesData));
      }
    })();
  }, [dispatch]);

  return (
    <div className='badge-list'>
      {!badgesList ? renderPlaceholder() : renderData(badgesList, showActions)}
    </div>
  );
};

export default BadgeList;
