import {
  ADD_CARD,
  CHANGE_CARD_BUN,
  DELETE_CARD,
  SORT_CARD,
  CLEAR_CARDS,
  TCardsActions
} from '../actions/constructor';
import { TCards } from '../types/data';

type TCardsState = {
  readonly cards: ReadonlyArray<TCards>;
  readonly cardBun: string;
}

const cardsInitialState: TCardsState = {
  cards: [],
  cardBun: '',
};

export const cardsReducer = 
  (state = cardsInitialState, 
  action: TCardsActions):
  TCardsState => {
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

    case SORT_CARD: {
      return {
        ...state,
        cards: action.cards
      };
    }

    case CLEAR_CARDS: {
      return {
        cards: [],
        cardBun: ''
      };
    }
    
    default:
      return state;
  }
}