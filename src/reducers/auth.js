import * as types from '../actions/types';

const initialState = {
  data: {},
  isFetching: false,
  isFound: false,
  isError: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNIN_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.SIGNIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isFound: true,
        data: action.payload,
      };
    }
    case types.SIGNIN_FAILURE: {
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

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.USERS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isFound: true,
        data: action.payload,
      };
    }
    case types.USERS_FAILURE: {
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

const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGOUT_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isFound: true,
        data: action.payload,
      };
    }
    case types.LOGOUT_FAILURE: {
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
  authReducer,
  usersReducer,
  logoutReducer
}
