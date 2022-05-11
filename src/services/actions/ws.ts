import { TCardOrder } from '../types/data';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_START_INIT: 'WS_CONNECTION_START_INIT' = 'WS_CONNECTION_START_INIT';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_FINISH: 'WS_CONNECTION_FINISH' = 'WS_CONNECTION_FINISH';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_GET_MESSAGE_INIT: 'WS_GET_MESSAGE_INIT' = 'WS_GET_MESSAGE_INIT';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export interface IPayload {
  readonly orders: Array<TCardOrder>;
  readonly total: number;
  readonly totalToday: number;
}

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionStartInitAction {
  readonly type: typeof WS_CONNECTION_START_INIT;
}
export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionFinishAction {
  readonly type: typeof WS_CONNECTION_FINISH;
}
export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IPayload;
}
export interface IWsGetMessageInitAction {
  readonly type: typeof WS_GET_MESSAGE_INIT;
  readonly payload: IPayload;
}
export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
}

export type TWsActions = 
  | IWsConnectionStartAction
  | IWsConnectionStartInitAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsConnectionFinishAction
  | IWsGetMessageAction
  | IWsGetMessageInitAction
  | IWsSendMessageAction;