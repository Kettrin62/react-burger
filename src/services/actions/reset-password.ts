import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { AppDispatch, AppThunk } from '../types';


export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TResetPasswordActions =
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction;

function resetPasswordFailed(): IResetPasswordFailedAction {
  return {
    type: RESET_PASSWORD_FAILED
  }
};


export const resetPassword: AppThunk = (password: string, token: string) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    })
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
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        })
      } else {
        dispatch(resetPasswordFailed())
      }
    })
    .catch( err => {
      dispatch(resetPasswordFailed())
    })
  }
}
