import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import DropFile from './components/dropfile';
import StatusLog from './components/statusLog';
import reducers from './reducers';

// const logger = store => next => action => {
//   console.group(action.type)
//   console.info('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.groupEnd(action.type)
//   return result
// }

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore);

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <div>
    <DropFile />
    <StatusLog />
    </div>
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
