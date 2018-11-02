import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Route, Switch } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import reducers from './reducers/';
// pages
import Login from './components/Login';
import ListBooks from './components/ListBooks';
import Add from './components/Add';
import Edit from './components/Edit';

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware));
  return createStore(reducers, initialState, enhancer);
}

const store = configureStore({});
// Initialize session service
const options = { rrefreshOnCheckAuth: true, redirectPath: '/login', driver: 'LOCALSTORAGE' };
sessionService.initSessionService(store, options);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route path="/" component={ListBooks} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/add" component={Add} exact />
          <Route path="/edit/:id" component={Edit} exact />
        </Switch>
      </Provider>
    );
  }
}


export default App;
