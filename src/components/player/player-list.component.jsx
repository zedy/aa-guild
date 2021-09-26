// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion } from 'react-accessible-accordion';
import { withRouter } from 'react-router';

// styles
import './player-list.styles.scss';

// components
import { Placeholder } from '../../components/static/static.component';
import PlayerItemAdmin from '../player-item/player-item-admin.component';
import PlayerItem from '../player-item/player-item.component';

// firestore
import { fetchAllPlayersData } from '../../firebase/firebase-fetch';

// redux
import { getUserList } from '../../redux/user/user.selectors';
import { setUsersList } from '../../redux/user/user.actions';

// helper functions
const renderPlaceholder = () => <Placeholder placeholderClass='fluid' />;

const renderData = (playerData, isAdmin) => {
  return playerData.map(player => {
    return isAdmin() ? (
      <PlayerItemAdmin key={player.displayName} data={player} />
    ) : (
      <PlayerItem key={player.displayName} data={player} />
    );
  });
};
//

// component
const PlayerList = ({ match }) => {
  const dispatch = useDispatch();
  const playerData = useSelector(getUserList);

  useEffect(() => {
    (async () => {
      if (!playerData) {
        const data = await fetchAllPlayersData();
        dispatch(setUsersList(data));
      }
    })();
  }, [dispatch]);

  const isAdmin = () => {
    return match.url === '/admin/dashboard';
  };

  return (
    <>
      <Accordion allowZeroExpanded='true'>
        {!playerData || playerData.length === 0
          ? renderPlaceholder()
          : renderData(playerData, isAdmin)}
        {}
      </Accordion>
    </>
  );
};

export default withRouter(PlayerList);
