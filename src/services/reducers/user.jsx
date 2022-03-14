import {
  SET_USER_DATA,
  RESET_TOKEN,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  DELETE_USER_DATA
} from "../actions/user";

const initialState = {
  name: null,
  email: null,
  token: null,
  isAuthenticated: false,
  updateTokenRequest: false,
  updateTokenFailed: false,
};

export const userReducer = (state = initialState, action) => {
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
        name: null,
        email: null,
        token: null,
        isAuthenticated: false
      }
    }

    
    default:
      return state;
  }
}