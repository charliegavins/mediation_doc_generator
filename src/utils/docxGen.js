import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import converter from 'number-to-words';
import path from 'path';
import moment from 'moment';
import _ from 'lodash';
import { saveAs } from 'file-saver';
import ntow from 'number-to-words';
import dT from './dataTransform';
import tG from './textGenerator';
import { templateBinary } from './templateBinary';
import { data } from "../actions/index";

export default function docxGen(template){
  template = atob(templateBinary);
  let zip = new JSZip(template);
  let doc = new Docxtemplater().loadZip(zip)
  let Case = data.case;
  let Partner_a = data.partner_a;
  let Partner_b = data.partner_b;
  let Mediator = data.mediator;
  let spousal_support_a = dT.spousalSupport(Case.case_finance.spousal_support_recipient, Case.case_finance.spousal_support_amount, 'partner_a');
  let spousal_support_b = dT.spousalSupport(Case.case_finance.spousal_support_recipient, Case.case_finance.spousal_support_amount, 'partner_b');
  let child_support_a = dT.childSupport(Case.case_finance.child_support_recipient, Case.case_finance.child_support_amount, 'partner_a');
  let child_support_b = dT.childSupport(Case.case_finance.child_support_recipient, Case.case_finance.child_support_amount, 'partner_b');
  let support_total_a = child_support_a + spousal_support_a;
  let support_total_b = child_support_b + spousal_support_b;
  let docObject = {
    case_number: Case.case_number,
    mediator_first_name: Mediator.first_name,
    mediator_last_name: Mediator.last_name,
    mediator_practice: Mediator.practice,
    number_of_sessions: Case.number_of_sessions,
    date_of_mediation_start: Case.date_of_mediation_start,
    date_of_mediation_end: Case.date_of_mediation_end,
    legal_advice: Case.legal_advice,
    date_married: Case.date_married,
    date_cohabited: Case.date_cohabited,
    date_separated: Case.date_separated,
    title_a: Partner_a.title,
    title_b: Partner_b.title,
    first_name_a: Partner_a.first_name,
    first_name_b: Partner_b.first_name,
    last_name_a: Partner_a.last_name,
    last_name_b: Partner_b.last_name,
    dob_a: Partner_a.dob,
    dob_b: Partner_b.dob,
    age_a: tG.ageParse(Partner_a.age),
    age_b: tG.ageParse(Partner_b.age),
    occupation_a: Partner_a.occupation,
    occupation_b: Partner_b.occupation,
    new_partner_a: Partner_a.new_partner,
    new_partner_b: Partner_b.new_partner,
    new_partner_cohabiting_a: Partner_a.new_partner_cohabiting,
    new_partner_cohabiting_b: Partner_b.new_partner_cohabiting,
    new_partner_remarried_a: Partner_a.new_partner_remarried,
    new_partner_remarried_b: Partner_b.new_partner_remarried,
    new_partner_remarriage_intended_a: Partner_a.new_partner_remarriage_intended,
    new_partner_remarriage_intended_b: Partner_b.new_partner_remarriage_intended,
    good_health_a: Partner_a.good_health,
    good_health_b: Partner_b.good_health,
    ill_health_description_a: Partner_a.ill_health_description,
    ill_health_description_b: Partner_b.ill_health_description,
    family_home_a: dT.numberWithCommas(Case.case_finance.partner_a.family_home),
    family_home_b: dT.numberWithCommas(Case.case_finance.partner_b.family_home),
    other_property_a: dT.numberWithCommas(Case.case_finance.partner_a.other_property),
    other_property_b: dT.numberWithCommas(Case.case_finance.partner_b.other_property),
    personal_assets_a: dT.numberWithCommas(Case.case_finance.partner_a.personal_assets),
    personal_assets_b: dT.numberWithCommas(Case.case_finance.partner_b.personal_assets),
    liabilities_a: dT.numberWithCommas(Case.case_finance.partner_a.liabilities),
    liabilities_b: dT.numberWithCommas(Case.case_finance.partner_b.liabilities),
    business_assets_a: dT.numberWithCommas(Case.case_finance.partner_a.business_assets),
    business_assets_b: dT.numberWithCommas(Case.case_finance.partner_b.business_assets),
    other_assets_a: dT.numberWithCommas(Case.case_finance.partner_a.other_assets),
    other_assets_b: dT.numberWithCommas(Case.case_finance.partner_b.other_assets),
    pensions_a: dT.numberWithCommas(Case.case_finance.partner_a.pensions.total),
    pensions_b: dT.numberWithCommas(Case.case_finance.partner_b.pensions.total),
    total_finance_a: dT.numberWithCommas(Case.case_finance.partner_a.total_net),
    total_finance_b: dT.numberWithCommas(Case.case_finance.partner_b.total_net),
    sub_total_assets_a: dT.numberWithCommas(Case.case_finance.partner_a.total_gross),
    sub_total_assets_b: dT.numberWithCommas(Case.case_finance.partner_b.total_gross),
    asset_split_a: Case.case_finance.partner_a.total_split*100,
    asset_split_b: Case.case_finance.partner_b.total_split*100,
    pensions_split_a: Math.round(Case.case_finance.partner_a.pensions.split*100),
    pensions_split_b: Math.round(Case.case_finance.partner_b.pensions.split*100),
    footer_date: Case.footer_date,
    footer_info: dT.footerInfo(),
    favoured_partner: tG.favouredPartner(),
    child_paragraph: tG.children(Case.child_info),
    health_a: tG.health('a'),
    health_b: tG.health('b'),
    relationship_status_a: tG.relationshipStatus(Partner_a),
    relationship_status_b: tG.relationshipStatus(Partner_b),
    living_arrangements_paragraph: tG.livingArrangements(),
    court_orders_paragraph: tG.courtOrders(Case),
    child_list: tG.childList(Case.child_info),
    legal_advice_para: tG.legalAdvice(Case.legal_advice),
    family_home_total: Case.case_finance.family_home_total,
    family_home_address: dT.concatAddress(Case),
    outstanding_mortgage: Case.outstanding_mortgage,
    net_monthly_income_a: dT.numberWithCommas(Partner_a.personal_finance.net_monthly_income),
    net_monthly_income_b: dT.numberWithCommas(Partner_b.personal_finance.net_monthly_income),
    monthly_outgoings_a: dT.numberWithCommas(Partner_a.personal_finance.monthly_outgoings),
    monthly_outgoings_b: dT.numberWithCommas(Partner_b.personal_finance.monthly_outgoings),
    child_support_a: dT.numberWithCommas(child_support_a),
    child_support_b: dT.numberWithCommas(child_support_b),
    child_support_amount: Case.case_finance.child_support_amount,
    child_support_recipient: dT.partnerName(Case.case_finance.child_support_recipient, true),
    child_support_payee: dT.partnerName(Case.case_finance.child_support_recipient, false),
    spousal_support_a: dT.numberWithCommas(spousal_support_a),
    spousal_support_b: dT.numberWithCommas(spousal_support_b),
    support_total_a: dT.numberWithCommas(support_total_a),
    support_total_b: dT.numberWithCommas(support_total_b),
    spousal_support_amount: Case.case_finance.spousal_support_amount,
    spousal_support_recipient: dT.partnerName(Case.case_finance.spousal_support_recipient, true),
    spousal_support_payee: dT.partnerName(Case.case_finance.spousal_support_recipient, false),
    partner_a_pensions_para: tG.pensions('partner_a'),
    partner_b_pensions_para: tG.pensions('partner_b'),
    commenced_divorce: dT.partnerName(Case.commenced_divorce, true),
    not_commenced_divorce: dT.partnerName(Case.commenced_divorce, false),
    court_fees_responsibility: Case.court_fees_responsibility,

    support_para_a: tG.support('partner_a'),
    support_para_b: tG.support('partner_b'),
    employment_income_net_a: dT.numberWithCommas(Partner_a.personal_finance.income.employment_income_net),
    self_employment_income_net_a: dT.numberWithCommas(Partner_a.personal_finance.income.self_employment_income_net),
    income_investments_rental_a: dT.numberWithCommas(Partner_a.personal_finance.income.income_investments_rental),
    state_benefits_a: dT.numberWithCommas(Partner_a.personal_finance.income.state_benefits),
    other_income_a: dT.numberWithCommas(Partner_a.personal_finance.income.other_income),
    employment_income_net_b: dT.numberWithCommas(Partner_b.personal_finance.income.employment_income_net),
    self_employment_income_net_b: dT.numberWithCommas(Partner_b.personal_finance.income.self_employment_income_net),
    income_investments_rental_b: dT.numberWithCommas(Partner_b.personal_finance.income.income_investments_rental),
    state_benefits_b: dT.numberWithCommas(Partner_b.personal_finance.income.state_benefits),
    other_income_b: dT.numberWithCommas(Partner_b.personal_finance.income.other_income),
    total_monthly_income_a: dT.numberWithCommas(Partner_a.personal_finance.income.total_income),
    total_monthly_income_b: dT.numberWithCommas(Partner_b.personal_finance.income.total_income),
    accomodation_a: dT.numberWithCommas(Partner_a.personal_finance.expenditure.accomodation),
    utilities_a: dT.numberWithCommas(Partner_a.personal_finance.expenditure.utilities),
    financial_commitments_a: dT.numberWithCommas(Partner_a.personal_finance.expenditure.financial_commitments),
    transport_a: dT.numberWithCommas(Partner_a.personal_finance.expenditure.transport),
    household_expenses_a: dT.numberWithCommas(Partner_a.personal_finance.expenditure.household_expenses),
    personal_expenses_a: dT.numberWithCommas(Partner_a.personal_finance.expenditure.personal_expenses),
    recreation_a: dT.numberWithCommas(Partner_a.personal_finance.expenditure.recreation),
    children_a: dT.numberWithCommas(Partner_a.personal_finance.expenditure.children),
    monthly_outgoings_a: dT.numberWithCommas(Partner_a.personal_finance.monthly_outgoings),
    shortfall_surplus_a: dT.numberWithCommas(Partner_a.personal_finance.shortfall_surplus),
    accomodation_b: dT.numberWithCommas(Partner_b.personal_finance.expenditure.accomodation),
    utilities_b: dT.numberWithCommas(Partner_b.personal_finance.expenditure.utilities),
    financial_commitments_b: dT.numberWithCommas(Partner_b.personal_finance.expenditure.financial_commitments),
    transport_b: dT.numberWithCommas(Partner_b.personal_finance.expenditure.transport),
    household_expenses_b: dT.numberWithCommas(Partner_b.personal_finance.expenditure.household_expenses),
    personal_expenses_b: dT.numberWithCommas(Partner_b.personal_finance.expenditure.personal_expenses),
    recreation_b: dT.numberWithCommas(Partner_b.personal_finance.expenditure.recreation),
    children_b: dT.numberWithCommas(Partner_b.personal_finance.expenditure.children),
    monthly_outgoings_b: dT.numberWithCommas(Partner_b.personal_finance.monthly_outgoings),
    shortfall_surplus_b: dT.numberWithCommas(Partner_a.personal_finance.shortfall_surplus),
    draft: ''
  };
  doc.setData(docObject);
  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
    console.log(data.doc.draft)
    if (data.doc.draft === 0) {
      const getZip = doc.getZip()
      console.log(getZip)
      const baseText = getZip.file('word/header1.xml').asText()
      console.log(baseText)
      const newText = baseText.replace(/{draft}/, '')
      getZip.file('word/header1.xml', newText)
    }
  }
  catch (error) {
    var e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    }
    console.log(JSON.stringify({error: e}));
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    throw error;
  }

// add functionality for draft lettering


  var out=doc.getZip().generate({
    type:"blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  }) //Output the document using Data-URI
  saveAs(out,dT.fileName(data));
};
