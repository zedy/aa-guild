// libs
import React, { useEffect, useState } from "react";

// components
import PlayerItem from "../../components/player-item/player-item.component";

// firestore
import { fetchAllPlayersData } from '../../utils/firebaseFetch';

// data TODO: firebase => redux
import { PLAYERS_DATA } from "../../data/players-list.data";

const PlayersPage = () => {
  const [playerData, setPlayerData] = useState([])

  useEffect(() => {
    (async () => {
      const data = await fetchAllPlayersData();    
      setPlayerData(data);
    })();
  }, []);

  return (
    <div className="ui container content" style={{ paddingTop: "9em" }}>
      <h1>Player list</h1>
      <div className="ui middle aligned divided list">
        {playerData.map((item) => (
          <PlayerItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default PlayersPage;
