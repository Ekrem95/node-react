import React, { Component } from 'react';

export default class Login extends Component {
  render () {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h1>Login</h1>
        <form method="post" action="/login" className="postform">
          <input name="email" type="email" autoFocus placeholder="email"/>
          <input name="password" type="password" placeholder="password"/>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
