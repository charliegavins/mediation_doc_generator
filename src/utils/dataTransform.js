import moment from 'moment';
import XLSX from 'xlsx';
import _ from 'lodash';
import { data } from "../actions/index";

//concat case truncated address for MOU
function concatAddress(Case){
  let address = `${Case.family_home_address_line_1} ${Case.family_home_address_postcode}`;
  return address;
}

//this takes the title from the database and assigns a gender for the paragraph generation
function toPronoun(input, type){
  let possess = {
    'MALE' : 'his',
    'FEMALE' : 'her',
    'Mr': 'his',
    'Mrs': 'her',
    'Ms': 'her'
  }
  let pronoun = {
    'MALE' : 'he',
    'FEMALE' : 'she',
    'Mr': 'he',
    'Mrs': 'she',
    'Ms': 'she'
  }
  if(type == 'posses'){
    return possess[input];
  } else {
    return pronoun[input];
  }
}

//Capitalise word (for beginning of sentence (Once) or name (Lucy) for example)
function capitalise(string){
return string.charAt(0).toUpperCase() + string.slice(1);
};

//excel date code --> XLSX object --> moment object --> requested date format
function parseDate(dateCode, requiredDateFormat){
  let semiParsedDate = XLSX.SSF.parse_date_code(dateCode);
  let semiParsedDateString = `${semiParsedDate['d']}-${semiParsedDate['m']}-${semiParsedDate['y']}`
  let parsedDate = moment(semiParsedDateString, 'D-M-YYYY');
  if (requiredDateFormat == 'age'){
    return moment().diff(parsedDate, 'years');
  } else {
    return moment(parsedDate).format(requiredDateFormat);
  }
}

//determines file name for generated document
function fileName(){
  if (data.partner_a.last_name == data.partner_b.last_name){
  return `${data.case.case_number} ${data.partner_a.last_name} MOU.docx`
} else {
  return `${data.case.case_number} ${data.partner_a.last_name} ${data.partner_b.last_name} MOU.docx`
}
}

//determines footer for generated document
function footerInfo(){
  if (data.partner_a.last_name == data.partner_b.last_name){
  return `case:${data.case.case_number} ${data.partner_a.last_name}`;
} else {
  return `${data.case.case_number} ${data.partner_a.last_name} ${data.partner_b.last_name}`;
}
};

function doMMMMYYYY(momentDate){
  return moment(momentDate).format('Do MMMM YYYY');
};

function mmyy(momentDate){
  return moment(momentDate).format('MMMM YYYY');
};

function ageFromDoB(dateString){
  return moment().diff(dateString, 'years');
};

function numberWithCommas(number) {
  if (typeof number == 'number'){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return '';
  }
};

function payeeGender(partner, boolean){
  let partnerSelect;
  if (partner == 'partner_a'){
    if (boolean) {
      partnerSelect = data.partner_a;
    } else {
      partnerSelect = data.partner_b;
    }
  } else if (partner == 'partner_b'){
    if (boolean) {
      partnerSelect = data.partner_b;
    } else {
      partnerSelect = data.partner_a;
    }
  }
  let pronoun = toPronoun(partnerSelect.title);
  return pronoun;
};

// function supportCalc(io, rp){
//   let figure;
//   if ((io == 'i')&&(rp == 'r')){
//     let recipient = data.case.case_finance.child_support_recipient;
//     figure = data[`${recipient}`].personal_finance.net_monthly_income;
//     return numberWithCommas(figure);
//   }
//   if ((io == 'o')&&(rp == 'r')){
//     let recipient = data.case.case_finance.child_support_recipient;
//     figure = data[`${recipient}`].personal_finance.monthly_outgoings;
//     return numberWithCommas(figure);
//   }
//   if ((io == 'i')&&(rp == 'p')){
//     let recipient = data.case.case_finance.child_support_recipient;
//     if (recipient == 'partner_a'){
//       figure = data.partner_b.personal_finance.net_monthly_income;
//     } else if (recipient == 'partner_b') {
//       figure = data.partner_a.personal_finance.net_monthly_income;
//     }
//     return numberWithCommas(figure);
//   }
//   if ((io == 'o')&&(rp == 'p')){
//     let recipient = data.case.case_finance.child_support_recipient;
//     if (recipient == 'partner_a'){
//       figure = data.partner_b.personal_finance.monthly_outgoings;
//     } else if (recipient == 'partner_b') {
//       figure = data.partner_a.personal_finance.monthly_outgoings;
//     }
//     return numberWithCommas(figure);
//   }
// };

//takes the argument 'partner_a' or 'partner_b', alongside the data, and a boolean. If the boolean is false, then function returns the opposite partner. i.e. arg= 'partner_a' whos name = Penny, returns partner_b's name, Andrew
function partnerName(partner, boolean){
  if ((partner == 'partner_a')&&(boolean == false)){
    name = data.partner_b.first_name;
    return name;
  }
  if ((partner == 'partner_b')&&(boolean == false)){
    name = data.partner_a.first_name;
    return name;
  }
  if ((partner == 'partner_a')&&(boolean == true)){
    name = data.partner_a.first_name;
    return name;
  }
  if ((partner == 'partner_b')&&(boolean == true)){
    name = data.partner_b.first_name;
    return name;
  }
};

function childSupport(recipient, amount, column){
  if (recipient == column){
    return amount;
  } else {
    return 0;
  }
};
function spousalSupport(recipient, amount, column){
  if (recipient == column){
    return amount;
  } else {
    return 0;
  }
};

export default {
  fileName,
  footerInfo,
  toPronoun,
  capitalise,
  parseDate,
  ageFromDoB,
  numberWithCommas,
  partnerName,
  payeeGender,
  childSupport,
  spousalSupport,
  concatAddress
}
