import XLSX from 'xlsx';
import path from 'path';
import moment from 'moment';
import dT from './dataTransform';
import ntow from 'number-to-words';
import _ from 'lodash';

export default function xlsParse(fileBinary){
  const workbook = XLSX.read(fileBinary, {type: 'binary'});
  const first_sheet_name = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[first_sheet_name];
  const MoUInput = {
    doc:{
        footer_date: (getCellValue('B8', 4, 'DD-MM-YY')),
    },
case: {
  case_number: getCellValue('B13', 4),
  mediator_first_name: getCellValue('B2', 5),
  mediator_last_name: getCellValue('B3', 5),
  number_of_sessions: dT.capitalise(ntow.toWords(getCellValue('B6', 4))),
  date_of_mediation_start: (getCellValue('B7', 4, 'Do MMMM YYYY')),
  date_of_mediation_end: (getCellValue('B8', 4, 'Do MMMM YYYY')),
  legal_advice: getCellValue('B9', 4),
  date_married: getCellValue('B10', 4, 'Do MMMM YYYY'),
  date_cohabited: getCellValue('B11', 4, 'MMMM YYYY'),
  date_separated: getCellValue('B12', 4, 'MMMM YYYY'),
  cohabiting: getCellValue('B14', 4),
  child_info: parseChildren(),
  court_orders: getCellValue('B15', 4),
  court_order_info: getCellValue('B16', 4),
  case_finance: {
    family_home_total: Math.round(getCellValue('I19', 0)),
    family_home_address: getCellValue('D6', 4),
    child_support_amount: getCellValue('D7', 4),
    child_support_recipient: getCellValue('D8', 4),
    spousal_support_amount: getCellValue('D9', 4),
    spousal_support_recipient: getCellValue('D10', 4)
  }
},
    partner_a: {
          title: getCellValue('B22', 4),
          first_name: getCellValue('B23', 4),
          last_name: getCellValue('B24', 4),
          dob: getCellValue('B25', 4, 'do MMMM YYYY'),
          age: getCellValue('B25', 4, 'age'),
          occupation: getCellValue('B26', 4),
          new_partner: getCellValue('B27', 4),
          new_partner_cohabiting: getCellValue('B28', 4),
          new_partner_remarried: getCellValue('B29', 4),
          new_partner_remarriage_intended: getCellValue('B30', 4),
          good_health: getCellValue('B31', 4),
          ill_health_description: getCellValue('B32', 4),
                      address: getCellValue('B34', 4),
          personal_finance: {
            monthly_outgoings: getCellValue('F47', 1),
            net_monthly_income: getCellValue('G34', 1),
            family_home: Math.round(getCellValue('K130', 0)),
            other_property: Math.round(getCellValue('K131', 0)),
            personal_assets: Math.round(getCellValue('K132', 0)),
            liabilities: Math.round(getCellValue('K133', 0)),
            business_assets: Math.round(getCellValue('K134', 0)),
            other_assets: Math.round(getCellValue('K135', 0)),
            total_net: Math.round(getCellValue('K137', 0)),
            total_gross: Math.round(getCellValue('K136', 0)),
            split: getCellValue('J137', 0),
            pensions: {
            total: Math.round(getCellValue('K138', 0)),
            split: getCellValue('J138', 0),
            net_monthly_income: getCellValue('F34', 0)
            }
          }
    },
    partner_b: {
          title: getCellValue('E22', 4),
          first_name: getCellValue('E23', 4),
          last_name: getCellValue('E24', 4),
          dob: getCellValue('E25', 4, 'do MMMM YYYY'),
          age: getCellValue('E25', 4, 'age'),
          occupation: getCellValue('E26', 4),
          new_partner: getCellValue('E27', 4),
          new_partner_cohabiting: getCellValue('E28', 4),
          new_partner_remarried: getCellValue('E29', 4),
          new_partner_remarriage_intended: getCellValue('E30', 4),
          good_health: getCellValue('E31', 4),
          ill_health_description: getCellValue('E32', 4),
          address: getCellValue('E34', 4),
          personal_finance: {
            family_home: Math.round(getCellValue('M130', 0)),
            other_property: Math.round(getCellValue('M131', 0)),
            personal_assets: Math.round(getCellValue('M132', 0)),
            liabilities: Math.round(getCellValue('M133', 0)),
            business_assets: Math.round(getCellValue('M134', 0)),
            other_assets: Math.round(getCellValue('M135', 0)),
            total_net: Math.round(getCellValue('M137', 0)),
            total_gross: Math.round(getCellValue('M136', 0)),
            split: getCellValue('L137', 0),
            net_monthly_income: getCellValue('F34', 1),
            pensions: {
              total: Math.round(getCellValue('M138', 0)),
              split: getCellValue('L138', 0)
            }
          }
    }
  }

  function parseChildren(){
        let child_info = [
          {
            name: getCellValue('B37', 4),
            dob: getCellValue('B40', 4, 'Do MMMM YYYY'),
            age: getCellValue('B40', 4, 'age'),
            gender: getCellValue('B46', 4, 'age')
          },
          {
            name: getCellValue('B49', 4),
            dob: getCellValue('B52', 4, 'Do MMMM YYYY'),
            age: getCellValue('B52', 4, 'age'),
            gender: getCellValue('B58', 4, 'age')
          },
          {
            name: getCellValue('B61', 4),
            dob: getCellValue('B64', 4, 'Do MMMM YYYY'),
            age: getCellValue('B64', 4, 'age'),
            gender: getCellValue('B70', 4, 'age')
          },
          {
            name: getCellValue('B73', 4),
            dob: getCellValue('B76', 4, 'Do MMMM YYYY'),
            age: getCellValue('B76', 4, 'age'),
            gender: getCellValue('B82', 4, 'age')
          },
          {
          name: getCellValue('B85', 4),
          dob: getCellValue('B88', 4, 'Do MMMM YYYY'),
          age: getCellValue('B88', 4, 'age'),
          gender: getCellValue('B94', 4, 'age')
        },
          {
          name: getCellValue('B97', 4),
          dob: getCellValue('B100', 4, 'Do MMMM YYYY'),
          age: getCellValue('B100', 4, 'age'),
          gender: getCellValue('B106', 4, 'age')
        },
          {
          name: getCellValue('B109', 4),
          dob: getCellValue('B112', 4, 'Do MMMM YYYY'),
          age: getCellValue('B112', 4, 'age'),
          gender: getCellValue('B118', 4, 'age')
        }
      ];
      for (let i=child_info.length-1;i>=0;i--){
        if ((child_info[i].name == undefined) || (child_info[i].dob == undefined)){
          child_info.splice(i, 1);
        }
      }
    return child_info;
  }

  //pass in the cell coordinates, sheet number, and format (when it is a date) and return the cell value.
  function getCellValue(cellAddress, sheetNumber, dateFormat){
    let output_value;
    const worksheet = workbook.Sheets[workbook.SheetNames[sheetNumber]];
    const desired_cell = worksheet[cellAddress];
    let desired_value = (desired_cell ? desired_cell.v : undefined);

    //if cell format is a date ('d' passed through as an argument) and a check whether it is a number, then take the excel date format, and parse it into a moment date.
    if (dateFormat && (typeof desired_value == 'number')){
      output_value = dT.parseDate(desired_value, dateFormat);
    }
    if (desired_value == undefined){
      output_value = undefined;
    }
    if (_.isString(desired_value)){
      output_value = dT.capitalise(desired_value);
    }
    if (_.isNumber(desired_value) && (!dateFormat)){
      output_value = _.round((desired_value), 2);
    }
    if (_.isBoolean(desired_value)){
      output_value = desired_value;
    }
    return output_value;
  }

return MoUInput;
}
