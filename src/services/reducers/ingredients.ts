import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CHANGE_TUB,
  TIngredientsActions,
  IChangeTub
} from '../actions/ingredients';
import { 
  TCard,
  TTabCurrent
} from '../types/data';

type TIngredientsState = {
  readonly ingredients: ReadonlyArray<TCard>;
  readonly ingredientsRequest: boolean;
  readonly ingredientsFailed: boolean;

  readonly tabCurrent: TTabCurrent;
}

const ingredientsInitialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  tabCurrent: 'one',
} 

// const initialState = {
//   ingredients: [],
//   ingredientsRequest: false,
//   ingredientsFailed: false,

//   tabCurrent: 'one',
// };

export const ingredientsReducer = (
  state = ingredientsInitialState, 
  action: TIngredientsActions
): TIngredientsState => {
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

export const scrollReducer = (
  state = ingredientsInitialState, 
  action: IChangeTub
): TIngredientsState => {
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