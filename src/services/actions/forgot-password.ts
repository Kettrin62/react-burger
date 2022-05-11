import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import {
  AppThunk,
  AppDispatch
} from '../types';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export type TForgotPasswordActions =
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction;

function forgotPasswordFailed() {
  return {
    type: FORGOT_PASSWORD_FAILED
  }
};


export const forgotPassword: AppThunk = (email: string) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    })
    fetch(`${BASEURL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        })
      } else {
        dispatch(forgotPasswordFailed())
      }
    })
    .catch( err => {
      dispatch(forgotPasswordFailed())
    })
  }
}
