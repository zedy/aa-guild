// libs
import React from 'react';

// assets
import hero from "../../assets/hero_main.jpg";

const HpHero = () => {
  return (
    <div
        className="ui inverted vertical masthead center aligned segment"
        style={{
          marginTop: "5em",
          backgroundImage: "url(" + hero + ")",
          minHeight: "550px",
        }}
      >
        <div className="ui grid middle aligned">
          <div className="row">
            <div className="column">
              <div className="ui text ">
                <h1 className="ui inverted header">Asocijacija Avanturista</h1>
                <h2>
                  Udruzenje igraca i ljubitelja drustvenith/tabletop igara.
                </h2>
                <div className="ui huge primary button">
                  Prijavite se <i className="right arrow icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HpHero;