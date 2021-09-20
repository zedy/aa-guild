import { createSelector } from 'reselect';

const selectBadges = state => state.badges;

export const getBadges = createSelector([selectBadges], badges => badges.list);

export const getListByID = createSelector([selectBadges], badges =>
  sortCollection(badges.list)
);

// todo move to service/utils file (reusable)

const sortCollection = collection => {
  let sortedCollection = {};

  collection.forEach(function (item) {
    sortedCollection[item.id] = item;
  });

  return sortedCollection;
};
