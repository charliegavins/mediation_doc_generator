import XLSX from 'xlsx';
import path from 'path';
import moment from 'moment';
import dT from './dataTransform';
import ntow from 'number-to-words';
import _ from 'lodash';



function xlsParse(fileBinary){
  const workbook = XLSX.read(fileBinary, {type: 'binary'});
  const first_sheet_name = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[first_sheet_name];
  const parsedData = {
    doc:{
        footer_date: (getCellValue('D5', 7, 'DD-MM-YY')),
    },
    mediator:{
      first_name: getCellValue('B3', 7),
      last_name: getCellValue('B4', 7),
      practice: getCellValue('B2', 7),
    },
case: {
  case_number: getCellValue('D2', 7),
  number_of_sessions: dT.capitalise(ntow.toWords(getCellValue('D3', 7))),
  date_of_mediation_start: (getCellValue('D4', 7, 'Do MMMM YYYY')),
  date_of_mediation_end: (getCellValue('D5', 7, 'Do MMMM YYYY')),
  legal_advice: getCellValue('D6', 7),
  date_married: getCellValue('D7', 7, 'Do MMMM YYYY'),
  date_cohabited: getCellValue('D8', 7, 'MMMM YYYY'),
  date_separated: getCellValue('D9', 7, 'MMMM YYYY'),
  cohabiting: getCellValue('D10', 7),
  court_orders: getCellValue('D11', 7),
  court_order_info: getCellValue('D12', 7),
  commenced_divorce: getCellValue('D13', 7),
  court_fees_responsibility: getCellValue('D14', 7),
  family_home_address_line_1: getCellValue('H5', 7),
  family_home_address_line_2: getCellValue('H6', 7),
  family_home_address_line_3: getCellValue('H7', 7),
  family_home_address_postcode: getCellValue('H8', 7),
  outstanding_mortgage: getCellValue('H4', 7),
  child_info: parseChildren(),
  case_finance: {
    family_home_total: Math.round(getCellValue('F2', 7)),
    child_support_amount: getCellValue('F3', 7),
    child_support_recipient: getCellValue('F4', 7),
    spousal_support_amount: getCellValue('F5', 7),
    spousal_support_recipient: getCellValue('F6', 7),
    partner_a: {
      family_home: Math.round(getCellValue('F13', 7)),
      other_property: Math.round(getCellValue('F14', 7)),
      personal_assets: Math.round(getCellValue('F15', 7)),
      liabilities: Math.round(getCellValue('F16', 7)),
      business_assets: Math.round(getCellValue('F17', 7)),
      other_assets: Math.round(getCellValue('F18', 7)),
      total_net: Math.round(getCellValue('F19', 7)),
      total_gross: Math.round(getCellValue('F20', 7)),
      total_split: getCellValue('F21', 7),
      pensions: {
      total: Math.round(getCellValue('F23', 7)),
      split: getCellValue('F24', 7)
    }
  },
    partner_b: {
      family_home: Math.round(getCellValue('F28', 7)),
      other_property: Math.round(getCellValue('F29', 7)),
      personal_assets: Math.round(getCellValue('F30', 7)),
      liabilities: Math.round(getCellValue('F31', 7)),
      business_assets: Math.round(getCellValue('F32', 7)),
      other_assets: Math.round(getCellValue('F33', 7)),
      total_net: Math.round(getCellValue('F34', 7)),
      total_gross: Math.round(getCellValue('F35', 7)),
      total_split: getCellValue('F36', 7),
      pensions: {
        total: Math.round(getCellValue('F38', 7)),
        split: getCellValue('F39', 7)
      }
    }
    }
  },
    partner_a: {
          title: getCellValue('J2', 7),
          first_name: getCellValue('J3', 7),
          last_name: getCellValue('J4', 7),
          dob: getCellValue('J5', 7, 'Do MMMM YYYY'),
          age: getCellValue('J5', 7, 'age'),
          occupation: getCellValue('J6', 7),
          new_partner: getCellValue('J7', 7),
          new_partner_cohabiting: getCellValue('J8', 7),
          new_partner_remarried: getCellValue('J9', 7),
          new_partner_remarriage_intended: getCellValue('J10', 7),
          good_health: getCellValue('J11', 7),
          ill_health_description: getCellValue('J12', 7),
          address: getCellValue('J13', 7),
          personal_finance: {
            income: {
              employment_income_net: getCellValue('J26', 7),
              self_employment_income_net: getCellValue('J27', 7),
              income_investments_rental: getCellValue('J28', 7),
              state_benefits: getCellValue('J29', 7),
              other_income: getCellValue('J30', 7),
              total_income: getCellValue('J31', 7)
            },
            expenditure: {
              accomodation: getCellValue('J33', 7),
              utilities: getCellValue('J34', 7),
              financial_commitments: getCellValue('J35', 7),
              transport: getCellValue('J36', 7),
              household_expenses: getCellValue('J37', 7),
              personal_expenses: getCellValue('J38', 7),
              recreation: getCellValue('J39', 7),
              children: getCellValue('J50', 7)
            },
            shortfall_surplus: getCellValue('J43', 7),
            monthly_outgoings: getCellValue('J44', 7),
            net_monthly_income: getCellValue('J45', 7),
            pension: getCellValue('J46', 7)
          }
    },
    partner_b: {
          title: getCellValue('L2', 7),
          first_name: getCellValue('L3', 7),
          last_name: getCellValue('L4', 7),
          dob: getCellValue('L5', 7, 'Do MMMM YYYY'),
          age: getCellValue('L5', 7, 'age'),
          occupation: getCellValue('L6', 7),
          new_partner: getCellValue('L7', 7),
          new_partner_cohabiting: getCellValue('L8', 7),
          new_partner_remarried: getCellValue('L9', 7),
          new_partner_remarriage_intended: getCellValue('L10', 7),
          good_health: getCellValue('L11', 7),
          ill_health_description: getCellValue('L12', 7),
          address: getCellValue('L13', 7),
          personal_finance: {
            income: {
              employment_income_net: getCellValue('L26', 7),
              self_employment_income_net: getCellValue('L27', 7),
              income_investments_rental: getCellValue('L28', 7),
              state_benefits: getCellValue('L29', 7),
              other_income: getCellValue('L30', 7),
              total_income: getCellValue('L31', 7)
            },
            expenditure: {
              accomodation: getCellValue('L33', 7),
              utilities: getCellValue('L34', 7),
              financial_commitments: getCellValue('L35', 7),
              transport: getCellValue('L36', 7),
              household_expenses: getCellValue('L37', 7),
              personal_expenses: getCellValue('L38', 7),
              recreation: getCellValue('L39', 7),
              children: getCellValue('L50', 7)
            },
            shortfall_surplus: getCellValue('L43', 7),
            monthly_outgoings: getCellValue('L44', 7),
            net_monthly_income: getCellValue('L45', 7),
            pension: getCellValue('L46', 7)
          }
    }
  }

  function parseChildren(){
        let child_info = [
          {
            name: getCellValue('P2', 7),
            dob: getCellValue('P5', 7, 'Do MMMM YYYY'),
            age: getCellValue('P5', 7, 'age'),
            gender: getCellValue('P11', 7, 'age')
          },
          {
            name: getCellValue('R2', 7),
            dob: getCellValue('R5', 7, 'Do MMMM YYYY'),
            age: getCellValue('R5', 7, 'age'),
            gender: getCellValue('R11', 7, 'age')
          },
          {
            name: getCellValue('T2', 7),
            dob: getCellValue('T5', 7, 'Do MMMM YYYY'),
            age: getCellValue('T5', 7, 'age'),
            gender: getCellValue('T11', 7, 'age')
          },
          {
            name: getCellValue('V2', 7),
            dob: getCellValue('V5', 7, 'Do MMMM YYYY'),
            age: getCellValue('V5', 7, 'age'),
            gender: getCellValue('V11', 7, 'age')
          },
          {
            name: getCellValue('X2', 7),
            dob: getCellValue('X5', 7, 'Do MMMM YYYY'),
            age: getCellValue('X5', 7, 'age'),
            gender: getCellValue('X11', 7, 'age')
          },
          {
            name: getCellValue('Z2', 7),
            dob: getCellValue('Z5', 7, 'Do MMMM YYYY'),
            age: getCellValue('Z5', 7, 'age'),
            gender: getCellValue('Z11', 7, 'age')
          },
          {
            name: getCellValue('AB2', 7),
            dob: getCellValue('AB5', 7, 'Do MMMM YYYY'),
            age: getCellValue('AB5', 7, 'age'),
            gender: getCellValue('AB11', 7, 'age')
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
    desired_value = formatRawCellValues(desired_value, dateFormat);
    return desired_value;
  }

  //format inputs.
  //  - if date: format into requested dateFormat (including age)
  //  - if string: capitalise
  function formatRawCellValues(desired_value, dateFormat){
  let output_value;
    if (_.isNumber(desired_value)){
      if (dateFormat){
        if (desired_value != 0) {
          output_value = dT.parseDate(desired_value, dateFormat);
        }
      } else {
        output_value = _.round((desired_value), 2);
      }
    } else if (desired_value == 'partner_a' || desired_value == 'partner_b') {
      output_value = desired_value;
    } else if (_.isString(desired_value)){
      output_value = dT.capitalise(desired_value);
    } else if (_.isBoolean(desired_value)){
      output_value = desired_value;
    }
    return output_value;
  }
  return parsedData;
};


export default {
  xlsParse
}
