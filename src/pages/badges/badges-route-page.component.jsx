// libs
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

// redux
import { getListByID } from '../../redux/badges/badges.selectors';

// components
import Loader from '../../components/loader/loader.component';
import BadgeForm from '../../components/badge/badge-form.component';

// component
const BadgesRoutePage = ({ match }) => {
  const badges = useSelector(getListByID);
  console.log(badges);
  if (Object.keys(badges).length === 0) return <Loader />;

  const badge = badges[match.params.id];
  console.log(badge);
  return (
    <div className='badge-page'>
      {/* <Route
        exact
        path={`${match.path}`}
        render={props => <Badge badge={badge} {...props} />}
      /> */}
      <Route
        exact
        path={`${match.path}/edit`}
        render={props => <BadgeForm badge={badge} {...props} />}
      />
    </div>
  );
};

export default BadgesRoutePage;
