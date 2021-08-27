import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore,combineReducers} from 'redux';
import BasketReducer from './reducers/Basket';
import DataReducer from './reducers/Data';

import Counter from './reducers/Counter';
import {Provider} from 'react-redux';
import CurrentItemReducer from './components/CurrentItem';


const combinedReducers=combineReducers({
  basket:BasketReducer,
  data:DataReducer,
  


});


const store=createStore(combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();