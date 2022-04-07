import { BASEURL } from '../../utils/data';
import { checkResponse } from '../../utils/functions';
import { setCookie } from '../../utils/functions';


export const SET_USER_DATA = 'SET_USER_DATA';
export const RESET_TOKEN = 'RESET_TOKEN';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';
export const DELETE_USER_DATA = 'DELETE_USER_DATA';
export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';
export const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';

export function setUserData(name, email, token) {
  return {
    type: SET_USER_DATA,
    name: name,
    email: email,
    token: token
  }
};

function updateTokenFailed() {
  return {
    type: UPDATE_TOKEN_FAILED
  }
};

export function resetToken() {
  return {
    type: RESET_TOKEN
  }
};

export function updateTokenSuccess(token) {
  return {
    type: UPDATE_TOKEN_SUCCESS,
    token: token
  }
};

function getUserDataFailed() {
  return {
    type: GET_USER_DATA_FAILED
  }
};

function updateUserDataRequest() {
  return {
    type: UPDATE_USER_DATA_REQUEST
  }
};

function updateUserDataSuccess(name, email) {
  return {
    type: UPDATE_USER_DATA_SUCCESS,
    name: name,
    email: email
  }
};

function updateUserDataFailed() {
  return {
    type: UPDATE_USER_DATA_FAILED
  }
};


export function updateToken(token) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST
    })
    // Запрашиваем данные у сервера
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
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
        dispatch(updateTokenSuccess(res.accessToken));
        const refreshToken = res.refreshToken;
        setCookie('refreshToken', refreshToken, { path: '/', 'max-age': 31556926 });
        setTimeout(() => dispatch(resetToken), 1200000);
      } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
                dispatch(updateTokenFailed())
      }
    })
    .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch(updateTokenFailed())
    })
  }
};

export function getUserData(token) {
  return function (dispatch) {
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
        setTimeout(() => dispatch(resetToken), 1200000);
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

export function updateUserDataToken(token, data) {
  return function (dispatch) {
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
        setTimeout(() => dispatch(resetToken), 1200000);
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

export function updateUserData(token, data) {
  return function (dispatch) {
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

