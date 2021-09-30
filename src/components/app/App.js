// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// firebase
import { updateNewUserFlag } from '../../firebase/firebase.utils';

// styles
import './app.styles.scss';

// components
import Router from '../router/router.component';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import Modal from '../modal/modal.component';

// redux
import { setEventsList } from '../../redux/events/events.actions';
import { setNewsList } from '../../redux/news/news.actions';
import { setAboutUs } from '../../redux/misc/misc.actions';
import { hideModal, showModal } from '../../redux/modal/modal.actions';
import { getCurrentUser } from '../../redux/user/user.selectors';
import { getAllNewsArticles } from '../../redux/news/news.selectors';
import { getAboutUs } from '../../redux/misc/misc.selectors';
import { getEventsList } from '../../redux/events/events.selectors';

// utils
import {
  fetchAllEvents,
  fetchAllNews,
  fetchAboutUs
} from '../../firebase/firebase-fetch';

const App = () => {
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const authUser = useSelector(getCurrentUser);
  const news = useSelector(getAllNewsArticles);
  const aboutUs = useSelector(getAboutUs);
  const events = useSelector(getEventsList);

  useEffect(() => {
    (async () => {
      if (!aboutUs) {
        const aboutusData = await fetchAboutUs();
        dispatch(setAboutUs(aboutusData));
      }
      if (!events.length) {
        const eventsData = await fetchAllEvents();
        dispatch(setEventsList(eventsData));
      }
      if (!news.length) {
        const newsData = await fetchAllNews();
        dispatch(setNewsList(newsData));
      }
    })();

    if (authUser && authUser.newUser)
      dispatch(
        showModal({
          modalType: 'NEW_USER',
          modalProps: {
            handleConfirm: handleConfirm
          }
        })
      );
  }, []);

  const handleConfirm = async () => {
    await updateNewUserFlag(authUser);
    closeModal();
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <div className='app'>
      <Header />
      <Router currentUser={authUser} />
      <Footer />
      <Modal modalInfo={modal} />
    </div>
  );
};

export default App;
