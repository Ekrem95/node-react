import React, { Component } from 'react';

export default class Login extends Component {
  render () {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h1>Password</h1>
        <form method="post" action="/changepassword" className="postform">
          <input name="old" type="password" placeholder="old password"/>
          <input name="new" type="password" placeholder="new password"/>
          <input name="assert" type="password" placeholder="new password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
