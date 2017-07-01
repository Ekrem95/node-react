import React, { Component } from 'react'

export default class Login extends Component {
  render () {
    return (
      <div>
        <h1>Login</h1>
        <form method="post" action="/login">
          <input name="email" type="email"/>
          <input name="password" type="password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
