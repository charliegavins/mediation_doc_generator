import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import DropFile from './components/dropfile';
import StatusLog from './components/statusLog';
import GetBinary from './components/getbinary';
import reducers from './reducers';

const App = () => {

  const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore);

  const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return (
    <Provider store={store}>
    <DropFile />
  </Provider>
);
}

ReactDOM.render(<App />, document.querySelector('.container'));
