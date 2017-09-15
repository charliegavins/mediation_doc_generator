import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import converter from 'number-to-words';
import path from 'path';
import moment from 'moment';
import _ from 'lodash';
import { saveAs } from 'file-saver';
import ntow from 'number-to-words';
import dT from './dataTransform';

export default function docGen(data, MoUInput){
      var zip = new JSZip(MoUInput.data);
      var doc= new Docxtemplater().loadZip(zip)
      doc.setData({
        case_number: data.case_number,
        mediator_first_name: data.mediator_first_name,
        mediator_last_name: data.mediator_last_name,
        number_of_sessions: dT.capitalise(ntow.toWords(data.number_of_sessions)),
        date_of_mediation_start: dT.ddmmyy(data.date_of_mediation_start),
        date_of_mediation_end: dT.ddmmyy(data.date_of_mediation_end),
        legal_advice: data.legal_advice,
        date_married: dT.ddmmyy(data.date_married),
        date_cohabited: dT.mmyy(data.date_cohabited),
        date_separated: dT.mmyy(data.date_separated),
        title_a: data.title_a,
        title_b: data.title_b,
        first_name_a: data.first_name_a,
        first_name_b: data.first_name_b,
        last_name_a: data.last_name_a,
        last_name_b: data.last_name_b,
        dob_a: dT.ddmmyy(data.dob_a),
        dob_b: dT.ddmmyy(data.dob_b),
        age_a: dT.ageFromDoB(data.dob_a),
        age_b: dT.ageFromDoB(data.dob_b),
        occupation_a: data.occupation_a,
        occupation_b: data.occupation_b,
        new_partner_a: data.new_partner_a,
        new_partner_b: data.new_partner_b,
        new_partner_cohabiting_a: data.new_partner_cohabiting_a,
        new_partner_cohabiting_b: data.new_partner_cohabiting_b,
        new_partner_remarried_a: data.new_partner_remarried_a,
        new_partner_remarried_b: data.new_partner_remarried_b,
        new_partner_remarriage_intended_a: data.new_partner_remarriage_intended_a,
        new_partner_remarriage_intended_b: data.new_partner_remarriage_intended_b,
        good_health_a: data.good_health_a,
        good_health_b: data.good_health_b,
        good_health_description_a: data.good_health_description_a,
        good_health_description_b: data.good_health_description_b,
        family_home_a: data.family_home_a,
        family_home_b: data.family_home_b,
        other_property_a: data.other_property_a,
        other_property_b: data.other_property_b,
        personal_assets_a: data.personal_assets_a,
        personal_assets_b: data.personal_assets_b,
        liabilities_a: data.liabilities_a,
        liabilities_b: data.liabilities_b,
        business_assets_a: data.business_assets_a,
        business_assets_b: data.business_assets_b,
        other_assets_a: data.other_assets_a,
        other_assets_b: data.other_assets_b,
        pensions_a: data.pensions_a,
        pensions_b: data.pensions_b,
        footer_date: moment(data.date_of_mediation_end).format('DD-MM-YY'),
        footer_info: dT.footerInfo(data)
        // number_of_children: dT.childrenCount(data)
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
      dT.childCheck(data);
      saveAs(out,dT.fileName(data));
  };
