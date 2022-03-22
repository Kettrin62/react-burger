import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import {
  updateTokenSuccess,
  resetToken
} from './user';
import { setCookie } from '../../utils/functions';


export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

function getOrderRequest() {
  return {
    type: GET_ORDER_REQUEST
  }
};

function getOrderSuccess(order) {
  return {
    type: GET_ORDER_SUCCESS,
    order: order
  }
};

function getOrderFailed() {
  return {
    type: GET_ORDER_FAILED
  }
};


export function getOrder(token, cards) {
  return function(dispatch) {
    dispatch(getOrderRequest())
    // Запрашиваем данные у сервера
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
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
        dispatch(getOrderSuccess(res.order.number))
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
        dispatch(getOrderFailed())
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch(getOrderFailed())
    })
  }
};

export function getOrderToken(token, cards) {
  return function (dispatch) {
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
        setCookie('refreshToken', refreshToken);
        setTimeout(() => dispatch(resetToken), 1200000);
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
