import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { importFile } from '../actions';
import store from 'redux';
import axios from 'axios';
const ROOT_URL = 'http://localhost:3000/api/assets/';

class GetBinary extends Component {

  constructor() {
    super()
    this.state = { files: [] }
  }
  onClick(){
    const docxTemplate = axios.get(`${ROOT_URL}docx_template`);
    docxTemplate.then(function(res){
      console.log('export const templateBinary = `'+btoa(res.data)+'`;');
    }, function(err){
      console.log('template fetch failed');
    });
  }

  render() {
    return (
      <section>
        <div className="getBinary">
          <button onClick={this.onClick.bind(this)} type="button">Console Log new binary</button>
        </div>
      </section>
    );
  }
}

export default connect(null, { importFile })(GetBinary);
