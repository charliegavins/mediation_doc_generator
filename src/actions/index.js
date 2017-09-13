import docParse from '../utils/docParse';
import docGen from '../utils/docGen';

export const IMPORT_FILE = 'import_file';


export function importFile(fileBinary){
  const MoUInput = docParse(fileBinary);
  docGen(MoUInput);
  console.log(MoUInput);
  return {
    type: IMPORT_FILE,
    payload: MoUInput
  }
}
