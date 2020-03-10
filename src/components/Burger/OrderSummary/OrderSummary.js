import React, { Component } from "react";
import classes from "./OrderSummary.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  componentWillUpdate() {
    console.log('OrderSummary component will update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return(
          <li key={igKey}>
            <span className={classes.IngredientLabel}>{igKey}: {this.props.ingredients[igKey]}</span>
          </li>
        );
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to checkout</p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
      </Aux>
    );
  }
};

export default OrderSummary;
