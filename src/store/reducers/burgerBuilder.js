import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utilities';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const addIngredient = (state, action) => {
    const ingredientName = action.ingredientName;
    const priceAddition = INGREDIENT_PRICES[ingredientName];
    const updatedTotalPrice = state.totalPrice + priceAddition;
    const updatedIngredient = { [ingredientName]: state.ingredients[ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = { ingredients: updatedIngredients, totalPrice: updatedTotalPrice };
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const ingredientName = action.ingredientName;
  const priceRemoved = INGREDIENT_PRICES[ingredientName];
  const updatedTotalPrice = state.totalPrice - priceRemoved;
  const updatedIngredient = { [ingredientName]: state.ingredients[ingredientName] - 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = { ingredients: updatedIngredients, totalPrice: updatedTotalPrice };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  const ingredients = action.ingredients;
  return updateObject(state, {
    ingredients: ingredients,
    totalPrice: initialState.totalPrice,
    error: false
  });
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { ingredients: null, error: true });
    default:
      console.log('Unknown action type');
      return state;
  }
}

export default reducer;