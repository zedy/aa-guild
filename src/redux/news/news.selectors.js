import { createSelector } from 'reselect';

const selectNews = state => state.news;

export const getAllNewsArticles = createSelector(
  [selectNews],
  news => news.list
);

export const getLatestNewsArticles = createSelector(
  [getAllNewsArticles],
  news => news.list[0]
);

export const getListByID = createSelector([selectNews], news =>
  sortCollection(news.list)
);

// todo move to service/utils file (reusable)

const sortCollection = collection => {
  let sortedCollection = {};

  collection.forEach(function (item) {
    sortedCollection[item.id] = item;
  });

  return sortedCollection;
};
