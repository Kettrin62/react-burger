import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/login';

const initialState = {
  loginRequest: false,
  loginFailed: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      }
    }
    default:
      return state;
  }
}
