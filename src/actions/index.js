import axios from 'axios';
import xlsParse from '../utils/xlsParse';
import docxGen from '../utils/docxGen';

export const IMPORT_FILE = 'import_file';
const ROOT_URL = 'http://localhost:3000/api/assets/';

export function importFile(fileBinary){
  const data = xlsParse(fileBinary);
  // const docxTemplate = axios.get(`${ROOT_URL}docx_template`);
  // docxTemplate.then(function(res){
  //   let template = res.data;
    docxGen(data);
  // }, function(err){
  //   console.log('template fetch failed');
  // });

  return {
    type: IMPORT_FILE,
    payload: data
  }
}
