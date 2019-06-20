import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router} from 'react-router-dom'

import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'
import history from './history';
// import typeface-swanky-and-moo-moo from 'typeface-swanky-and-moo-moo';


let store = createStore(rootReducer, applyMiddleware(thunk))

// console.log("STORE", store);
ReactDOM.render(
  <div id="app-container">
  <div className="super-awesome-background"></div>
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
