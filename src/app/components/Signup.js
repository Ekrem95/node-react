import React, { Component } from 'react';

export default class Signup extends Component {
  render () {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h1>Signup</h1>
        <form method="post" action="/signup" className="postform">
          <input name="email" type="email"/>
          <input name="password" type="password"/>
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}
