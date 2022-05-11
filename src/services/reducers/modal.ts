import {
  OPEN_MODAL,
  CLOSE_MODAL,
  TModalActions
} from '../actions/modal';
import { TCard } from '../types/data';


type TModalState = {
  readonly modalCard: TCard | null;
}

const modalInitialState: TModalState = {
  modalCard: null,
};


export const modalReducer = (
  state = modalInitialState, 
  action: TModalActions
): TModalState => {
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
        modalCard: null,
      };
    }
    default:
      return state;
  }
}