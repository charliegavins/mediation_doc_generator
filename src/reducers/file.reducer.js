import { IMPORT_FILE } from '../actions';

export default function(state = {}, action){
  switch(action.type){
    case IMPORT_FILE:
    return { ...state, 'file': action.payload.data};
    default:
    return state;
  }
}
