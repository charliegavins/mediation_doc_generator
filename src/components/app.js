import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { importFile } from '../actions';

class App extends Component {

  constructor() {
    super()
    this.state = { files: [] }
  }



  onDrop(acceptedFiles){
  acceptedFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileAsBinaryString = reader.result;
      this.props.importFile(fileAsBinaryString);
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () =>console.log('file reading has failed');
    reader.readAsBinaryString(file);
        });
  }



  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default connect(null, { importFile })(App);
