// utils
import { updateStateObjById } from '../utils';

const INITIAL_STATE = {
  list: null
};

const badgeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_BADGES':
      return {
        ...state,
        list: action.payload
      };
    case 'ADD_BADGE':
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case 'UPDATE_BADGE':
      return {
        ...state,
        list: updateStateObjById(state.list, action.payload)
      };
    default:
      return state;
  }
};

export default badgeReducer;
