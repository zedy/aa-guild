// libs
import React from 'react';
import { Link } from 'react-router-dom';

const PlayerItem = ({ data }) => {
  return (
    <Link to={`/player/${data.id}`} className="item">
      <img style={{width: "100px", height: "100px"}} className="ui avatar image" src={`${data.profile_pic}`} alt="profile image" />
      <div className="content">
        <span className="header">{ data.name.toUpperCase() }</span>
        <div className="description">
          <div className="">Players character: <strong>{ data.pc.name }</strong></div>
          <div className="">Level/Race/Class:
            <strong>{ data.pc.level }/{ data.pc.race }/{ data.pc.class }</strong>
          </div>
          <div className="">Games played: <strong>{ data.games_played }</strong></div>
        </div>
      </div>
    </Link>
  )
}

export default PlayerItem;