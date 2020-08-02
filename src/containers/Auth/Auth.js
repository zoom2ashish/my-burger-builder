import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import { setAuthRedirectPath } from '../../store/actions/auth';
import { updateObject, checkValidity } from '../../shared/utilities';

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

  componentDidMount() {
    if (!this.props.isBuildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler =(event, controlName) => {
    const controlConfig =  this.state.controls[controlName];
    const updatedControls = updateObject(this.state.controls,{
      [controlName]: updateObject(controlConfig, {
        value: event.target.value,
        valid: checkValidity(event.target.value, controlConfig.validation),
        touched: true
      })
    });

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
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />
    }

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
    error: state.auth.error,
    isBuildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDisaptchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDisaptchToProps)(Auth);