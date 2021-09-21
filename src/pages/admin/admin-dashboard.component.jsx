// libs
import React from 'react';
import { Link } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';

// styles
import './admin-dashboard.styles.scss';

// components
import AboutUsForm from '../../components/about-us/about-us-form.component';
import BadgeList from '../../components/badge/badge-list.component';
import EventList from '../../components/event/event-list.component';
import NewsList from '../../components/news/news-list.components';

// helper functions
const renderAboutUs = () => (
  <Tab.Pane>
    <AboutUsForm />
  </Tab.Pane>
);

const renderBadges = () => (
  <Tab.Pane>
    <div className='ui headline'>
      <Link to='/badge/create' className='ui teal right floated button'>
        Create new Badge &nbsp;<i className='plus icon'></i>
      </Link>
      <h2>All badges</h2>
    </div>
    <BadgeList showActions='true' />
  </Tab.Pane>
);

const renderEvents = () => (
  <Tab.Pane>
    <div className='ui headline'>
      <Link to='/event/create' className='ui teal right floated button'>
        Create new Event &nbsp;<i className='plus icon'></i>
      </Link>
      <h2>All events</h2>
    </div>
    <EventList />
  </Tab.Pane>
);

const renderNews = () => (
  <Tab.Pane>
    <div className='ui headline'>
      <Link to='/news/create' className='ui teal right floated button'>
        Write new article &nbsp;<i className='plus icon'></i>
      </Link>
      <h2>All news</h2>
    </div>
    <NewsList />
  </Tab.Pane>
);

// TODO add Loading to class
const panes = [
  {
    menuItem: 'About us',
    render: renderAboutUs
  },
  {
    menuItem: 'Badges',
    render: renderBadges
  },
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
    <div className='ui container content'>
      <div className='dashboard'>
        <h1>Admin dashboard</h1>
        <Tab panes={panes} />
      </div>
    </div>
  );
};

export default AdminDashboard;
