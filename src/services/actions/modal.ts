import { AppDispatch, AppThunk } from "../types";
import { TCard } from "../types/data";

export const OPEN_MODAL: 'OPEN_MODAL' = 'OPEN_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';


export interface IOpenModalAction {
  readonly type: typeof OPEN_MODAL;
  readonly card: TCard;
}
export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions =
  | IOpenModalAction
  | ICloseModalAction;

export const getCard: AppThunk = (card: TCard) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: OPEN_MODAL,
      card: card
    })
  }
};

export function closeModal(): ICloseModalAction {
  return {
    type: CLOSE_MODAL,
  }
};
