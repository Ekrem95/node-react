import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Boolean,
    };
  }

  componentWillMount(nextState, transition) {
    axios.get('api/isloggedin')
      .then(res => {
        if (res.data == 'no') {
          this.setState({
            loggedIn: false,
          });
        } else {
          this.setState({
            loggedIn: true,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    return (
      <div className="nav">
        {
          !this.state.loggedIn &&
          <div>
          <li><Link
            to="/"
            className="link"
            >X</Link></li>
          <li><Link
            to="/signup"
            className="link"
            >Signup</Link></li>
          <li><Link
            to="/login"
            className="link"
            >Login</Link></li>
            </div>
        }
        {
          this.state.loggedIn &&
          <div>
          <li><Link
            to="/"
            className="link"
            >X</Link></li>
          <li><Link
            to="/dashboard"
            className="link"
            >Dashboard</Link></li>
          <li><Link
            to="/add"
            className="link"
            >Add</Link></li>

          <li><a className="logout" href="/logout">Logout</a></li>
          </div>
        }

      </div>
    );
  }
}
