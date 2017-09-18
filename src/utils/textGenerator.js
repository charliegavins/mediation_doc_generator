import ntow from 'number-to-words';
import dT from './dataTransform'

function livingArrangements(data){
  if (data.case.cohabiting==true){
    if(data.partner_a.address){
      let paragraph = `During mediation both ${data.partner_a.first_name} and ${data.partner_b.first_name} have been living at ${data.partner_a.address}`;
      return paragraph;
    } else if (data.partner_b.address){
      let paragraph = `During mediation both ${data.partner_a.first_name} and ${data.partner_b.first_name} have been living at ${data.partner_b.address}`;
      return paragraph;
    }
  } else if (data.case.cohabiting==false){
    let paragraph = `During mediation ${data.partner_a.first_name} has been living at ${data.partner_a.address}, and ${data.partner_b.first_name} has been living at ${data.partner_b.address}.`;
    console.log(paragraph);
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
    const paraComponent = `${name} is ${age} (date of birth ${dob}), `
    const paraLastComponent = `and ${name} is ${age} (date of birth ${dob}).`
    if ((i+1)<numberOfChildren){
    paragraph = `${paragraph} ${paraComponent}`
    } else if ((i+1)==numberOfChildren) {
    //remove the comma from the last phrase, so lead into the last component
    paragraph = paragraph.slice(0, -2);
    paragraph = `${paragraph} ${paraLastComponent}`
    }
  })
  return paragraph;
}

function relationshipStatus(partner_data){
let pronoun = dT.titleToPronoun(partner_data.title);
let status;
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == false)&&(partner_data.new_partner_remarriage_intended == false)){
  status = 'and has a new partner.';
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == true )&&(partner_data.new_partner_remarried == false)&&(partner_data.new_partner_remarriage_intended == false)){
  status = 'and has a new partner. They are now cohabiting and don\'t yet intend to marry.';
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == true )&&(partner_data.new_partner_remarried == false)&&(partner_data.new_partner_remarriage_intended == true)){
  status = 'and has a new partner. They are now cohabiting and intend to marry.';
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == true )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == false)){
  status = 'and has a new partner. They are now cohabiting and have married.';
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == true )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == true)){
  status = 'and has a new partner. They are now cohabiting and have married.';
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == true)){
  status = 'and has a new partner. They are now cohabiting and have married.';
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == true)){
  status = 'and has a new partner. They have got married.';
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == false)){
  status = 'and has a new partner. They have got married.';
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == false)&&(partner_data.new_partner_remarriage_intended == true)){
  status = 'and has a new partner. They intend to marry.';
}
if ((partner_data.new_partner == false)&&(partner_data.good_health)){
  status = 'and does not have a new partner.';
}
if ((partner_data.new_partner == false)&&(partner_data.good_health==false)){
  status = ` ${dT.capitalise(pronoun)} does not have a new partner.`;
}
if ((partner_data.new_partner == true)&&(partner_data.good_health == false)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == false)&&(partner_data.new_partner_remarriage_intended == false)){
  status = `${dT.capitalise(pronoun)} has a new partner.`;
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == true )&&(partner_data.new_partner_remarried == false)&&(partner_data.new_partner_remarriage_intended == false)){
  status = `${dT.capitalise(pronoun)} has a new partner. They are now cohabiting and don\'t yet intend to marry.`;
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == true )&&(partner_data.new_partner_remarried == false)&&(partner_data.new_partner_remarriage_intended == true)){
  status =  `${dT.capitalise(pronoun)} has a new partner. They are now cohabiting and intend to marry.`;
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == true )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == false)){
  status = `${dT.capitalise(pronoun)} has a new partner. They are now cohabiting and have married.`;
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == true )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == true)){
  status = `${dT.capitalise(pronoun)} has a new partner. They are now cohabiting and have married.`;
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == true)){
  status = `${dT.capitalise(pronoun)} has a new partner. They are now cohabiting and have married.`;
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == true)){
  status = `${dT.capitalise(pronoun)} has a new partner. They have got married.`;
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == true)&&(partner_data.new_partner_remarriage_intended == false)){
  status = `${dT.capitalise(pronoun)} has a new partner. They have got married.`;
}
if ((partner_data.new_partner == true)&&(partner_data.good_health)&&(partner_data.new_partner_cohabiting == false )&&(partner_data.new_partner_remarried == false)&&(partner_data.new_partner_remarriage_intended == true)){
  status = `${dT.capitalise(pronoun)} has a new partner. They intend to marry.`;
}
if ((partner_data.new_partner == false)&&(partner_data.good_health)){
  status = 'and does not have a new partner.';
}
return status;
}

function health(data, partner){
  let partner_data = data[`partner_${partner}`];
  let healthBoolean = partner_data.good_health;
  let pronoun = dT.titleToPronoun(partner_data.title);
  let phrase;
if ((partner == 'a') && (healthBoolean == true)){
  phrase = 'is in good health';
}
if ((partner == 'a') && (healthBoolean == false)){
  return `${dT.capitalise(pronoun)} has health troubles concerning ${ill_health_description}`;
}
if ((partner == 'b') && (data.partner_a.good_health == true)){
  phrase = 'too is in good health';
}
if ((partner == 'b') && (data.partner_a.good_health == false)){
  phrase = 'is in good health';
}
if ((partner == 'b') && (data.partner_b.good_health == false)){
  return `${dT.capitalise(pronoun)} has health troubles concerning ${ill_health_description}`;
}
return `${dT.capitalise(pronoun)} ${phrase}`;
};

function courtOrders(case_info){
  console.log(case_info);
  if (case_info.court_orders == false){
    let paragraph =  'We have not been involved in any court proceedings and there are no court orders in force.';
    console.log(paragraph);
    return 'We have not been involved in any court proceedings and there are no court orders in force.';
  } else if (case_info.court_orders == true){
        let paragraph = `${case_info.court_order_info}`;
    console.log(paragraph);
return paragraph;
  }
}

function childList(array){
  let list = '';
  let arrLen = array.length;
  if (arrLen == 1){
    list = array[0].name;
    console.log(list);
    return list;
  }
  if (arrLen == 2){
    list = `${array[0].name} and ${array[1].name}`;
    console.log(list);
    return list;
  } else if (arrLen > 2){
    array.map(function(child, i){
      let index1 = i+1;
      if (index1<arrLen){
        list = list+`${child.name}, `
      } if (index1==arrLen){
        list = list.slice(0, -2);
        list = list+` and ${child.name}`
      }
    });
    console.log(list);
    return list
  }

}

export default {
  childList,
  children,
  relationshipStatus,
  health,
  livingArrangements,
  courtOrders
}
