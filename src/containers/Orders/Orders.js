import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { fetchOrders, deleteOrder } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as classes from './Orders.module.css';
class Orders extends Component {

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.props.onFetchOrders();
  }

  deleteOrderClickedHandler(id) {
    this.props.onDeleteOrder(id);
  }


  render() {
    let orders = <div className={classes.noOrdersFound}>'No orders found!'</div>;

    if (this.props.orders.length > 0) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
          deleteOrderClicked={() => this.deleteOrderClickedHandler(order.id)}
        />
      ));
    }

    if (this.props.loading) {
      orders = <Spinner />
    }


    return (
      <div className={classes.Orders}>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
    onDeleteOrder: (orderId) => dispatch(deleteOrder(orderId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));