import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { DELETE_USER_DATA } from './user';
import { deleteCookie } from '../../utils/functions';
import {
  AppThunk,
  AppDispatch
} from '../types';


export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export type TLogoutActions =
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction;

function logoutFailed() {
  return {
    type: LOGOUT_FAILED
  }
};


export const logout: AppThunk = (token: string) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })
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
        dispatch(logoutFailed())
      }
    })
    .catch( err => {
      dispatch(logoutFailed())
    })
  }
}