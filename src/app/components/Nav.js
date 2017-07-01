import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render () {
    return (
      <div className="nav">
        <li><Link
          to="/signup"
          className="link"
          >Signup</Link></li>
        <li><Link
          to="/login"
          className="link"
          >Login</Link></li>
        <li><Link
          to="/dashboard"
          className="link"
          >Dashboard</Link></li>
        <li><a href="logout">Logout</a></li>
        <li><Link
          to="/tumblr"
          className="link"
          >Tumblr</Link></li>
        <li><a href="logout">Logout</a></li>
      </div>
    )
  }
}
