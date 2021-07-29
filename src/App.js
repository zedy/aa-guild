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
import PlayersListPage from './pages/players-list/players-list.component';
import AboutUsPage from './pages/about/about.component';
import PlayerPage from './pages/player/player.component';
import SignInOut from './pages/sign-in-out/sign-in-out.component';

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
          <Route exact path='/players-list' component={PlayersListPage} />
          <Route exact path='/player/:id' component={PlayerPage} />
          <Route exact path='/signin' component={SignInOut} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App;
