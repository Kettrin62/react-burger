import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { setCookie } from '../../utils/functions';
import {
  SET_USER_DATA,
  RESET_TOKEN
} from './user';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';


export function getLogin({ email, password }) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(`${BASEURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
        dispatch({
          type: LOGIN_SUCCESS,
        });
        dispatch({
          type: SET_USER_DATA,
          name: res.user.name,
          email: res.user.email,
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
          type: LOGIN_FAILED
        })
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
          type: LOGIN_FAILED
      })
    })
  }
}
