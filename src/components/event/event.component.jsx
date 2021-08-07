// libs
import React from "react";
import { connect } from "react-redux";

// redux
import { getListByID } from "../../redux/events/events.selectors";

// components
import Loader from "../../components/loader/loader.component";

const Event = ({ match, events }) => {
  console.log(Object.keys(events).length);
  if (Object.keys(events).length === 0) return <Loader />; 

  return (
    <div>
      {
        console.log(events[match.params.id])
      }
      <div>1</div>
      {/* <div
        className="ui inverted vertical masthead center aligned segment"
        style={{
          marginTop: "5em",
          backgroundImage: `url("${events[match.params.id].heroImage}")`,
          minHeight: "550px",
        }}
      >
        <div className="ui grid middle aligned">
          <div className="row">
            <div className="column">
              <div className="ui text ">
                <h1 className="ui inverted header">{events[match.params.id].headline}</h1>
                <div className="ui huge primary button">
                  Prijavite se na event <i className="right arrow icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui container content" style={{ paddingTop: "9em" }}>
        <div>Event 123 Page</div>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: getListByID(state),
});

export default connect(mapStateToProps)(Event);
