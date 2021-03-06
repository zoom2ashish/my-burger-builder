import * as actionTypes from '../actions/actionTypes';
import { setLoading, setError, updateObject } from '../../shared/utilities';

const initialState = {
  token: null,
  userId: null,
  email: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
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

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path || '/' });
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
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
}

export default reducer;