import { combineReducers } from 'redux';
import { cardsReducer, ingredientsReducer, modalReducer } from './burger';

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cards: cardsReducer,
  modal: modalReducer,
})