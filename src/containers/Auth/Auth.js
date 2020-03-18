import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    isSignup: true,
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    }
  };

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

    if (rules.isEmail) {
      const pattern = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ig;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangeHandler =(event, controlName) => {
    const controlConfig =  this.state.controls[controlName];
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...controlConfig,
        value: event.target.value,
        valid: this.checkValidity(event.target.value, controlConfig.validation),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    const controls = this.state.controls;
    const email = controls.email.value;
    const password = controls.password.value;
    this.props.onAuth(email, password, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  }

  render() {
    const formTitle =  this.state.isSignup ? 'SIGNUP' : 'SIGNIN';
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        <h3>{formTitle}</h3>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO { this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDisaptchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password))
  }
}

export default connect(mapStateToProps, mapDisaptchToProps)(Auth);