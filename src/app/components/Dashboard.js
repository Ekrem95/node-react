import React, { Component } from 'react';
import axios from 'axios';

export default class Dashboard extends Component {
  componentWillMount( nextState, transition ) {
    axios.get('api/isloggedin')
      .then(res => {
        if(res.data == 'no') {
           window.location.replace("/login");
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}
