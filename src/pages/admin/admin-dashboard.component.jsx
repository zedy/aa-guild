// libs
import React from "react";
import { connect } from "react-redux";

// redux

// components
import EventList from "../../components/event/event-list.component";

const AdminDashboard = () => {
  return (
    <div className="content">
      <h2>Events</h2>
      <div className="ui segment">
        <EventList />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //eventList: getSplitEventList(state),
});

export default connect(mapStateToProps)(AdminDashboard);
