const INITIAL_STATE = {
  list: []
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_NEWS_LIST':
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};

export default newsReducer;
