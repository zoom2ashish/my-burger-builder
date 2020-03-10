import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
  state = {
    orders: [],
    loading: false
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({loading: true});
    axios.get('/orders.json')
      .then((response) => {
        const fetchedOrders = [];
        for(let key in response.data) {
          fetchedOrders.push({
            id: key,
            ...response.data[key]
          });
        }
        this.setState({
          orders: fetchedOrders
        });
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({loading: false}));
  }

  deleteOrderClickedHandler(id) {
    this.setState({loading: true});
    axios.delete(`/orders/${id}.json`)
      .then(() => {
        console.log('Order ' + id + ' deleted');
        const updatedOrders = this.state.orders.filter(order => order.id !== id);
        this.setState({
          orders: updatedOrders
        });
      }).catch(error => console.error(error))
      .finally(() => this.setState({loading: false}));
  }


  render() {
    const orders = this.state.orders.map((order) => (
      <Order key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
        deleteOrderClicked={() => this.deleteOrderClickedHandler(order.id)}
        />
    ))
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);