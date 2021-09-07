export const setNewsList = list => ({
  type: 'SET_NEWS_LIST',
  payload: list
});

export const addArticleToState = article => ({
  type: 'ADD_NEWS_TO_LIST',
  payload: article
});

export const updateNewsArticleById = article => ({
  type: 'UPDATE_NEWS_ARTICLE',
  payload: article
});
