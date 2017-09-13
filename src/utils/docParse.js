import XLSX from 'xlsx';
import path from 'path';

export default function docParse(fileBinary){
  const workbook = XLSX.read(fileBinary, {type: 'binary'});
  const first_sheet_name = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[first_sheet_name];
  const MoUInput = {

    MEDIATOR_FIRST_NAME: getCellValue('B2', 2),
    MEDIATOR_LAST_NAME: getCellValue('B3', 2),


    NUMBER_OF_SESSIONS: getCellValue('B6', 1),
    DATE_OF_MEDIATION_START: getCellValue('B7', 1, 'd'),
    DATE_OF_MEDIATION_END: getCellValue('B8', 1, 'd'),
    LEGAL_ADVICE: getCellValue('B9', 1),
    DATE_MARRIED: getCellValue('B10', 1, 'd'),
    DATE_COHABITED: getCellValue('B11', 1, 'd'),
    DATE_SEPARATED: getCellValue('B12', 1, 'd'),

    TITLE_A: getCellValue('B22', 1),
    TITLE_B: getCellValue('E22', 1),
    FIRST_NAME_A: getCellValue('B23', 1),
    FIRST_NAME_B: getCellValue('E23', 1),
    LAST_NAME_A: getCellValue('B24', 1),
    LAST_NAME_B: getCellValue('E24', 1),
    DOB_A: getCellValue('B25', 1, 'd'),
    DOB_B: getCellValue('E25', 1, 'd'),
    OCCUPATION_A: getCellValue('B26', 1),
    OCCUPATION_B: getCellValue('E26', 1),
    NEW_PARTNER_A: getCellValue('B27', 1),
    NEW_PARTNER_B: getCellValue('E27', 1),
    NEW_PARTNER_COHABITING_A: getCellValue('B28', 1),
    NEW_PARTNER_COHABITING_B: getCellValue('E28', 1),
    NEW_PARTNER_REMARRIED_A: getCellValue('B29', 1),
    NEW_PARTNER_REMARRIED_B: getCellValue('E29', 1),
    NEW_PARTNER_REMARRIAGE_INTENDED_A: getCellValue('B30', 1),
    NEW_PARTNER_REMARRIAGE_INTENDED_B: getCellValue('E30', 1),
    GOOD_HEALTH_A: getCellValue('B31', 1),
    GOOD_HEALTH_B: getCellValue('E31', 1),
    GOOD_HEALTH_DESCRIPTION_A: getCellValue('B32', 1),
    GOOD_HEALTH_DESCRIPTION_B: getCellValue('E32', 1),


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
function getCellValue(cellAddress, sheetNumber, cellFormat){
  let output_value;
  const first_sheet_name = workbook.SheetNames[sheetNumber];
  const worksheet = workbook.Sheets[first_sheet_name];
  const address_of_cell = cellAddress;
  const desired_cell = worksheet[address_of_cell];
  let desired_value = (desired_cell ? desired_cell.v : undefined);
  if ((cellFormat == 'd') && (typeof desired_value == 'number')){
    output_value = XLSX.SSF.parse_date_code(desired_value);
  } else {
    output_value = desired_value;
  }
  return output_value;
}
return MoUInput;
}
