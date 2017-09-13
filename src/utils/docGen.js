// import JSZip         from'jszip';
// import Docxtemplater from'docxtemplater';
// import converter     from'number-to-words';
// import fs            from'fs';
// import path          from'path';
// import moment        from'moment';
// import _             from'lodash';
//
//
//       TITLE_A: data.partnerA.title,
//       TITLE_B: data.partnerB.title,
//       FIRST_NAME_A: data.partnerA.firstName,
//       LAST_NAME_A: data.partnerA.lastName,
//       FIRST_NAME_B: data.partnerB.firstName,
//       LAST_NAME_B: data.partnerB.lastName,
//       DOB_A: data.partnerA.DoB,
//       DOB_B: data.partnerB.DoB,
//       OCCUPATION_A: data.partnerA.financialInfo.income.occupation,
//       OCCUPATION_B: data.partnerB.financialInfo.income.occupation,
//       MEDIATOR_FIRST_NAME: data.mediator.firstName,
//       NUMBER_OF_SESSIONS: `${converter.toWords(data.numberOfSessions)} (${data.numberOfSessions})`,
//       DATE_OF_MEDIATION_START: data.mediationStart,
//       DATE_OF_MEDIATION_END: data.mediationEnd,
//       LEGAL_ADVICE: data.legalAdvice,
//       DATE_MARRIED: data.dateOfMarriage,
//       DATE_COHABITED: data.dateOfCohabitation,
//       DATE_SEPARATED: data.dateOfSeparation,
//       PENSIONS_A: data.MoUFinance.pensions.partnerA,
//       PENSIONS_B: data.MoUFinance.pensions.partnerB,
//       OTHER_ASSETS_A: data.MoUFinance.otherAssets.partnerA,
//       OTHER_ASSETS_B: data.MoUFinance.otherAssets.partnerB,
//       BUSINESS_ASSETS_A: data.MoUFinance.businessAssets.partnerA,
//       BUSINESS_ASSETS_B: data.MoUFinance.businessAssets.partnerB,
//       LIABILITIES_A: data.MoUFinance.liabilities.partnerA,
//       LIABILITIES_B: data.MoUFinance.liabilities.partnerB,
//       PERSONAL_ASSETS_A: data.MoUFinance.personalAssets.partnerA,
//       PERSONAL_ASSETS_B: data.MoUFinance.personalAssets.partnerB,
//       OTHER_PROPERTY_A: data.MoUFinance.otherProperty.partnerA,
//       OTHER_PROPERTY_B: data.MoUFinance.otherProperty.partnerB,
//       FAMILY_HOME_A: data.MoUFinance.familyHome.partnerA,
//       FAMILY_HOME_B: data.MoUFinance.familyHome.partnerB,
//       NUMBER_OF_CHILDREN:
// `${converter.toWords(data.childrenInfo.length)} (${data.childrenInfo.length})`,
//       NEW_PARTNER_A: data.partnerA.backgroundInfo.newPartner,
//       NEW_PARTNER_B: data.partnerB.backgroundInfo.newPartner,
//       NEW_PARTNER_COHBITING_A: data.partnerA.backgroundInfo.cohabiting,
//       NEW_PARTNER_COHBITING_B: data.partnerB.backgroundInfo.cohabiting,
//       NEW_PARTNER_REMARRIED_A: data.partnerA.backgroundInfo.remarried,
//       NEW_PARTNER_REMARRIED_B: data.partnerB.backgroundInfo.remarried,
//       NEW_PARTNER_REMARRIAGE_INTENDED_A: data.partnerA.backgroundInfo.remarriageIntended,
//       NEW_PARTNER_REMARRIAGE_INTENDED_B: data.partnerB.backgroundInfo.remarriageIntended,
//       GOOD_HEALTH_A: data.partnerA.backgroundInfo.health.inGoodHealth,
//       GOOD_HEALTH_B: data.partnerB.backgroundInfo.health.inGoodHealth,
//       GOOD_HEALTH_DESCRIPTION_A: data.partnerA.backgroundInfo.health.descriptionIfFalse,
//       GOOD_HEALTH_DESCRIPTION_B: data.partnerB.backgroundInfo.health.descriptionIfFalse
//     };
//     async function textGen(data){
//       mouBackground = await backgroundInfoGeneration(data);
//       mouProcessed = await dataFormatCheck(mouBackground);
//       docgen(mouProcessed, res);
//     };
//   });
// }
//
// //this takes the title from the database and assigns a gender for the paragraph generation
// function titleGenderConversion(title, type){
//   if ((title = 'Mr') && (type != 'posses')){
//     return 'he'
//   }
//   if ((title = 'Mrs') && (type != 'posses')){
//     return 'she'
//   }
//   if ((title = 'Ms') && (type != 'posses')){
//     return 'she'
//   }
//   if ((title = 'Mr') && (type = 'posses')){
//     return 'his'
//   }
//   if ((title = 'Mrs') && (type = 'posses')){
//     return 'her'
//   }
//   if ((title = 'Ms') && (type = 'posses')){
//     return 'her'
//   }
//
// }
//
//
//
// function backgroundInfoGeneration(data){
//   // if (data.NUMBER_OF_CHILDREN = 0 || data.NUMBER_OF_CHILDREN = NULL){
//   //   data.NUMBER_OF_CHILDREN = 'no';
//   // }
//   // if (data.NUMBER_OF_CHILDREN > 0){
//   //   data.CHILDREN_INFO =
//   // }
//   if (data.LEGAL_ADVICE == false){
//     data.LEGAL_ADVICE = `We have both been informed of the importance of obtaining legal advice during mediation and have decided not to take legal advice before implementing these proposals`;
//   };
//   if (data.LEGAL_ADVICE == true){
//     data.LEGAL_ADVICE = `We have both been informed of the importance of obtaining legal advice during mediation and have decided to take legal advice to assist in implementing these proposals`;
//   };
//   if (data.GOOD_HEALTH_A && data.GOOD_HEALTH_B == true){
//     data.too_Grammar = `too`;
//   };
//   if (data.NEW_PARTNER_A == false ){
//     data.NEW_PARTNER_A = `does not have a new partner`;
//   };
//   if (data.NEW_PARTNER_A == true){
//     data.NEW_PARTNER_A = `has a new partner`;
//   };
//   if (data.NEW_PARTNER_B == false){
//     data.NEW_PARTNER_B = `does not have a new partner`;
//   };
//   if (data.NEW_PARTNER_B == true){
//     data.NEW_PARTNER_B = `has a new partner`;
//   };
//   if (data.GOOD_HEALTH_A = true){
//     data.GOOD_HEALTH_A = `is in good health`;
//   };
//   if (data.GOOD_HEALTH_B = true){
//     data.GOOD_HEALTH_B = `is in good health`;
//   };
//   if (data.NEW_PARTNER_COHABITING_A == true){
//     data.NEW_PARTNER_COHABITING_A = `is cohabiting with the new partner`
//   };
//   if (data.NEW_PARTNER_COHABITING_A == false){
//     data.NEW_PARTNER_COHABITING_A = `is not cohabiting with the new partner`
//   };
//   if (data.NEW_PARTNER_REMARRIED_A == true){
//     data.NEW_PARTNER_REMARRIED_A = `and has subsequently married`
//   };
//   if (data.NEW_PARTNER_REMARRIAGE_INTENDED_A == true){
//     data.BACKGROUND_INFO_FULL_STOP = '. ';
//     data.NEW_PARTNER_REMARRIAGE_INTENDED_A = `and is intending to get married`
//   };
//   data.BACKGROUND_INFO_A = `${titleGenderConversion(data.TITLE_A)} ${data.GOOD_HEALTH_A} and ${data.NEW_PARTNER_A}`;
//   data.BACKGROUND_INFO_B = `${titleGenderConversion(data.TITLE_B)} ${data.too_Grammar} ${data.GOOD_HEALTH_B} and ${data.NEW_PARTNER_B}`;
//   return data
// };
//
// function dateParser(date){
//   return moment(date).format('Do MMMM YYYY');
// };
//
// function capitalise(string){
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };
//
// function dataFormatCheck(mou){
//   for (var i in mou){
//     let value = mou[i];
//     if (value == undefined){
//       mou[i] = 'X';
//     }
//     if (_.isString(value)){
//       mou[i] = capitalise(value);
//     }
//     if (_.isDate(value)){
//       mou[i] = dateParser(value);
//     }
//     if (_.isNumber(value)){
//       mou[i] = _.round((value), 2);
//     }
//   };
//   return mou;
// };
//
// function docgen(data, res){
//
//   //Load the docx file as a binary
//   let content = fs
//   .readFileSync(path.resolve(__dirname, '../docgen/MOU_input.docx'), 'binary');
//
//   let zip = new JSZip(content);
//
//   let doc = new Docxtemplater();
//   doc.loadZip(zip);
//
// //CAN WE ES6 this so it's just { LEGAL_ADVICE, FIRST_NAME_A etc?}
//   doc.setData({
//     OCCUPATION_A: data.OCCUPATION_A,
//     OCCUPATION_B: data.OCCUPATION_B,
//     LEGAL_ADVICE: data.LEGAL_ADVICE,
//     FIRST_NAME_A: data.FIRST_NAME_A,
//     LAST_NAME_A: data.LAST_NAME_A,
//     FIRST_NAME_B: data.FIRST_NAME_B,
//     LAST_NAME_B: data.LAST_NAME_B,
//     MEDIATOR_FIRST_NAME: data.MEDIATOR_FIRST_NAME,
//     NUMBER_OF_SESSIONS: data.NUMBER_OF_SESSIONS,
//     DATE_OF_MEDIATION_START: data.DATE_OF_MEDIATION_START,
//     DATE_OF_MEDIATION_END: data.DATE_OF_MEDIATION_END,
//     DATE_MARRIED: data.DATE_MARRIED,
//     DATE_COHABITED: data.DATE_COHABITED,
//     DATE_SEPARATED: data.DATE_SEPARATED,
//     PENSIONS_A: data.PENSIONS_A,
//     PENSIONS_B: data.PENSIONS_B,
//     OTHER_ASSETS_A: data.OTHER_ASSETS_A,
//     OTHER_ASSETS_B: data.OTHER_ASSETS_B,
//     BUSINESS_ASSETS_A: data.BUSINESS_ASSETS_A,
//     BUSINESS_ASSETS_B: data.BUSINESS_ASSETS_B,
//     LIABILITIES_A: data.LIABILITIES_A,
//     LIABILITIES_B: data.LIABILITIES_B,
//     PERSONAL_ASSETS_A: data.PERSONAL_ASSETS_A,
//     PERSONAL_ASSETS_B: data.PERSONAL_ASSETS_B,
//     OTHER_PROPERTY_A: data.OTHER_PROPERTY_A,
//     OTHER_PROPERTY_B: data.OTHER_PROPERTY_B,
//     FAMILY_HOME_A: data.FAMILY_HOME_A,
//     FAMILY_HOME_B: data.FAMILY_HOME_B,
//     DOB_A: data.DOB_A,
//     DOB_B: data.DOB_B,
//     NUMBER_OF_CHILDREN: data.NUMBER_OF_CHILDREN,
//     BACKGROUND_INFO_A: data.BACKGROUND_INFO_A,
//     BACKGROUND_INFO_B: data.BACKGROUND_INFO_B
//
//   });
//
//
//   try {
//     // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
//     doc.render()
//   }
//   catch (error) {
//     let e = {
//       message: error.message,
//       name: error.name,
//       stack: error.stack,
//       properties: error.properties,
//     }
//     console.log(JSON.stringify({error: e}));
//     // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
//     return res.status(500).json({ message: 'Something went wrong.', error: JSON.stringify(error)  });
//   }
//
//   let buf = doc.getZip()
//   .generate({type: 'nodebuffer'});
//
//   // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
//   fs.writeFileSync(path.resolve(__dirname, '../docgen/output.docx'), buf);
//   return res.status(200).json({ message: 'Document spawned'});
// };
//
// module.exports = {
//   gen: gen
// };
