// libs
import React from "react";

// components
import PlayerItem from "../../components/player-item/player-item.component";

// data TODO: firebase => redux
import { PLAYERS_DATA } from "../../data/players-list.data";

const PlayersPage = () => {
  return (
    <div className="ui container content" style={{ paddingTop: "9em" }}>
      <h1>Player list</h1>
      <div class="ui middle aligned divided list">
        {PLAYERS_DATA.map((item) => (
          <PlayerItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default PlayersPage;
