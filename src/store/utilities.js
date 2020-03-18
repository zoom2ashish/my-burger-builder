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