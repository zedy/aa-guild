// libs
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import EventList from '../../components/event/event-list.component';

const AdminDashboard = () => {
  return (
    <div className='content'>
      <h2>Events</h2>
      <Link to='/event/create' className='ui teal button'>
        Create new Event &nbsp;<i className='plus icon'></i>
      </Link>
      <div className='ui segment'>
        <EventList />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  //eventList: getSplitEventList(state),
});

export default connect(mapStateToProps)(AdminDashboard);
