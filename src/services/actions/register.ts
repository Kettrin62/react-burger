import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { setCookie } from '../../utils/functions';
import { AppDispatch, AppThunk } from '../types';
import {
  setUserData,
  resetToken
} from './user';
import { TUser } from '../types/data';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
}
export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export type TRegisterActions =
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction;

function registerFailed(): IRegisterFailedAction {
  return {
    type: REGISTER_FAILED
  }
};


export const register: AppThunk = (data: TUser) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST
    })
    fetch(`${BASEURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name
      })
    })
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch(setUserData(res.user.name, res.user.email, res.accessToken));
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken, { path: '/', 'max-age': 31556926 });
        setTimeout(() => dispatch(resetToken), 1200000);
      } else {
        dispatch(registerFailed())
      }
    })
    .catch( err => {
      dispatch(registerFailed())
    })
  }
}
