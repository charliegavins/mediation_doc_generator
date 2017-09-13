import XLSX from 'xlsx';
import path from 'path';

export default function docParse(fileBinary){
  const workbook = XLSX.read(fileBinary, {type: 'binary'});
  const first_sheet_name = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[first_sheet_name];
  const MoUInput = {
    NUMBER_OF_SESSIONS: getCellValue('B6', 1),

    FAMILY_HOME_A: getCellValue('K130', 0),
    FAMILY_HOME_B: getCellValue('M130', 0),
    OTHER_PROPERTY_A: getCellValue('K131', 0),
    OTHER_PROPERTY_B: getCellValue('M131', 0),
    PERSONAL_ASSETS_A: getCellValue('K132', 0),
    PERSONAL_ASSETS_B: getCellValue('M132', 0),
    LIABILITIES_A: getCellValue('K133', 0),
    LIABILITIES_B: getCellValue('M133', 0),
    BUSINESS_ASSETS_A: getCellValue('K134', 0),
    BUSINESS_ASSETS_B: getCellValue('M134', 0),
    OTHER_ASSETS_A: getCellValue('K135', 0),
    OTHER_ASSETS_B: getCellValue('M135', 0),
    PENSIONS_A: getCellValue('K137', 0),
    PENSIONS_B: getCellValue('M137', 0)
  }
function getCellValue(cellAddress, sheetNumber){
  const first_sheet_name = workbook.SheetNames[sheetNumber];
  const worksheet = workbook.Sheets[first_sheet_name];
  const address_of_cell = cellAddress;
  const desired_cell = worksheet[address_of_cell];
  const desired_value = (desired_cell ? desired_cell.v : undefined);
  return desired_value;
}
return MoUInput;
}
