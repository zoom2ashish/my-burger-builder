import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = (token, userId, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    email: email
  };
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  };
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbrN88P6EJMd_1ahDKluTQ-JMGOQblK9Y';
    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbrN88P6EJMd_1ahDKluTQ-JMGOQblK9Y';
    }

    axios.post(url, authData)
      .then(response => {
        const { idToken, localId, email, expiresIn } = response.data;
        dispatch(authSuccess(idToken, localId, email));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch(error => {
        console.error(error.response.data.error);
        dispatch(authFailed(error.response.data.error));
      })

  };
}