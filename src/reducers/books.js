import * as types from '../actions/types';

const initialState = {
  data: {},
  isFetching: false,
  isFound: false,
  isError: false,
};

const bookDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BOOK_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.BOOK_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isFound: true,
        data: action.payload,
      };
    }
    case types.BOOK_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.payload,
      };
    }
    default: return state;
  }
};

const addBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_BOOK_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.ADD_BOOK_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isFound: true,
        data: action.payload,
      };
    }
    case types.ADD_BOOK_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.payload,
      };
    }
    default: return state;
  }
};

const listBooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_BOOKS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.LIST_BOOKS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isFound: true,
        data: action.payload,
      };
    }
    case types.LIST_BOOKS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.payload,
      };
    }
    default: return state;
  }
};

const updateBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PUT_BOOK_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.PUT_BOOK_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isFound: true,
        data: action.payload,
      };
    }
    case types.PUT_BOOK_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.payload,
      };
    }
    default: return state;
  }
};

const deleteBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_BOOK_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.DELETE_BOOK_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isFound: true,
        data: action.payload,
      };
    }
    case types.DELETE_BOOK_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isError: true,
        message: action.payload,
      };
    }
    default: return state;
  }
};

export {
  bookDetailReducer,
  addBookReducer,
  listBooksReducer,
  deleteBookReducer,
  updateBookReducer,
}
