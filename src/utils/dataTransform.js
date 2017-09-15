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
  return `case:${data.case_number} ${data.last_name_b}`;
} else {
  return `${data.case_number} ${data.last_name_a} ${data.last_name_b}`;
}
}

function childCheck(data){
  console.log('childCheck');
  console.log(data.child_1_dob);
  console.log(data.child_1_name);
  if ((data.child_1_name=='X') && (data.child_1_dob=='X')){
    console.log('no children');
  }
  // child_1_name: getCellValue('B37', 4),
  // child_1_dob: getCellValue('B40', 4),
  // child_2_name: getCellValue('B49', 4),
  // child_2_dob: getCellValue('B52', 4),
  // child_3_name: getCellValue('B61', 4),
  // child_3_dob: getCellValue('B64', 4),
  // child_4_name: getCellValue('B73', 4),
  // child_4_dob: getCellValue('B76', 4),
  // child_5_name: getCellValue('B85', 4),
  // child_5_dob: getCellValue('B88', 4),
  // child_6_name: getCellValue('B97', 4),
  // child_6_dob: getCellValue('B100', 4),
  // child_7_name: getCellValue('B109', 4),
  // child_7_dob: getCellValue('B112', 4)
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
  ageFromDoB,
  childCheck
}
