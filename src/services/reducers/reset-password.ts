import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  TResetPasswordActions,
} from '../actions/reset-password';

type TResetPasswordState = {
  readonly resetPasswordRequest: boolean,
  readonly resetPasswordFailed: boolean,
  readonly resetPasswordSuccess: boolean,
}

const ResetPasswordInitialState: TResetPasswordState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,
};

export const resetPasswordReducer = (
  state = ResetPasswordInitialState, 
  action: TResetPasswordActions
): TResetPasswordState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: true,
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        resetPasswordFailed: true,
        resetPasswordRequest: false,
        resetPasswordSuccess: false,
      }
    }
    default:
      return state;
  }
}
