// libs
import { useSelector } from 'react-redux';
import { getCurrentUser } from './user.selectors';

export const UserAuth = () => {
  const currentUser = useSelector(getCurrentUser);

  return { currentUser };
};
