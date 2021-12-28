import React from 'react';
import { useAuth } from '../../redux/user/useAuth';
import Modal from '../modal/modal.component';

const NewUserModal = ({ isOpen, onClose }) => {
  const { user, closeNewUserModal } = useAuth();

  const onCloseCallback = () => {
    closeNewUserModal();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseCallback}>
      <h1>
        OPA novi {user.isAdmin ? 'admin' : 'korisnik'} {user.name}... I D E M O
        ! :D
      </h1>
      {/*
        Ili Component(modalProps) iz prethodnog koda mada ne bi preporucio taj patern vec bi ubacio sadrzaj komponente
        ovde kako bi sav new-user feature bio na jednom mestu.
        Modal komponenta je ovako lako reusabilna posto ne kontrolise sta prikazuje (svoj content)
        nego prima content kao children. Children opciono moze i da uzme onClose funkciju
        ukoliko treba da zatvori modal.
      */}
    </Modal>
  );
};

export default NewUserModal;
