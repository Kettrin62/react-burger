import {
  CLOSE_MODAL,
  TModalActions,
  OPEN_MODAL_CARD,
  OPEN_MODAL_CARD_ORDER
} from '../actions/modal';
import { TCard, TCardOrder } from '../types/data';

type TModalState = {
  readonly modalCard: TCard | null;
  readonly modalCardOrder: TCardOrder | null;
}

const modalInitialState: TModalState = {
  modalCard: null,
  modalCardOrder: null,
};


export const modalReducer = (
  state = modalInitialState, 
  action: TModalActions
): TModalState => {
  switch (action.type) {
    case OPEN_MODAL_CARD: {
      return {
        ...state,
        modalCard: action.card,
      };
    }
    case OPEN_MODAL_CARD_ORDER: {
      return {
        ...state,
        modalCardOrder: action.card,
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