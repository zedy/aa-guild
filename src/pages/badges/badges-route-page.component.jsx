// libs
import React from 'react';

// component
const BadgesRoutePage = () => {
  return (
    <div className='badge-page'>
      <h1>badges</h1>
      {/* <Route
        exact
        path={`${match.path}`}
        render={props => <Badge badge={badge} {...props} />}
      /> */}
      {/* <Route
        exact
        path={`${match.path}/edit`}
        render={props => <BadgeForm badge={badge} {...props} />}
      /> */}
    </div>
  );
};

export default BadgesRoutePage;
