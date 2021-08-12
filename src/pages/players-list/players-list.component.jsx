// libs
import React, { useEffect, useState } from "react";

// components
import PlayerItem from "../../components/player-item/player-item.component";
import Loader from "../../components/loader/loader.component";

// firestore
import { fetchAllPlayersData } from '../../utils/firebaseFetch';

const PlayersPage = () => {
  const [playerData, setPlayerData] = useState([])

  useEffect(() => {
    (async () => {
      const data = await fetchAllPlayersData();    
      setPlayerData(data);
    })();
  }, []);

  if (!playerData || playerData.length === 0) return <Loader />

  return (
    <div className="ui container content" style={{ paddingTop: "9em" }}>
      <h1>Player list</h1>
      <div className="ui middle aligned divided list">
        {playerData.map((player) => (
          <PlayerItem key={player.displayName} data={player} />
        ))}
      </div>
    </div>
  );
};

export default PlayersPage;
