import * as authActions from './auth';
import * as booksActions from './books';


const actionCreators = Object.assign({},
  authActions,
  booksActions
);

export default actionCreators;
