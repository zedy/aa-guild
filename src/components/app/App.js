// libs
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// firebase
import {
  updateNewUserFlag,
  auth,
  createUserProfileDocument
} from '../../firebase/firebase.utils';

// styles
import './app.styles.scss';

// components
import Router from '../router/router.component';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import { ModalHero } from '../modal/modal.component';
import { ModalContentNewUser } from '../modal/content/modal-content.component';

// redux
import { setCurrentUser } from '../../redux/user/user.actions';
import { setEventsList } from '../../redux/events/events.actions';
import { setNewsList } from '../../redux/news/news.actions';
import { setAboutUs } from '../../redux/misc/misc.actions';

// utils
import {
  fetchAllEvents,
  fetchAllNews,
  fetchAboutUs
} from '../../firebase/firebase-fetch';

const App = () => {
  let unsubscribeFromAuth = null;

  const dispatch = useDispatch();
  const [authUser, setAuthUser] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    (async () => {
      const news = await fetchAllNews();
      dispatch(setNewsList(news));
      const aboutus = await fetchAboutUs();
      dispatch(setAboutUs(aboutus));
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
      // console.log(userAuthObj);
      //       dispatch(setCurrentUser(userAuthObj));
      //       setAuthUser(userAuthObj);
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
      <Router currentUser={authUser} />
      <Footer />
      <ModalHero isActive={isModalActive}>
        <ModalContentNewUser handleClick={hideModal} />
      </ModalHero>
    </div>
  );
};

export default App;
