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
function parseDate(unParsedDate, dateFormat){
  let parsedDate = moment(XLSX.SSF.parse_date_code(unParsedDate));
  if (dateFormat == 'age'){
    let age = ageParse(parsedDate);
    return age;
  } else {
    let date = moment(parsedDate._d).format(dateFormat);
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
  console.log(dateString);
  return moment().diff(dateString, 'years');
};

export default {
  fileName,
  footerInfo,
  titleGenderConversion,
  capitalise,
  parseDate,
  ageFromDoB,
  childCheck
}
