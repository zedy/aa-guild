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

  useEffect(() => {
    (async () => {
      const news = await fetchAllNews();
      dispatch(setNewsList(news));
      const aboutus = await fetchAboutUs();
      dispatch(setAboutUs(aboutus));
      const events = await fetchAllEvents();
      dispatch(setEventsList(events));
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
