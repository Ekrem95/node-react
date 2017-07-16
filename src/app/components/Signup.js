import React, { Component } from 'react';

export default class Signup extends Component {
  render () {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h1>Sign up</h1>
        <form method="post" action="/signup" className="postform">
          <input name="email" type="email" autoFocus/>
          <input name="password" type="password"/>
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}
