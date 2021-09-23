const INITIAL_STATE = {
  isActive: false,
  modalType: null,
  modalProps: null
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        isActive: true,
        modalProps: action.payload.modalProps,
        modalType: action.payload.modalType
      };
    case 'HIDE_MODAL':
      return {
        ...state,
        isActive: false,
        modalType: null,
        modalContent: null
      };
    default:
      return state;
  }
};

export default modalReducer;
