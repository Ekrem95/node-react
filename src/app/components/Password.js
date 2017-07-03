import React, { Component } from 'react'

export default class Login extends Component {
  render () {
    return (
      <div>
        <h1>Password</h1>
        <form method="post" action="/changepassword">
          <input name="old" type="password"/>
          <input name="new" type="password"/>
          <input name="assert" type="password"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
