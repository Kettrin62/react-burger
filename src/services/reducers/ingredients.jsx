import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CHANGE_TUB,
} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  tabCurrent: 'one',
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      }
    }
    default:
      return state;
  }
}

export const scrollReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TUB: {
      return {
        ...state,
        tabCurrent: action.current,
      }
    }
    default:
      return state;
  }
}