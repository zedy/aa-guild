const INITIAL_STATE = {
  list: []
}

const eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_EVENTS_LIST':
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state;
  }
}

export default eventsReducer;