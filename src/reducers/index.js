import { combineReducers } from 'redux';
import fileReducer from './file.reducer';

const rootReducer = combineReducers({
  file: fileReducer
});

export default rootReducer;
