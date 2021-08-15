// libs
import React from "react";
import { Link } from "react-router-dom";

export const EventUnregisterButton = ({ onClick }) => (
  <button
    className="ui huge red button"
    onClick={() => {
      onClick(true);
    }}
  >
    Odjavi se sa event-a <i className="calendar minus icon"></i>
  </button>
);

export const EventRegisterButton = ({ onClick }) => (
  <button
    className="ui huge primary button"
    onClick={() => {
      onClick(true);
    }}
  >
    Prijavite se na event <i className="calendar plus icon"></i>
  </button>
);

export const EventRedirectLink = () => (
  <Link to="/signin" className="ui huge primary button">
    Prijavite se na event <i className="calendar plus icon"></i>
  </Link>
);
