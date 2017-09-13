import docParse from '../utils/docParse';

export const IMPORT_FILE = 'import_file';


export function importFile(fileBinary){
  const MoUInput = docParse(fileBinary);
  console.log(MoUInput);
  return {
    type: IMPORT_FILE,
    payload: MoUInput
  }
}
