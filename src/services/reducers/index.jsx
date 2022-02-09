import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer
})