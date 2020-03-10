import React from "react";
import * as classes from "./Order.module.css";
import  Button from '../UI/Button/Button';

const order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      quantity: props.ingredients[ingredientName]
    });
  }

  const ingredientsOutput = ingredients.map(ingredient => {
    return <span className={classes.Ingredient} key={ingredient.name}>{ingredient.name} ({ingredient.quantity})</span>
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
      <Button btnType="Danger" clicked={props.deleteOrderClicked}>DELETE</Button>
    </div>
  );
};

export default order;
