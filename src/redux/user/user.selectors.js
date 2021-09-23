import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const getCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const getUserList = createSelector([selectUser], user => user.list);
