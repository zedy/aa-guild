import { updateStateObjById } from '../utils';

const INITIAL_STATE = {
  list: []
};

const eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_EVENTS_LIST':
      return {
        ...state,
        list: action.payload
      };
    case 'ADD_EVENT_TO_LIST':
      return {
        ...state,
        list: [action.payload, ...state.list]
      };
    case 'UPDATE_EVENT_IN_LIST':
      return {
        ...state,
        list: updateStateObjById(state.list, action.payload)
      };
    default:
      return state;
  }
};

export default eventsReducer;
