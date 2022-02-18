import {
  ADD_CARD,
  CHANGE_CARD_BUN,
  DELETE_CARD,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT
} from '../actions/constructor';

const initialState = {
  cards: [],
  cardBun: [],
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD: {
      return {
        ...state,
        cards: state.cards.concat({
          id: action.id,
          key: action.key,
        }),
      };
    }

    case CHANGE_CARD_BUN: {
      return {
        ...state,
        cardBun: action.id
      };
    }

    case DELETE_CARD: {
      return {
        ...state,
        cards: state.cards.filter(item => item.key !== action.key)
      };
    }
    
    default:
      return state;
  }
}