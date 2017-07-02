import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import Tumblr from './components/Tumblr';
import Add from './components/Add';
import Edit from './components/Edit';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/tumblr" component={Tumblr} />
          <Route path="/add" component={Add} />
          <Route path="/p/*" component={Edit} />
        </div>
      </BrowserRouter>
    )
  }
}

render(<App />, document.getElementById('app'));
