import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
var request = require('superagent');

export default class AddFile extends Component {
  constructor() {
    super();
    this.state = { files: [] };
    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onDrop(files) {
    console.log('Received files: ', files);
    var req = request.post('/add/file');
    files.forEach((file)=> {
        req.attach(file.name, file);
      });
    req.end(
      console.log('Done')
    );
  }

  onOpenClick(files) {
    this.refs.dropzone.open();
  }

  render() {
    return (
      <div>
         <Dropzone ref="dropzone" onDrop={this.onDrop} >
           <div>Try dropping some files here, or click to select files to upload.</div>
         </Dropzone>
         <button type="button" onClick={this.onOpenClick}>
             Open Dropzone
         </button>
         {this.state.files ? <div>
         <h2>Uploading {this.state.files.length} files...</h2>
         <div>{this.state.files.map((file) => <img src={file.preview} />)}</div>
         </div> : null}
       </div>
    );
  }
}
