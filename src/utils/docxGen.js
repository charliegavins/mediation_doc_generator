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

export default function docxGen(data, template){
  console.log(data);
      var zip = new JSZip(template);
      var doc= new Docxtemplater().loadZip(zip)
      doc.setData({
        case_number: data.case.case_number,
        mediator_first_name: data.case.mediator_first_name,
        mediator_last_name: data.case.mediator_last_name,
        number_of_sessions: data.case.number_of_sessions,
        date_of_mediation_start: data.case.date_of_mediation_start,
        date_of_mediation_end: data.case.date_of_mediation_end,
        legal_advice: data.case.legal_advice,
        date_married: data.case.date_married,
        date_cohabited: data.case.date_cohabited,
        date_separated: data.case.date_separated,
        title_a: data.partner_a.title,
        title_b: data.partner_b.title,
        first_name_a: data.partner_a.first_name,
        first_name_b: data.partner_b.first_name,
        last_name_a: data.partner_a.last_name,
        last_name_b: data.partner_b.last_name,
        dob_a: data.partner_a.dob,
        dob_b: data.partner_b.dob,
        age_a: data.partner_a.age,
        age_b: data.partner_b.age,
        occupation_a: data.partner_a.occupation,
        occupation_b: data.partner_b.occupation,
        new_partner_a: data.partner_a.new_partner,
        new_partner_b: data.partner_b.new_partner,
        new_partner_cohabiting_a: data.partner_a.new_partner_cohabiting,
        new_partner_cohabiting_b: data.partner_b.new_partner_cohabiting,
        new_partner_remarried_a: data.partner_a.new_partner_remarried,
        new_partner_remarried_b: data.partner_b.new_partner_remarried,
        new_partner_remarriage_intended_a: data.partner_a.new_partner_remarriage_intended,
        new_partner_remarriage_intended_b: data.partner_b.new_partner_remarriage_intended,
        good_health_a: data.partner_a.good_health,
        good_health_b: data.partner_b.good_health,
        ill_health_description_a: data.partner_a.ill_health_description,
        ill_health_description_b: data.partner_b.ill_health_description,
        family_home_a: dT.numberWithCommas(data.case.case_finance.partner_a.family_home),
        family_home_b: dT.numberWithCommas(data.case.case_finance.partner_b.family_home),
        other_property_a: dT.numberWithCommas(data.case.case_finance.partner_a.other_property),
        other_property_b: dT.numberWithCommas(data.case.case_finance.partner_b.other_property),
        personal_assets_a: dT.numberWithCommas(data.case.case_finance.partner_a.personal_assets),
        personal_assets_b: dT.numberWithCommas(data.case.case_finance.partner_b.personal_assets),
        liabilities_a: dT.numberWithCommas(data.case.case_finance.partner_a.liabilities),
        liabilities_b: dT.numberWithCommas(data.case.case_finance.partner_b.liabilities),
        business_assets_a: dT.numberWithCommas(data.case.case_finance.partner_a.business_assets),
        business_assets_b: dT.numberWithCommas(data.case.case_finance.partner_b.business_assets),
        other_assets_a: dT.numberWithCommas(data.case.case_finance.partner_a.other_assets),
        other_assets_b: dT.numberWithCommas(data.case.case_finance.partner_b.other_assets),
        pensions_a: dT.numberWithCommas(data.case.case_finance.partner_a.pensions.total),
        pensions_b: dT.numberWithCommas(data.case.case_finance.partner_b.pensions.total),
        total_finance_a: dT.numberWithCommas(data.case.case_finance.partner_a.total_net),
        total_finance_b: dT.numberWithCommas(data.case.case_finance.partner_b.total_net),
        sub_total_assets_a: dT.numberWithCommas(data.case.case_finance.partner_a.total_gross),
        sub_total_assets_b: dT.numberWithCommas(data.case.case_finance.partner_b.total_gross),
        asset_split_a: data.case.case_finance.partner_a.split*100,
        asset_split_b: data.case.case_finance.partner_b.split*100,
        pensions_split_a: data.case.case_finance.partner_a.pensions.split*100,
        pensions_split_b: data.case.case_finance.partner_b.pensions.split*100,
        footer_date: data.doc.footer_date,
        footer_info: dT.footerInfo(data),
        favoured_partner: tG.favouredPartner(data),
        child_paragraph: tG.children(data.case.child_info),
        health_a: tG.health(data, 'a'),
        health_b: tG.health(data, 'b'),
        relationship_status_a: tG.relationshipStatus(data.partner_a),
        relationship_status_b: tG.relationshipStatus(data.partner_b),
        living_arrangements_paragraph: tG.livingArrangements(data),
        court_orders_paragraph: tG.courtOrders(data.case),
        child_list: tG.childList(data.case.child_info),
        legal_advice_para: tG.legalAdvice(data.case.legal_advice),
        family_home_total: data.case.case_finance.family_home_total,
        family_home_address: data.case.case_finance.family_home_address,
        net_monthly_income_a: dT.numberWithCommas(data.partner_a.personal_finance.net_monthly_income),
        net_monthly_income_b: dT.numberWithCommas(data.partner_b.personal_finance.net_monthly_income),
        monthly_outgoings_a: dT.numberWithCommas(data.partner_a.personal_finance.monthly_outgoings),
        monthly_outgoings_b: dT.numberWithCommas(data.partner_b.personal_finance.monthly_outgoings),
        child_support_amount: data.case.case_finance.child_support_amount,
        child_support_recipient: dT.partnerName(data.case.case_finance.child_support_recipient, data),
        child_support_payee: dT.partnerName(data.case.case_finance.child_support_recipient, data, false),
        payee_gender: dT.payeeGender(data.case.case_finance.child_support_recipient, data),
        spousal_support_amount: data.case.case_finance.spousal_support_amount,
        spousal_support_recipient: dT.partnerName(data.case.case_finance.spousal_support_recipient, data),
        spousal_support_payee: dT.partnerName(data.case.case_finance.spousal_support_recipient, data, false),
        partner_a_pensions_para: tG.pensions(data, 'partner_a'),
        partner_b_pensions_para: tG.pensions(data, 'partner_b'),
        commenced_divorce: dT.partnerName(data),
        net_monthly_income_r: dT.supportCalc(data, 'i', 'r'),
        net_monthly_outgoings_r: dT.supportCalc(data, 'o', 'r'),
        net_monthly_income_p: dT.supportCalc(data, 'i', 'p'),
        net_monthly_outgoings_p: dT.supportCalc(data, 'o', 'p'),
      });

      try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render()
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

      var out=doc.getZip().generate({
          type:"blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }) //Output the document using Data-URI
      // console.log(doc);
      saveAs(out,dT.fileName(data));
  };
