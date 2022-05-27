import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TGetOrderActions,
} from '../actions/order';

type TGetOrderState = {
  readonly order: number | null,
  readonly orderRequest: boolean,
  readonly orderFailed: boolean,
}

const getOrderInitialState: TGetOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};


export const orderReducer = (
  state = getOrderInitialState, 
  action: TGetOrderActions
): TGetOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      }
    }
    default:
      return state;
  }
}