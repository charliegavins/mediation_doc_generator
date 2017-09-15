import XLSX from 'xlsx';
import path from 'path';
import moment from 'moment';

function capitalise(string){
return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function docParse(fileBinary){
  const workbook = XLSX.read(fileBinary, {type: 'binary'});
  const first_sheet_name = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[first_sheet_name];
  const MoUInput = {

    mediator_first_name: getCellValue('B2', 5),
    mediator_last_name: getCellValue('B3', 5),


    number_of_sessions: getCellValue('B6', 4),
    date_of_mediation_start: getCellValue('B7', 4, 'dd'),
    date_of_mediation_end: getCellValue('B8', 4, 'dd'),
    legal_advice: getCellValue('B9', 4),
    date_married: getCellValue('B10', 4, 'dd'),
    date_cohabited: getCellValue('B11', 4, 'dm'),
    date_separated: getCellValue('B12', 4, 'dm'),
    case_number: getCellValue('B13', 4),

    title_a: getCellValue('B22', 4),
    title_b: getCellValue('E22', 4),
    first_name_a: getCellValue('B23', 4),
    first_name_b: getCellValue('E23', 4),
    last_name_a: getCellValue('B24', 4),
    last_name_b: getCellValue('E24', 4),
    dob_a: getCellValue('B25', 4, 'dd'),
    dob_b: getCellValue('E25', 4, 'dd'),
    occupation_a: getCellValue('B26', 4),
    occupation_b: getCellValue('E26', 4),
    new_partner_a: getCellValue('B27', 4),
    new_partner_b: getCellValue('E27', 4),
    new_partner_cohabiting_a: getCellValue('B28', 4),
    new_partner_cohabiting_b: getCellValue('E28', 4),
    new_partner_remarried_a: getCellValue('B29', 4),
    new_partner_remarried_b: getCellValue('E29', 4),
    new_partner_remarriage_intended_a: getCellValue('B30', 4),
    new_partner_remarriage_intended_b: getCellValue('E30', 4),
    good_health_a: getCellValue('B31', 4),
    good_health_b: getCellValue('E31', 4),
    good_health_description_a: getCellValue('B32', 4),
    good_health_description_b: getCellValue('E32', 4),


    family_home_a: getCellValue('K130', 0),
    family_home_b: getCellValue('M130', 0),
    other_property_a: getCellValue('K131', 0),
    other_property_b: getCellValue('M131', 0),
    personal_assets_a: getCellValue('K132', 0),
    personal_assets_b: getCellValue('M132', 0),
    liabilities_a: getCellValue('K133', 0),
    liabilities_b: getCellValue('M133', 0),
    business_assets_a: getCellValue('K134', 0),
    business_assets_b: getCellValue('M134', 0),
    other_assets_a: getCellValue('K135', 0),
    other_assets_b: getCellValue('M135', 0),
    pensions_a: getCellValue('K137', 0),
    pensions_b: getCellValue('M137', 0)
  }

  //pass in the cell coordinates, sheet number, and format (when it is a date) and return the cell value.
  function getCellValue(cellAddress, sheetNumber, dateFormat){
    let output_value;
    const worksheet = workbook.Sheets[workbook.SheetNames[sheetNumber]];
    const desired_cell = worksheet[cellAddress];
    let desired_value = (desired_cell ? desired_cell.v : undefined);

    //if cell format is a date ('d' passed through as an argument) and a check whether it is a number, then take the excel date format, and parse it into a moment date.
    if ((dateFormat == ('dm')) && (typeof desired_value == 'number') || (dateFormat == ('dd')) && (typeof desired_value == 'number')){
      output_value = parseExcelDate(desired_value, dateFormat);
    }
    if (desired_value == undefined){
      output_value = 'X';
    }
    if (_.isString(desired_value)){
      output_value = capitalise(desired_value);
      console.log(output_value);
    }
    if (_.isNumber(desired_value) && (!dateFormat)){
      output_value = _.round((desired_value), 2);
    }
    if (_.isBoolean(desired_value)){
      output_value = desired_value;
    }
    return output_value;
  }

//take date from excel code to XLSX parsed, to moment formatted (e.g. 1st January 2017)
function parseExcelDate(unParsedDate, dateFormat){
  if (dateFormat == 'dd'){
    return moment(XLSX.SSF.parse_date_code(unParsedDate)).format('Do MMMM YYYY');
  }
  if (dateFormat == 'dm'){
    return moment(XLSX.SSF.parse_date_code(unParsedDate)).format('MMMM YYYY');
  }

}

return MoUInput;
}
