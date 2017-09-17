import ntow from 'number-to-words';

function textGenChild(data){
  console.log(data);
  let i = 0;
  let numberOfChildren = data.child_info.length;
  let paragraph = `We have ${ntow.toWords(numberOfChildren)} children. `;
  if (numberOfChildren == 0){
    paragraph = 'We have no children.';
  }
  //map through the array, generating a phrase per child. For the last child, change the grammar to replace the trailing comma of the previous component with an 'and' and add full stop at the end to complete the sentence.
  data.child_info.map(function(value, i){
    const paraComponent = `${data.child_info[i].name} is ${data.child_info[i].age} (date of birth ${data.child_info[i].dob}), `
    const paraLastComponent = `and ${data.child_info[i].name} is ${data.child_info[i].age} (date of birth ${data.child_info[i].dob}).`
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

export default {
  textGenChild
}
