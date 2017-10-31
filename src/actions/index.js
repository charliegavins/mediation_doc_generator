import axios from 'axios';
import xlsParse from '../utils/xlsParse';
import docxGen from '../utils/docxGen';

export const IMPORT_FILE = 'import_file';
export const GET_BINARY = 'get_binary';
const ROOT_URL = 'http://localhost:3000/api/assets/';
export let data = {};

export function importFile(fileBinary){
  data = xlsParse.xlsParse(fileBinary);
  docxGen();
  return {
    type: IMPORT_FILE,
    payload: data
  }
}
export function getBinary(){

  return {
    type: GET_BINARY,
    payload: data
  }
}


//set up to get binary from local JS file - commented out code retrieves binary from server - left in for testing purposes.
