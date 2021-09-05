import { createSelector } from 'reselect';

const selectNews = state => state.news;

export const getAllNewsArticles = createSelector(
  [selectNews],
  news => news.list
);

// TODO sort item in news query
export const getLatestNewsArticles = createSelector(
  [getAllNewsArticles],
  news => news.list[0]
);

// export const getListByID = createSelector([selectEvents], events =>
//   sortCollection(events.list)
// );

// const sortCollection = collection => {
//   let sortedCollection = {};

//   collection.forEach(function (item) {
//     sortedCollection[item.id] = item;
//   });

//   return sortedCollection;
// };
