import React, { Component } from 'react';

export default class Signup extends Component {
  render () {
    return (
      <div>
        <h1>Signup</h1>
        <form method="post" action="/signup">
          <input name="email" type="email"/>
          <input name="password" type="password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
