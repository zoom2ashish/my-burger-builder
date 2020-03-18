import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
}


export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
};


export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
}

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error))
      });
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            id: key,
            ...response.data[key]
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        console.error(error);
        dispatch(fetchOrdersFailed(error));
      });
  };
};

export const deleteOrderStart = () => {
  return {
    type: actionTypes.DELETE_ORDER_START
  };
}

export const deleteOrderSuccess = (orderId) => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    id: orderId
  };
}

export const deleteOrderFailed = (error) => {
  return {
    type: actionTypes.DELETE_ORDER_FAILED,
    error: error
  }
}

export const deleteOrder = (id) => {
  return (dispatch, state) => {
    dispatch(deleteOrderStart());
    axios.delete(`/orders/${id}.json`)
    .then(() => {
      console.log('Order ' + id + ' deleted');
      dispatch(deleteOrderSuccess(id));
    }).catch(error => {
      console.error(error);
      dispatch(deleteOrderFailed(error));
    });
  }
}