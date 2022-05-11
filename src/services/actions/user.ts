import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { setCookie } from '../../utils/functions';
import { AppDispatch, AppThunk } from '../types';
import { TUser } from '../types/data';


export const SET_USER_DATA: 'SET_USER_DATA' = 'SET_USER_DATA';
export const RESET_TOKEN: 'RESET_TOKEN' = 'RESET_TOKEN';
export const UPDATE_TOKEN_REQUEST: 'UPDATE_TOKEN_REQUEST' = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS: 'UPDATE_TOKEN_SUCCESS' = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED: 'UPDATE_TOKEN_FAILED' = 'UPDATE_TOKEN_FAILED';
export const DELETE_USER_DATA: 'DELETE_USER_DATA' = 'DELETE_USER_DATA';
export const GET_USER_DATA_REQUEST: 'GET_USER_DATA_REQUEST' = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';
export const UPDATE_USER_DATA_REQUEST: 'UPDATE_USER_DATA_REQUEST' = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED: 'UPDATE_USER_DATA_FAILED' = 'UPDATE_USER_DATA_FAILED';

export interface ISetUserDataAction {
  readonly type: typeof SET_USER_DATA;
  readonly name: string;
  readonly email: string;
  readonly token: string;
}
export interface IResetTokenAction {
  readonly type: typeof RESET_TOKEN;
}
export interface IUpdateTokenRequestAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  readonly token: string;
}
export interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}
export interface IDeleteUserDataAction {
  readonly type: typeof DELETE_USER_DATA;
}
export interface IGetUserDataRequestAction {
  readonly type: typeof GET_USER_DATA_REQUEST;
}
export interface IGetUserDataSuccessAction {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly name: string;
  readonly email: string;
}
export interface IGetUserDataFailedAction {
  readonly type: typeof GET_USER_DATA_FAILED;
}
export interface IUpdateUserDataRequestAction {
  readonly type: typeof UPDATE_USER_DATA_REQUEST;
}
export interface IUpdateUserDataSuccessAction {
  readonly type: typeof UPDATE_USER_DATA_SUCCESS;
  readonly name: string;
  readonly email: string;
}
export interface IUpdateUserDataFailedAction {
  readonly type: typeof UPDATE_USER_DATA_FAILED;
}

export type TUserActions =
  | ISetUserDataAction
  | IResetTokenAction
  | IUpdateTokenRequestAction
  | IUpdateTokenSuccessAction
  | IUpdateTokenFailedAction
  | IDeleteUserDataAction
  | IGetUserDataRequestAction
  | IGetUserDataSuccessAction
  | IGetUserDataFailedAction
  | IUpdateUserDataRequestAction
  | IUpdateUserDataSuccessAction
  | IUpdateUserDataFailedAction;

export function setUserData(name: string, email: string, token: string): ISetUserDataAction {
  return {
    type: SET_USER_DATA,
    name: name,
    email: email,
    token: token
  }
};

function updateTokenFailed(): IUpdateTokenFailedAction {
  return {
    type: UPDATE_TOKEN_FAILED
  }
};

export function resetToken(): IResetTokenAction {
  return {
    type: RESET_TOKEN
  }
};

export function updateTokenSuccess(token: string): IUpdateTokenSuccessAction {
  return {
    type: UPDATE_TOKEN_SUCCESS,
    token: token
  }
};

function getUserDataFailed(): IGetUserDataFailedAction {
  return {
    type: GET_USER_DATA_FAILED
  }
};

function updateUserDataRequest(): IUpdateUserDataRequestAction {
  return {
    type: UPDATE_USER_DATA_REQUEST
  }
};

function updateUserDataSuccess(name: string, email: string): IUpdateUserDataSuccessAction {
  return {
    type: UPDATE_USER_DATA_SUCCESS,
    name: name,
    email: email
  }
};

function updateUserDataFailed(): IUpdateUserDataFailedAction {
  return {
    type: UPDATE_USER_DATA_FAILED
  }
};


export const updateToken: AppThunk = (token: string) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST
    })
    fetch(`${BASEURL}/auth/token`, {
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
        dispatch(updateTokenSuccess(res.accessToken));
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken, { path: '/', 'max-age': 31556926 });
        setTimeout(() => dispatch(resetToken()), 1200000);
      } else {
        dispatch(updateTokenFailed())
      }
    })
    .catch( err => {
      dispatch(updateTokenFailed())
    })
  }
};

export const getUserData: AppThunk = (token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_DATA_REQUEST
    })
    fetch(`${BASEURL}/auth/token`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      }),
    })
    .then(checkResponse)
    .then( res => {
      if (res && res.success) {
        dispatch(updateTokenSuccess(res.accessToken));
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken, { path: '/', 'max-age': 31556926 });
        setTimeout(() => dispatch(resetToken()), 1200000);
        return res;
      }
    })
    .then( res => {
      fetch(`${BASEURL}/auth/user`, {
        headers: { 
          authorization: res.accessToken,
          'Content-Type': 'application/json'
        },
      })
      .then(checkResponse)
      .then( res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_DATA_SUCCESS,
            name: res.user.name,
            email: res.user.email
          });
        } else {
          dispatch(getUserDataFailed());
        }
      }).catch( err => {
        dispatch(getUserDataFailed());
      })
    })
    .catch( err => {
      dispatch(getUserDataFailed());
    });
  }
};

export const updateUserDataToken: AppThunk = (token: string, data: TUser) => {
  return function (dispatch: AppDispatch) {
    dispatch(updateUserDataRequest())
    fetch(`${BASEURL}/auth/token`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      }),
    })
    .then(checkResponse)
    .then( res => {
      if (res && res.success) {
        dispatch(updateTokenSuccess(res.accessToken));
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken, { path: '/', 'max-age': 31556926 });
        setTimeout(() => dispatch(resetToken()), 1200000);
        return res;
      }
    })
    .then( res => {
      fetch(`${BASEURL}/auth/user`, {
        method: 'PATCH',
        headers: { 
          authorization: res.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
      })
      .then(checkResponse)
      .then( res => {
        if (res && res.success) {
          dispatch(updateUserDataSuccess(res.user.name, res.user.email))
        } else {
          dispatch(updateUserDataFailed());
        }
      })
      .catch( err => {
        dispatch(updateUserDataFailed());
      })
    })
    .catch( err => {
      dispatch(updateUserDataFailed());
    });
  }
};

export const updateUserData: AppThunk = (token: string, data: TUser) => {
  return function (dispatch: AppDispatch) {
    dispatch(updateUserDataRequest())
    fetch(`${BASEURL}/auth/user`, {
      method: 'PATCH',
      headers: { 
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      }),
    })
    .then(checkResponse)
    .then( res => {
      if (res && res.success) {
        dispatch(updateUserDataSuccess(res.user.name, res.user.email))
      } else {
        dispatch(updateUserDataFailed());
      }
    })
    .catch( err => {
      dispatch(updateUserDataFailed());
    })
  }
};

