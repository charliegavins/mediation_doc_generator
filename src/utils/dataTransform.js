import moment from 'moment';
import XLSX from 'xlsx';
import _ from 'lodash';

//this takes the title from the database and assigns a gender for the paragraph generation
function toPronoun(input, type){
  if ((input == 'MALE') && (type != 'posses')){
    return 'he'
  }
  if ((input == 'FEMALE') && (type != 'posses')){
    return 'she'
  }
  if ((input == 'MALE') && (type == 'posses')){
    return 'his'
  }
  if ((input == 'FEMALE') && (type == 'posses')){
    return 'her'
  }
  if ((input == 'Mr') && (type != 'posses')){
    return 'he'
  }
  if ((input == 'Mrs') && (type != 'posses')){
    return 'she'
  }
  if ((input == 'Ms') && (type != 'posses')){
    return 'she'
  }
  if ((input == 'Mr') && (type == 'posses')){
    return 'his'
  }
  if ((input == 'Mrs') && (type == 'posses')){
    return 'her'
  }
  if ((input == 'Ms') && (type == 'posses')){
    return 'her'
  }
}

function addZero(number){
    return ("0" + number).slice(-2);
};

//take all of these 'helper' functions into a separate JS file - including the date parser etc - will tidy every thing up
function capitalise(string){
return string.charAt(0).toUpperCase() + string.slice(1);
};

//take date from excel code to XLSX parsed, to moment formatted
function parseDate(unParsedDate, dateFormat){
//take excel code and format it to object e.g. { d:25, m:12, y:2017 }
  let semiParsedDate = XLSX.SSF.parse_date_code(unParsedDate);
//take the object and convert into a string so moment can comprehend e.g. '25-12-2017', ensuring that single digits have a leading zero
  let semiParsedDateString = `${addZero(semiParsedDate['d'])}-${addZero(semiParsedDate['m'])}-${semiParsedDate['y']}`
//parse date to create a moment object, passing in the format as an argument to 'help' moment calculate
  let parsedDate = moment(semiParsedDateString, 'DD-MM-YYYY');
  if (dateFormat == 'age'){
    let age = ageParse(parsedDate);
    return age;
  } else {
    let date = moment(parsedDate).format(dateFormat);
    return date;
  }
};

function ageParse(date){
  //if person is days old, 'return X days old'
  //if person is months old, 'return X months old'
  //if person is one month old, 'eturn X month old'
  //if person is 2+ months old, 'return X months old'
  //if person is 1 year old 'return X year old'
  //if person is 2+ years old 'return X years old'
  let ageInYears = moment().diff(date, 'years');
  if (ageInYears>=2){
    return `${ageInYears} years of age`
  } else if (ageInYears==1) {
    return `${ageInYears} year of age`
  }else if (ageInYears<1) {
    let ageInMonths = moment().diff(date, 'months');
    if (ageInMonths=1){
      return `${ageInMonths} month old`
    }else if (ageInMonths>1){
      return `${ageInMonths} months old`
    } else if (ageInMonths<=1){
      let ageInDays = moment().diff(date, 'days');
      return `${ageInDays} days old`
    }
  }
}

function fileName(data){
  if (data.partner_a.last_name == data.partner_b.last_name){
  return `${data.case.case_number} ${data.partner_a.last_name} MOU.docx`
} else {
  return `${data.case.case_number} ${data.partner_a.last_name} ${data.partner_b.last_name} MOU.docx`
}
}

function footerInfo(data){
  if (data.partner_a.last_name == data.partner_b.last_name){
  return `case:${data.case.case_number} ${data.partner_a.last_name}`;
} else {
  return `${data.case.case_number} ${data.partner_a.last_name} ${data.partner_b.last_name}`;
}
};


function childCheck(data){
  const X = 'X';
    if (data.child_7_name != X){
          return 7;
    }
    if (data.child_6_name != X){
          return 6;
    }
    if (data.child_5_name != X){
          return 5;
    }
    if (data.child_4_name != X){
          return 4;
    }
    if (data.child_3_name != X){
          return 3;
    }
    if (data.child_2_name != X){
          return 2;
    }
    if (data.child_1_name != X){
          return 1;
    }
    if (data.child_1_name == X){
          return 0;
    }
};

//take moment format and
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
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function payeeGender(partner, data){
  let partnerSelect;
  if (partner == 'partner_a'){
    partnerSelect = data.partner_b;
  }
  if (partner == 'partner_b'){
    partnerSelect = data.partner_a;
  }
  let pronoun = toPronoun(partnerSelect.title);
  return pronoun;
};

function supportCalc(data, io, rp){
  let figure;
  if ((io == 'i')&&(rp == 'r')){
    let recipient = data.case.case_finance.child_support_recipient;
    figure = data[`${recipient}`].personal_finance.net_monthly_income;
    return numberWithCommas(figure);
  }
  if ((io == 'o')&&(rp == 'r')){
    let recipient = data.case.case_finance.child_support_recipient;
    figure = data[`${recipient}`].personal_finance.monthly_outgoings;
    console.log(figure);
    return numberWithCommas(figure);
  }
  if ((io == 'i')&&(rp == 'p')){
    let recipient = data.case.case_finance.child_support_recipient;
    if (recipient == 'partner_a'){
      figure = data.partner_b.personal_finance.net_monthly_income;
    } else if (recipient == 'partner_b') {
      figure = data.partner_a.personal_finance.net_monthly_income;
    }
    return numberWithCommas(figure);
  }
  if ((io == 'o')&&(rp == 'p')){
    let recipient = data.case.case_finance.child_support_recipient;
    if (recipient == 'partner_a'){
      figure = data.partner_b.personal_finance.monthly_outgoings;
    } else if (recipient == 'partner_b') {
      figure = data.partner_a.personal_finance.monthly_outgoings;
    }
    return numberWithCommas(figure);
  }
};


function partnerName(partner, data, boolean){
  if ((partner == 'partner_a')&&(boolean == false)){
    name = data.partner_b.first_name;
    console.log(name);
    return name;
  }
  if ((partner == 'partner_b')&&(boolean == false)){
    name = data.partner_a.first_name;
        console.log(name);
    return name;
  }
  if (partner == 'partner_a'){
    name = data.partner_a.first_name;
    return name;
  }
  if (partner == 'partner_b'){
    name = data.partner_b.first_name;
        console.log(name);
    return name;
  }
};

export default {
  fileName,
  footerInfo,
  toPronoun,
  capitalise,
  parseDate,
  ageFromDoB,
  childCheck,
  numberWithCommas,
  partnerName,
  payeeGender,
  supportCalc
}
