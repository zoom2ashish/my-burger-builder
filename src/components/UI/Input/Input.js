import React from "react";
import * as classes from './Input.module.css';

const input = props => {
  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement];

  if (props.touched && props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>Please enter valid {props.valueType || 'value'}!</p>
  }

  switch (props.elementType) {
    case 'textarea':
      inputElement = <textarea
        {...props.elementConfig}
        value={props.value}
        className={inputClasses.join(' ')}
        onChange={props.changed}
        />
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {
            props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))
          }
        </select>
      );
      break;
    case 'input':
    default:
      inputElement = <input
        {...props.elementConfig}
        value={props.value}
        className={inputClasses.join(' ')}
        onChange={props.changed}/>
  };

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
