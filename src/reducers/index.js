import { combineReducers } from 'redux';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
  data: fileReducer
});

export default rootReducer;
