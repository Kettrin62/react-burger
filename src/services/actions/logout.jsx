import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { DELETE_USER_DATA } from './user';
import { deleteCookie } from '../../utils/functions';


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';


export function logout(token) {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(`${BASEURL}/auth/logout`, {
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
        dispatch({
          type: LOGOUT_SUCCESS,
        })
        dispatch({
          type: DELETE_USER_DATA
        });
        deleteCookie('refreshToken');
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
        dispatch({
          type: LOGOUT_FAILED
        })
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
          type: LOGOUT_FAILED
      })
    })
  }
}