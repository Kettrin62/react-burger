import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { setCookie } from '../../utils/functions';
import {
  setUserData,
  resetToken
} from './user';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

function loginFailed() {
  return {
    type: LOGIN_FAILED
  }
};


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
        dispatch(setUserData(res.user.name, res.user.email, res.accessToken));
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken);
        setTimeout(() => dispatch(resetToken), 1200000);
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
        dispatch(loginFailed())
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch(loginFailed())
    })
  }
}
