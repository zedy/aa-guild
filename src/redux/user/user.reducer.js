const INITIAL_STATE = {
  currentUser: null,
  list: null,
  signInError: null
};

// ubaci immer.js
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'EMAIL_SIGN_IN_SUCCESS':
    case 'GOOGLE_SIGN_IN_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
        signInError: null
      };
    case 'EMAIL_SIGN_IN_FAILURE':
    case 'GOOGLE_SIGN_IN_FAILURE':
      return {
        ...state,
        signInError: action.payload
      };
    case 'SET_USER_LIST':
      return {
        ...state,
        list: action.payload,
        signInError: null
      };
    case 'USER_SIGNOUT':
      return {
        ...state,
        currentUser: null,
        signInError: null
      };
    case 'CLOSED_NEW_USER_MODAL':
      return {
        ...state,
        currentUser: { ...state.currentUser, closedNewUserModal: true }
      };
    default:
      return state;
  }
};

export default userReducer;
