import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { loggedIn } from '../helpers';

export default class Add extends Component {

  componentWillMount(nextState, transition) {
    loggedIn();
  }

  render () {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h1 style={{ marginLeft: 20 }}>Add</h1>
        <Link
          style={{
            color: '#fff',
            textDecoration: 'none',
          }}
          to="/add/file">
          <h3 className="addfile">Add File</h3></Link>
        <form method="post" action="/add" className="addPost">
          <input type="text" name="title" placeholder="Title" autoFocus/>
          <input type="text" name="desc" placeholder="Description"/>
          <textarea type="text" name="src" placeholder="Image Source"></textarea>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
