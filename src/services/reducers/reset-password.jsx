import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../actions/reset-password';

const initialState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,
};

export const resetPasswordReducer = (state = initialState, action) => {
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
