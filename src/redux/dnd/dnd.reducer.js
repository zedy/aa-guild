const INITIAL_STATE = {
  data: []
}

const dndReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DND_DATA':
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state;
  }
}

export default dndReducer;