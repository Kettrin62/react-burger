import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  TLogoutActions
} from "../actions/logout";

type TLogoutState = {
  readonly logoutRequest: boolean,
  readonly logoutFailed: boolean,
}

const logoutInitialState: TLogoutState = {
  logoutRequest: false,
  logoutFailed: false,
};

export const userReducer = 
  (state = logoutInitialState, 
  action: TLogoutActions):
  TLogoutState => {
    switch (action.type) {
      case LOGOUT_REQUEST: {
        return {
          ...state,
          logoutRequest: true,
        }
      }
      case LOGOUT_SUCCESS: {
        return {
          ...state,
          logoutRequest: false,
          logoutFailed: false,
        }
      }
      case LOGOUT_FAILED: {
        return {
          ...state,
          logoutFailed: true,
          logoutRequest: false,
        }
      }
      default:
        return state;
    }
}