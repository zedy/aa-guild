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
import { hideModal, showModal } from '../../redux/modal/modal.actions';
import { getCurrentUser } from '../../redux/user/user.selectors';

const App = () => {
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const authUser = useSelector(getCurrentUser);

  useEffect(() => {
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
    <>
      <div className='app'>
        <Header />
        <Router />
        <Footer />
        <Modal modalInfo={modal} />
      </div>
    </>
  );
};

export default App;
