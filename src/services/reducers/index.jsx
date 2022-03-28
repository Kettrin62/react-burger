import { combineReducers } from 'redux';
import { 
  ingredientsReducer, 
  scrollReducer 
} from './ingredients';
import { cardsReducer } from './constructor';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { registerReducer } from './register';
import { loginReducer } from './login';
import { userReducer } from './user';
import { wsReducer } from './ws';

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cards: cardsReducer,
  modal: modalReducer,
  order: orderReducer,
  scroll: scrollReducer,
  forgot: forgotPasswordReducer,
  reset: resetPasswordReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  ws: wsReducer
})