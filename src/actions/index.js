import axios from 'axios';
import docParse from '../utils/docParse';
import docGen from '../utils/docGen';

export const IMPORT_FILE = 'import_file';
const ROOT_URL = 'http://localhost:3000/api/assets/';

export function importFile(fileBinary){
  const data = docParse(fileBinary)
  axios.get(`${ROOT_URL}MOU_input`)
.then(function(res) {
    let MoUInput = res;
    docGen(data, MoUInput);
  })
  .catch(function (err) {
    console.log(err);
  })
  return {
    type: IMPORT_FILE,
    payload: data
  }
}
