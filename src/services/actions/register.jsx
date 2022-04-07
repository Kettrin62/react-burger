import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { setCookie } from '../../utils/functions';
import {
  setUserData,
  resetToken
} from './user';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

function registerFailed() {
  return {
    type: REGISTER_FAILED
  }
};


export function register({ email, password, name }) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(`${BASEURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch(setUserData(res.user.name, res.user.email, res.accessToken));
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken, { path: '/', 'max-age': 31556926 });
        setTimeout(() => dispatch(resetToken), 1200000);
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
        dispatch(registerFailed())
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch(registerFailed())
    })
  }
}
