import { IMPORT_FILE } from '../actions';
import docxGen from '../utils/docxGen';

export default function(state = {}, action){
  switch(action.type){
    case IMPORT_FILE:
    return { ...state, 'file': action.payload};
    default:
    return state;
}
};
