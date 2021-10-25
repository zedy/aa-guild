import { useDispatch, useSelector } from 'react-redux';
import {
  closedNewUserModal,
  emailSignInSuccess,
  userSignOut
} from './user.actions';
import { getCurrentUser } from './user.selectors';

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(getCurrentUser);

  const login = () => {
    dispatch(emailSignInSuccess({ name: 'Pera', isAdmin: false }));
  };

  const loginAsAdmin = () => {
    dispatch(emailSignInSuccess({ name: 'Pera', isAdmin: true }));
  };

  const logout = () => {
    dispatch(userSignOut());
  };

  const closeNewUserModal = () => {
    dispatch(closedNewUserModal());
  };

  const signup = () => {
    dispatch(
      emailSignInSuccess({ name: 'Djura', newUser: true, isAdmin: false })
    );
  };

  return { user, login, logout, loginAsAdmin, signup, closeNewUserModal };
};
