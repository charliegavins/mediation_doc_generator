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
        footer_date: (getCellValue('D5', 6, 'DD-MM-YY')),
    },
    mediator:{
      mediator_first_name: getCellValue('B2', 6),
      mediator_last_name: getCellValue('B3', 6),
      mediator_practice: getCellValue('B4', 6),
    },
case: {
  case_number: getCellValue('D2', 6),
  number_of_sessions: dT.capitalise(ntow.toWords(getCellValue('D3', 6))),
  date_of_mediation_start: (getCellValue('D4', 6, 'Do MMMM YYYY')),
  date_of_mediation_end: (getCellValue('D5', 6, 'Do MMMM YYYY')),
  legal_advice: getCellValue('D6', 6),
  date_married: getCellValue('D7', 6, 'Do MMMM YYYY'),
  date_cohabited: getCellValue('D8', 6, 'MMMM YYYY'),
  date_separated: getCellValue('D9', 6, 'MMMM YYYY'),
  cohabiting: getCellValue('D10', 6),
  court_orders: getCellValue('D11', 6),
  court_order_info: getCellValue('D12', 6),
  commenced_divorce: getCellValue('D13', 6),
  court_fees_split: getCellValue('D14', 6),
  family_home_address: getCellValue('F2', 6),
  child_info: parseChildren(),
  case_finance: {
    family_home_total: Math.round(getCellValue('F2', 0)),
    child_support_amount: getCellValue('F3', 6),
    child_support_recipient: getCellValue('F4', 6),
    spousal_support_amount: getCellValue('F5', 6),
    spousal_support_recipient: getCellValue('F6', 6),
    partner_a: {
      family_home: Math.round(getCellValue('F13', 0)),
      other_property: Math.round(getCellValue('F14', 0)),
      personal_assets: Math.round(getCellValue('F15', 0)),
      liabilities: Math.round(getCellValue('F16', 0)),
      business_assets: Math.round(getCellValue('F17', 0)),
      other_assets: Math.round(getCellValue('F18', 0)),
      total_net: Math.round(getCellValue('F19', 0)),
      total_gross: Math.round(getCellValue('F20', 0)),
      total_split: getCellValue('F21', 0),
      pensions: {
      total: Math.round(getCellValue('F23', 0)),
      split: getCellValue('F24', 0)
    }
  },
    partner_b: {
      family_home: Math.round(getCellValue('F28', 0)),
      other_property: Math.round(getCellValue('F29', 0)),
      personal_assets: Math.round(getCellValue('F30', 0)),
      liabilities: Math.round(getCellValue('F31', 0)),
      business_assets: Math.round(getCellValue('F32', 0)),
      other_assets: Math.round(getCellValue('F33', 0)),
      total_net: Math.round(getCellValue('F34', 0)),
      total_gross: Math.round(getCellValue('F35', 0)),
      split: getCellValue('F36', 0),
      pensions: {
        total: Math.round(getCellValue('F37', 0)),
        split: getCellValue('F38', 0)
      }
    }
    }
  },
    partner_a: {
          title: getCellValue('J2', 4),
          first_name: getCellValue('J3', 4),
          last_name: getCellValue('J4', 4),
          dob: getCellValue('J5', 4, 'do MMMM YYYY'),
          age: getCellValue('J5', 4, 'age'),
          occupation: getCellValue('J6', 4),
          new_partner: getCellValue('J7', 4),
          new_partner_cohabiting: getCellValue('J8', 4),
          new_partner_remarried: getCellValue('J9', 4),
          new_partner_remarriage_intended: getCellValue('J10', 4),
          good_health: getCellValue('J11', 4),
          ill_health_description: getCellValue('J12', 4),
                      address: getCellValue('J13', 4),
          personal_finance: {
            income: {
              employment_income_net: getCellValue('J26', 1),
              self_employment_income_net: getCellValue('J27', 1),
              income_investments_rental: getCellValue('J28', 1),
              state_benefits: getCellValue('J29', 1),
              other_income: getCellValue('J30', 1)
            },
            expenditure: {
              accomodation: getCellValue('J32', 1),
              utilities: getCellValue('J33', 1),
              financial_commitments: getCellValue('J34', 1),
              transport: getCellValue('J35', 1),
              household_expenses: getCellValue('J36', 1),
              personal_expenses: getCellValue('J37', 1),
              recreation: getCellValue('J38', 1),
              children: getCellValue('J39', 1)
            },
            shortfall_surplus: getCellValue('J42', 1)
            monthly_outgoings: getCellValue('J43', 3),
            net_monthly_income: getCellValue('J44', 1),
            pension: getCellValue('J45', 0)
          }
    },
    partner_b: {
          title: getCellValue('L2', 4),
          first_name: getCellValue('L3', 4),
          last_name: getCellValue('L4', 4),
          dob: getCellValue('L5', 4, 'do MMMM YYYY'),
          age: getCellValue('L5', 4, 'age'),
          occupation: getCellValue('L6', 4),
          new_partner: getCellValue('L7', 4),
          new_partner_cohabiting: getCellValue('L8', 4),
          new_partner_remarried: getCellValue('L9', 4),
          new_partner_remarriage_intended: getCellValue('L10', 4),
          good_health: getCellValue('L11', 4),
          ill_health_description: getCellValue('L12', 4),
          address: getCellValue('L13', 4),
          personal_finance: {
            income: {
              employment_income_net: getCellValue('L26', 1),
              self_employment_income_net: getCellValue('L27', 1),
              income_investments_rental: getCellValue('L28', 1),
              state_benefits: getCellValue('L29', 1),
              other_income: getCellValue('L30', 1)
            },
            expenditure: {
              accomodation: getCellValue('L32', 1),
              utilities: getCellValue('L33', 1),
              financial_commitments: getCellValue('J34', 1),
              transport: getCellValue('L35', 1),
              household_expenses: getCellValue('L36', 1),
              personal_expenses: getCellValue('L37', 1),
              recreation: getCellValue('L38', 1),
              children: getCellValue('L39', 1)
            },
            shortfall_surplus: getCellValue('L42', 1)
            monthly_outgoings: getCellValue('G34', 3),
            net_monthly_income: getCellValue('G34', 1),
            pension: getCellValue('H99', 0)
          }
    }
  }

  function parseChildren(){
        let child_info = [
          {
            name: getCellValue('P2', 4),
            dob: getCellValue('P5', 4, 'Do MMMM YYYY'),
            age: getCellValue('P5', 4, 'age'),
            gender: getCellValue('P11', 4, 'age')
          },
          {
            name: getCellValue('R2', 4),
            dob: getCellValue('R5', 4, 'Do MMMM YYYY'),
            age: getCellValue('R5', 4, 'age'),
            gender: getCellValue('R11', 4, 'age')
          },
          {
            name: getCellValue('T2', 4),
            dob: getCellValue('T5', 4, 'Do MMMM YYYY'),
            age: getCellValue('T5', 4, 'age'),
            gender: getCellValue('T11', 4, 'age')
          },
          {
            name: getCellValue('V2', 4),
            dob: getCellValue('V5', 4, 'Do MMMM YYYY'),
            age: getCellValue('V5', 4, 'age'),
            gender: getCellValue('V11', 4, 'age')
          },
          {
            name: getCellValue('X2', 4),
            dob: getCellValue('X5', 4, 'Do MMMM YYYY'),
            age: getCellValue('X5', 4, 'age'),
            gender: getCellValue('X11', 4, 'age')
          },
          {
            name: getCellValue('Z2', 4),
            dob: getCellValue('Z5', 4, 'Do MMMM YYYY'),
            age: getCellValue('Z5', 4, 'age'),
            gender: getCellValue('Z11', 4, 'age')
          },
          {
            name: getCellValue('AB2', 4),
            dob: getCellValue('AB5', 4, 'Do MMMM YYYY'),
            age: getCellValue('AB5', 4, 'age'),
            gender: getCellValue('AB11', 4, 'age')
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
    if ((desired_value == 'partner_a') || (desired_value == 'partner_b')){
      output_value = desired_value;
    }
    if (_.isString(desired_value) && (desired_value != 'partner_a')&&(desired_value != 'partner_b')){
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
