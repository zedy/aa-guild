// libs
import React from 'react';

// components
import PlayerList from '../../components/player/player-list.component';

// component
const PlayersPage = () => {
  return (
    <section className='ui container content'>
      <div className='listing-page'>
        <h1>Player list</h1>
        <div className='ui player-list'>
          <PlayerList />
        </div>
      </div>
    </section>
  );
};

export default PlayersPage;
