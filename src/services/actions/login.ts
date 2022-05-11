import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { setCookie } from '../../utils/functions';
import {
  setUserData,
  resetToken
} from './user';
import {
  AppThunk,
  AppDispatch
} from '../types';
import { TUser } from '../types/data';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
}
export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export type TLoginActions =
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction;

function loginFailed(): ILoginFailedAction {
  return {
    type: LOGIN_FAILED
  }
};


export const getLogin: AppThunk = (data: TUser) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST
    })
    fetch(`${BASEURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    .then(checkResponse)
    .then( res  => {
      if (res && res.success) {
        dispatch({
          type: LOGIN_SUCCESS,
        });
        dispatch(setUserData(res.user.name, res.user.email, res.accessToken));
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken, { path: '/', 'max-age': 31556926 });
        setTimeout(() => dispatch(resetToken), 1200000);
      } else {
        dispatch(loginFailed())
      }
    })
    .catch( err => {
      dispatch(loginFailed())
    })
  }
}
