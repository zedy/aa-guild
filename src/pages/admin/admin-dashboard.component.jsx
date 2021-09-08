// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';

// components
import EventList from '../../components/event/event-list.component';
import NewsList from '../../components/news/news-list.components';

const renderEvents = () => (
  <Tab.Pane>
    <Link to='/event/create' className='ui teal button'>
      Create new Event &nbsp;<i className='plus icon'></i>
    </Link>
    <EventList />
  </Tab.Pane>
);

const renderNews = () => (
  <Tab.Pane>
    <Link to='/news/create' className='ui teal button'>
      Write new article &nbsp;<i className='plus icon'></i>
    </Link>
    <NewsList />
  </Tab.Pane>
);

// TODO add Loading to class
const panes = [
  {
    menuItem: 'Events',
    render: renderEvents
  },
  {
    menuItem: 'News',
    render: renderNews
  }
];

// component
const AdminDashboard = () => {
  return (
    <div className='content'>
      <h1>Admin dashboard</h1>
      <Tab panes={panes} />
    </div>
  );
};

export default AdminDashboard;
