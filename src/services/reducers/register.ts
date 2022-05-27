import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  TRegisterActions,
} from '../actions/register';

type TRegisterState = {
  readonly registerRequest: boolean,
  readonly registerFailed: boolean,
}

const registerInitialState: TRegisterState = {
  registerRequest: false,
  registerFailed: false,
};

export const registerReducer = (
  state = registerInitialState, 
  action: TRegisterActions
): TRegisterState => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      }
    }
    default:
      return state;
  }
}
