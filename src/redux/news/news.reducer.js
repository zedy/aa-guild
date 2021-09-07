// utils
import { updateStateObjById } from '../utils';

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
    case 'ADD_NEWS_TO_LIST':
      return {
        ...state,
        list: [ action.payload, ...state.list]
      };
    case 'UPDATE_NEWS_ARTICLE':
      return {
        ...state,
        list: updateStateObjById(state.list, action.payload)
      };
    default:
      return state;
  }
};

export default newsReducer;
