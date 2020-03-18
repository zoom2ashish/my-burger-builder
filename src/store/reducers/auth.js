import * as actionTypes from '../actions/actionTypes';
import { setLoading, setError, updateObject } from '../utilities';

const initialState = {
  token: null,
  userId: null,
  email: null,
  error: null,
  loading: false
}

const authSuccess = (state, action) => {
  const updatedState = updateObject(state, {
    token: action.token,
    userId: action.userId,
    email: action.email
  });
  return setLoading(updatedState, false);
}

const authLogout = (state, action) => {
  return updateObject(state, initialState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return setLoading(state, true);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return setError(state, action.error);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
}

export default reducer;