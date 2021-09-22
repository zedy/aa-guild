// libs
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-accessible-accordion';

// styles
import './player-list.styles.scss';

// components
import PlayerItem from '../../components/player-item/player-item.component';
import { Placeholder } from '../../components/static/static.component';

// firestore
import { fetchAllPlayersData } from '../../firebase/firebase-fetch';

// helper functions
const renderPlaceholder = () => <Placeholder placeholderClass='fluid' />;

const renderData = playerData => {
  return playerData.map(player => (
    <PlayerItem key={player.displayName} data={player} />
  ));
};
//

// component
const PlayersPage = () => {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchAllPlayersData();
      setPlayerData(data);
    })();
  }, []);

  return (
    <section className='ui container content'>
      <div className='listing-page'>
        <h1>Player list</h1>
        <div className='ui player-list'>
          <Accordion allowZeroExpanded='true'>
            {!playerData || playerData.length === 0
              ? renderPlaceholder()
              : renderData(playerData)}
            {}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PlayersPage;
