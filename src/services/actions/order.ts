import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import {
  updateTokenSuccess,
  resetToken
} from './user';
import { setCookie } from '../../utils/functions';
import {
  AppThunk,
  AppDispatch
} from '../types';
import { TCards } from '../types/data';


export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: number;
}
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TGetOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

function getOrderRequest() {
  return {
    type: GET_ORDER_REQUEST
  }
};

function getOrderSuccess(order: number): IGetOrderSuccessAction {
  return {
    type: GET_ORDER_SUCCESS,
    order: order
  }
};

function getOrderFailed(): IGetOrderFailedAction {
  return {
    type: GET_ORDER_FAILED
  }
};


export const getOrder: AppThunk = (token: string, cards: Array<TCards>) => {
  return function(dispatch: AppDispatch) {
    dispatch(getOrderRequest())
    fetch(`${BASEURL}/orders`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: cards
      })
    })
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
        dispatch(getOrderSuccess(res.order.number))
      } else {
        dispatch(getOrderFailed())
      }
    })
    .catch( err => {
      dispatch(getOrderFailed())
    })
  }
};

export const getOrderToken: AppThunk = (token: string, cards: Array<TCards>) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequest())
    fetch(`${BASEURL}/auth/token`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token
      }),
    })
    .then(checkResponse)
    .then( res => {
      if (res && res.success) {
        dispatch(updateTokenSuccess(res.accessToken));
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken, { path: '/', 'max-age': 31556926 });
        setTimeout(() => dispatch(resetToken()), 1200000);
        return res;
      }
    })
    .then( res => {
      fetch(`${BASEURL}/orders`, {
        method: 'POST',
        headers: { 
          authorization: res.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: cards
        })
      })
      .then(checkResponse)
      .then( res => {
        if (res && res.success) {
          dispatch(getOrderSuccess(res.order.number));
        } else {
          dispatch(getOrderFailed());
        }
      })
      .catch( err => {
        dispatch(getOrderFailed());
      })
    })
    .catch( err => {
      dispatch(getOrderFailed());
    });
  }
};
