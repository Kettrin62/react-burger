import { AppDispatch, AppThunk } from "../types";
import { TCard, TCardOrder } from "../types/data";

export const OPEN_MODAL_CARD: 'OPEN_MODAL_CARD' = 'OPEN_MODAL_CARD';
export const OPEN_MODAL_CARD_ORDER: 'OPEN_MODAL_CARD_ORDER' = 'OPEN_MODAL_CARD_ORDER';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';


export interface IOpenModalCardAction {
  readonly type: typeof OPEN_MODAL_CARD;
  readonly card: TCard;
}
export interface IOpenModalCardOrderAction {
  readonly type: typeof OPEN_MODAL_CARD_ORDER;
  readonly card: TCardOrder;
}
export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions =
  | IOpenModalCardAction
  | IOpenModalCardOrderAction
  | ICloseModalAction;

export const getCard: AppThunk = (card: TCard) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: OPEN_MODAL_CARD,
      card: card
    })
  }
};

export const getCardOrder: AppThunk = (card: TCardOrder) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: OPEN_MODAL_CARD_ORDER,
      card: card
    })
  }
};

export function closeModal(): ICloseModalAction {
  return {
    type: CLOSE_MODAL,
  }
};
