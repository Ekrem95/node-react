import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Add extends Component {

  render () {
    return (
      <div>
        <h1 style={{ marginLeft: 20 }}>Add</h1>
        <Link
          style={{
            color: '#fff',
            textDecoration: 'none',
          }}
          to="/add/file">
          <h3 className="addfile">Add File</h3></Link>
        <form method="post" action="/add" className="addPost">
          <input type="text" name="title" placeholder="Title"/>
          <input type="text" name="desc" placeholder="Description"/>
          <input type="text" name="src" placeholder="Image Source"/>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
