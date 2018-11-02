import * as types from './types';
import API from './api';

export const getBook = ({ token, id }) => (dispatch) => {
  dispatch({
    type: types.BOOK_REQUEST,
  });
  return API.get(`/books/detail?token=${token}&id=${id}`)
  .then((res) => {
    dispatch({
      type: types.BOOK_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: types.BOOK_FAILURE,
      payload: err,
    });
  });
};

export const addBook = ({ token, data }) => (dispatch) => {
  dispatch({
    type: types.ADD_BOOK_REQUEST,
  });
  return API.post(`/books/insert?token=${token}`, data)
  .then((res) => {
    dispatch({
      type: types.ADD_BOOK_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: types.ADD_BOOK_FAILURE,
      payload: err,
    });
  });
};

export const getlistBooks = token => (dispatch) => {
  dispatch({
    type: types.LIST_BOOKS_REQUEST,
  });
  return API.get(`/books?token=${token}`)
  .then((res) => {
    dispatch({
      type: types.LIST_BOOKS_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: types.LIST_BOOKS_FAILURE,
      payload: err,
    });
  });
};

export const editBook = ({ token, data }) => (dispatch) => {
  dispatch({
    type: types.PUT_BOOK_REQUEST,
  });
  return API.post(`/books/edit?token=${token}`, data)
  .then((res) => {
    dispatch({
      type: types.PUT_BOOK_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: types.PUT_BOOK_FAILURE,
      payload: err,
    });
  });
};

export const removeBook = ({ token, id }) => (dispatch) => {
  dispatch({
    type: types.DELETE_BOOK_REQUEST,
  });
  return API.get(`/books/delete?token=${token}&id=${id}`)
  .then((res) => {
    dispatch({
      type: types.DELETE_BOOK_SUCCESS,
      payload: res.data,
    });
  })
  .catch((err) => {
    dispatch({
      type: types.DELETE_BOOK_FAILURE,
      payload: err,
    });
  });
};