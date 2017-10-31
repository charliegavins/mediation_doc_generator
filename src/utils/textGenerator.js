import ntow from 'number-to-words';
import dT from './dataTransform';
import { data } from "../actions/index";


function support(partner){
  let para = '';
  let csa = dT.numberWithCommas(data.case.case_finance.child_support_amount);
  let csr = data.case.case_finance.child_support_recipient;
  let ssa = dT.numberWithCommas(data.case.case_finance.spousal_support_amount);
  let ssr = data.case.case_finance.spousal_support_recipient;
  let pronoun = dT.payeeGender(partner, true);
  if ((ssr == partner)&&(csr == partner)){
    para = ``;
  }
  if ((ssr == partner)&&(csr != partner)){
    para = `after ${pronoun} has paid child support of £${csa}`
  }
  if ((ssr != partner)&&(csr == partner)){
    para = `after ${pronoun} has paid maintenance for ${dT.partnerName(ssr, true)} of £${ssa}`
  }
  if ((ssr != partner)&&(csr != partner)){
    para = `after ${pronoun} has paid child support of £${csa} and maintenance for ${dT.partnerName(ssr, true)} of £${ssa}`;
  }
  return para;
};

function pensions(partner){
  let partnerData = data[`${partner}`];
  let para = '';
  if (partnerData.personal_finance.pension){
    para = `${partnerData.first_name} has ………… pension with a total Cash Equivalent Transfer Value of £${partnerData.personal_finance.pension}.`
  } else {
    para = '';
  }
    return para;
};

function ageParse(ageInYears){
  //if person is days old, 'return X days old'
  //if person is months old, 'return X months old'
  //if person is one month old, 'return X month old'
  //if person is 2+ months old, 'return X months old'
  //if person is 1 year old 'return X year old'
  //if person is 2+ years old 'return X years old'
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

function favouredPartner(){
  let split = data.case.case_finance.partner_a.total_split;
  let partner_a = data.partner_a.first_name;
  let partner_b = data.partner_b.first_name;
  let paragraph = '';
  if (split < 0.5){
    paragraph = ` in favour of ${partner_b}`
    return ` in favour of ${partner_b}`
  } else if (split > 0.5) {
    paragraph = ` in favour of ${partner_a}`
    return ` in favour of ${partner_a}`
  } else if (split == 0.5){
    return paragraph;
  }
}

function livingArrangements(){
  if (data.case.cohabiting==true){
    if(data.partner_a.address){
      let paragraph = `During mediation we have been living separately in the marital home, ${data.partner_a.address}`;
      return paragraph;
    } else if (data.partner_b.address){
      let paragraph = `During mediation we have been living separately in the marital home, ${data.partner_b.address}`;
      return paragraph;
    }
  } else if (data.case.cohabiting==false){
    let paragraph = `During mediation ${data.partner_a.first_name} has been living at ${data.partner_a.address}, and ${data.partner_b.first_name} has been living at ${data.partner_b.address}.`;
    return paragraph;
  }
}

function children(child_info){
  let i = 0;
  let numberOfChildren = child_info.length;
  let paragraph = `We have ${ntow.toWords(numberOfChildren)} children. `;
  if (numberOfChildren == 0){
    paragraph = 'We have no children.';
  }
  //map through the array, generating a phrase per child. For the last child, change the grammar to replace the trailing comma of the previous component with an 'and' and add full stop at the end to complete the sentence.
  child_info.map(function(value, i){
    let name = child_info[i].name;
    let age = child_info[i].age;
    let dob = child_info[i].dob;
    let gender = dT.capitalise(dT.toPronoun(child_info[i].gender));
    if (numberOfChildren == 1){
      paragraph = `We have ${ntow.toWords(numberOfChildren)} child, ${name} who is ${age} (date of birth ${dob}). ${gender} is in good health and attends a local school.`;
      return paragraph;
    }
    const paraComponent = `${name} is ${age} (date of birth ${dob}), `
    const paraLastComponent = `and ${name} is ${age} (date of birth ${dob}).`
    if ((i+1)<numberOfChildren){
      paragraph = `${paragraph} ${paraComponent}`
    } else if ((i+1)==numberOfChildren) {
      //remove the comma from the last phrase, so lead into the last component
      paragraph = paragraph.slice(0, -2);
      paragraph = `${paragraph} ${paraLastComponent}`
      if (numberOfChildren == 2){
        paragraph = paragraph + ' Both children are in good health and attend local schools.'
      }
      if (numberOfChildren > 2){
        paragraph = paragraph + ' All children are in good health and attend local schools.'
      }
    }
  })
  return paragraph;
}

function relationshipStatus(partner_data){
  let pronoun = dT.toPronoun(partner_data.title);
  let new_partner = partner_data.new_partner;
  let good_health = partner_data.good_health;
  let new_partner_cohabiting = partner_data.new_partner_cohabiting;
  let new_partner_remarried = partner_data.new_partner_remarried;
  let new_partner_remarriage_intended = partner_data.new_partner_remarriage_intended;
  let status;
  if ((new_partner)&&(good_health)&&(!new_partner_cohabiting)&&(!new_partner_remarried)&&(!new_partner_remarriage_intended)){
    status = 'and has a new partner.';
  }
  if ((new_partner)&&(good_health)&&(new_partner_cohabiting)&&(!new_partner_remarried)&& (!new_partner_remarriage_intended)){
    status = 'and has a new partner. They are now cohabiting and don\'t yet intend to marry.';
  }
  if ((new_partner)&&(good_health)&&(new_partner_cohabiting)&&(!new_partner_remarried)&&(new_partner_remarriage_intended)){
    status = 'and has a new partner. They are now cohabiting and intend to marry.';
  }
  if ((new_partner)&&(good_health)&&(new_partner_cohabiting)&&(new_partner_remarried)&&(!new_partner_remarriage_intended)){
    status = 'and has a new partner. They are now cohabiting and have married.';
  }
  if ((new_partner)&&(good_health)&&(!new_partner_cohabiting)&&(new_partner_remarried)&&(!new_partner_remarriage_intended)){
    status = 'and has a new partner. They have now married.';
  }
  if ((new_partner)&&(good_health)&&(!new_partner_cohabiting)&&(!new_partner_remarried)&&(new_partner_remarriage_intended)){
    status = 'and has a new partner. They are not cohabiting and plan to get married.';
  }
  if ((new_partner)&&(good_health)&&(!new_partner_cohabiting )&&(new_partner_remarried )&&(new_partner_remarriage_intended)){
    status = 'and has a new partner. They have got married.';
  }
if ((new_partner)&&(good_health)&&(!new_partner_cohabiting )&&(new_partner_remarried)&&(!new_partner_remarriage_intended)){
    status = 'and has a new partner. They have got married but are not cohabiting.';
  }

  if ((!new_partner)&&(good_health)){
    status = 'and does not have a new partner.';
  }
  if ((!new_partner)&&(!good_health)){
    status = ` ${dT.capitalise(pronoun)} does not have a new partner.`;
  }
  if ((new_partner)&&(!good_health)&&(!new_partner_cohabiting )&&(!new_partner_remarried)&&(!new_partner_remarriage_intended)){
    status = `${dT.capitalise(pronoun)} has a new partner.`;
  }
  return status;
}

function health(partner){
  let partner_data = data[`partner_${partner}`];
  let healthBoolean = partner_data.good_health;
  let pronoun = dT.toPronoun(partner_data.title);
  let phrase;
  if ((partner == 'a') && (healthBoolean)){
    phrase = 'is in good health';
  }
  if ((partner == 'a') && (healthBoolean == false)){
    return `${dT.capitalise(pronoun)} has health troubles concerning ${ill_health_description}`;
  }
  // if (partner == 'b'){
  //   phrase = 'too is in good health';
  // }
  if ((partner == 'b')&& (healthBoolean)){
    phrase = 'is in good health';
  }
  if ((partner == 'b') && (data.partner_b.good_health == false)){
    return `${dT.capitalise(pronoun)} has health troubles concerning ${ill_health_description}`;
  }
  return `${dT.capitalise(pronoun)} ${phrase}`;
};

function courtOrders(case_info){
  if (!case_info.court_orders){
    let paragraph =  'We have not been involved in any court proceedings and there are no court orders in force.';
    return 'We have not been involved in any court proceedings and there are no court orders in force.';
  } else if (case_info.court_orders){
    let paragraph = `${case_info.court_order_info}`;
    return paragraph;
  }
}

function childList(array){
  let list = '';
  let arrLen = array.length;
  if (arrLen == 1){
    list = array[0].name;
    return list;
  }
  if (arrLen == 2){
    list = `${array[0].name} and ${array[1].name}`;
    return list;
  }
  if (arrLen > 2){
    array.map(function(child, i){
      let index1 = i+1;
      if (index1<arrLen){
        list = list+`${child.name}, `
      } if (index1==arrLen){
        list = list.slice(0, -2);
        list = list+` and ${child.name}`
      }
    });
    return list
  }
}

function legalAdvice(legal_advice){
  if (legal_advice) {
    let para = 'We have both been informed of the importance of obtaining legal advice during mediation and have both taken advice.'
    return para
  } else if (!legal_advice){
    let para = '// ---> Legal advice has been declined - please expand on this here <--- // e.g. We have both been informed of the importance of obtaining legal advice during mediation but we have chosen not to take advice.'
    return para
  }
}

export default {
  childList,
  children,
  relationshipStatus,
  health,
  livingArrangements,
  courtOrders,
  legalAdvice,
  favouredPartner,
  pensions,
  support,
  ageParse
}
