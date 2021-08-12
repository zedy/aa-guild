// libs
import React from "react";
import { Link } from "react-router-dom";

const PlayerItem = ({ data }) => {
  return (
    <Link to={`/player/${data.id}/character`} className="item">
      <img
        style={{ width: "100px", height: "100px" }}
        className="ui avatar image"
        src={`${data.profilePic}`}
        alt="test"
      />
      <div className="content">
        <span className="header">{data.displayName.toUpperCase()}</span>
        <div className="description">
          <div className="">
            Players character: <strong>{data.pc.name}</strong>
          </div>
          <div className="">
            Level/Race/Class:
            <strong>
              {data.pc.level}/{data.pc.race}/{data.pc.charClass} -{" "}
              {data.pc.subClass}
            </strong>
          </div>
          <div className="">
            Games played: <strong>{data.gamesPlayed}</strong>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerItem;
