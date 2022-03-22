import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const CHANGE_TUB = 'CHANGE_TUB';

function getIngredientsFailed() {
  return {
    type: GET_INGREDIENTS_FAILED
  }
};


export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(`${BASEURL}/ingredients`)
    .then(checkResponse)
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
        dispatch(getIngredientsFailed())
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch(getIngredientsFailed())
    })
  }
}
