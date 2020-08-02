import * as actionTypes from "../actions/actionTypes";
import { setLoading, setError, updateObject } from '../../shared/utilities';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.PURCHASE_BURGER_START:
      return setLoading(state, true);
    case actionTypes.PURCHASE_BURGER_SUCCESS: {
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      const newState = updateObject(state, {
        purchased: true,
        orders: [ ...state.orders, newOrder ]
      });
      return setLoading(newState, false);
    }
    case actionTypes.PURCHASE_BURGER_FAILED:
      return setError(state, action.error);
    case actionTypes.FETCH_ORDERS_START:
      return setLoading(state, true);
    case actionTypes.FETCH_ORDERS_SUCCESS:{
      const newState = updateObject(state, { orders: action.orders });
      return setLoading(newState, false);
    }
    case actionTypes.FETCH_ORDERS_FAILED:
      const updatedState = { ...state, orders: [] };
      return setError(updatedState, action.error);
    case actionTypes.DELETE_ORDER_START:
      return setLoading(state, true);
    case actionTypes.DELETE_ORDER_SUCCESS: {
      const id = action.id;
      const updatedOrders = state.orders.filter(order => order.id !== id);
      const newState = updateObject(state, { orders: updatedOrders });
      return setLoading(newState, false);
    }
    case actionTypes.DELETE_ORDER_FAILED: {
      return setError(state, action.error);
    }
    default:
      return state;
  }
};

export default reducer;
