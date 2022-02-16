import { cardsConstructor } from '../initialData';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CARD,
  DELETE_CARD,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CHANGE_TUB,
  ADD_CARD_BUN,
  ADD_CARD_NOT_BUN

} from '../actions/burger';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  // cards: cardsConstructor,
  cards:[],

  cardsBun: [],
  cardsNotBun: [],

  // modalVisible: false,
  modalCard: null,

  order: null,
  orderRequest: false,
  orderFailed: false,

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

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD: {
      return  {
        ...state,
        cards: [...state.cards].concat(action.id),
      }
    }
    case ADD_CARD_BUN: {
      return  {
        ...state,
        cardsBun: [...state.cardsBun].concat(action.id),
      }
    }
    case ADD_CARD_NOT_BUN: {
      return  {
        ...state,
        cardsNotBun: [...state.cardsNotBun].concat(action.id),
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

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
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