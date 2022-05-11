import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_FINISH,
  WS_GET_MESSAGE_INIT,
  TWsActions
} from '../actions/ws';
import { TCardOrder } from '../types/data';

type TWsState = {
  readonly wsConnected: boolean,
  readonly orders: ReadonlyArray<TCardOrder>,
  readonly total: number,
  readonly totalToday: number,
  readonly ordersUser: ReadonlyArray<TCardOrder>,
  readonly totalUser: number,
  readonly totalTodayUser: number,
  readonly error: string | undefined,
}

const WsInitialState: TWsState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  ordersUser: [],
  totalUser: 0,
  totalTodayUser: 0,
  error: undefined,
};

export const wsReducer = (
  state = WsInitialState, 
  action: TWsActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
        orders: [],
        total: 0,
        totalToday: 0,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        error: undefined,
        orders: [],
        total: 0,
        totalToday: 0,
      };
    }
    case WS_CONNECTION_FINISH: {
      return {
        ...state,
        wsConnected: false,
        error: undefined,
        orders: [],
        total: 0,
        totalToday: 0,
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: undefined,
      };
    }
    case WS_GET_MESSAGE_INIT: {
      return {
        ...state,
        ordersUser: action.payload.orders,
        totalUser: action.payload.total,
        totalTodayUser: action.payload.totalToday,
        error: undefined,
      };
    }
    default:
      return state;
  }
};