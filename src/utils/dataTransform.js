import moment from 'moment';
import XLSX from 'xlsx';

//this takes the title from the database and assigns a gender for the paragraph generation
function titleGenderConversion(title, type){
  if ((title = 'Mr') && (type != 'posses')){
    return 'he'
  }
  if ((title = 'Mrs') && (type != 'posses')){
    return 'she'
  }
  if ((title = 'Ms') && (type != 'posses')){
    return 'she'
  }
  if ((title = 'Mr') && (type = 'posses')){
    return 'his'
  }
  if ((title = 'Mrs') && (type = 'posses')){
    return 'her'
  }
  if ((title = 'Ms') && (type = 'posses')){
    return 'her'
  }
}

//take all of these 'helper' functions into a separate JS file - including the date parser etc - will tidy every thing up
function capitalise(string){
return string.charAt(0).toUpperCase() + string.slice(1);
};

//take date from excel code to XLSX parsed, to moment formatted
function parseExcelDate(unParsedDate, dateFormat){
    return moment(XLSX.SSF.parse_date_code(unParsedDate));
};

function fileName(data){
  if (data.last_name_a == data.last_name_b){
  return `${data.case_number} ${data.last_name_b} MOU.docx`
} else {
  return `${data.case_number} ${data.last_name_a} ${data.last_name_b} MOU.docx`
}
}

function footerInfo(data){
  if (data.last_name_a == data.last_name_b){
  return `${data.case_number} ${data.last_name_b} / Abingdon Family Mediation`;
} else {
  return `${data.case_number} ${data.last_name_a} ${data.last_name_b} / Abingdon Family Mediation`;
}
}

//take moment format and
function ddmmyy(momentDate){
  return moment(momentDate).format('Do MMMM YYYY');
};

function mmyy(momentDate){
  return moment(momentDate).format('MMMM YYYY');
};

function ageFromDoB(dateString){
  return moment().diff(dateString, 'years');
};

export default {
  fileName,
  footerInfo,
  ddmmyy,
  mmyy,
  titleGenderConversion,
  capitalise,
  parseExcelDate,
  ageFromDoB
}
