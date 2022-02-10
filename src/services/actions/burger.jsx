import { BASEURL } from '../../utils/data';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const OPEN_MODAL ='OPEN_MODAL';
export const CLOSE_MODAL ='CLOSE_MODAL';

// export const GET_CARD = 'GET_CARD';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(`${BASEURL}/ingredients`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.statusText}`);
    })
    .then( res  => {
      if (res && res.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
          type: GET_INGREDIENTS_FAILED
      })
    })
  }
}

export function getCard(card) {
  return function(dispatch) {
    dispatch({
      type: OPEN_MODAL,
      card: card
    })
  }
}


