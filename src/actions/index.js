import axios from 'axios';
import xlsParse from '../utils/xlsParse';
import docxGen from '../utils/docxGen';

export const IMPORT_FILE = 'import_file';
const ROOT_URL = 'http://localhost:3000/api/assets/';

export function importFile(fileBinary){
  const xlsData = xlsParse(fileBinary);
  const docxTemplate = axios.get(`${ROOT_URL}MOU_input`);
  // docGen(xlsData, docxTemplate);
  console.log('Request: ', docxTemplate);
  return {
    type: IMPORT_FILE,
    payload: { xlsData, docxTemplate }
  }
}
