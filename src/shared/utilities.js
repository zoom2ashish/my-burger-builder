export const setLoading = (state, loading) => {
  return {
    ...state,
    error: null,
    loading: loading || false
  }
}

export const setError = (state, error) => {
  return {
    ...state,
    loading: false,
    error: error
  }
}

export const updateObject = (state, updatedProperties) => {
  return {
    ...state,
    ...updatedProperties
  };
}


export const checkValidity = (value, rules) => {
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