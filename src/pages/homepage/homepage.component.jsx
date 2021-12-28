import React from 'react';
import './homepage.styles.scss';
import DMList from '../../components/hp/dm-list.component';
import HpHero from '../../components/hp/hero.component';
import NewUserModal from '../../components/new-user-modal/new-user-modal';
import { useDisclosure } from '../../components/modal/useDisclosure';
import { useAuth } from '../../redux/user/useAuth';
import { Button } from 'semantic-ui-react';

const HomePage = () => {
  const { user, logout } = useAuth();

  // otvori modal za novog korisnika ukoliko je novi korisnik i nije do sad zatvorio new-user modal
  const { isOpen: isNewUserModalOpen, onClose: onCloseNewUserModal } =
    useDisclosure(user.newUser && !user.closedNewUserModal);
  // inspiracija za useDisclosure hook od https://chakra-ui.com/docs/hooks/use-disclosure :)

  return (
    <div className='homepage'>
      <Button onClick={logout} classList='teal' type='submit'>
        Logout
      </Button>
      <HpHero />
      <DMList />
      <NewUserModal isOpen={isNewUserModalOpen} onClose={onCloseNewUserModal} />
    </div>
  );
};

export default HomePage;
