// libs
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';

// firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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

// redux
import { setCurrentUser } from './redux/user/user.actions';

const App = ({ setCurrentUser, currentUser }) => {
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuthObj => {
      if (userAuthObj) {
        const userRef = await createUserProfileDocument(userAuthObj);

        userRef.onSnapshot(response => {
          setCurrentUser({
            id: response.id,
            ...response.data()
          });
        });
      }

      setCurrentUser(userAuthObj);
    });

    return () => {
      if (unsubscribeFromAuth !== null) unsubscribeFromAuth();
    }
  }, [unsubscribeFromAuth])

  return (
    <div className="app">
      <Header />
      <div className="ui container content" style={{paddingTop: "9em"}}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/about' component={AboutUsPage} />
          <Route exact path='/events' component={EventPage} />
          <Route exact path='/news' component={NewsPage} />
          <Route exact path='/players-list' component={PlayersListPage} />
          <Route exact path='/player/:id/character' component={PlayerPage} />
          <Route exact path='/player/:id/profile' component={PlayerPage} />
          <Route exact path='/signin' render={() => currentUser ? <Redirect to="/" /> : <SignInOut />} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
