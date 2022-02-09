import { cardsConstructor } from '../initialData';

const initialState = {
  cards: cardsConstructor,
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return  [
        ...state,
        
      ]
    default:
      return state;
  }
}