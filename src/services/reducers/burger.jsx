import { cardsConstructor } from '../initialData';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CARD,
  DELETE_CARD,
  OPEN_MODAL,
  CLOSE_MODAL,
  // GET_CARD_MODAL,

} from '../actions/burger';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  cards: cardsConstructor,

  // modalVisible: false,
  modalCard: null,
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

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD: {
      return  {
        ...state,
        cards: [...state.cards].concat(action.id),
      }
    }
    case DELETE_CARD: {
      return {
        ...state,
        cards: [...state.cards].filter(item => item.id !== action.id)
      };
    }
    default:
      return state;
  }
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        modalCard: action.card,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modalCard: "",
      };
    }

    default:
      return state;
  }
}