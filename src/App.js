// libs
import React from 'react';
import { Route, Switch } from 'react-router';

// components
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

// pages
import HomePage from './pages/homepage/homepage.component';
import NewsPage from './pages/news/news.component';
import EventPage from './pages/event/event.component';
import PlayersPage from './pages/players/players.component';
import AboutUsPage from './pages/about/about.component';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="ui container content" style={{marginTop: "7em"}}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/about' component={AboutUsPage} />
          <Route exact path='/events' component={EventPage} />
          <Route exact path='/news' component={NewsPage} />
          <Route exact path='/player-list' component={PlayersPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App;
