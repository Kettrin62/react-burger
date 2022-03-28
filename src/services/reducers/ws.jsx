import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/ws';

const initialState = {
  wsConnected: false,
  orders: [],
  error: undefined
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: [...state.orders, { ...action.payload, timestamp: new Date().getTime() / 1000 }],
        error: undefined,
      };
    

    default:
      return state;
  }
};