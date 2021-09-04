// libs
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// firebase
import {
  updateNewUserFlag,
  auth,
  createUserProfileDocument
} from './firebase/firebase.utils';

// components
import Router from './components/router/router.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import { ModalHero } from './components/modal/modal.component';
import { ModalContentNewUser } from './components/modal/content/modal-content.component';

// redux
import { setCurrentUser } from './redux/user/user.actions';
import { setEventsList } from './redux/events/events.actions';

// utils
import { fetchAllEvents } from './utils/firebaseFetch';

const App = ({ setCurrentUser, currentUser, storeEvents }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  let unsubscribeFromAuth = null;

  useEffect(() => {
    (async () => {
      const events = await fetchAllEvents();
      storeEvents(events);
    })();

    // TODO create service for this
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuthObj => {
      if (userAuthObj) {
        const firebaseResponse = await createUserProfileDocument(userAuthObj);
        const { collectionRef } = firebaseResponse.payload;

        collectionRef.onSnapshot(response => {
          const data = response.data();

          setCurrentUser({
            id: response.id,
            ...data
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
    <div className='app'>
      <Header />
      <div className='ui container' style={{ paddingTop: '9em' }}>
        {console.log(currentUser)}
        <Router currentUser={currentUser} />
      </div>
      <Footer />
      <ModalHero isActive={isModalActive}>
        <ModalContentNewUser handleClick={hideModal} />
      </ModalHero>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  storeEvents: events => dispatch(setEventsList(events))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
