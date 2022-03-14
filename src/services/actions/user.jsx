import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { setCookie } from '../../utils/functions';


export const SET_USER_DATA = 'SET_USER_DATA';
export const RESET_TOKEN = 'RESET_TOKEN';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';
export const DELETE_USER_DATA = 'DELETE_USER_DATA';

export function updateToken(token) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(`${BASEURL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
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
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
        dispatch({
          type: UPDATE_TOKEN_FAILED
        })
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
          type: UPDATE_TOKEN_FAILED
      })
    })
  }
}