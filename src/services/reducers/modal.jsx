import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions/modal';

const initialState = {
  modalCard: null,
};


export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        modalCard: action.card,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modalCard: "",
      };
    }
    default:
      return state;
  }
}