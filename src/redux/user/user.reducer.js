const INITIAL_STATE = {
  currentUser: null,
  list: null
};

// ubaci immer.js

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'SET_USER_LIST':
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
