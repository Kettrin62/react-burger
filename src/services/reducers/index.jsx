import { combineReducers } from 'redux';
import { 
  ingredientsReducer, 
  scrollReducer 
} from './ingredients';
import { cardsReducer } from './constructor';
import { modalReducer } from './modal';
import { orderReducer } from './order';

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cards: cardsReducer,
  modal: modalReducer,
  order: orderReducer,
  scroll: scrollReducer,
})