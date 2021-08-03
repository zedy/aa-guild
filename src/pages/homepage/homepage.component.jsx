// libs
import React from "react";

// components

// assets
import hero from "../../assets/hero_main.jpg";

const HomePage = () => {
  return (
    <div className="homepage">
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
      <div className="dm-list" style={{marginTop: '8em'}}>
          <div className="ui container">
          <h2 className="middle aligned">Nasi DM-ovi</h2>
          <div className="ui grid"> 
            <div className="four wide column">
            <img className="ui circular image" src="https://via.placeholder.com/150x150.png?text=DM" />
            </div>
            <div className="twelve wide column">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula commodo convallis. Mauris sed odio a velit ultricies dignissim. Morbi magna felis, faucibus molestie gravida quis, fringilla vel purus. Integer vitae egestas ligula. Maecenas pretium elit eros, et euismod felis porttitor in. Vivamus lobortis odio vitae malesuada pellentesque. Aliquam viverra nisi a quam suscipit, maximus iaculis turpis venenatis. Maecenas rhoncus dolor a dictum interdum. Aliquam ac diam a risus tristique posuere sed et ipsum. Curabitur sed placerat dolor. Praesent a convallis nisi, ut imperdiet dolor. Morbi est massa, pellentesque quis pulvinar nec, lobortis vitae turpis. Quisque vel ante a diam ullamcorper congue. Phasellus semper urna at aliquet tempor.</p>
            </div>
            <div className="twelve wide column">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula commodo convallis. Mauris sed odio a velit ultricies dignissim. Morbi magna felis, faucibus molestie gravida quis, fringilla vel purus. Integer vitae egestas ligula. Maecenas pretium elit eros, et euismod felis porttitor in. Vivamus lobortis odio vitae malesuada pellentesque. Aliquam viverra nisi a quam suscipit, maximus iaculis turpis venenatis. Maecenas rhoncus dolor a dictum interdum. Aliquam ac diam a risus tristique posuere sed et ipsum. Curabitur sed placerat dolor. Praesent a convallis nisi, ut imperdiet dolor. Morbi est massa, pellentesque quis pulvinar nec, lobortis vitae turpis. Quisque vel ante a diam ullamcorper congue. Phasellus semper urna at aliquet tempor.</p>
            </div>
            <div className="four wide column">
            <img className="ui circular image" src="https://via.placeholder.com/150x150.png?text=DM" />
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
