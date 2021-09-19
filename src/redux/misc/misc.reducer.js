const INITIAL_STATE = {
  aboutus: null,
  badges: null
};

const miscReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ABOUT_US':
      return {
        ...state,
        aboutus: action.payload
      };
    default:
      return state;
  }
};

export default miscReducer;
