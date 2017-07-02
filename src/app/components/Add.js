import React, { Component } from 'react';
import axios from 'axios';

export default class Dashboard extends Component {

  render () {
    return (
      <div>
        <h1 style={{marginLeft: 20}}>Add</h1>
        <form method="post" action="/add" className="addPost">
          <input type="text" name="title" placeholder="Title"/>
          <input type="text" name="src" placeholder="Image Source"/>
          <input type="text" name="desc" placeholder="Description"/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
