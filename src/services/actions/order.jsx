import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import {
  UPDATE_TOKEN_SUCCESS,
  RESET_TOKEN
} from './user';
import { setCookie } from '../../utils/functions';


export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';


export function getOrder(token, cards) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
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
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order.number
        })
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
          type: GET_ORDER_FAILED
      })
    })
  }
};

export function getOrderToken(token, cards) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
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
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          token: res.accessToken
        });
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken);
        function resetToken() {
          dispatch({
            type: RESET_TOKEN,
          });
        }
        setTimeout(resetToken, 1200000);
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
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.order.number
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED
          });
        }
      })
      .catch( err => {
        dispatch({
          type: GET_ORDER_FAILED
        });
      })
    })
    .catch( err => {
      dispatch({
        type: GET_ORDER_FAILED
      });
    });
  }
};
