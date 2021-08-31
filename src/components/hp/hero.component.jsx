// libs
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// assets
import hero from "../../assets/hero_main.jpg";

// redux
import { getSplitEventList } from "../../redux/events/events.selectors";

const HpHero = ({ futureEvents }) => {
  console.log(futureEvents);
  const latestEvent = futureEvents.future.length !== 0 ? futureEvents.future[0] : null;

  const LinkElement = () => {
    return (
    <Link to={`/event/${latestEvent.id}`} className="ui huge primary button">
      Prijavite se za sledecu sesiju
      <i className="right arrow icon"></i>
    </Link>
    )
  }

  return (
    <div
      className="ui inverted vertical masthead center aligned segment"
      style={{
        backgroundImage: "url(" + hero + ")",
        minHeight: "550px",
      }}
    >
      <div className="ui grid middle aligned">
        <div className="row">
          <div className="column">
            <div className="ui text ">
              <h1 className="ui inverted header">Asocijacija Avanturista</h1>
              <h2>Udruzenje igraca i ljubitelja D&D-a.</h2>
              {latestEvent && LinkElement()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  futureEvents: getSplitEventList(state),
});

export default connect(mapStateToProps)(HpHero);
