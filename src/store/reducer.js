import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT: {
      const ingredientName = action.ingredientName;
      const priceAddition = INGREDIENT_PRICES[ingredientName];
      const updatedTotalPrice = state.totalPrice + priceAddition;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] + 1
        },
        totalPrice: updatedTotalPrice
      };
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const ingredientName = action.ingredientName;
      const priceRemoved = INGREDIENT_PRICES[ingredientName];
      const updatedTotalPrice = state.totalPrice - priceRemoved;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] - 1
        },
        totalPrice: updatedTotalPrice
      };
    }
    default:
      console.log('Unknown action type');
      return state;
  }
}

export default reducer;