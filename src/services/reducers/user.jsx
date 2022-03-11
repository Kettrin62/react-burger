import { GET_USER_DATA } from "../actions/user";

const initialState = {
  name: null,
  email: null,
  token: null,
  isAuthenticated: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        token: action.token,
        isAuthenticated: true
      };
    }
    
    default:
      return state;
  }
}