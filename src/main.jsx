import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import App from './containers/App';
import reducer from './reducers';

require('array.prototype.findindex').shim();

const store = createStore(reducer);

store.subscribe(() => {
  localStorage.setItem('yogurt', JSON.stringify(store.getState()));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
