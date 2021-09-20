// libs
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// styles
import './badges.styles.scss';

// firestore
import { fetchAllBadges } from '../../utils/firebaseFetch';

// redux
import { getCurrentUser } from '../../redux/user/user.selectors';

// components
import { Placeholder } from '../static/static.component';
import Badge from './badge.component';

// redux
import { setBadges } from '../../redux/badges/badges.actions';

// helper functions
const renderPlaceholder = () => (
  <div className='twelve wide column'>
    <Placeholder placeholderClass='fluid' />
  </div>
);

const renderData = (badges, currentUser) => {
  return badges.map(badge => {
    return <Badge key={badge.id} badge={badge} currentUser={currentUser} />;
  });
};
//

// component
const BadgeList = () => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const [badgesList, setBadgesList] = useState(null);

  useEffect(() => {
    (async () => {
      const badgesData = await fetchAllBadges();
      dispatch(setBadges(badgesData));
      setBadgesList(badgesData);
    })();
  }, []);

  return (
    <div className='badge-list'>
      {!badgesList ? renderPlaceholder() : renderData(badgesList, currentUser)}
    </div>
  );
};

export default BadgeList;
