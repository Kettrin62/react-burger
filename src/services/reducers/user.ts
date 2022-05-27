import {
  SET_USER_DATA,
  RESET_TOKEN,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  DELETE_USER_DATA,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILED,
  TUserActions,
} from "../actions/user";

type TUserState = {
  readonly name: string,
  readonly email: string,
  readonly token: string | null,
  readonly isAuthenticated: boolean,

  readonly updateTokenRequest: boolean,
  readonly updateTokenFailed: boolean,
  readonly userDataRequest: boolean,
  readonly userDataFailed: boolean,
}

const userInitialState: TUserState = {
  name: '',
  email: '',
  token: null,
  isAuthenticated: false,

  updateTokenRequest: false,
  updateTokenFailed: false,
  userDataRequest: false,
  userDataFailed: false,
};

export const userReducer = (
  state = userInitialState, 
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        token: action.token,
        isAuthenticated: true
      };
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
      }
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: false,
        token: action.token
      }
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenFailed: true,
        updateTokenRequest: false,
      }
    }
    case RESET_TOKEN: {
      return {
        ...state,
        token: null
      }
    }
    case DELETE_USER_DATA: {
      return {
        ...state,
        name: '',
        email: '',
        token: null,
        isAuthenticated: false
      }
    }
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        userDataRequest: true,
      }
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        userDataRequest: false,
        userDataFailed: false,
        name: action.name,
        email: action.email,
        isAuthenticated: true
      }
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        userDataFailed: true,
        userDataRequest: false,
      }
    }
    case UPDATE_USER_DATA_REQUEST: {
      return {
        ...state,
        userDataRequest: true,
      }
    }
    case UPDATE_USER_DATA_SUCCESS: {
      return {
        ...state,
        userDataRequest: false,
        userDataFailed: false,
        name: action.name,
        email: action.email
      }
    }
    case UPDATE_USER_DATA_FAILED: {
      return {
        ...state,
        userDataFailed: true,
        userDataRequest: false,
      }
    }
    default:
      return state;
  }
}