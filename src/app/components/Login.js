import React, { Component } from 'react';

export default class Login extends Component {
  render () {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h1>Login</h1>
        <form method="post" action="/login" className="postform">
          <input name="email" type="email" autoFocus/>
          <input name="password" type="password"/>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
