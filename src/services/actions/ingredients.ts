import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { 
  TCard,
  TTabCurrent
} from '../types/data';
import {
  AppThunk,
  AppDispatch
} from '../types';


export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const CHANGE_TUB: 'CHANGE_TUB' = 'CHANGE_TUB';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<TCard>;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IChangeTub {
  readonly type: typeof CHANGE_TUB;
  readonly current: TTabCurrent;
}
export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

function getIngredientsFailed() {
  return {
    type: GET_INGREDIENTS_FAILED
  }
};


export const getIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    fetch(`${BASEURL}/ingredients`)
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      } else {
        dispatch(getIngredientsFailed())
      }
    })
    .catch( err => {
      dispatch(getIngredientsFailed())
    })
  }
}






