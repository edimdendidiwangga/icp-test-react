import * as types from './types';
import { sessionService } from 'redux-react-session';
import API from './api';

export const signin = params => (dispatch) => {
  dispatch({
    type: types.SIGNIN_REQUEST,
  });
  return API.post('/users/login', params)
  .then((res) => {
    sessionService.saveSession({ token: res.data.data.token });
    sessionService.saveUser(res.data.user);
    dispatch({
      type: types.SIGNIN_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: types.SIGNIN_FAILURE,
      payload: err,
    });
  });
};


export const getUsers = token => (dispatch) => {
  dispatch({
    type: types.USERS_REQUEST,
  });
  return API.get(`/users/me?token=${token}`)
  .then((res) => {
    dispatch({
      type: types.USERS_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: types.USERS_FAILURE,
      payload: err,
    });
  });
};

export const signout = token => (dispatch) => {
  dispatch({
    type: types.LOGOUT_REQUEST,
  });
  return API.get(`/users/logout?token=${token}`)
  .then((res) => {
    dispatch({
      type: types.LOGOUT_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: types.LOGOUT_FAILURE,
      payload: err,
    });
  });
}
