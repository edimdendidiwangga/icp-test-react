import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { authReducer, usersReducer, logoutReducer } from './auth';
import { listBooksReducer, addBookReducer, bookDetailReducer, updateBookReducer, deleteBookReducer } from './books';

export default combineReducers({
  session: sessionReducer,
  auth: authReducer,
  users: usersReducer,
  logout: logoutReducer,
  listBooks: listBooksReducer,
  addBook: addBookReducer,
  updateBook: updateBookReducer,
  deleteBook: deleteBookReducer,
  detailBook: bookDetailReducer,
});

