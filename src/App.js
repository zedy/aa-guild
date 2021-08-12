// libs
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router";
import { connect } from "react-redux";

// firebase
import { updateNewUserFlag, auth, createUserProfileDocument } from "./firebase/firebase.utils";

// components
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import { ModalHero } from "./components/modal/modal.component";
import { ModalContentNewUser } from "./components/modal/content/modal-content.component"
import Event from "./components/event/event.component";

// pages
import HomePage from "./pages/homepage/homepage.component";
import NewsPage from "./pages/news/news.component";
import EventListPage from "./pages/event/event-list.component";
import PlayersListPage from "./pages/players-list/players-list.component";
import PlayerPage from "./pages/player/player.component";
import SignInOut from "./pages/sign-in-out/sign-in-out.component";
import PlayerProfile from './pages/player-profile/player-profile.component';

// redux
import { setCurrentUser } from "./redux/user/user.actions";
import { setEventsList } from './redux/events/events.actions';

// utils
import { fetchAllEvents } from "./utils/firebaseFetch";

const App = ({ setCurrentUser, currentUser, storeEvents }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  let unsubscribeFromAuth = null;

  useEffect(() => {  
    (async () => {
      const events = await fetchAllEvents();
      storeEvents(events);    
    })();

    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuthObj) => {
      if (userAuthObj) {
        const userRef = await createUserProfileDocument(userAuthObj);

        userRef.onSnapshot((response) => {
          const data = response.data();

          setCurrentUser({
            id: response.id,
            ...data,
          });    
          
          if (data && data.newUser) setIsModalActive(true);          
        });
      }
      
      setCurrentUser(userAuthObj);      
    });

    return () => {
      if (unsubscribeFromAuth !== null) unsubscribeFromAuth();
    };
  }, [unsubscribeFromAuth]);

  const hideModal = async () => {
    await updateNewUserFlag(currentUser);
    setIsModalActive(false);
  };

  return (
    <div className="app">
      <Header />
      <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/events" component={EventListPage} />\
          <Route exact path="/event/:id" component={Event} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/players-list" component={PlayersListPage} />
          <Route exact path="/player/:id/character" component={PlayerPage} />
          <Route exact path="/player/:id/profile" component={PlayerProfile} />
          <Route
            exact
            path="/signin"
            render={() => (currentUser ? <Redirect to="/" /> : <SignInOut />)}
          />
        </Switch>
      <Footer />
      <ModalHero        
        isActive={isModalActive}
      >
        <ModalContentNewUser handleClick={hideModal} />
      </ModalHero>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  storeEvents: events => dispatch(setEventsList(events))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
