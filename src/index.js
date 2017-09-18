import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';

import DropFile from './components/dropfile';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <DropFile />
  </Provider>
  , document.querySelector('.container'));


///speed test for app:
// function someMethodIThinkMightBeSlow() {
//     const startTime = performance.now();
//
//     // Do the normal stuff for this function
//
//     const duration = performance.now() - startTime;
//     console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
// }
