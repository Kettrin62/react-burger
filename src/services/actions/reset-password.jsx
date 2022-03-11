import { BASEURL, checkResponse } from '../../utils/data';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


export function resetPassword(password, token) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(`${BASEURL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        token: token
      })
    })
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        })
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
        dispatch({
          type: RESET_PASSWORD_FAILED
        })
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
          type: RESET_PASSWORD_FAILED
      })
    })
  }
}
