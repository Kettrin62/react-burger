import { TCards } from "../types/data";

export const ADD_CARD: 'ADD_CARD' = 'ADD_CARD';
export const CHANGE_CARD_BUN: 'CHANGE_CARD_BUN' = 'CHANGE_CARD_BUN';
export const DELETE_CARD: 'DELETE_CARD' = 'DELETE_CARD';
export const SORT_CARD: 'SORT_CARD' = 'SORT_CARD';
export const CLEAR_CARDS: 'CLEAR_CARDS' = 'CLEAR_CARDS';

export interface IAddCardAction {
  readonly type: typeof ADD_CARD;
  readonly id: string;
  readonly key: string;
}
export interface IChangeCardBunAction {
  readonly type: typeof CHANGE_CARD_BUN;
  readonly id: string;
}
export interface IDeleteCardAction {
  readonly type: typeof DELETE_CARD;
  readonly key: string;
}
export interface ISortCardAction {
  readonly type: typeof SORT_CARD;
  readonly cards: Array<TCards>;
}
export interface IClearCardsAction {
  readonly type: typeof CLEAR_CARDS;
}
export type TCardsActions =
  | IAddCardAction
  | IChangeCardBunAction
  | IDeleteCardAction
  | ISortCardAction
  | IClearCardsAction;