import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  TLoginActions
} from '../actions/login';

type TLoginState = {
  readonly loginRequest: boolean,
  readonly loginFailed: boolean,
}

const loginInitialState: TLoginState = {
  loginRequest: false,
  loginFailed: false,
};

export const loginReducer = (
  state = loginInitialState, 
  action: TLoginActions
): TLoginState => {
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
