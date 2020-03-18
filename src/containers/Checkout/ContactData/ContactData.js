import React, { Component, isValidElement } from "react";
import Button from "../../../components/UI/Button/Button";
import * as classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", label: "Fastest" },
            { value: "cheapest", label: "Cheapest" }
          ]
        },
        value: 'cheapest',
        validation: {},
        valid: true,
        touched: false
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};

    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    this.props.onOrderBuger(order);
  };

  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputId] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return isValid;
    }

    if (rules.required) {
      isValid = isValid && value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }

    return isValid;
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }


    let form = (
      <form onSubmit={this.orderHandler}>
        {
          formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={ (evt) => {
                this.inputChangeHandler(evt, formElement.id)
              }}
            />
          ))
        }
        <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBuger: (orderData) => dispatch(purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
