import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  TForgotPasswordActions
} from '../actions/forgot-password';

type TForgotPasswordState = {
  readonly forgotPasswordRequest: boolean,
  readonly forgotPasswordFailed: boolean,
  readonly forgotPasswordSuccess: boolean,
}

const forgotPasswordInitialState: TForgotPasswordState = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,
};

export const forgotPasswordReducer = 
  (state = forgotPasswordInitialState, 
  action: TForgotPasswordActions):
  TForgotPasswordState => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST: {
        return {
          ...state,
          forgotPasswordRequest: true,
        }
      }
      case FORGOT_PASSWORD_SUCCESS: {
        return {
          ...state,
          forgotPasswordRequest: false,
          forgotPasswordFailed: false,
          forgotPasswordSuccess: true,
        }
      }
      case FORGOT_PASSWORD_FAILED: {
        return {
          ...state,
          forgotPasswordFailed: true,
          forgotPasswordRequest: false,
          forgotPasswordSuccess: false,
        }
      }
      default:
        return state;
    }
}
