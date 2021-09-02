const INITIAL_STATE = {
  list: []
};

const dmReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_DM_LIST':
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};

export default dmReducer;
