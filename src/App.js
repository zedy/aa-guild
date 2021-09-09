// libs
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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
import { setNewsList } from './redux/news/news.actions';

// utils
import { fetchAllEvents } from './utils/firebaseFetch';
import { fetchAllNews } from './utils/firebaseFetch';

const App = () => {
  let unsubscribeFromAuth = null;

  const [authUser, setAuthUser] = useState(null);
  const dispatch = useDispatch();
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    (async () => {
      const news = await fetchAllNews();
      dispatch(setNewsList(news));
      const events = await fetchAllEvents();
      dispatch(setEventsList(events));
    })();

    // TODO create service for this
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuthObj => {
      if (userAuthObj) {
        const firebaseResponse = await createUserProfileDocument(userAuthObj);
        const { collectionRef } = firebaseResponse.payload;

        collectionRef.onSnapshot(response => {
          const data = response.data();
          const authObject = {
            id: response.id,
            ...data
          };

          dispatch(setCurrentUser(authObject));
          setAuthUser(authObject);

          if (data && data.newUser) setIsModalActive(true);
        });
      }

      dispatch(setCurrentUser(userAuthObj));
      setAuthUser(userAuthObj);
    });

    return () => {
      if (unsubscribeFromAuth !== null) unsubscribeFromAuth();
    };
  }, [unsubscribeFromAuth]);

  const hideModal = async () => {
    await updateNewUserFlag(authUser);
    setIsModalActive(false);
  };

  return (
    <div className='app'>
      <Header />
      <div className='ui container' style={{ paddingTop: '9em' }}>
        <Router currentUser={authUser} />
      </div>
      <Footer />
      <ModalHero isActive={isModalActive}>
        <ModalContentNewUser handleClick={hideModal} />
      </ModalHero>
    </div>
  );
};

export default App;
